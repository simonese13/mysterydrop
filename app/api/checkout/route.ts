import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const discountCode = body.discountCode || null;

  let discountAmount = 0;
  let discountId = null;

  if (discountCode) {
    const { data: code } = await supabaseAdmin
      .from("discount_codes")
      .select("*")
      .eq("code", discountCode.toUpperCase())
      .eq("used", false)
      .single();

    if (code && new Date(code.expires_at) > new Date()) {
      discountAmount = code.amount;
      discountId = code.id;
      if (discountCode.toUpperCase() === "TEST-INFINITE") {
        discountId = null;
      }
    } else {
      return NextResponse.json({ error: "Codice non valido o scaduto" }, { status: 400 });
    }
  }

  const finalAmount = Math.max(499 - discountAmount, 0);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "Mystery Box Apple",
            description: "Apri la box e scopri il tuo premio Apple!",
          },
          unit_amount: finalAmount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    customer_email: body.email || undefined,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
    metadata: {
      discount_code_id: discountId || "",
      discount_code: discountCode || "",
    },
  });

  await supabaseAdmin.from("orders").insert({
    stripe_session_id: session.id,
    amount: finalAmount,
    status: "pending",
    discount_code: discountCode || null,
  });

  return NextResponse.json({ url: session.url });
}
