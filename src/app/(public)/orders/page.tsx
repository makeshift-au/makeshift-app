import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Orders — Makeshift" };

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function OrdersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/orders");
  }

  // Fetch orders where buyer_email matches the logged-in user
  const { data: orders } = await supabase
    .from("orders")
    .select("*, listings(title, slug, image_urls)")
    .eq("buyer_email", user.email)
    .order("created_at", { ascending: false });

  const myOrders = orders ?? [];

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <div className="font-mono text-xs text-lime tracking-[0.1em] mb-2">
        / MY ORDERS
      </div>
      <h1 className="font-display font-[800] text-[48px] leading-[0.95] tracking-[-0.02em] mb-3">
        Your purchases.
      </h1>
      <p className="text-lg text-lightgrey mb-8 max-w-xl">
        Everything you&apos;ve bought on Makeshift.
      </p>

      {myOrders.length === 0 ? (
        <div className="bg-dark1 border border-dark2 rounded-2xl p-12 text-center">
          <div className="text-4xl mb-4">🛍️</div>
          <h3 className="font-display font-bold text-xl mb-2">
            No purchases yet
          </h3>
          <p className="text-midgrey text-sm max-w-sm mx-auto mb-6">
            When you buy something from one of our artists, it&apos;ll show up
            here.
          </p>
          <Link
            href="/browse"
            className="inline-block bg-lime text-black font-display font-bold px-8 py-3 rounded-full hover:bg-lime/90 transition"
          >
            Browse artists →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {myOrders.map((order: any) => (
            <div
              key={order.id}
              className="bg-dark1 border border-dark2 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-[10px] text-midgrey tracking-[0.1em]">
                    #{order.order_number}
                  </span>
                  <span
                    className={`inline-block font-mono text-[10px] font-bold tracking-[0.1em] px-3 py-0.5 rounded-full uppercase ${
                      order.status === "paid" ||
                      order.status === "shipped" ||
                      order.status === "delivered"
                        ? "bg-lime/15 text-lime"
                        : order.status === "disputed" ||
                            order.status === "refunded"
                          ? "bg-pink/15 text-pink"
                          : "bg-orange/15 text-orange"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg truncate">
                  {order.listings?.title ?? "Unknown item"}
                </h3>
                <p className="text-midgrey text-sm">
                  Purchased {formatDate(order.created_at)}
                </p>
              </div>

              <div className="text-right sm:text-right shrink-0">
                <div className="font-display font-[800] text-2xl">
                  ${Number(order.amount).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
