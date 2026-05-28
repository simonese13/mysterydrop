"use client";
import { usePathname } from "next/navigation";

export default function Probabilita() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "it";

  const prizes = [
    { icon: "🎟️", name: "Box Scontata!", desc: "Credito per la prossima Mystery Box a soli 2€", prob: "80%" },
    { icon: "🎁", name: "Mystery Box Gratis", desc: "Una Mystery Box del valore di 4,99€ completamente gratuita", prob: "15%" },
    { icon: "🛍️", name: "Buono Amazon 20€", desc: "Buono acquisto Amazon del valore di 20€", prob: "3%" },
    { icon: "💰", name: "Buono Amazon 50€", desc: "Buono acquisto Amazon del valore di 50€", prob: "1,5%" },
    { icon: "🎧", name: "AirPods Apple", desc: "AirPods Apple originali", prob: "0,4%" },
    { icon: "📱", name: "iPhone ultimo modello", desc: "iPhone ultimo modello disponibile", prob: "0,1%" },
  ];

  return (
    <main style={{ background: "#0a0a0f", minHeight: "100vh", color: "#f0eee8", fontFamily: "sans-serif" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.2rem 2rem", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
        <a href={`/${locale}`} style={{ fontWeight: 800, fontSize: "1.3rem", color: "#f5c842", textDecoration: "none" }}>Mystery<span style={{ color: "#f0eee8" }}>Drop</span></a>
        <a href={`/${locale}`} style={{ color: "#8a8880", fontSize: "0.9rem", textDecoration: "none" }}>← Home</a>
      </nav>

      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "3rem 2rem" }}>
        <div style={{ display: "inline-block", background: "rgba(245,200,66,0.12)", border: "0.5px solid rgba(245,200,66,0.35)", color: "#f5c842", fontSize: "12px", padding: "5px 14px", borderRadius: "20px", marginBottom: "1rem" }}>
          ✦ Probabilità di scoperta
        </div>
        <h1 style={{ fontWeight: 800, fontSize: "2rem", marginTop: "0.5rem", marginBottom: "0.5rem" }}>Probabilità di scoperta</h1>
        <p style={{ color: "#8a8880", marginBottom: "3rem", lineHeight: 1.7 }}>
          MysteryDrop — <strong style={{ color: "#f5c842" }}>trovi sempre qualcosa di garantito</strong>
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {prizes.map((p) => (
            <div key={p.name} style={{ background: "#13131a", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ fontSize: "2rem", minWidth: "2.5rem", textAlign: "center" }}>{p.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.2rem" }}>{p.name}</div>
                <div style={{ color: "#8a8880", fontSize: "0.85rem" }}>{p.desc}</div>
              </div>
              <div style={{ background: "rgba(245,200,66,0.12)", border: "0.5px solid rgba(245,200,66,0.25)", color: "#f5c842", fontSize: "1rem", fontWeight: 700, padding: "6px 16px", borderRadius: "20px", minWidth: "60px", textAlign: "center" }}>
                {p.prob}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "3rem", padding: "1.5rem", background: "#13131a", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "14px" }}>
          <p style={{ color: "#8a8880", fontSize: "0.85rem", lineHeight: 1.7 }}>
            Il servizio è riservato ai maggiorenni. Ogni box contiene una sorpresa garantita.
          </p>
        </div>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <a href={`/${locale}`} style={{ background: "#f5c842", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 32px", borderRadius: "10px", textDecoration: "none", display: "inline-block" }}>
            🎁 Apri la tua box ora →
          </a>
        </div>
      </div>
    </main>
  );
}