"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendArtistWelcome } from "@/lib/email";

// ---- Fetch Applications ----
export async function getApplications(status?: string) {
  const supabase = await createClient();
  let query = supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Fetch applications error:", error);
    return [];
  }
  return data ?? [];
}

// ---- Approve Application ----
export async function approveApplication(applicationId: string) {
  const supabase = await createClient();

  // Get application data
  const { data: app, error: fetchErr } = await supabase
    .from("applications")
    .select("*")
    .eq("id", applicationId)
    .single();

  if (fetchErr || !app) {
    return { error: "Application not found" };
  }

  // --- Step 1: Create Supabase auth user ---
  const admin = createAdminClient();

  // Check if user already exists
  const { data: existingUsers } = await admin.auth.admin.listUsers();
  const existingUser = existingUsers?.users?.find(
    (u) => u.email === app.email
  );

  let userId: string;

  // Generate a temporary password for the artist
  const tempPassword =
    app.full_name.split(" ")[0] +
    "-" +
    Math.random().toString(36).slice(2, 8) +
    "!";

  if (existingUser) {
    userId = existingUser.id;
    // Update existing user's password
    await admin.auth.admin.updateUserById(userId, { password: tempPassword });
  } else {
    // Create a new auth user with a temporary password
    const { data: newUser, error: authErr } =
      await admin.auth.admin.createUser({
        email: app.email,
        password: tempPassword,
        email_confirm: true, // auto-confirm the email
        user_metadata: {
          full_name: app.full_name,
          role: "artist",
        },
      });

    if (authErr || !newUser.user) {
      console.error("Create auth user error:", authErr);
      return { error: "Failed to create user account: " + (authErr?.message ?? "unknown") };
    }

    userId = newUser.user.id;
  }

  // --- Step 2: Update application status ---
  const { error: updateErr } = await supabase
    .from("applications")
    .update({ status: "approved", updated_at: new Date().toISOString() })
    .eq("id", applicationId);

  if (updateErr) {
    console.error("Approve error:", updateErr);
    return { error: "Failed to approve application" };
  }

  // --- Step 3: Create artist record linked to auth user ---
  const slug =
    app.slug_preference?.toLowerCase().replace(/[^a-z0-9-]/g, "-") ||
    app.full_name.toLowerCase().replace(/[^a-z0-9]/g, "-");

  const { error: insertErr } = await admin.from("artists").insert({
    slug,
    name: app.full_name,
    discipline: app.disciplines?.[0] ?? "visual-art",
    location: [app.city, app.state].filter(Boolean).join(", "),
    tagline: app.bio ?? "",
    bio: app.work_description ?? "",
    instagram: app.instagram ?? "",
    website: app.website ?? "",
    commissions: true,
    price_range: app.price_range ?? "",
    status: "onboarding",
    founding_artist: true,
    fee_rate: 5.0,
    profile_id: userId, // Link artist to auth user
  });

  if (insertErr) {
    console.error("Create artist error:", insertErr);
    return {
      error:
        "Approved and account created, but failed to create artist profile. Check for duplicate slug.",
    };
  }

  // --- Step 4: Generate magic link and send welcome email ---
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://makeshift-au.com";

  const { data: linkData, error: linkErr } =
    await admin.auth.admin.generateLink({
      type: "magiclink",
      email: app.email,
      options: {
        redirectTo: `${appUrl}/dashboard/page-editor`,
      },
    });

  if (linkErr || !linkData) {
    console.error("Generate magic link error:", linkErr);
    // Non-fatal — the artist can still log in via /login
  }

  // Build the login URL: use the magic link if we got one, otherwise fall back to /login
  const loginUrl = linkData?.properties?.action_link || `${appUrl}/login`;

  try {
    await sendArtistWelcome({
      artistEmail: app.email,
      artistName: app.full_name,
      loginUrl,
      tempPassword,
    });
  } catch (emailErr) {
    console.error("Welcome email error:", emailErr);
    // Non-fatal — don't fail the whole approval
  }

  return { success: true };
}

// ---- Reject Application ----
export async function rejectApplication(
  applicationId: string,
  notes?: string,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("applications")
    .update({
      status: "rejected",
      reviewer_notes: notes || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", applicationId);

  if (error) {
    console.error("Reject error:", error);
    return { error: "Failed to reject application" };
  }

  return { success: true };
}

// ---- Mark as In Review ----
export async function markInReview(applicationId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("applications")
    .update({
      status: "in_review",
      updated_at: new Date().toISOString(),
    })
    .eq("id", applicationId);

  if (error) {
    console.error("Mark in review error:", error);
    return { error: "Failed to update" };
  }

  return { success: true };
}
