export default function Probabilita() {
  return (
    <main style={{ background: "#0a0a0f", minHeight: "100vh", color: "#f0eee8", fontFamily: "sans-serif", padding: "3rem 2rem", maxWidth: "700px", margin: "0 auto" }}>
      
      <a href="/" style={{ color: "#8a8880", textDecoration: "none", fontSize: "0.9rem" }}>← Torna alla home</a>

      <h1 style={{ fontWeight: 800, fontSize: "2rem", marginTop: "2rem", marginBottom: "0.5rem" }}>Probabilità di vincita</h1>
      <p style={{ color: "#8a8880", marginBottom: "3rem", lineHeight: 1.7 }}>
        Da MysteryDrop <strong style={{ color: "#f5c842" }}>vinci sempre qualcosa</strong> — ogni box contiene un premio garantito. 
        Di seguito le probabilità esatte per ogni premio.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {[
          { icon: "🎟️", name: "Credito 2,99€", prob: "80%", desc: "Credito utilizzabile per acquistare un'altra Mystery Box" },
          { icon: "🎁", name: "Mystery Box Gratis", prob: "15%", desc: "Una Mystery Box del valore di 4,99€ completamente gratuita" },
          { icon: "🛍️", name: "Buono Amazon 20€", prob: "3%", desc: "Buono acquisto Amazon del valore di 20€" },
          { icon: "💰", name: "Buono Amazon 50€", prob: "1,5%", desc: "Buono acquisto Amazon del valore di 50€" },
          { icon: "🎧", name: "AirPods Apple", prob: "0,4%", desc: "AirPods Apple originali" },
          { icon: "📱", name: "iPhone ultimo modello", prob: "0,1%", desc: "iPhone ultimo modello disponibile" },
        ].map((p) => (
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
          Le probabilità sono indipendenti per ogni box acquistata. Il sistema di estrazione è automatico e casuale. 
          MysteryDrop garantisce un premio per ogni box acquistata. Servizio riservato ai maggiorenni.
        </p>
      </div>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <a href="/" style={{ background: "#f5c842", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 32px", borderRadius: "10px", textDecoration: "none", display: "inline-block" }}>
          Apri la tua box →
        </a>
      </div>
    </main>
  );
}
