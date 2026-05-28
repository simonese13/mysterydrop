"use client";
import { usePathname } from "next/navigation";

const translations: Record<string, {
  title: string; subtitle: string; legal: string; cta: string;
  prizes: { name: string; desc: string }[];
}> = {
  it: { title: "Probabilità di scoperta", subtitle: "trovi sempre qualcosa di garantito", legal: "Il servizio è riservato ai maggiorenni. Ogni box contiene una sorpresa garantita.", cta: "🎁 Apri la tua box ora →", prizes: [
    { name: "Box Scontata!", desc: "Credito per la prossima Mystery Box a soli 2€" },
    { name: "Mystery Box Gratis", desc: "Una Mystery Box del valore di 4,99€ completamente gratuita" },
    { name: "Buono Amazon 20€", desc: "Buono acquisto Amazon del valore di 20€" },
    { name: "Buono Amazon 50€", desc: "Buono acquisto Amazon del valore di 50€" },
    { name: "AirPods Apple", desc: "AirPods Apple originali" },
    { name: "iPhone ultimo modello", desc: "iPhone ultimo modello disponibile" },
  ]},
  en: { title: "Discovery odds", subtitle: "you always find something guaranteed", legal: "Service reserved for adults. Every box contains a guaranteed surprise.", cta: "🎁 Open your box now →", prizes: [
    { name: "Discounted Box!", desc: "Credit for the next Mystery Box at only €2" },
    { name: "Free Mystery Box", desc: "A Mystery Box worth €4.99 completely free" },
    { name: "Amazon Voucher €20", desc: "Amazon gift card worth €20" },
    { name: "Amazon Voucher €50", desc: "Amazon gift card worth €50" },
    { name: "Apple AirPods", desc: "Original Apple AirPods" },
    { name: "Latest iPhone", desc: "Latest iPhone model available" },
  ]},
  fr: { title: "Probabilités de découverte", subtitle: "tu trouves toujours quelque chose de garanti", legal: "Service réservé aux majeurs. Chaque box contient une surprise garantie.", cta: "🎁 Ouvre ta box maintenant →", prizes: [
    { name: "Box Réduite!", desc: "Crédit pour la prochaine Mystery Box à seulement 2€" },
    { name: "Mystery Box Gratuite", desc: "Une Mystery Box d'une valeur de 4,99€ complètement gratuite" },
    { name: "Bon Amazon 20€", desc: "Bon d'achat Amazon d'une valeur de 20€" },
    { name: "Bon Amazon 50€", desc: "Bon d'achat Amazon d'une valeur de 50€" },
    { name: "AirPods Apple", desc: "AirPods Apple originaux" },
    { name: "iPhone dernier modèle", desc: "Dernier modèle iPhone disponible" },
  ]},
  es: { title: "Probabilidades de descubrimiento", subtitle: "siempre encuentras algo garantizado", legal: "Servicio reservado para mayores de edad. Cada caja contiene una sorpresa garantizada.", cta: "🎁 Abre tu caja ahora →", prizes: [
    { name: "¡Caja Rebajada!", desc: "Crédito para la próxima Mystery Box a solo 2€" },
    { name: "Mystery Box Gratis", desc: "Una Mystery Box valorada en 4,99€ completamente gratis" },
    { name: "Bono Amazon 20€", desc: "Tarjeta regalo Amazon de 20€" },
    { name: "Bono Amazon 50€", desc: "Tarjeta regalo Amazon de 50€" },
    { name: "AirPods Apple", desc: "AirPods Apple originales" },
    { name: "iPhone último modelo", desc: "Último modelo de iPhone disponible" },
  ]},
  de: { title: "Entdeckungswahrscheinlichkeiten", subtitle: "du findest immer etwas garantiert", legal: "Service nur für Volljährige. Jede Box enthält eine garantierte Überraschung.", cta: "🎁 Öffne deine Box jetzt →", prizes: [
    { name: "Vergünstigte Box!", desc: "Guthaben für die nächste Mystery Box für nur 2€" },
    { name: "Kostenlose Mystery Box", desc: "Eine Mystery Box im Wert von 4,99€ völlig kostenlos" },
    { name: "Amazon Gutschein 20€", desc: "Amazon Geschenkkarte im Wert von 20€" },
    { name: "Amazon Gutschein 50€", desc: "Amazon Geschenkkarte im Wert von 50€" },
    { name: "Apple AirPods", desc: "Originale Apple AirPods" },
    { name: "Neuestes iPhone", desc: "Neuestes verfügbares iPhone Modell" },
  ]},
  pl: { title: "Szanse na odkrycie", subtitle: "zawsze coś znajdziesz gwarantowane", legal: "Usługa przeznaczona dla pełnoletnich. Każde pudełko zawiera gwarantowaną niespodziankę.", cta: "🎁 Otwórz swoje pudełko teraz →", prizes: [
    { name: "Pudełko w promocji!", desc: "Kredyt na następne Mystery Box za tylko 2€" },
    { name: "Darmowe Mystery Box", desc: "Mystery Box o wartości 4,99€ całkowicie za darmo" },
    { name: "Bon Amazon 20€", desc: "Karta podarunkowa Amazon o wartości 20€" },
    { name: "Bon Amazon 50€", desc: "Karta podarunkowa Amazon o wartości 50€" },
    { name: "Apple AirPods", desc: "Oryginalne Apple AirPods" },
    { name: "Najnowszy iPhone", desc: "Najnowszy dostępny model iPhone" },
  ]},
  ro: { title: "Șanse de descoperire", subtitle: "găsești întotdeauna ceva garantat", legal: "Serviciu rezervat persoanelor majore. Fiecare cutie conține o surpriză garantată.", cta: "🎁 Deschide cutia ta acum →", prizes: [
    { name: "Cutie Redusă!", desc: "Credit pentru următoarea Mystery Box la doar 2€" },
    { name: "Mystery Box Gratuită", desc: "O Mystery Box în valoare de 4,99€ complet gratuită" },
    { name: "Voucher Amazon 20€", desc: "Card cadou Amazon în valoare de 20€" },
    { name: "Voucher Amazon 50€", desc: "Card cadou Amazon în valoare de 50€" },
    { name: "Apple AirPods", desc: "Apple AirPods originale" },
    { name: "Cel mai nou iPhone", desc: "Cel mai nou model iPhone disponibil" },
  ]},
  pt: { title: "Probabilidades de descoberta", subtitle: "você sempre encontra algo garantido", legal: "Serviço reservado para maiores de idade. Cada caixa contém uma surpresa garantida.", cta: "🎁 Abra sua caixa agora →", prizes: [
    { name: "Caixa com Desconto!", desc: "Crédito para a próxima Mystery Box por apenas 2€" },
    { name: "Mystery Box Grátis", desc: "Uma Mystery Box no valor de 4,99€ completamente grátis" },
    { name: "Vale Amazon 20€", desc: "Cartão presente Amazon no valor de 20€" },
    { name: "Vale Amazon 50€", desc: "Cartão presente Amazon no valor de 50€" },
    { name: "Apple AirPods", desc: "Apple AirPods originais" },
    { name: "iPhone mais recente", desc: "Modelo mais recente de iPhone disponível" },
  ]},
  sr: { title: "Šanse za otkriće", subtitle: "uvek nešto nađete zagarantovano", legal: "Usluga je rezervisana za punoletne. Svaka kutija sadrži zagarantovano iznenađenje.", cta: "🎁 Otvori svoju kutiju sada →", prizes: [
    { name: "Kutija po sniženoj ceni!", desc: "Kredit za sledeću Mystery Box za samo 2€" },
    { name: "Besplatna Mystery Box", desc: "Mystery Box vrednosti 4,99€ potpuno besplatno" },
    { name: "Amazon vaučer 20€", desc: "Amazon poklon kartica vrednosti 20€" },
    { name: "Amazon vaučer 50€", desc: "Amazon poklon kartica vrednosti 50€" },
    { name: "Apple AirPods", desc: "Originalni Apple AirPods" },
    { name: "Najnoviji iPhone", desc: "Najnoviji dostupni model iPhone-a" },
  ]},
  hr: { title: "Šanse za otkriće", subtitle: "uvijek nešto nađete zajamčeno", legal: "Usluga je rezervirana za punoljetne. Svaka kutija sadrži zajamčeno iznenađenje.", cta: "🎁 Otvori svoju kutiju sada →", prizes: [
    { name: "Kutija po sniženoj cijeni!", desc: "Kredit za sljedeću Mystery Box za samo 2€" },
    { name: "Besplatna Mystery Box", desc: "Mystery Box vrijednosti 4,99€ potpuno besplatno" },
    { name: "Amazon vaučer 20€", desc: "Amazon poklon kartica vrijednosti 20€" },
    { name: "Amazon vaučer 50€", desc: "Amazon poklon kartica vrijednosti 50€" },
    { name: "Apple AirPods", desc: "Originalni Apple AirPods" },
    { name: "Najnoviji iPhone", desc: "Najnoviji dostupni model iPhonea" },
  ]},
  uk: { title: "Шанси на відкриття", subtitle: "ви завжди щось знайдете гарантовано", legal: "Послуга призначена для повнолітніх. Кожна коробка містить гарантований сюрприз.", cta: "🎁 Відкрий свою коробку зараз →", prizes: [
    { name: "Коробка зі знижкою!", desc: "Кредит на наступну Mystery Box лише за 2€" },
    { name: "Безкоштовна Mystery Box", desc: "Mystery Box вартістю 4,99€ абсолютно безкоштовно" },
    { name: "Ваучер Amazon 20€", desc: "Подарункова карта Amazon вартістю 20€" },
    { name: "Ваучер Amazon 50€", desc: "Подарункова карта Amazon вартістю 50€" },
    { name: "Apple AirPods", desc: "Оригінальні Apple AirPods" },
    { name: "Останній iPhone", desc: "Остання доступна модель iPhone" },
  ]},
  ar: { title: "احتمالات الاكتشاف", subtitle: "تجد دائماً شيئاً مضموناً", legal: "الخدمة مخصصة للبالغين. كل صندوق يحتوي على مفاجأة مضمونة.", cta: "🎁 افتح صندوقك الآن →", prizes: [
    { name: "صندوق بسعر مخفض!", desc: "رصيد للصندوق التالي بـ 2€ فقط" },
    { name: "Mystery Box مجانية", desc: "Mystery Box بقيمة 4,99€ مجاناً" },
    { name: "قسيمة Amazon 20€", desc: "بطاقة هدية Amazon بقيمة 20€" },
    { name: "قسيمة Amazon 50€", desc: "بطاقة هدية Amazon بقيمة 50€" },
    { name: "Apple AirPods", desc: "Apple AirPods أصلية" },
    { name: "أحدث iPhone", desc: "أحدث موديل iPhone متاح" },
  ]},
};

