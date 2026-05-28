import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const packages = {
  silver: { name: "Pacchetto Silver — 100 Mystery Box", amount: 35000, boxes: 100 },
  gold: { name: "Pacchetto Gold — 200 Mystery Box", amount: 60000, boxes: 200 },
  platinum: { name: "Pacchetto Platinum — 600 Mystery Box", amount: 149700, boxes: 600 },
};

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const discountCode = body.discountCode || null;
  const pkg = body.package || null;

  let discountAmount = 0;
  let discountId = null;

  if (discountCode && !pkg) {
    const { data: code } = await supabaseAdmin
      .from("discount_codes")
      .select("*")
      .eq("code", discountCode.toUpperCase())
      .eq("used", false)
      .single();

    if (code && new Date(code.expires_at) > new Date()) {
      discountAmount = code.amount;
      discountId = code.id;
    } else {
      return NextResponse.json({ error: "Codice non valido o scaduto" }, { status: 400 });
    }
  }

  let lineItem;
  let metadata: Record<string, string> = {};

  if (pkg && packages[pkg as keyof typeof packages]) {
    const p = packages[pkg as keyof typeof packages];
    lineItem = {
      price_data: {
        currency: "eur",
        product_data: {
          name: p.name,
          description: `Apri ${p.boxes} Mystery Box Apple in una sessione!`,
        },
        unit_amount: p.amount,
      },
      quantity: 1,
    };
    metadata = { package: pkg, boxes: String(p.boxes) };
  } else {
    const finalAmount = Math.max(499 - discountAmount, 0);
    lineItem = {
      price_data: {
        currency: "eur",
        product_data: {
          name: "Mystery Box Apple",
          description: "Apri la box e scopri il tuo premio Apple!",
        },
        unit_amount: finalAmount,
      },
      quantity: 1,
    };
    if (discountCode) metadata = { discount_code_id: discountId || "", discount_code: discountCode };
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [lineItem],
    mode: "payment",
    customer_email: body.email || undefined,
    success_url: pkg 
  ? `${process.env.NEXT_PUBLIC_SITE_URL}/it/pacchetto?session_id={CHECKOUT_SESSION_ID}`
  : `${process.env.NEXT_PUBLIC_SITE_URL}/it/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
    metadata,
  });

  await supabaseAdmin.from("orders").insert({
    stripe_session_id: session.id,
    amount: lineItem.price_data.unit_amount,
    status: "pending",
    discount_code: discountCode || null,
  });

  return NextResponse.json({ url: session.url });
}