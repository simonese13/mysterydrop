"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type Prize = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

const slotSymbols = ["📱", "🎧", "⌚", "💻", "🖥", "🎁", "🎟️", "💰", "🛍️", "⭐"];

function SlotMachine({ onReveal, prize }: { onReveal: (prize: Prize) => void; prize: Prize | null }) {
  const [spinning, setSpinning] = useState(false);
  const [slots, setSlots] = useState(["❓", "❓", "❓"]);
  const [done, setDone] = useState(false);

  function spin() {
    if (!prize || spinning) return;
    setSpinning(true);
    setDone(false);
    let count = 0;
    const interval = setInterval(() => {
      setSlots([
        slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
        slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
        slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
      ]);
      count++;
      if (count > 20) {
        clearInterval(interval);
        setSlots([prize.icon, prize.icon, prize.icon]);
        setSpinning(false);
        setDone(true);
        setTimeout(() => onReveal(prize), 600);
      }
    }, 80);
  }

  useEffect(() => {
    if (prize) {
      setSlots(["❓", "❓", "❓"]);
      setDone(false);
    }
  }, [prize]);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
        {slots.map((s, i) => (
          <div key={i} style={{
            width: "90px", height: "100px",
            background: "#13131a",
            border: `2px solid ${done ? "#f5c842" : "rgba(255,255,255,0.1)"}`,
            borderRadius: "12px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "3rem",
            boxShadow: done ? "0 0 20px rgba(245,200,66,0.3)" : "none",
          }}>
            {s}
          </div>
        ))}
      </div>
      <button
        onClick={spin}
        disabled={spinning || !prize}
        style={{
          background: spinning ? "#333" : "#f5c842",
          color: "#000", fontWeight: 700, fontSize: "1.1rem",
          padding: "16px 48px", border: "none", borderRadius: "10px",
          cursor: spinning ? "not-allowed" : "pointer",
        }}
      >
        {spinning ? "🎰 Girando..." : "🎰 Apri box!"}
      </button>
    </div>
  );
}

function PacchettoContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [totalBoxes, setTotalBoxes] = useState(0);
  const [currentBox, setCurrentBox] = useState(0);
  const [currentPrize, setCurrentPrize] = useState<Prize | null>(null);
  const [prizes, setPrizes] = useState<Prize[]>([]);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    async function init() {
      const res = await fetch("/api/prize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, getPackageInfo: true }),
      });
      const data = await res.json();
      setTotalBoxes(data.boxes || 1);
      setCurrentPrize(data.prize);
      setLoading(false);
    }
    init();
  }, [sessionId]);

  async function fetchNextPrize() {
    setFetching(true);
    const res = await fetch("/api/prize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    });
    const data = await res.json();
    setCurrentPrize(data.prize);
    setFetching(false);
  }

  function handleReveal(prize: Prize) {
    const newPrizes = [...prizes, prize];
    setPrizes(newPrizes);
    const nextBox = currentBox + 1;
    setCurrentBox(nextBox);
    if (nextBox >= totalBoxes) {
      setFinished(true);
    } else {
      fetchNextPrize();
    }
  }

  const prizeCount: Record<string, { prize: Prize; count: number }> = {};
  prizes.forEach((p) => {
    if (prizeCount[p.id]) prizeCount[p.id].count++;
    else prizeCount[p.id] = { prize: p, count: 1 };
  });

  if (loading) return (
    <main style={{ background: "#0a0a0f", minHeight: "100vh", color: "#f0eee8", fontFamily: "sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#8a8880" }}>Caricamento pacchetto...</p>
    </main>
  );

  return (
    <main style={{ background: "#0a0a0f", minHeight: "100vh", color: "#f0eee8", fontFamily: "sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>

        {!finished ? (
          <>
            <h1 style={{ fontWeight: 800, fontSize: "1.8rem", marginBottom: "0.5rem" }}>
              Box {currentBox + 1} di {totalBoxes}
            </h1>

            {/* PROGRESS BAR */}
            <div style={{ background: "#13131a", borderRadius: "10px", height: "8px", marginBottom: "2rem", overflow: "hidden" }}>
              <div style={{ width: `${(currentBox / totalBoxes) * 100}%`, height: "100%", background: "#f5c842", borderRadius: "10px", transition: "width 0.3s" }} />
            </div>

            {fetching ? (
              <p style={{ color: "#8a8880", marginBottom: "2rem" }}>Preparando la prossima box...</p>
            ) : (
              <SlotMachine onReveal={handleReveal} prize={currentPrize} />
            )}

            {/* ULTIMI PREMI */}
            {prizes.length > 0 && (
              <div style={{ marginTop: "2rem" }}>
                <p style={{ color: "#8a8880", fontSize: "0.85rem", marginBottom: "0.75rem" }}>Ultimi premi:</p>
                <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                  {prizes.slice(-8).map((p, i) => (
                    <div key={i} style={{ background: "#13131a", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "6px 10px", fontSize: "0.8rem" }}>
                      {p.icon} {p.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{ animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
            <h1 style={{ fontWeight: 800, fontSize: "2rem", color: "#f5c842", marginBottom: "0.5rem" }}>Pacchetto completato!</h1>
            <p style={{ color: "#8a8880", marginBottom: "2rem" }}>Hai aperto {totalBoxes} box — ecco il riepilogo dei tuoi premi:</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
              {Object.values(prizeCount).map(({ prize, count }) => (
                <div key={prize.id} style={{ background: "#13131a", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ fontSize: "1.8rem" }}>{prize.icon}</span>
                    <span style={{ fontWeight: 600 }}>{prize.name}</span>
                  </div>
                  <div style={{ background: "rgba(245,200,66,0.12)", border: "0.5px solid rgba(245,200,66,0.25)", color: "#f5c842", fontSize: "1rem", fontWeight: 700, padding: "4px 14px", borderRadius: "20px" }}>
                    ×{count}
                  </div>
                </div>
              ))}
            </div>

            <p style={{ color: "#8a8880", fontSize: "0.85rem", marginBottom: "2rem" }}>
              Ti contatteremo via email per i premi fisici. I codici sconto sono già nella tua email!
            </p>

            <a href="/" style={{ background: "#f5c842", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 40px", borderRadius: "10px", textDecoration: "none", display: "inline-block" }}>
              Acquista un altro pacchetto →
            </a>
          </div>
        )}
      </div>

      <style>{`
        @keyframes popIn {
          from { transform: scale(0.7); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </main>
  );
}

export default function Pacchetto() {
  return (
    <Suspense fallback={<main style={{ background: "#0a0a0f", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><p style={{ color: "#8a8880" }}>Caricamento...</p></main>}>
      <PacchettoContent />
    </Suspense>
  );
}