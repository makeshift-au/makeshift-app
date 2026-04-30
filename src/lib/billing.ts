import { stripe } from "./stripe";
import Stripe from "stripe";

const PLATFORM_SUBSCRIPTION_PRICE = 1500; // $15.00 in cents
const ENQUIRY_FEE = 500; // $5.00 in cents
const MUSIC_CLICK_FEE = 50; // $0.50 in cents
const FOUNDING_TRIAL_DAYS = 180; // 6 months

/**
 * Create a Stripe Customer for an artist.
 * Returns the customer ID.
 */
export async function createCustomer({
  email,
  name,
  artistId,
}: {
  email: string;
  name: string;
  artistId: string;
}): Promise<string> {
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: { artist_id: artistId, platform: "makeshift" },
  });
  return customer.id;
}

/**
 * Create a subscription for an artist.
 * Founding artists get a trial period (6 months), others start immediately.
 */
export async function createSubscription({
  customerId,
  isFoundingArtist,
}: {
  customerId: string;
  isFoundingArtist: boolean;
}): Promise<Stripe.Subscription> {
  // Get or create the platform subscription price
  const priceId = await getOrCreateSubscriptionPrice();

  const params: Stripe.SubscriptionCreateParams = {
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: "default_incomplete",
    payment_settings: {
      save_default_payment_method: "on_subscription",
    },
    collection_method: "charge_automatically",
  };

  if (isFoundingArtist) {
    params.trial_period_days = FOUNDING_TRIAL_DAYS;
    // Don't require payment method during trial
    params.payment_behavior = "default_incomplete";
    params.trial_settings = {
      end_behavior: { missing_payment_method: "pause" },
    };
  }

  return stripe.subscriptions.create(params);
}

/**
 * Add usage charges (enquiries + music clicks) to an artist's next invoice.
 * If the artist has a subscription, adds line items to the upcoming invoice.
 * If not (e.g. founding artist in trial), creates a standalone invoice.
 */
export async function addUsageCharges({
  customerId,
  enquiryCount,
  musicClickCount,
  periodLabel,
}: {
  customerId: string;
  enquiryCount: number;
  musicClickCount: number;
  periodLabel: string;
}): Promise<{ invoiceId?: string }> {
  const lineItems: { amount: number; description: string }[] = [];

  if (enquiryCount > 0) {
    lineItems.push({
      amount: enquiryCount * ENQUIRY_FEE,
      description: `${enquiryCount} enquir${enquiryCount === 1 ? "y" : "ies"} — ${periodLabel}`,
    });
  }

  if (musicClickCount > 0) {
    lineItems.push({
      amount: musicClickCount * MUSIC_CLICK_FEE,
      description: `${musicClickCount} streaming click${musicClickCount === 1 ? "" : "s"} — ${periodLabel}`,
    });
  }

  if (lineItems.length === 0) {
    return {}; // Nothing to charge
  }

  // Check if customer has an active subscription (upcoming invoice)
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "active",
    limit: 1,
  });

  if (subscriptions.data.length > 0) {
    // Add line items to the upcoming subscription invoice
    for (const item of lineItems) {
      await stripe.invoiceItems.create({
        customer: customerId,
        amount: item.amount,
        currency: "aud",
        description: item.description,
      });
    }
    // These will be collected on the next billing cycle automatically
    return {};
  }

  // No active subscription — create a standalone invoice
  // (e.g. founding artist still in trial period)
  for (const item of lineItems) {
    await stripe.invoiceItems.create({
      customer: customerId,
      amount: item.amount,
      currency: "aud",
      description: item.description,
    });
  }

  const invoice = await stripe.invoices.create({
    customer: customerId,
    auto_advance: true, // Auto-finalize and attempt payment
    collection_method: "charge_automatically",
  });

  // Finalize it
  if (invoice.id) {
    await stripe.invoices.finalizeInvoice(invoice.id);
  }

  return { invoiceId: invoice.id };
}

/**
 * Get the customer's portal session URL for managing payment methods.
 */
export async function createBillingPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string;
  returnUrl: string;
}): Promise<string> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  return session.url;
}

/**
 * Get invoice history for a customer.
 */
export async function getInvoices(customerId: string, limit = 12) {
  const invoices = await stripe.invoices.list({
    customer: customerId,
    limit,
  });
  return invoices.data;
}

/**
 * Get or create the Makeshift platform subscription price ($15/mo AUD).
 * Caches the price ID after first lookup.
 */
let cachedPriceId: string | null = null;

async function getOrCreateSubscriptionPrice(): Promise<string> {
  if (cachedPriceId) return cachedPriceId;

  // Look for existing product
  const products = await stripe.products.search({
    query: 'metadata["platform"]:"makeshift_subscription"',
  });

  if (products.data.length > 0) {
    const prices = await stripe.prices.list({
      product: products.data[0].id,
      active: true,
      limit: 1,
    });
    if (prices.data.length > 0) {
      cachedPriceId = prices.data[0].id;
      return cachedPriceId;
    }
  }

  // Create product + price
  const product = await stripe.products.create({
    name: "Makeshift Artist Plan",
    description: "Monthly platform subscription for Makeshift artists",
    metadata: { platform: "makeshift_subscription" },
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: PLATFORM_SUBSCRIPTION_PRICE,
    currency: "aud",
    recurring: { interval: "month" },
  });

  cachedPriceId = price.id;
  return cachedPriceId;
}
