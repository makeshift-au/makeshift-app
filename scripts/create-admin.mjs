import { createClient } from "@supabase/supabase-js";

const url = "https://qtcbrwuwxycrbhdadyxd.supabase.co";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceKey) {
  console.error("SUPABASE_SERVICE_ROLE_KEY not set");
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const EMAIL = "makeshift.melb@gmail.com";
const FULL_NAME = "Jordan M.";

async function main() {
  // 1. Check if user already exists
  const { data: existingUsers } = await admin.auth.admin.listUsers();
  let user = existingUsers?.users?.find((u) => u.email === EMAIL);

  if (user) {
    console.log(`User already exists: ${user.id}`);
  } else {
    // Create auth user (no password — magic link only)
    const { data: newUser, error: authErr } = await admin.auth.admin.createUser({
      email: EMAIL,
      email_confirm: true,
      user_metadata: { full_name: FULL_NAME, role: "admin" },
    });

    if (authErr) {
      console.error("Failed to create auth user:", authErr.message);
      process.exit(1);
    }
    user = newUser.user;
    console.log(`Created auth user: ${user.id}`);
  }

  // 2. Upsert profiles row with admin role
  const { error: profileErr } = await admin
    .from("profiles")
    .upsert(
      { id: user.id, role: "admin", full_name: FULL_NAME },
      { onConflict: "id" }
    );

  if (profileErr) {
    console.error("Failed to upsert profile:", profileErr.message);
    // Try insert if upsert fails
    const { error: insertErr } = await admin
      .from("profiles")
      .insert({ id: user.id, role: "admin", full_name: FULL_NAME });
    if (insertErr) {
      console.error("Insert also failed:", insertErr.message);
    } else {
      console.log("Inserted profile row with admin role");
    }
  } else {
    console.log("Upserted profile row with admin role");
  }

  // 3. Link Maccs Customs artist to this admin user
  const { data: artist, error: artistFetchErr } = await admin
    .from("artists")
    .select("id, profile_id, slug")
    .eq("slug", "maccs-customs")
    .single();

  if (artist && !artist.profile_id) {
    const { error: linkErr } = await admin
      .from("artists")
      .update({ profile_id: user.id })
      .eq("id", artist.id);

    if (linkErr) {
      console.error("Failed to link artist:", linkErr.message);
    } else {
      console.log(`Linked Maccs Customs (${artist.id}) to admin user`);
    }
  } else if (artist?.profile_id) {
    console.log(`Maccs Customs already linked to profile: ${artist.profile_id}`);
  } else {
    console.log("Maccs Customs artist not found in DB");
  }

  // 4. Generate a magic link for first login
  const { data: linkData, error: linkErr } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email: EMAIL,
    options: { redirectTo: "https://makeshift-au.com/admin" },
  });

  if (linkErr) {
    console.error("Failed to generate magic link:", linkErr.message);
  } else {
    console.log("\n=== ADMIN MAGIC LINK ===");
    console.log(linkData.properties?.action_link);
    console.log("========================\n");
  }

  console.log("Done! Admin account ready.");
}

main().catch(console.error);
