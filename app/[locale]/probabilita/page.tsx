"use client";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Probabilita() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "it";
  const t = useTranslations();

  const prizes = [
    { icon: "🎟️", id: "credit", prob: "80%" },
    { icon: "🎁", id: "box", prob: "15%" },
    { icon: "🛍️", id: "amazon20", prob: "3%" },
    { icon: "💰", id: "amazon50", prob: "1,5%" },
    { icon: "🎧", id: "airpods", prob: "0,4%" },
    { icon: "📱", id: "iphone", prob: "0,1%" },
  ];

  const prizeNames: Record<string, { name: string; desc: string }> = {
    credit: { name: t("prizes.credit_name") || "Box Scontata!", desc: t("prizes.credit_desc") || "Credito per la prossima Mystery Box" },
    box: { name: t("prizes.box_name") || "Mystery Box Gratis", desc: t("prizes.box_desc") || "Una Mystery Box del valore di 4,99€ completamente gratuita" },
    amazon20: { name: t("prizes.amazon20_name") || "Buono Amazon 20€", desc: t("prizes.amazon20_desc") || "Buono acquisto Amazon del valore di 20€" },
    amazon50: { name: t("prizes.amazon50_name") || "Buono Amazon 50€", desc: t("prizes.amazon50_desc") || "Buono acquisto Amazon del valore di 50€" },
    airpods: { name: t("prizes.airpods_name") || "AirPods Apple", desc: t("prizes.airpods_desc") || "AirPods Apple originali" },
    iphone: { name: t("prizes.iphone_name") || "iPhone ultimo modello", desc: t("prizes.iphone_desc") || "iPhone ultimo modello disponibile" },
  };

  return (
    <main style={{ background: "#0a0a0f", minHeight: "100vh", color: "#f0eee8", fontFamily: "sans-serif" }}>

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.2rem 2rem", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
        <a href={`/${locale}`} style={{ fontWeight: 800, fontSize: "1.3rem", color: "#f5c842", textDecoration: "none" }}>Mystery<span style={{ color: "#f0eee8" }}>Drop</span></a>
        <a href={`/${locale}`} style={{ color: "#8a8880", fontSize: "0.9rem", textDecoration: "none" }}>← Home</a>
      </nav>

      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "3rem 2rem" }}>

        <div style={{ display: "inline-block", background: "rgba(245,200,66,0.12)", border: "0.5px solid rgba(245,200,66,0.35)", color: "#f5c842", fontSize: "12px", padding: "5px 14px", borderRadius: "20px", marginBottom: "1rem" }}>
          ✦ {t("footer.odds")}
        </div>

        <h1 style={{ fontWeight: 800, fontSize: "2rem", marginTop: "0.5rem", marginBottom: "0.5rem" }}>{t("footer.odds")}</h1>
        <p style={{ color: "#8a8880", marginBottom: "3rem", lineHeight: 1.7 }}>
          MysteryDrop — <strong style={{ color: "#f5c842" }}>{t("hero.guaranteed") || "vinci sempre qualcosa"}</strong>
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {prizes.map((p) => (
            <div key={p.id} style={{ background: "#13131a", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ fontSize: "2rem", minWidth: "2.5rem", textAlign: "center" }}>{p.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.2rem" }}>{prizeNames[p.id].name}</div>
                <div style={{ color: "#8a8880", fontSize: "0.85rem" }}>{prizeNames[p.id].desc}</div>
              </div>
              <div style={{ background: "rgba(245,200,66,0.12)", border: "0.5px solid rgba(245,200,66,0.25)", color: "#f5c842", fontSize: "1rem", fontWeight: 700, padding: "6px 16px", borderRadius: "20px", minWidth: "60px", textAlign: "center" }}>
                {p.prob}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "3rem", padding: "1.5rem", background: "#13131a", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "14px" }}>
          <p style={{ color: "#8a8880", fontSize: "0.85rem", lineHeight: 1.7 }}>
            {t("footer.legal")}
          </p>
        </div>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <a href={`/${locale}`} style={{ background: "#f5c842", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 32px", borderRadius: "10px", textDecoration: "none", display: "inline-block" }}>
            {t("reviews.ctaButton")}
          </a>
        </div>
      </div>
    </main>
  );
}