import { Resend } from "resend";

const FROM = "Makeshift <hello@makeshift-au.com>";

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

// ---- Order confirmation to buyer ----
export async function sendOrderConfirmation({
  buyerEmail,
  buyerName,
  itemTitle,
  artistName,
  amount,
  orderNumber,
}: {
  buyerEmail: string;
  buyerName?: string;
  itemTitle: string;
  artistName: string;
  amount: number;
  orderNumber: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[email] RESEND_API_KEY not set — skipping order confirmation");
    return;
  }

  await getResend()?.emails.send({
    from: FROM,
    to: buyerEmail,
    subject: `Order confirmed — ${itemTitle}`,
    html: `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 0;">
        <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 8px;">You're locked in.</h1>
        <p style="color: #888; margin-bottom: 24px;">Order #${orderNumber}</p>

        <div style="background: #1A1A1A; border: 1px solid #2A2A2A; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <p style="margin: 0 0 4px; font-weight: 700;">${itemTitle}</p>
          <p style="margin: 0 0 12px; color: #888;">by ${artistName}</p>
          <p style="margin: 0; font-size: 24px; font-weight: 800; color: #C8FF00;">$${amount.toFixed(2)}</p>
        </div>

        <h2 style="font-size: 18px; margin-bottom: 12px;">What happens next</h2>
        <ol style="color: #CCC; line-height: 1.8; padding-left: 20px;">
          <li>The artist has been notified and will start on your piece.</li>
          <li>You'll get an email when it ships with tracking info.</li>
          <li>Your one-of-a-kind piece arrives at your door.</li>
        </ol>

        <p style="color: #888; font-size: 13px; margin-top: 32px; border-top: 1px solid #2A2A2A; padding-top: 16px;">
          ${buyerName ? `Hi ${buyerName}, thanks` : "Thanks"} for supporting independent artists on Makeshift.
        </p>
      </div>
    `,
  });
}

// ---- Order notification to artist ----
export async function sendOrderNotificationToArtist({
  artistEmail,
  artistName,
  itemTitle,
  buyerName,
  amount,
  platformFee,
  orderNumber,
}: {
  artistEmail: string;
  artistName: string;
  itemTitle: string;
  buyerName?: string;
  amount: number;
  platformFee: number;
  orderNumber: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[email] RESEND_API_KEY not set — skipping artist notification");
    return;
  }

  const payout = amount - platformFee;

  await getResend()?.emails.send({
    from: FROM,
    to: artistEmail,
    subject: `New sale! ${itemTitle} — $${payout.toFixed(2)} earned`,
    html: `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 0;">
        <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 8px;">You've got a sale!</h1>
        <p style="color: #888; margin-bottom: 24px;">Order #${orderNumber}</p>

        <div style="background: #1A1A1A; border: 1px solid #2A2A2A; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <p style="margin: 0 0 4px; font-weight: 700;">${itemTitle}</p>
          ${buyerName ? `<p style="margin: 0 0 12px; color: #888;">Buyer: ${buyerName}</p>` : ""}
          <p style="margin: 0; font-size: 24px; font-weight: 800; color: #C8FF00;">$${payout.toFixed(2)} earned</p>
          <p style="margin: 4px 0 0; color: #888; font-size: 13px;">$${amount.toFixed(2)} sale — $${platformFee.toFixed(2)} platform fee</p>
        </div>

        <p style="color: #CCC;">
          Hi ${artistName}, time to get making! Once your piece is ready, update the order status in your
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/orders" style="color: #C8FF00;">dashboard</a>.
        </p>
      </div>
    `,
  });
}

