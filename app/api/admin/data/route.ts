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
    const code = "TEST-INFINITE";

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

  return NextResponse.json({ error: "Azione non valida" }, { status: 400 });
}