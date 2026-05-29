import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const { data: orders } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  const { data: codes } = await supabaseAdmin
    .from("discount_codes")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return NextResponse.json({ orders: orders || [], codes: codes || [] });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (body.action === "generate_test_code") {
    await supabaseAdmin
      .from("discount_codes")
      .delete()
      .eq("code", "TEST-INFINITE");

    await supabaseAdmin.from("discount_codes").insert({
      code: "TEST-INFINITE",
      email: "admin@mysterydrop.it",
      amount: 499,
      used: false,
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3650).toISOString(),
    });

    return NextResponse.json({ success: true, code: "TEST-INFINITE" });
  }

  if (body.action === "create_manual_package") {
    const { email, package: pkg, customerName } = body;

    const packages: Record<string, { boxes: number; amount: number; name: string }> = {
      silver: { boxes: 100, amount: 35000, name: "Pacchetto Silver" },
      gold: { boxes: 200, amount: 60000, name: "Pacchetto Gold" },
      platinum: { boxes: 600, amount: 149700, name: "Pacchetto Platinum" },
    };

    const p = packages[pkg];
    if (!p) return NextResponse.json({ error: "Pacchetto non valido" }, { status: 400 });

    const manualSessionId = `MANUAL-${pkg.toUpperCase()}-${Date.now()}`;

    const { data: order } = await supabaseAdmin
      .from("orders")
      .insert({
        stripe_session_id: manualSessionId,
        email,
        amount: p.amount,
        status: "completed",
        discount_code: "MANUALE",
      })
      .select()
      .single();

    const packageUrl = `https://www.mysterydrop.eu/it/pacchetto?session_id=${manualSessionId}&boxes=${p.boxes}&manual=true`;

    return NextResponse.json({ 
      success: true, 
      sessionId: manualSessionId,
      packageUrl,
      customerName,
      package: pkg,
      boxes: p.boxes
    });
  }

  return NextResponse.json({ error: "Azione non valida" }, { status: 400 });
}