// ---- New application notification to admin ----
export async function sendApplicationNotification({
  applicantName,
  applicantEmail,
  disciplines,
  city,
  state,
}: {
  applicantName: string;
  applicantEmail: string;
  disciplines: string[];
  city?: string;
  state?: string;
}) {
  const ADMIN_EMAIL = process.env.MAKESHIFT_ADMIN_EMAIL || "makeshift.melb@gmail.com";

  if (!process.env.RESEND_API_KEY) {
    console.log("[email] RESEND_API_KEY not set — skipping admin notification");
    return;
  }

  const location = [city, state].filter(Boolean).join(", ") || "Not specified";

  await getResend()?.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New application: ${applicantName}`,
    html: `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 0;">
        <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 16px;">New artist application</h1>

        <div style="background: #1A1A1A; border: 1px solid #2A2A2A; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <p style="margin: 0 0 8px; font-weight: 700; font-size: 18px; color: #FFF;">${applicantName}</p>
          <p style="margin: 0 0 4px; color: #888;">${applicantEmail}</p>
          <p style="margin: 0 0 4px; color: #888;">Location: ${location}</p>
          <p style="margin: 0; color: #C8FF00;">${disciplines.join(", ")}</p>
        </div>

        <p style="color: #333;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://makeshift-au.com"}/admin/applications" style="color: #C8FF00;">Review in admin dashboard →</a>
        </p>
      </div>
    `,
  });
}

// ---- Artist approved — welcome email with login credentials ----
export async function sendArtistWelcome({
  artistEmail,
  artistName,
  loginUrl,
  tempPassword,
}: {
  artistEmail: string;
  artistName: string;
  loginUrl: string;
  tempPassword: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[email] RESEND_API_KEY not set — skipping welcome email");
    return;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://makeshift-au.com";

  await getResend()?.emails.send({
    from: FROM,
    to: artistEmail,
    subject: `You're in! Welcome to Makeshift, ${artistName}`,
    html: `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 0;">
        <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 8px;">Welcome to Makeshift.</h1>
        <p style="color: #C8FF00; font-weight: 700; margin-bottom: 24px;">Your application has been approved!</p>

        <p style="color: #CCC; line-height: 1.6; margin-bottom: 24px;">
          Hi ${artistName}, we loved your work and you're officially part of the Makeshift community.
          Your artist page is ready to set up.
        </p>

        <div style="background: #1A1A1A; border: 1px solid #2A2A2A; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <p style="margin: 0 0 12px; font-weight: 700; font-size: 16px; color: #FFF;">Your login details</p>
          <p style="margin: 0 0 4px; color: #888; font-size: 13px;">Email</p>
          <p style="margin: 0 0 12px; color: #FFF; font-family: monospace;">${artistEmail}</p>
          <p style="margin: 0 0 4px; color: #888; font-size: 13px;">Temporary password</p>
          <p style="margin: 0; color: #C8FF00; font-family: monospace; font-size: 16px;">${tempPassword}</p>
        </div>

        <div style="margin-bottom: 32px;">
          <a href="${appUrl}/login" style="display: inline-block; background: #C8FF00; color: #000; font-weight: 700; padding: 14px 28px; border-radius: 999px; text-decoration: none; font-size: 15px;">
            Sign in to your Creator Studio &rarr;
          </a>
        </div>

        <h2 style="font-size: 18px; margin-bottom: 12px;">Getting started</h2>
        <ol style="color: #CCC; line-height: 1.8; padding-left: 20px;">
          <li>Sign in with the credentials above</li>
          <li>Upload your profile photo, banner, and hero image</li>
          <li>Add your first listing — title, description, price, and photos</li>
          <li>Hit "Save" and your page goes live on makeshift-au.com</li>
        </ol>

        <div style="background: #1A1A1A; border: 1px solid #2A2A2A; border-radius: 12px; padding: 20px; margin: 24px 0;">
          <p style="margin: 0 0 4px; font-weight: 700; color: #C8FF00;">Founding Artist Plan</p>
          <p style="margin: 0; color: #CCC;">Free for 6 months. 10% commission on sales. No lock-in.</p>
        </div>

        <p style="color: #888; font-size: 13px; margin-top: 32px; border-top: 1px solid #2A2A2A; padding-top: 16px;">
          If you have any questions, just reply to this email or hit us up at makeshift.melb@gmail.com
        </p>
      </div>
    `,
  });
}

