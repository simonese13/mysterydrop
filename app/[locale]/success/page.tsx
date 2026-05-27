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

function SlotMachine({ onReveal, prize }: { onReveal: () => void; prize: Prize | null }) {
  const [spinning, setSpinning] = useState(false);
  const [slots, setSlots] = useState(["❓", "❓", "❓"]);
  const [done, setDone] = useState(false);

  function spin() {
    if (!prize) return;
    setSpinning(true);
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
        setTimeout(onReveal, 800);
      }
    }, 80);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ fontWeight: 800, fontSize: "2rem", marginBottom: "0.5rem" }}>Pagamento ricevuto!</h1>
      <p style={{ color: "#8a8880", marginBottom: "0.5rem" }}>Gira la slot per scoprire il tuo premio!</p>
      <p style={{ color: "#f5c842", fontSize: "0.85rem", marginBottom: "2rem" }}>✦ Vinci sempre qualcosa, non ti lasciamo senza premio</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
        {slots.map((s, i) => (
          <div key={i} style={{
            width: "90px", height: "100px",
            background: "#13131a",
            border: `2px solid ${done ? "#f5c842" : "rgba(255,255,255,0.1)"}`,
            borderRadius: "12px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "3rem",
            transition: "border-color 0.3s",
            boxShadow: done ? "0 0 20px rgba(245,200,66,0.3)" : "none",
            animation: spinning ? `slotSpin 0.1s infinite` : "none"
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
          color: "#000",
          fontWeight: 700,
          fontSize: "1.1rem",
          padding: "16px 48px",
          border: "none",
          borderRadius: "10px",
          cursor: spinning ? "not-allowed" : "pointer",
          transition: "all 0.2s"
        }}
      >
        {spinning ? "🎰 Girando..." : "🎰 Gira la slot!"}
      </button>

      <style>{`
        @keyframes slotSpin {
          0% { transform: translateY(-2px); }
          100% { transform: translateY(2px); }
        }
      `}</style>
    </div>
  );
}

function SuccessContent() {
  const [prize, setPrize] = useState<Prize | null>(null);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    fetch("/api/prize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then((r) => r.json())
      .then((data) => {
        setPrize(data.prize);
        setDiscountCode(data.discountCode);
        setLoading(false);
      });
  }, [sessionId]);

  function copyCode() {
    if (discountCode) {
      navigator.clipboard.writeText(discountCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <main style={{ background: "#0a0a0f", minHeight: "100vh", color: "#f0eee8", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      {loading ? (
        <p style={{ color: "#8a8880" }}>Preparando il tuo premio...</p>
      ) : !revealed ? (
        <SlotMachine onReveal={() => setRevealed(true)} prize={prize} />
      ) : (
        <div style={{ textAlign: "center", animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>
          <div style={{ fontSize: "6rem", marginBottom: "1rem" }}>{prize?.icon}</div>
          <h1 style={{ fontWeight: 800, fontSize: "2.5rem", color: "#f5c842", marginBottom: "0.5rem" }}>Hai vinto!</h1>
          <h2 style={{ fontWeight: 700, fontSize: "1.5rem", marginBottom: "0.75rem" }}>{prize?.name}</h2>
          <p style={{ color: "#8a8880", marginBottom: "1.5rem", maxWidth: "340px", lineHeight: 1.6 }}>{prize?.description}</p>

          {discountCode && (
            <div style={{ background: "#13131a", border: "1px solid rgba(245,200,66,0.3)", borderRadius: "12px", padding: "1.25rem", marginBottom: "1.5rem", maxWidth: "340px" }}>
              <p style={{ color: "#8a8880", fontSize: "0.8rem", marginBottom: "0.75rem" }}>Il tuo codice sconto:</p>
              <div style={{ fontFamily: "monospace", fontSize: "1.4rem", fontWeight: 700, color: "#f5c842", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
                {discountCode}
              </div>
              <button
                onClick={copyCode}
                style={{ background: copied ? "rgba(245,200,66,0.2)" : "transparent", border: "0.5px solid rgba(245,200,66,0.3)", color: "#f5c842", padding: "8px 20px", borderRadius: "8px", cursor: "pointer", fontSize: "0.85rem" }}
              >
                {copied ? "✓ Copiato!" : "📋 Copia codice"}
              </button>
              <p style={{ color: "#8a8880", fontSize: "0.75rem", marginTop: "0.75rem" }}>Valido per 90 giorni — inseriscilo al prossimo checkout</p>
            </div>
          )}

          {!discountCode && (
            <p style={{ color: "#8a8880", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
              Ti contatteremo via email per la consegna del premio.
            </p>
          )}

          <a href="/" style={{ background: "transparent", color: "#f5c842", fontWeight: 700, fontSize: "1rem", padding: "14px 32px", border: "1px solid rgba(245,200,66,0.4)", borderRadius: "10px", textDecoration: "none" }}>
            ← Apri un'altra box
          </a>
        </div>
      )}
      <style>{`
        @keyframes popIn {
          from { transform: scale(0.7); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </main>
  );
}

export default function Success() {
  return (
    <Suspense fallback={<main style={{ background: "#0a0a0f", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><p style={{ color: "#8a8880" }}>Caricamento...</p></main>}>
      <SuccessContent />
    </Suspense>
  );
}