"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const locales = [
  { code: "it", label: "🇮🇹 IT" },
  { code: "en", label: "🇬🇧 EN" },
  { code: "fr", label: "🇫🇷 FR" },
  { code: "es", label: "🇪🇸 ES" },
  { code: "de", label: "🇩🇪 DE" },
  { code: "pt", label: "🇧🇷 PT" },
  { code: "ro", label: "🇷🇴 RO" },
  { code: "pl", label: "🇵🇱 PL" },
  { code: "sr", label: "🇷🇸 SR" },
  { code: "hr", label: "🇭🇷 HR" },
  { code: "uk", label: "🇺🇦 UK" },
  { code: "ar", label: "🇸🇦 AR" },
];

const liveWins = [
  { name: "Marco", city: "Roma", prize: "AirPods Pro", time: 2 },
  { name: "Sofia", city: "Milano", prize: "Box Scontata", time: 5 },
  { name: "Luca", city: "Napoli", prize: "iPhone 16", time: 8 },
  { name: "Emma", city: "Torino", prize: "Buono Amazon 20€", time: 12 },
  { name: "Giulia", city: "Firenze", prize: "Mystery Box Gratis", time: 15 },
  { name: "Andrea", city: "Bologna", prize: "AirPods Pro", time: 18 },
  { name: "Sara", city: "Palermo", prize: "Buono Amazon 50€", time: 22 },
  { name: "Matteo", city: "Venezia", prize: "Box Scontata", time: 25 },
];

const floatingItems = ["📱", "🎧", "⌚", "💻", "🖥", "🎁", "💰", "🛍️"];

const currencyByLocale: Record<string, { symbol: string; rate: number; code: string }> = {
  it: { symbol: "€", rate: 1, code: "EUR" },
  en: { symbol: "€", rate: 1, code: "EUR" },
  fr: { symbol: "€", rate: 1, code: "EUR" },
  de: { symbol: "€", rate: 1, code: "EUR" },
  es: { symbol: "€", rate: 1, code: "EUR" },
  pt: { symbol: "€", rate: 1, code: "EUR" },
  pl: { symbol: "zł", rate: 4.25, code: "PLN" },
  ro: { symbol: "lei", rate: 4.97, code: "RON" },
  hr: { symbol: "€", rate: 1, code: "EUR" },
  sr: { symbol: "din", rate: 117, code: "RSD" },
  uk: { symbol: "₴", rate: 44, code: "UAH" },
  ar: { symbol: "€", rate: 1, code: "EUR" },
};

function MagicBox() {
  const [items, setItems] = useState<{ id: number; icon: string; x: number; y: number; rot: number }[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(true);
      setTimeout(() => setIsOpen(false), 300);
      setItems((prev) => [
        ...prev.slice(-8),
        {
          id: Date.now(),
          icon: floatingItems[Math.floor(Math.random() * floatingItems.length)],
          x: Math.random() * 160 - 80,
          y: -(Math.random() * 80 + 40),
          rot: Math.random() * 60 - 30,
        },
      ]);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", width: "200px", height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {items.map((item) => (
        <div key={item.id} style={{ position: "absolute", fontSize: "1.8rem", left: "50%", top: "50%", transform: `translate(${item.x}px, ${item.y}px) rotate(${item.rot}deg)`, animation: "flyOut 1.2s ease-out forwards", pointerEvents: "none" }}>
          {item.icon}
        </div>
      ))}
      <div style={{ fontSize: "7rem", animation: isOpen ? "boxPop 0.3s ease-out" : "float 3s ease-in-out infinite", filter: "drop-shadow(0 0 20px rgba(245,200,66,0.4))", transition: "transform 0.1s" }}>
        {isOpen ? "📦" : "🎁"}
      </div>
      <style>{`
        @keyframes flyOut {
          0% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(0.5); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translate(60px, -100px) rotate(20deg) scale(1.2); }
        }
        @keyframes boxPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.15) rotate(-5deg); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

function LiveFeed({ t }: { t: ReturnType<typeof useTranslations> }) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [onlineCount, setOnlineCount] = useState(80);
  const [boxCount, setBoxCount] = useState(800);
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    setOnlineCount(Math.floor(Math.random() * 40) + 80);
    setBoxCount(Math.floor(Math.random() * 200) + 800);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % liveWins.length);
        setVisible(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 3599));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const win = liveWins[current];

  return (
    <div style={{ background: "#13131a", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
      <div style={{ background: "rgba(245,200,66,0.08)", borderBottom: "0.5px solid rgba(245,200,66,0.15)", padding: "8px 2rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
        <span style={{ color: "#f5c842", fontSize: "12px", fontWeight: 600 }}>{t("live.countdown")}</span>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[
            { val: String(hours).padStart(2, "0"), label: t("live.hours") },
            { val: String(minutes).padStart(2, "0"), label: t("live.minutes") },
            { val: String(seconds).padStart(2, "0"), label: t("live.seconds") },
          ].map((item) => (
            <div key={item.label} style={{ background: "#0a0a0f", border: "0.5px solid rgba(245,200,66,0.3)", borderRadius: "6px", padding: "4px 8px", textAlign: "center", minWidth: "44px" }}>
              <div style={{ color: "#f5c842", fontSize: "16px", fontWeight: 800, lineHeight: 1 }}>{item.val}</div>
              <div style={{ color: "#8a8880", fontSize: "9px", marginTop: "2px" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "10px 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#8a8880" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#63d96b", display: "inline-block", animation: "pulse 2s infinite" }}></span>
            <strong style={{ color: "#f0eee8" }}>{onlineCount}</strong> {t("live.online")}
          </div>
          <div style={{ fontSize: "12px", color: "#8a8880" }}>
            <strong style={{ color: "#f0eee8" }}>{boxCount}</strong> {t("live.boxesToday")}
          </div>
        </div>
        <div style={{ transition: "opacity 0.5s", opacity: visible ? 1 : 0, display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", background: "rgba(99,217,107,0.08)", border: "0.5px solid rgba(99,217,107,0.2)", borderRadius: "20px", padding: "4px 12px" }}>
          <span>🎉</span>
          <span style={{ color: "#f0eee8" }}><strong>{win.name}</strong> da {win.city}</span>
          <span style={{ color: "#8a8880" }}>{t("live.won")}</span>
          <span style={{ color: "#f5c842", fontWeight: 600 }}>{win.prize}</span>
          <span style={{ color: "#8a8880" }}>{win.time}{t("live.ago")}</span>
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }`}</style>
    </div>
  );
}

