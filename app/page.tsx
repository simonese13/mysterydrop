"use client";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [showCrypto, setShowCrypto] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const btcAddress = process.env.NEXT_PUBLIC_BTC_ADDRESS;

  async function handleStripe() {
    setLoading(true);
    setCodeError("");
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ discountCode: discountCode.trim() || null }),
    });
    const data = await res.json();
    if (data.error) {
      setCodeError(data.error);
      setLoading(false);
      return;
    }
    window.location.href = data.url;
  }

  return (
    <main style={{ background: "#0a0a0f", minHeight: "100vh", color: "#f0eee8", fontFamily: "sans-serif" }}>

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.2rem 2rem", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontWeight: 800, fontSize: "1.3rem", color: "#f5c842" }}>Mystery<span style={{ color: "#f0eee8" }}>Drop</span></div>
        <div style={{ background: "#f5c842", color: "#000", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px" }}>🍎 Premi Apple</div>
      </nav>

      {/* HERO */}
      <section style={{ textAlign: "center", padding: "5rem 2rem 3rem" }}>
        <div style={{ display: "inline-block", background: "rgba(245,200,66,0.12)", border: "0.5px solid rgba(245,200,66,0.35)", color: "#f5c842", fontSize: "12px", padding: "5px 14px", borderRadius: "20px", marginBottom: "1.5rem" }}>
          ✦ Solo 4,99€ a box
        </div>
        <h1 style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", fontWeight: 800, lineHeight: 1.05, marginBottom: "1rem" }}>
          Apri la box.<br /><span style={{ color: "#f5c842" }}>Vinci Apple.</span>
        </h1>
        <p style={{ color: "#8a8880", maxWidth: "460px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          Ogni box nasconde un premio Apple. iPhone, AirPods, MacBook e molto altro. Vinci sempre qualcosa — garantito.
        </p>

        {/* BOX */}
        <div style={{ display: "flex", justifyContent: "center", margin: "2rem auto" }}>
          <div style={{ fontSize: "8rem", animation: "float 3s ease-in-out infinite", cursor: "pointer" }} onClick={handleStripe}>🎁</div>
        </div>

        {/* CODICE SCONTO */}
        <div style={{ maxWidth: "280px", margin: "0 auto 1rem" }}>
          <input
            type="text"
            placeholder="Hai un codice sconto? (es. MD-XXXXXXXX)"
            value={discountCode}
            onChange={(e) => { setDiscountCode(e.target.value.toUpperCase()); setCodeError(""); }}
            style={{ width: "100%", background: "#13131a", border: codeError ? "1px solid #e24b4a" : "0.5px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "10px 14px", color: "#f0eee8", fontSize: "0.85rem", outline: "none", textAlign: "center", letterSpacing: "0.05em" }}
          />
          {codeError && <p style={{ color: "#e24b4a", fontSize: "0.78rem", marginTop: "0.4rem" }}>{codeError}</p>}
        </div>

        {/* PULSANTI */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginTop: "0.5rem" }}>
          <button
            onClick={handleStripe}
            disabled={loading}
            style={{ background: "#f5c842", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 32px", border: "none", borderRadius: "10px", cursor: "pointer", width: "280px" }}
          >
            {loading ? "Caricamento..." : "💳 Paga con Carta / Apple Pay / Google Pay"}
          </button>

          <button
            onClick={() => setShowCrypto(!showCrypto)}
            style={{ background: "transparent", color: "#f5c842", fontWeight: 700, fontSize: "1rem", padding: "14px 32px", border: "1px solid rgba(245,200,66,0.4)", borderRadius: "10px", cursor: "pointer", width: "280px" }}
          >
            ₿ Paga con Bitcoin
          </button>
        </div>

        {/* CRYPTO PANEL */}
        {showCrypto && (
          <div style={{ background: "#13131a", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "2rem", maxWidth: "400px", margin: "1.5rem auto 0" }}>
            <p style={{ color: "#8a8880", marginBottom: "1rem", fontSize: "0.9rem" }}>Invia esattamente <strong style={{ color: "#f5c842" }}>0.000079 BTC</strong> (~4,99€) a questo indirizzo:</p>
            <div style={{ background: "#0a0a0f", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "0.75rem 1rem", fontFamily: "monospace", fontSize: "0.75rem", wordBreak: "break-all", color: "#f5c842", marginBottom: "1rem" }}>
              {btcAddress}
            </div>
            <button
              onClick={() => { navigator.clipboard.writeText(btcAddress || ""); alert("Indirizzo copiato!"); }}
              style={{ background: "transparent", border: "0.5px solid rgba(255,255,255,0.15)", color: "#8a8880", padding: "8px 20px", borderRadius: "8px", cursor: "pointer", fontSize: "0.85rem" }}
            >
              📋 Copia indirizzo
            </button>
            <p style={{ color: "#8a8880", fontSize: "0.78rem", marginTop: "1rem", lineHeight: 1.6 }}>
              Dopo il pagamento inviaci la ricevuta a <strong style={{ color: "#f0eee8" }}>support@mysterydrop.it</strong> — attiveremo la tua box entro 24h.
            </p>
          </div>
        )}
      </section>

      {/* PREMI */}
      <section style={{ padding: "3rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a8880", marginBottom: "0.5rem" }}>I premi</p>
        <h2 style={{ fontWeight: 800, fontSize: "2rem", marginBottom: "2rem" }}>Cosa puoi vincere</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
          {[
            { icon: "📱", name: "iPhone 16", val: "999€" },
            { icon: "🎧", name: "AirPods Pro", val: "279€" },
            { icon: "⌚", name: "Apple Watch", val: "429€" },
            { icon: "💻", name: "MacBook Air", val: "1.299€" },
            { icon: "🖥", name: "iPad Pro", val: "1.199€" },
            { icon: "🎁", name: "Gift Card", val: "10-100€" },
          ].map((p) => (
            <div key={p.name} style={{ background: "#13131a", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "1.5rem 1rem", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{p.icon}</div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.3rem" }}>{p.name}</div>
              <div style={{ background: "rgba(245,200,66,0.12)", border: "0.5px solid rgba(245,200,66,0.25)", color: "#f5c842", fontSize: "0.78rem", padding: "3px 10px", borderRadius: "20px", display: "inline-block" }}>{p.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "2.5rem 2rem", borderTop: "0.5px solid rgba(255,255,255,0.08)", fontSize: "0.8rem", color: "#8a8880", marginTop: "3rem" }}>
        <p style={{ marginBottom: "0.5rem" }}>
          <a href="/probabilita" style={{ color: "#8a8880", textDecoration: "none", borderBottom: "0.5px solid rgba(255,255,255,0.15)" }}>Probabilità di vincita</a>
        </p>
        <p>© 2025 MysteryDrop</p>
        <p style={{ marginTop: "0.5rem" }}>Il servizio è riservato ai maggiorenni. Ogni box contiene un premio garantito.</p>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
      `}</style>
    </main>
  );
}