import { Resend } from "resend";

const FROM = "Makeshift <hello@makeshift.au>";

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

        <p style="color: #CCC; line-height: 1.6; margin-bottom: 24px;">
          Hi ${applicantName}, thanks for applying to sell on Makeshift.
          We review every application by hand — you'll hear from us within 5-7 business days.
        </p>

        <h2 style="font-size: 18px; margin-bottom: 12px;">What happens next</h2>
        <ol style="color: #CCC; line-height: 1.8; padding-left: 20px;">
          <li>Our team reviews your portfolio (1-3 days)</li>
          <li>We email you with our decision (3-5 days)</li>
          <li>If approved: set up Stripe, upload listings, go live</li>
        </ol>

        <p style="color: #888; font-size: 13px; margin-top: 32px; border-top: 1px solid #2A2A2A; padding-top: 16px;">
          In the meantime, follow @makeshift.au on Instagram and get your best photos ready.
        </p>
      </div>
    `,
  });
}
