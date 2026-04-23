"use server";

import { createClient } from "@/lib/supabase/server";

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

  // Update application status
  const { error: updateErr } = await supabase
    .from("applications")
    .update({ status: "approved", updated_at: new Date().toISOString() })
    .eq("id", applicationId);

  if (updateErr) {
    console.error("Approve error:", updateErr);
    return { error: "Failed to approve application" };
  }

  // Create artist record from the application
  const slug =
    app.slug_preference?.toLowerCase().replace(/[^a-z0-9-]/g, "-") ||
    app.full_name.toLowerCase().replace(/[^a-z0-9]/g, "-");

  const { error: insertErr } = await supabase.from("artists").insert({
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
    fee_rate: 5.0, // founding artist rate
  });

  if (insertErr) {
    console.error("Create artist error:", insertErr);
    return { error: "Approved, but failed to create artist profile. Check for duplicate slug." };
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
