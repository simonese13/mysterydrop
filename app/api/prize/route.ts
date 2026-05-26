import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const prizes = [
  { id: "credit", name: "Box Scontata!", description: "Hai vinto la prossima Mystery Box a soli 2€ invece di 4,99€! Il codice sconto è già pronto per te.", icon: "🎟️", probability: 80 },
  { id: "box", name: "Mystery Box Gratis", description: "Hai vinto una Mystery Box gratuita!", icon: "🎁", probability: 15 },
  { id: "amazon20", name: "Buono Amazon 20€", description: "Hai vinto un buono Amazon da 20€!", icon: "🛍️", probability: 3 },
  { id: "amazon50", name: "Buono Amazon 50€", description: "Hai vinto un buono Amazon da 50€!", icon: "💰", probability: 1.5 },
  { id: "airpods", name: "AirPods Apple", description: "Hai vinto le AirPods Apple!", icon: "🎧", probability: 0.4 },
  { id: "iphone", name: "iPhone ultimo modello", description: "Hai vinto un iPhone!", icon: "📱", probability: 0.1 },
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
  const email = body.email || null;

  const prize = extractPrize();

  if (sessionId) {
    const { data: order } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("stripe_session_id", sessionId)
      .single();

    if (order) {
      await supabaseAdmin
        .from("orders")
        .update({ prize_id: prize.id, prize_name: prize.name, status: "completed" })
        .eq("id", order.id);

      if (prize.id === "credit" || prize.id === "box") {
        const code = generateCode();
        const amount = prize.id === "credit" ? 299 : 499;

        await supabaseAdmin.from("discount_codes").insert({
          code,
          order_id: order.id,
          email: email || order.email,
          amount,
        });

        return NextResponse.json({ prize, discountCode: code });
      }
    }
  }

  return NextResponse.json({ prize, discountCode: null });
}
