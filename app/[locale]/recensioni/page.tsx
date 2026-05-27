"use client";
import { usePathname } from "next/navigation";

const reviews = [
  { name: "Marco R.", city: "Roma", rating: 5, prize: "AirPods Pro", text: "Non ci credevo ma ho davvero vinto! Gli AirPods sono arrivati in 2 giorni. Servizio fantastico.", date: "2 giorni fa", avatar: "M" },
  { name: "Sofia B.", city: "Milano", rating: 5, prize: "Mystery Box Gratis", text: "Ho aperto 3 box e vinto sempre qualcosa. Il codice sconto è arrivato subito per email. Super consigliato!", date: "4 giorni fa", avatar: "S" },
  { name: "Luca T.", city: "Napoli", rating: 5, prize: "iPhone 16", text: "ASSURDO! Ho vinto un iPhone 16 alla seconda box. Pensavo fosse una truffa invece è tutto vero. Grazie MysteryDrop!", date: "1 settimana fa", avatar: "L" },
  { name: "Emma C.", city: "Torino", rating: 4, prize: "Buono Amazon 20€", text: "Esperienza divertente e trasparente. Ho vinto un buono Amazon da 20€. La slot machine è troppo bella!", date: "1 settimana fa", avatar: "E" },
  { name: "Giulia M.", city: "Firenze", rating: 5, prize: "Apple Watch", text: "Ho regalato una box a mio marito per il compleanno e ha vinto un Apple Watch! Miglior regalo ever.", date: "2 settimane fa", avatar: "G" },
  { name: "Andrea P.", city: "Bologna", rating: 5, prize: "AirPods Pro", text: "Il sito è sicuro, il pagamento veloce e il premio arriva davvero. Ho già aperto 5 box!", date: "2 settimane fa", avatar: "A" },
  { name: "Sara V.", city: "Palermo", rating: 4, prize: "Buono Amazon 50€", text: "Ottima esperienza! Ho vinto un buono Amazon da 50€. Il codice è arrivato subito via email.", date: "3 settimane fa", avatar: "S" },
  { name: "Matteo F.", city: "Venezia", rating: 5, prize: "MacBook Air", text: "Non mi aspettavo di vincere un MacBook Air! È arrivato perfettamente imballato. Incredibile!", date: "1 mese fa", avatar: "M" },
  { name: "Chiara N.", city: "Genova", rating: 5, prize: "Mystery Box Gratis", text: "Ho usato il codice sconto e ho aperto un'altra box gratis. Il sistema è fantastico!", date: "1 mese fa", avatar: "C" },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= rating ? "#f5c842" : "#333", fontSize: "16px" }}>★</span>
      ))}
    </div>
  );
}

export default function Recensioni() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "it";

  const totalReviews = reviews.length;
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1);

  return (
    <main style={{ background: "#0a0a0f", minHeight: "100vh", color: "#f0eee8", fontFamily: "sans-serif" }}>

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.2rem 2rem", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
        <a href={`/${locale}`} style={{ fontWeight: 800, fontSize: "1.3rem", color: "#f5c842", textDecoration: "none" }}>Mystery<span style={{ color: "#f0eee8" }}>Drop</span></a>
        <a href={`/${locale}`} style={{ color: "#8a8880", fontSize: "0.9rem", textDecoration: "none" }}>← Torna alla home</a>
      </nav>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 2rem" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "inline-block", background: "rgba(245,200,66,0.12)", border: "0.5px solid rgba(245,200,66,0.35)", color: "#f5c842", fontSize: "12px", padding: "5px 14px", borderRadius: "20px", marginBottom: "1rem" }}>
            ✦ Recensioni verificate
          </div>
          <h1 style={{ fontWeight: 800, fontSize: "2.5rem", marginBottom: "1rem" }}>Cosa dicono i nostri clienti</h1>

          {/* RATING SUMMARY */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 800, fontSize: "4rem", color: "#f5c842", lineHeight: 1 }}>{avgRating}</div>
              <Stars rating={5} />
              <div style={{ color: "#8a8880", fontSize: "0.85rem", marginTop: "4px" }}>{totalReviews} recensioni</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {[5, 4, 3, 2, 1].map((s) => {
                const count = reviews.filter((r) => r.rating === s).length;
                const pct = Math.round((count / totalReviews) * 100);
                return (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#8a8880", fontSize: "12px", width: "8px" }}>{s}</span>
                    <span style={{ color: "#f5c842", fontSize: "12px" }}>★</span>
                    <div style={{ width: "120px", height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: "#f5c842", borderRadius: "4px" }} />
                    </div>
                    <span style={{ color: "#8a8880", fontSize: "12px", width: "30px" }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* REVIEWS GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          {reviews.map((r, i) => (
            <div key={i} style={{ background: "#13131a", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", transition: "border-color 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #7c5cfc, #f5c842)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "16px", color: "#000" }}>
                    {r.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{r.name}</div>
                    <div style={{ color: "#8a8880", fontSize: "0.78rem" }}>{r.city}</div>
                  </div>
                </div>
                <div style={{ color: "#8a8880", fontSize: "0.75rem" }}>{r.date}</div>
              </div>
              <Stars rating={r.rating} />
              <p style={{ color: "#c0bdb8", fontSize: "0.88rem", lineHeight: 1.6, margin: 0 }}>"{r.text}"</p>
              <div style={{ display: "inline-block", background: "rgba(245,200,66,0.1)", border: "0.5px solid rgba(245,200,66,0.2)", color: "#f5c842", fontSize: "0.75rem", padding: "3px 10px", borderRadius: "20px", alignSelf: "flex-start" }}>
                🏆 Ha vinto: {r.prize}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <p style={{ color: "#8a8880", marginBottom: "1.5rem" }}>Unisciti a migliaia di vincitori soddisfatti!</p>
          <a href={`/${locale}`} style={{ background: "#f5c842", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 40px", borderRadius: "10px", textDecoration: "none", display: "inline-block" }}>
            🎁 Apri la tua box ora →
          </a>
        </div>
      </div>
    </main>
  );
}