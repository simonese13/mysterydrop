import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendPrizeEmail, sendAdminNotification } from "@/lib/email";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const prizes = [
  { id: "credit", name: "Box Scontata!", description: "Hai scoperto la prossima Mystery Box a soli 2€ invece di 4,99€!", icon: "🎟️", probability: 80 },
  { id: "box", name: "Mystery Box Gratis", description: "Hai scoperto una Mystery Box gratuita!", icon: "🎁", probability: 15 },
  { id: "amazon20", name: "Buono Amazon 20€", description: "Hai scoperto un buono Amazon da 20€!", icon: "🛍️", probability: 3 },
  { id: "amazon50", name: "Buono Amazon 50€", description: "Hai scoperto un buono Amazon da 50€!", icon: "💰", probability: 1.5 },
  { id: "airpods", name: "AirPods Apple", description: "Hai scoperto AirPods Apple!", icon: "🎧", probability: 0.4 },
  { id: "iphone", name: "iPhone ultimo modello", description: "Hai scoperto un iPhone!", icon: "📱", probability: 0.1 },
];

function extractPrize(): typeof prizes[0] {
  const rand = Math.random() * 100;
  let cumulative = 0;
  for (const prize of prizes) {
    cumulative += prize.probability;
    if (rand <= cumulative) return prize;
  }
  return prizes[0];
}

function generateCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "MD-";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const sessionId = body.sessionId || null;

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID mancante" }, { status: 400 });
  }

  // Verifica che il pagamento sia realmente completato su Stripe
  let stripeSession;
  try {
    stripeSession = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return NextResponse.json({ error: "Sessione non valida" }, { status: 400 });
  }

  if (stripeSession.payment_status !== "paid") {
    return NextResponse.json({ error: "Pagamento non completato" }, { status: 400 });
  }

  // Controlla se il premio è già stato rivelato
  const { data: order } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("stripe_session_id", sessionId)
    .single();

  if (!order) {
    return NextResponse.json({ error: "Ordine non trovato" }, { status: 404 });
  }

  // SE GIA' RIVELATO — restituisci il premio esistente senza generarne uno nuovo
  if (order.prize_revealed && order.prize_id) {
    const existingPrize = prizes.find(p => p.id === order.prize_id) || prizes[0];
    
    const { data: existingCode } = await supabaseAdmin
      .from("discount_codes")
      .select("code")
      .eq("order_id", order.id)
      .single();

    return NextResponse.json({ 
      prize: existingPrize, 
      discountCode: existingCode?.code || null,
      alreadyRevealed: true
    });
  }

  // PRIMA VOLTA — estrai il premio e salvalo
  const prize = extractPrize();
  let discountCode = null;

  await supabaseAdmin
    .from("orders")
    .update({ 
      prize_id: prize.id, 
      prize_name: prize.name, 
      status: "completed",
      prize_revealed: true
    })
    .eq("id", order.id);

  if (prize.id === "credit" || prize.id === "box") {
    const code = generateCode();
    const amount = prize.id === "credit" ? 299 : 499;

    await supabaseAdmin.from("discount_codes").insert({
      code,
      order_id: order.id,
      email: order.email,
      amount,
    });

    discountCode = code;
  }

  const userEmail = order.email;
  if (userEmail) {
    await sendPrizeEmail(userEmail, prize.name, discountCode);
  }
  await sendAdminNotification(userEmail || "Anonimo", prize.name, order.amount);

  return NextResponse.json({ prize, discountCode });
}