// ---- Onboarding reminder (Day 1 / Day 3 / Day 7) ----
export async function sendOnboardingReminder({
  artistEmail,
  artistName,
  dayNumber,
  missing,
}: {
  artistEmail: string;
  artistName: string;
  dayNumber: 1 | 3 | 7;
  missing: {
    profilePhoto: boolean;
    heroImage: boolean;
    bio: boolean;
    listings: boolean;
    stripe: boolean;
  };
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[email] RESEND_API_KEY not set — skipping onboarding reminder");
    return;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://makeshift-au.com";
  const firstName = artistName.split(" ")[0];

  const subjects: Record<number, string> = {
    1: `Your artist page is waiting, ${firstName}`,
    3: `Quick nudge — finish setting up your Makeshift page`,
    7: `Last reminder — let's get you live on Makeshift`,
  };

  const intros: Record<number, string> = {
    1: `Hi ${firstName}, welcome again! Just a quick reminder that your artist page is ready to set up. Here's what's left to get you live on Makeshift:`,
    3: `Hey ${firstName}, just checking in — you're almost there! A few things left before your page can go live:`,
    7: `Hi ${firstName}, it's been a week since you joined and we'd love to see your work on the site. Here's what's still needed to go live:`,
  };

  // Build checklist based on what's actually missing
  const items: string[] = [];
  if (missing.profilePhoto) items.push("Upload a profile photo");
  if (missing.heroImage) items.push("Add a hero image for your artist page");
  if (missing.bio) items.push("Write a short bio so buyers know your story");
  if (missing.listings) items.push("Add your first listing — even one is enough to go live");
  if (missing.stripe) items.push("Connect your bank account via Stripe to receive payouts");

  // If nothing is missing, don't send
  if (items.length === 0) return;

  const checklistHtml = items
    .map(
      (item) =>
        `<li style="margin-bottom: 8px; color: #CCC;">${item}</li>`
    )
    .join("");

  const ctaText =
    dayNumber === 1
      ? "Set up your page →"
      : dayNumber === 3
        ? "Finish your page →"
        : "Complete your page →";

  const footerNote =
    dayNumber === 7
      ? `<p style="color: #888; line-height: 1.6; margin-bottom: 24px;">
          This is our last automated nudge — but you can set up your page any time.
          If you have questions or need help, just reply to this email.
        </p>`
      : "";

  await getResend()?.emails.send({
    from: FROM,
    to: artistEmail,
    subject: subjects[dayNumber],
    html: `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 0;">
        <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 16px;">
          ${dayNumber === 1 ? "Let's get you set up." : dayNumber === 3 ? "You're almost there." : "We'd love to see your work."}
        </h1>

        <p style="color: #CCC; line-height: 1.6; margin-bottom: 24px;">
          ${intros[dayNumber]}
        </p>

        <div style="background: #1A1A1A; border: 1px solid #2A2A2A; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <p style="margin: 0 0 12px; font-weight: 700; color: #C8FF00; font-size: 14px;">TO-DO (${items.length} ${items.length === 1 ? "item" : "items"} remaining)</p>
          <ul style="margin: 0; padding-left: 20px; list-style: none;">
            ${items.map((item) => `<li style="margin-bottom: 8px; color: #CCC; padding-left: 4px;">☐ ${item}</li>`).join("")}
          </ul>
        </div>

        <div style="margin-bottom: 32px;">
          <a href="${appUrl}/dashboard/page-editor" style="display: inline-block; background: #C8FF00; color: #000; font-weight: 700; padding: 14px 28px; border-radius: 999px; text-decoration: none; font-size: 15px;">
            ${ctaText}
          </a>
        </div>

        ${footerNote}

        <p style="color: #888; font-size: 13px; margin-top: 32px; border-top: 1px solid #2A2A2A; padding-top: 16px;">
          Need help? Just reply to this email or hit us up at makeshift.melb@gmail.com
        </p>
      </div>
    `,
  });
}

// ---- Application confirmation ----
export async function sendApplicationConfirmation({
  applicantEmail,
  applicantName,
}: {
  applicantEmail: string;
  applicantName: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[email] RESEND_API_KEY not set — skipping application confirmation");
    return;
  }

  await getResend()?.emails.send({
    from: FROM,
    to: applicantEmail,
    subject: "Application received — Makeshift",
    html: `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 0;">
        <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 16px;">We've got your application.</h1>

        <p style="color: #333; line-height: 1.6; margin-bottom: 24px;">
          Hi ${applicantName}, thanks for applying to sell on Makeshift.
          We review every application by hand — you'll hear from us within 5-7 business days.
        </p>

        <h2 style="font-size: 18px; margin-bottom: 12px;">What happens next</h2>
        <ol style="color: #333; line-height: 1.8; padding-left: 20px;">
          <li>Our team reviews your portfolio (1-3 days)</li>
          <li>We email you with our decision (3-5 days)</li>
          <li>If approved: set up Stripe, upload listings, go live</li>
        </ol>

        <p style="color: #666; font-size: 13px; margin-top: 32px; border-top: 1px solid #DDD; padding-top: 16px;">
          In the meantime, follow @makeshift.au on Instagram and get your best photos ready.
        </p>
      </div>
    `,
  });
}