const icons = ["🎟️", "🎁", "🛍️", "💰", "🎧", "📱"];
const probs = ["80%", "15%", "3%", "1,5%", "0,4%", "0,1%"];

export default function Probabilita() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "it";
  const tr = translations[locale] || translations.it;

  return (
    <main style={{ background: "#0a0a0f", minHeight: "100vh", color: "#f0eee8", fontFamily: "sans-serif" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.2rem 2rem", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
        <a href={`/${locale}`} style={{ fontWeight: 800, fontSize: "1.3rem", color: "#f5c842", textDecoration: "none" }}>Mystery<span style={{ color: "#f0eee8" }}>Drop</span></a>
        <a href={`/${locale}`} style={{ color: "#8a8880", fontSize: "0.9rem", textDecoration: "none" }}>← Home</a>
      </nav>

      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "3rem 2rem" }}>
        <div style={{ display: "inline-block", background: "rgba(245,200,66,0.12)", border: "0.5px solid rgba(245,200,66,0.35)", color: "#f5c842", fontSize: "12px", padding: "5px 14px", borderRadius: "20px", marginBottom: "1rem" }}>
          ✦ {tr.title}
        </div>
        <h1 style={{ fontWeight: 800, fontSize: "2rem", marginTop: "0.5rem", marginBottom: "0.5rem" }}>{tr.title}</h1>
        <p style={{ color: "#8a8880", marginBottom: "3rem", lineHeight: 1.7 }}>
          MysteryDrop — <strong style={{ color: "#f5c842" }}>{tr.subtitle}</strong>
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {tr.prizes.map((p, i) => (
            <div key={i} style={{ background: "#13131a", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "14px", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ fontSize: "2rem", minWidth: "2.5rem", textAlign: "center" }}>{icons[i]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.2rem" }}>{p.name}</div>
                <div style={{ color: "#8a8880", fontSize: "0.85rem" }}>{p.desc}</div>
              </div>
              <div style={{ background: "rgba(245,200,66,0.12)", border: "0.5px solid rgba(245,200,66,0.25)", color: "#f5c842", fontSize: "1rem", fontWeight: 700, padding: "6px 16px", borderRadius: "20px", minWidth: "60px", textAlign: "center" }}>
                {probs[i]}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "3rem", padding: "1.5rem", background: "#13131a", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "14px" }}>
          <p style={{ color: "#8a8880", fontSize: "0.85rem", lineHeight: 1.7 }}>{tr.legal}</p>
        </div>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <a href={`/${locale}`} style={{ background: "#f5c842", color: "#000", fontWeight: 700, fontSize: "1rem", padding: "14px 32px", borderRadius: "10px", textDecoration: "none", display: "inline-block" }}>
            {tr.cta}
          </a>
        </div>
      </div>
    </main>
  );
}