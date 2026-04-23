"use server";

import { createClient } from "@/lib/supabase/server";
import { sendApplicationConfirmation } from "@/lib/email";

// ---- Contact Form ----
export async function submitContact(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const category = formData.get("category") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Please fill in all required fields." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      category: category || "general",
      message,
    });

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Contact form error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}

// ---- Commission Enquiry ----
export async function submitEnquiry(formData: FormData) {
  const artistSlug = formData.get("artist") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const brief = formData.get("brief") as string;
  const budget = formData.get("budget") as string;
  const timeline = formData.get("timeline") as string;

  if (!name || !email || !brief) {
    return { error: "Please fill in all required fields." };
  }

  try {
    const supabase = await createClient();

    // Look up artist ID from slug
    const { data: artist } = await supabase
      .from("artists")
      .select("id")
      .eq("slug", artistSlug)
      .single();

    if (!artist) {
      return { error: "Artist not found." };
    }

    const { error } = await supabase.from("enquiries").insert({
      artist_id: artist.id,
      name,
      email,
      brief,
      budget: budget || null,
      timeline: timeline || null,
    });

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Enquiry form error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}

// ---- Artist Application ----
export async function submitApplication(formData: FormData) {
  const email = formData.get("email") as string;
  const fullName = formData.get("full_name") as string;
  const phone = formData.get("phone") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  const bio = formData.get("bio") as string;
  const disciplines = formData.getAll("disciplines") as string[];
  const workDescription = formData.get("work_description") as string;
  const priceRange = formData.get("price_range") as string;
  const leadTime = formData.get("lead_time") as string;
  const slugPreference = formData.get("slug_preference") as string;
  const instagram = formData.get("instagram") as string;
  const website = formData.get("website") as string;
  const whyMakeshift = formData.get("why_makeshift") as string;

  if (!email || !fullName || disciplines.length === 0) {
    return { error: "Please fill in all required fields." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("applications").insert({
      email,
      full_name: fullName,
      phone: phone || null,
      city: city || null,
      state: state || null,
      bio: bio || null,
      disciplines,
      work_description: workDescription || null,
      price_range: priceRange || null,
      lead_time: leadTime || null,
      slug_preference: slugPreference || null,
      instagram: instagram || null,
      website: website || null,
      why_makeshift: whyMakeshift || null,
    });

    if (error) throw error;

    // Send confirmation email (fire-and-forget)
    sendApplicationConfirmation({
      applicantEmail: email,
      applicantName: fullName,
    }).catch((e) => console.error("Application email failed:", e));

    return { success: true };
  } catch (err) {
    console.error("Application form error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}
