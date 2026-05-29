"use client";
import { useState, useEffect } from "react";

type Order = {
  id: string;
  created_at: string;
  stripe_session_id: string;
  email: string;
  amount: number;
  status: string;
  prize_name: string;
  discount_code: string;
};

type DiscountCode = {
  id: string;
  created_at: string;
  code: string;
  email: string;
  amount: number;
  used: boolean;
  expires_at: string;
};

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [codes, setCodes] = useState<DiscountCode[]>([]);
  const [tab, setTab] = useState<"orders" | "codes" | "stats" | "prizes">("stats");
  const [loading, setLoading] = useState(false);

  const ADMIN_PASSWORD = "mysterydrop2025";

  async function loadData() {
    setLoading(true);
    const res = await fetch("/api/admin/data");
    const data = await res.json();
    setOrders(data.orders || []);
    setCodes(data.codes || []);
    setLoading(false);
  }

  function login() {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      loadData();
    } else {
      alert("Password errata!");
    }
  }

  const totalRevenue = orders.filter(o => o.status === "completed").reduce((acc, o) => acc + o.amount, 0) / 100;
  const totalOrders = orders.filter(o => o.status === "completed").length;
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const unusedCodes = codes.filter(c => !c.used).length;

  if (!authenticated) {
    return (
      <main style={{ background: "#0a0a0f", minHeight: "100vh", color: "#f0eee8", fontFamily: "sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#13131a", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "2.5rem", width: "320px", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔐</div>
          <h1 style={{ fontWeight: 800, fontSize: "1.5rem", marginBottom: "0.5rem" }}>Admin Panel</h1>
          <p style={{ color: "#8a8880", fontSize: "0.85rem", marginBottom: "1.5rem" }}>MysteryDrop Dashboard</p>
          <input
            type="password"
            placeholder="Password admin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            style={{ width: "100%", background: "#0a0a0f", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "10px 14px", color: "#f0eee8", fontSize: "0.9rem", outline: "none", marginBottom: "1rem" }}
          />
          <button
            onClick={login}
            style={{ width: "100%", background: "#f5c842", color: "#000", fontWeight: 700, padding: "12px", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "1rem" }}
          >
            Accedi
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: "#0a0a0f", minHeight: "100vh", color: "#f0eee8", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* HEADER */}
       <button
              onClick={async () => {
                const email = prompt("Email del cliente:");
                if (!email) return;
                const pkg = prompt("Pacchetto (silver/gold/platinum):");
                if (!pkg) return;
                const name = prompt("Nome del cliente (opzionale):");
                
                const res = await fetch("/api/admin/data", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ 
                    action: "create_manual_package",
                    email,
                    package: pkg,
                    customerName: name || email
                  }),
                });
                const data = await res.json();
                if (data.success) {
                  navigator.clipboard.writeText(data.packageUrl);
                  alert(`✅ Link copiato!\n\nManda questo link al cliente:\n${data.packageUrl}\n\nBoxes: ${data.boxes}`);
                } else {
                  alert("Errore: " + data.error);
                }
              }}
              style={{ background: "rgba(124,92,252,0.15)", border: "0.5px solid rgba(124,92,252,0.3)", color: "#7c5cfc", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "0.85rem", fontWeight: 700 }}
            >
              📦 Crea pacchetto manuale
            </button>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontWeight: 800, fontSize: "1.5rem", color: "#f5c842" }}>MysteryDrop Admin</h1>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              onClick={async () => {
                const res = await fetch("/api/admin/data", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ action: "generate_test_code" }),
                });
                const data = await res.json();
                if (data.success) {
                  navigator.clipboard.writeText(data.code);
                  alert(`✅ Codice test copiato: ${data.code}\nUsalo al checkout per box gratis!`);
                }
              }}
              style={{ background: "rgba(99,217,107,0.15)", border: "0.5px solid rgba(99,217,107,0.3)", color: "#63d96b", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "0.85rem", fontWeight: 700 }}
            >
              🧪 Genera codice test
            </button>
            <button onClick={loadData} style={{ background: "transparent", border: "0.5px solid rgba(255,255,255,0.15)", color: "#8a8880", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "0.85rem" }}>
              🔄 Aggiorna
            </button>
            <a href="/" style={{ background: "transparent", border: "0.5px solid rgba(255,255,255,0.15)", color: "#8a8880", padding: "8px 16px", borderRadius: "8px", fontSize: "0.85rem", textDecoration: "none" }}>
              ← Home
            </a>
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {(["stats", "orders", "codes", "prizes"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ background: tab === t ? "#f5c842" : "transparent", color: tab === t ? "#000" : "#8a8880", border: tab === t ? "none" : "0.5px solid rgba(255,255,255,0.15)", padding: "8px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: tab === t ? 700 : 400, fontSize: "0.9rem" }}>
              {t === "stats" ? "📊 Statistiche" : t === "orders" ? "📦 Ordini" : t === "codes" ? "🎟️ Codici" : "🏆 Vincite"}
            </button>
          ))}
        </div>

        {loading && <p style={{ color: "#8a8880" }}>Caricamento...</p>}

        {/* STATS */}
        {tab === "stats" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
            {[
              { label: "Incasso totale", value: `€${totalRevenue.toFixed(2)}`, icon: "💰" },
              { label: "Ordini completati", value: totalOrders, icon: "✅" },
              { label: "Ordini in attesa", value: pendingOrders, icon: "⏳" },
              { label: "Codici attivi", value: unusedCodes, icon: "🎟️" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#13131a", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "1.5rem", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{s.icon}</div>
                <div style={{ fontWeight: 800, fontSize: "1.8rem", color: "#f5c842", marginBottom: "0.25rem" }}>{s.value}</div>
                <div style={{ color: "#8a8880", fontSize: "0.8rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* ORDINI */}
        {tab === "orders" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {orders.length === 0 && <p style={{ color: "#8a8880" }}>Nessun ordine ancora.</p>}
            {orders.map((o) => (
              <div key={o.id} style={{ background: "#13131a", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.2rem" }}>{o.prize_name || "In attesa"}</div>
                  <div style={{ color: "#8a8880", fontSize: "0.8rem" }}>{o.email || "—"} · {new Date(o.created_at).toLocaleDateString("it-IT")}</div>
                  {o.discount_code && <div style={{ color: "#f5c842", fontSize: "0.78rem", marginTop: "0.2rem" }}>Codice usato: {o.discount_code}</div>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ fontWeight: 700, color: "#f5c842" }}>€{(o.amount / 100).toFixed(2)}</div>
                  <div style={{ background: o.status === "completed" ? "rgba(99,217,107,0.15)" : "rgba(245,200,66,0.15)", color: o.status === "completed" ? "#63d96b" : "#f5c842", fontSize: "0.78rem", padding: "4px 10px", borderRadius: "20px" }}>
                    {o.status === "completed" ? "✓ Completato" : "⏳ In attesa"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CODICI */}
        {tab === "codes" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {codes.length === 0 && <p style={{ color: "#8a8880" }}>Nessun codice generato ancora.</p>}
            {codes.map((c) => (
              <div key={c.id} style={{ background: "#13131a", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <div style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "1.1rem", color: "#f5c842", marginBottom: "0.2rem" }}>{c.code}</div>
                  <div style={{ color: "#8a8880", fontSize: "0.8rem" }}>{c.email || "—"} · Scade: {new Date(c.expires_at).toLocaleDateString("it-IT")}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ fontWeight: 700, color: "#f5c842" }}>€{(c.amount / 100).toFixed(2)}</div>
                  <div style={{ background: c.used ? "rgba(226,75,74,0.15)" : "rgba(99,217,107,0.15)", color: c.used ? "#e24b4a" : "#63d96b", fontSize: "0.78rem", padding: "4px 10px", borderRadius: "20px" }}>
                    {c.used ? "✗ Usato" : "✓ Attivo"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STORICO VINCITE */}
        {tab === "prizes" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {orders.filter(o => o.prize_name).length === 0 && <p style={{ color: "#8a8880" }}>Nessuna vincita ancora.</p>}
            {orders.filter(o => o.prize_name).map((o) => (
              <div key={o.id} style={{ background: "#13131a", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ fontSize: "2rem" }}>
                    {o.prize_name?.includes("iPhone") ? "📱" :
                     o.prize_name?.includes("AirPods") ? "🎧" :
                     o.prize_name?.includes("MacBook") ? "💻" :
                     o.prize_name?.includes("iPad") ? "🖥" :
                     o.prize_name?.includes("Amazon") ? "🛍️" :
                     o.prize_name?.includes("Box") ? "🎁" : "🎟️"}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.2rem" }}>{o.prize_name}</div>
                    <div style={{ color: "#8a8880", fontSize: "0.8rem" }}>{o.email || "Anonimo"} · {new Date(o.created_at).toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
                  </div>
                </div>
                <div style={{
                  background: o.prize_name?.includes("iPhone") ? "rgba(124,92,252,0.15)" : o.prize_name?.includes("AirPods") ? "rgba(99,217,107,0.15)" : o.prize_name?.includes("Amazon") ? "rgba(245,200,66,0.15)" : "rgba(255,255,255,0.05)",
                  color: o.prize_name?.includes("iPhone") ? "#7c5cfc" : o.prize_name?.includes("AirPods") ? "#63d96b" : o.prize_name?.includes("Amazon") ? "#f5c842" : "#8a8880",
                  fontSize: "0.78rem", padding: "4px 12px", borderRadius: "20px", fontWeight: 700
                }}>
                  {o.prize_name?.includes("iPhone") || o.prize_name?.includes("AirPods") || o.prize_name?.includes("iPad") ? "🏆 Premio fisico" : "🎟️ Premio digitale"}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}