export default function Home() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "it";
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [showCrypto, setShowCrypto] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const btcAddress = process.env.NEXT_PUBLIC_BTC_ADDRESS;
  const currency = currencyByLocale[locale] || currencyByLocale.it;

  function formatPrice(eur: number): string {
    const converted = eur * currency.rate;
    return `${currency.symbol}${converted % 1 === 0 ? converted.toFixed(0) : converted.toFixed(2)}`;
  }

  function changeLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    window.location.href = segments.join("/");
  }

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
      setCodeError(t("checkout.codeError"));
      setLoading(false);
      return;
    }
    window.location.href = data.url;
  }

  async function handlePackage(pkg: string) {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ package: pkg }),
    });
    const data = await res.json();
    if (data.error) {
      setLoading(false);
      return;
    }
    window.location.href = data.url;
  }

  return (
    <main style={{ background: "#0a0a0f", minHeight: "100vh", color: "#f0eee8", fontFamily: "sans-serif" }}>

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.2rem 2rem", borderBottom: "0.5px solid rgba(255,255,255,0.08)", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ fontWeight: 800, fontSize: "1.3rem", color: "#f5c842" }}>Mystery<span style={{ color: "#f0eee8" }}>Drop</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ background: "#f5c842", color: "#000", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "20px" }}>{t("nav.prizes")}</div>
          <select onChange={(e) => changeLocale(e.target.value)} defaultValue={locale} style={{ background: "#13131a", border: "0.5px solid rgba(255,255,255,0.15)", color: "#f0eee8", padding: "6px 10px", borderRadius: "8px", fontSize: "0.85rem", cursor: "pointer", outline: "none" }}>
            {locales.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </div>
      </nav>

      {/* LIVE FEED */}
      <LiveFeed t={t} />

      {/* HERO */}
      <section style={{ textAlign: "center", padding: "5rem 2rem 3rem" }}>
        <div style={{ display: "inline-block", background: "rgba(245,200,66,0.12)", border: "0.5px solid rgba(245,200,66,0.35)", color: "#f5c842", fontSize: "12px", padding: "5px 14px", borderRadius: "20px", marginBottom: "1.5rem" }}>
          {t("hero.tag")}
        </div>
        <h1 style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", fontWeight: 800, lineHeight: 1.05, marginBottom: "1rem" }}>
          {t("hero.title1")}<br /><span style={{ color: "#f5c842" }}>{t("hero.title2")}</span>
        </h1>
        <p style={{ color: "#8a8880", maxWidth: "460px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          {t("hero.description")}
        </p>

        {/* BOX ANIMATA */}
        <div style={{ display: "flex", justifyContent: "center", margin: "2rem auto", position: "relative", height: "200px", width: "200px", cursor: "pointer" }} onClick={handleStripe}>
          <MagicBox />
        </div>

        {/* CODICE SCONTO */}
        <div style={{ maxWidth: "280px", margin: "0 auto 1rem" }}>
          <input
            type="text"
            placeholder={t("checkout.discountPlaceholder")}
            value={discountCode}
            onChange={(e) => { setDiscountCode(e.target.value.toUpperCase()); setCodeError(""); }}
            style={{ width: "100%", background: "#13131a", border: codeError ? "1px solid #e24b4a" : "0.5px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "10px 14px", color: "#f0eee8", fontSize: "0.85rem", outline: "none", textAlign: "center", letterSpacing: "0.05em" }}
          />
          {codeError && <p style={{ color: "#e24b4a", fontSize: "0.78rem", marginTop: "0.4rem" }}>{codeError}</p>}
        </div>

        {/* PULSANTI */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginTop: "0.5rem" }}>
          <button onClick={handleStripe} disabled={loading} style={{ background: "#f5c842", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 32px", border: "none", borderRadius: "10px", cursor: "pointer", width: "280px" }}>
            {loading ? t("checkout.loading") : t("checkout.payButton")}
          </button>
          <button onClick={() => setShowCrypto(!showCrypto)} style={{ background: "transparent", color: "#f5c842", fontWeight: 700, fontSize: "1rem", padding: "14px 32px", border: "1px solid rgba(245,200,66,0.4)", borderRadius: "10px", cursor: "pointer", width: "280px" }}>
            {t("checkout.bitcoinButton")}
          </button>
        </div>

        {/* TRUST BADGES */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap", marginTop: "1.25rem", opacity: 0.7 }}>
          {["VISA", "MC", "AMEX"].map((b) => (
            <div key={b} style={{ background: "#fff", color: "#000", fontSize: "9px", fontWeight: 800, padding: "4px 8px", borderRadius: "4px", letterSpacing: "0.05em" }}>{b}</div>
          ))}
          <div style={{ background: "#000", color: "#fff", fontSize: "9px", fontWeight: 800, padding: "4px 8px", borderRadius: "4px" }}>Apple Pay</div>
          <div style={{ background: "#4285f4", color: "#fff", fontSize: "9px", fontWeight: 800, padding: "4px 8px", borderRadius: "4px" }}>G Pay</div>
          <div style={{ background: "#f7931a", color: "#fff", fontSize: "9px", fontWeight: 800, padding: "4px 8px", borderRadius: "4px" }}>₿ BTC</div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#63d96b", fontSize: "11px" }}>🔒 SSL</div>
        </div>

        {/* CRYPTO PANEL */}
        {showCrypto && (
          <div style={{ background: "#13131a", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "2rem", maxWidth: "400px", margin: "1.5rem auto 0" }}>
            <p style={{ color: "#8a8880", marginBottom: "1rem", fontSize: "0.9rem" }}>{t("checkout.bitcoinAmount")} <strong style={{ color: "#f5c842" }}>0.000079 BTC</strong> (~{formatPrice(4.99)}) {t("checkout.bitcoinAddress")}</p>
            <div style={{ background: "#0a0a0f", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "0.75rem 1rem", fontFamily: "monospace", fontSize: "0.75rem", wordBreak: "break-all", color: "#f5c842", marginBottom: "1rem" }}>
              {btcAddress}
            </div>
            <button onClick={() => { navigator.clipboard.writeText(btcAddress || ""); alert("Copied!"); }} style={{ background: "transparent", border: "0.5px solid rgba(255,255,255,0.15)", color: "#8a8880", padding: "8px 20px", borderRadius: "8px", cursor: "pointer", fontSize: "0.85rem" }}>
              📋 Copy
            </button>
            <p style={{ color: "#8a8880", fontSize: "0.78rem", marginTop: "1rem", lineHeight: 1.6 }}>
              {t("checkout.bitcoinEmail")} <strong style={{ color: "#f0eee8" }}>support@mysterydrop.eu</strong> — {t("checkout.bitcoinActivation")}
            </p>
          </div>
        )}
      </section>

      {/* TRUST STRIP */}
      <div style={{ background: "#13131a", borderTop: "0.5px solid rgba(255,255,255,0.06)", borderBottom: "0.5px solid rgba(255,255,255,0.06)", padding: "1.25rem 2rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", flexWrap: "wrap", margin: "2rem 0" }}>
        {[
          { icon: "🔒", key: "ssl" },
          { icon: "✅", key: "guaranteed" },
          { icon: "🚀", key: "shipping" },
          { icon: "↩️", key: "refund" },
          { icon: "⭐", key: "rating" },
        ].map((item) => (
          <div key={item.key} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "#8a8880" }}>
            <span>{item.icon}</span>
            <span>{t(`trust.${item.key}`)}</span>
          </div>
        ))}
      </div>

      {/* PACCHETTI */}
      <section style={{ padding: "3rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a8880", marginBottom: "0.5rem" }}>{t("packages.label")}</p>
        <h2 style={{ fontWeight: 800, fontSize: "2rem", marginBottom: "0.5rem" }}>{t("packages.title")}</h2>
        <p style={{ color: "#8a8880", marginBottom: "2rem", fontSize: "0.95rem" }}>{t("packages.subtitle")}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
          {[
            { name: "Silver", icon: "🥈", boxes: 100, original: 499, price: 350, savings: 149, color: "#8a8880", stripe: "silver" },
            { name: "Gold", icon: "🥇", boxes: 200, original: 998, price: 600, savings: 398, color: "#f5c842", stripe: "gold", popular: true },
            { name: "Platinum", icon: "💎", boxes: 600, original: 2994, price: 1497, savings: 1497, color: "#7c5cfc", stripe: "platinum" },
          ].map((pkg) => (
            <div key={pkg.name} style={{ background: "#13131a", border: `0.5px solid ${pkg.popular ? pkg.color : "rgba(255,255,255,0.08)"}`, borderRadius: "16px", padding: "1.75rem", position: "relative" }}>
              {pkg.popular && (
                <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: pkg.color, color: "#000", fontSize: "11px", fontWeight: 700, padding: "4px 14px", borderRadius: "20px", whiteSpace: "nowrap" }}>
                  {t("packages.popular")}
                </div>
              )}
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{pkg.icon}</div>
              <h3 style={{ fontWeight: 800, fontSize: "1.3rem", marginBottom: "0.25rem", color: pkg.color }}>{pkg.name}</h3>
              <p style={{ color: "#8a8880", fontSize: "0.85rem", marginBottom: "1rem" }}>{pkg.boxes} {t("packages.boxes")}</p>
              <div style={{ marginBottom: "1rem" }}>
                <span style={{ textDecoration: "line-through", color: "#8a8880", fontSize: "0.9rem" }}>{formatPrice(pkg.original)}</span>
                <div style={{ fontWeight: 800, fontSize: "2rem", color: pkg.color, lineHeight: 1 }}>{formatPrice(pkg.price)}</div>
                <span style={{ background: "rgba(99,217,107,0.15)", color: "#63d96b", fontSize: "0.78rem", padding: "3px 10px", borderRadius: "20px", fontWeight: 600 }}>{t("packages.save")} {formatPrice(pkg.savings)}</span>
              </div>
              <div style={{ color: "#8a8880", fontSize: "0.82rem", marginBottom: "1.25rem", lineHeight: 1.7 }}>
                ✓ {pkg.boxes} {t("packages.feature1")}<br />
                ✓ {t("packages.feature2")}<br />
                ✓ {t("packages.feature3")}<br />
                ✓ {t("packages.feature4")}
              </div>
              <button onClick={() => handlePackage(pkg.stripe)} style={{ width: "100%", background: pkg.popular ? pkg.color : "transparent", color: pkg.popular ? "#000" : pkg.color, fontWeight: 700, fontSize: "0.95rem", padding: "12px", border: `1px solid ${pkg.color}`, borderRadius: "10px", cursor: "pointer" }}>
                {t("packages.buy")} {pkg.name} →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SORPRESE */}
      <section style={{ padding: "3rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#8a8880", marginBottom: "0.5rem" }}>{t("prizes.label")}</p>
        <h2 style={{ fontWeight: 800, fontSize: "2rem", marginBottom: "2rem" }}>{t("prizes.title")}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
          {[
            { icon: "📱", name: "iPhone 16", val: formatPrice(999) },
            { icon: "🎧", name: "AirPods Pro", val: formatPrice(279) },
            { icon: "⌚", name: "Apple Watch", val: formatPrice(429) },
            { icon: "💻", name: "MacBook Air", val: formatPrice(1299) },
            { icon: "🖥", name: "iPad Pro", val: formatPrice(1199) },
            { icon: "🎁", name: "Gift Card", val: `${formatPrice(10)}-${formatPrice(100)}` },
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
        <p style={{ marginBottom: "0.5rem", display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href={`/${locale}/probabilita`} style={{ color: "#8a8880", textDecoration: "none", borderBottom: "0.5px solid rgba(255,255,255,0.15)" }}>{t("footer.odds")}</a>
          <a href={`/${locale}/recensioni`} style={{ color: "#8a8880", textDecoration: "none", borderBottom: "0.5px solid rgba(255,255,255,0.15)" }}>{t("footer.reviews")}</a>
          <a href={`/${locale}/faq`} style={{ color: "#8a8880", textDecoration: "none", borderBottom: "0.5px solid rgba(255,255,255,0.15)" }}>FAQ</a>
        </p>
        <p>{t("footer.copyright")}</p>
        <p style={{ marginTop: "0.5rem" }}>{t("footer.legal")}</p>
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