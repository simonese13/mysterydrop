import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { sendPrizeEmail, sendAdminNotification } from "@/lib/email";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const basicPrizes = [
  { id: "credit", name: "Box Scontata!", description: "Hai scoperto la prossima Mystery Box a soli 2€ invece di 4,99€!", icon: "🎟️", probability: 97 },
  { id: "amazon20", name: "Buono Amazon 20€", description: "Hai scoperto un buono Amazon da 20€!", icon: "🛍️", probability: 2.5 },
  { id: "amazon50", name: "Buono Amazon 50€", description: "Hai scoperto un buono Amazon da 50€!", icon: "💰", probability: 0.5 },
];

const premiumPrizes = [
  { id: "credit", name: "Box Scontata!", description: "Hai scoperto la prossima Mystery Box a soli 2€ invece di 4,99€!", icon: "🎟️", probability: 97 },
  { id: "amazon20", name: "Buono Amazon 20€", description: "Hai scoperto un buono Amazon da 20€!", icon: "🛍️", probability: 2.5 },
  { id: "amazon50", name: "Buono Amazon 50€", description: "Hai scoperto un buono Amazon da 50€!", icon: "💰", probability: 0.3 },
  { id: "airpods", name: "AirPods Pro", description: "Hai scoperto AirPods Pro!", icon: "🎧", probability: 0.2 },
  { id: "iphone", name: "iPhone ultimo modello", description: "Hai scoperto un iPhone!", icon: "📱", probability: 0.05 },
  { id: "macbook", name: "MacBook Air", description: "Hai scoperto un MacBook Air!", icon: "💻", probability: 0.05 },
];

const premiumIds = ["airpods", "iphone", "macbook"];

function extractPrize(prizes: typeof basicPrizes): typeof basicPrizes[0] {
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

  // Verifica pagamento Stripe
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

  // Se già rivelato, restituisci il premio esistente
  if (order.prize_revealed && order.prize_id) {
    const allPrizes = [...basicPrizes, ...premiumPrizes.filter(p => premiumIds.includes(p.id))];
    const existingPrize = allPrizes.find(p => p.id === order.prize_id) || basicPrizes[0];
    const { data: existingCode } = await supabaseAdmin
      .from("discount_codes")
      .select("code")
      .eq("order_id", order.id)
      .single();
    return NextResponse.json({ prize: existingPrize, discountCode: existingCode?.code || null, alreadyRevealed: true });
  }

  // Controlla se i premi premium sono sbloccati
  const { data: settings } = await supabaseAdmin
    .from("settings")
    .select("*");

  const revenueRow = settings?.find(s => s.key === "total_revenue");
  const unlockedRow = settings?.find(s => s.key === "premium_unlocked");
  
  const totalRevenue = parseFloat(revenueRow?.value || "0");
  const premiumUnlocked = unlockedRow?.value === "true";

  // Aggiorna il totale incassato
  const orderAmount = order.amount / 100;
  const newRevenue = totalRevenue + orderAmount;
  
  await supabaseAdmin
    .from("settings")
    .update({ value: String(newRevenue) })
    .eq("key", "total_revenue");

  // Sblocca premium se si raggiungono 10.000€
  if (newRevenue >= 10000 && !premiumUnlocked) {
    await supabaseAdmin
      .from("settings")
      .update({ value: "true" })
      .eq("key", "premium_unlocked");
  }

  // Scegli il pool di premi
  const prizePool = (premiumUnlocked || newRevenue >= 10000) ? premiumPrizes : basicPrizes;
  const prize = extractPrize(prizePool);

  // Se esce un premio premium, azzera il contatore
  if (premiumIds.includes(prize.id)) {
    await supabaseAdmin
      .from("settings")
      .update({ value: "0" })
      .eq("key", "total_revenue");
    await supabaseAdmin
      .from("settings")
      .update({ value: "false" })
      .eq("key", "premium_unlocked");
  }

  // Salva il premio
  await supabaseAdmin
    .from("orders")
    .update({
      prize_id: prize.id,
      prize_name: prize.name,
      status: "completed",
      prize_revealed: true
    })
    .eq("id", order.id);

  let discountCode = null;
  if (prize.id === "credit") {
    const code = generateCode();
    await supabaseAdmin.from("discount_codes").insert({
      code,
      order_id: order.id,
      email: order.email,
      amount: 299,
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