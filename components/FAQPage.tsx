"use client";

import { useState } from "react";
import { useLocale } from "next-intl";

const translations: Record<string, { title: string; subtitle: string; ctaTitle: string; ctaSub: string; faqs: { q: string; a: string }[] }> = {
  pl: {
    title: "Często zadawane pytania",
    subtitle: "Wszystko, co chcesz wiedzieć o MysteryDrop",
    ctaTitle: "Masz inne pytanie?",
    ctaSub: "Napisz do nas, odpowiadamy w ciągu 24 godzin.",
    faqs: [
      { q: "Czym jest MysteryDrop?", a: "MysteryDrop to platforma mystery box, na której otwierasz wirtualne paczki i odkrywasz niespodzianki — od zniżkowych boxów Apple po AirPods i iPhone'y. Każde otwarcie to nowe emocje!" },
      { q: "Jak działa otwarcie mystery box?", a: "Po dokonaniu płatności zostaniesz przekierowany na stronę odkrycia. Animacja slotu maszynowego ujawni Twoją niespodziankę. Wszystkie wyniki są losowe i weryfikowane przez nasz bezpieczny system." },
      { q: "Co mogę odkryć w mystery box?", a: "Możesz odkryć: zniżkowy box Apple (80%), darmowy box (15%), voucher Amazon 20€ (3%), voucher Amazon 50€ (1,5%), AirPods (0,4%) lub iPhone (0,1%)." },
      { q: "Jak otrzymam swoją niespodziankę?", a: "Bezpośrednio po otwarciu otrzymasz e-mail z kodem rabatowym lub instrukcją odbioru nagrody. Kody są ważne przez 30 dni od otrzymania." },
      { q: "Jakie metody płatności są akceptowane?", a: "Akceptujemy karty kredytowe i debetowe, Apple Pay, Google Pay oraz Bitcoin (BTC). Płatności obsługiwane przez Stripe — 100% bezpieczne i szyfrowane." },
      { q: "Czy mogę otworzyć więcej niż jeden box?", a: "Oczywiście! Silver (100 boxów / 350 zł), Gold (200 boxów / 600 zł), Platinum (600 boxów / 1497 zł)." },
      { q: "Czy wyniki są uczciwe i weryfikowalne?", a: "Tak. Każde odkrycie jest generowane przez certyfikowany losowy algorytm. Każda sesja płatności może ujawnić nagrodę tylko raz." },
      { q: "Ile czasu zajmuje realizacja zamówienia?", a: "Płatności kartą i Apple/Google Pay są natychmiastowe. Bitcoin może wymagać od 10 do 60 minut na potwierdzenie." },
      { q: "Co się dzieje, jeśli mój kod rabatowy wygaśnie?", a: "Skontaktuj się z nami przez e-mail podany w stopce strony. Nasz zespół wyśle nowy kod." },
      { q: "Czy MysteryDrop jest dostępny w Polsce?", a: "Tak! Strona jest w pełni dostępna po polsku, ceny w złotych (PLN). Jesteśmy tutaj dla Ciebie." },
    ],
  },
  it: {
    title: "Domande frequenti",
    subtitle: "Tutto quello che vuoi sapere su MysteryDrop",
    ctaTitle: "Hai un'altra domanda?",
    ctaSub: "Scrivici, rispondiamo entro 24 ore.",
    faqs: [
      { q: "Cos'è MysteryDrop?", a: "MysteryDrop è una piattaforma di mystery box dove apri pacchi virtuali e scopri sorprese — da box Apple scontate ad AirPods e iPhone. Ogni apertura è una nuova emozione!" },
      { q: "Come funziona l'apertura della mystery box?", a: "Dopo il pagamento verrai reindirizzato alla pagina di scoperta. Un'animazione a slot machine rivelerà la tua sorpresa. Tutti i risultati sono casuali e verificati dal nostro sistema sicuro." },
      { q: "Cosa posso scoprire nella mystery box?", a: "Box Apple scontata (80%), box gratis (15%), voucher Amazon 20€ (3%), voucher Amazon 50€ (1,5%), AirPods (0,4%) o iPhone (0,1%)." },
      { q: "Come ricevo la mia sorpresa?", a: "Subito dopo l'apertura riceverai un'email con il codice sconto. I codici sono validi 30 giorni dal ricevimento." },
      { q: "Quali metodi di pagamento sono accettati?", a: "Carte di credito/debito, Apple Pay, Google Pay e Bitcoin. I pagamenti con carta sono gestiti da Stripe — 100% sicuri e cifrati." },
      { q: "Posso aprire più di una box?", a: "Certo! Silver (100 box/350€), Gold (200 box/600€), Platinum (600 box/1497€)." },
      { q: "I risultati sono equi e verificabili?", a: "Sì. Ogni scoperta è generata da un algoritmo casuale certificato. Ogni sessione di pagamento può rivelare un premio una sola volta." },
      { q: "Quanto tempo ci vuole per elaborare l'ordine?", a: "I pagamenti con carta e Apple/Google Pay sono immediati. I pagamenti Bitcoin possono richiedere da 10 a 60 minuti." },
      { q: "Cosa succede se il mio codice sconto scade?", a: "Contattaci via email. Il nostro team verificherà il tuo caso e invierà un nuovo codice." },
      { q: "MysteryDrop è disponibile in Italia?", a: "Sì! Il sito è completamente disponibile in italiano con prezzi in euro." },
    ],
  },
  en: {
    title: "Frequently asked questions",
    subtitle: "Everything you want to know about MysteryDrop",
    ctaTitle: "Still have a question?",
    ctaSub: "Write to us, we reply within 24 hours.",
    faqs: [
      { q: "What is MysteryDrop?", a: "MysteryDrop is a mystery box platform where you open virtual packages and discover surprises — from discounted Apple boxes to AirPods and iPhones." },
      { q: "How does opening a mystery box work?", a: "After payment, you'll be redirected to the discovery page. A slot machine animation will reveal your surprise. All results are random and verified by our secure system." },
      { q: "What can I discover?", a: "Discounted Apple box (80%), free box (15%), Amazon €20 voucher (3%), Amazon €50 voucher (1.5%), AirPods (0.4%) or iPhone (0.1%)." },
      { q: "How do I receive my surprise?", a: "Right after opening you'll receive an email with a discount code. Codes are valid for 30 days from receipt." },
      { q: "What payment methods are accepted?", a: "Credit/debit cards, Apple Pay, Google Pay, and Bitcoin. Card payments are handled by Stripe — 100% secure and encrypted." },
      { q: "Can I open more than one box?", a: "Of course! Silver (100 boxes/€350), Gold (200 boxes/€600), Platinum (600 boxes/€1497)." },
      { q: "Are the results fair and verifiable?", a: "Yes. Every discovery is generated by a certified random algorithm. Each payment session can reveal a prize only once." },
      { q: "How long does order processing take?", a: "Card and Apple/Google Pay payments are instant. Bitcoin payments may take 10–60 minutes." },
      { q: "What if my discount code expires?", a: "Contact us via the email in the page footer. Our team will send a new code if needed." },
      { q: "Is MysteryDrop available in my country?", a: "Yes! The site is available in 12 languages with automatic geolocation." },
    ],
  },
  fr: {
    title: "Questions fréquentes",
    subtitle: "Tout ce que vous voulez savoir sur MysteryDrop",
    ctaTitle: "Vous avez d'autres questions ?",
    ctaSub: "Écrivez-nous, nous répondons sous 24 heures.",
    faqs: [
      { q: "Qu'est-ce que MysteryDrop ?", a: "MysteryDrop est une plateforme de mystery box où vous ouvrez des paquets virtuels et découvrez des surprises — des box Apple remisées aux AirPods et iPhones." },
      { q: "Comment fonctionne l'ouverture ?", a: "Après le paiement, vous serez redirigé vers la page de découverte. Une animation de machine à sous révélera votre surprise." },
      { q: "Que puis-je découvrir ?", a: "Box Apple remisée (80%), box gratuite (15%), bon Amazon 20€ (3%), bon Amazon 50€ (1,5%), AirPods (0,4%) ou iPhone (0,1%)." },
      { q: "Quels moyens de paiement sont acceptés ?", a: "Cartes de crédit/débit, Apple Pay, Google Pay et Bitcoin. Les paiements par carte sont gérés par Stripe — 100% sécurisés." },
      { q: "Puis-je ouvrir plus d'une box ?", a: "Bien sûr ! Silver (100 box/350€), Gold (200 box/600€), Platinum (600 box/1497€)." },
    ],
  },
  es: {
    title: "Preguntas frecuentes",
    subtitle: "Todo lo que quieres saber sobre MysteryDrop",
    ctaTitle: "¿Tienes otra pregunta?",
    ctaSub: "Escríbenos, respondemos en 24 horas.",
    faqs: [
      { q: "¿Qué es MysteryDrop?", a: "MysteryDrop es una plataforma de mystery box donde abres paquetes virtuales y descubres sorpresas — desde cajas Apple con descuento hasta AirPods e iPhones." },
      { q: "¿Cómo funciona la apertura?", a: "Tras el pago, serás redirigido a la página de descubrimiento. Una animación de máquina tragaperras revelará tu sorpresa." },
      { q: "¿Qué puedo descubrir?", a: "Caja Apple con descuento (80%), caja gratis (15%), vale Amazon 20€ (3%), vale Amazon 50€ (1,5%), AirPods (0,4%) o iPhone (0,1%)." },
      { q: "¿Qué métodos de pago se aceptan?", a: "Tarjetas de crédito/débito, Apple Pay, Google Pay y Bitcoin. Los pagos con tarjeta son gestionados por Stripe — 100% seguros." },
      { q: "¿Puedo abrir más de una caja?", a: "¡Claro! Silver (100 cajas/350€), Gold (200 cajas/600€), Platinum (600 cajas/1497€)." },
    ],
  },
  de: {
    title: "Häufig gestellte Fragen",
    subtitle: "Alles, was du über MysteryDrop wissen möchtest",
    ctaTitle: "Noch eine Frage?",
    ctaSub: "Schreib uns, wir antworten innerhalb von 24 Stunden.",
    faqs: [
      { q: "Was ist MysteryDrop?", a: "MysteryDrop ist eine Mystery-Box-Plattform, auf der du virtuelle Pakete öffnest und Überraschungen entdeckst — von vergünstigten Apple-Boxen bis hin zu AirPods und iPhones." },
      { q: "Wie funktioniert das Öffnen?", a: "Nach der Zahlung wirst du zur Entdeckungsseite weitergeleitet. Eine Spielautomaten-Animation enthüllt deine Überraschung." },
      { q: "Was kann ich entdecken?", a: "Vergünstigte Apple Box (80%), kostenlose Box (15%), Amazon 20€ Gutschein (3%), Amazon 50€ Gutschein (1,5%), AirPods (0,4%) oder iPhone (0,1%)." },
      { q: "Welche Zahlungsmethoden werden akzeptiert?", a: "Kredit-/Debitkarten, Apple Pay, Google Pay und Bitcoin. Kartenzahlungen werden über Stripe abgewickelt — 100% sicher." },
      { q: "Kann ich mehr als eine Box öffnen?", a: "Natürlich! Silver (100 Boxen/350€), Gold (200 Boxen/600€), Platinum (600 Boxen/1497€)." },
    ],
  },
  pt: {
    title: "Perguntas frequentes",
    subtitle: "Tudo o que você quer saber sobre o MysteryDrop",
    ctaTitle: "Tem outra pergunta?",
    ctaSub: "Escreva-nos, respondemos em 24 horas.",
    faqs: [
      { q: "O que é o MysteryDrop?", a: "O MysteryDrop é uma plataforma de mystery box onde você abre pacotes virtuais e descobre surpresas — desde caixas Apple com desconto até AirPods e iPhones." },
      { q: "Como funciona a abertura?", a: "Após o pagamento, você será redirecionado para a página de descoberta. Uma animação de caça-níqueis revelará sua surpresa." },
      { q: "O que posso descobrir?", a: "Caixa Apple com desconto (80%), caixa grátis (15%), voucher Amazon 20€ (3%), voucher Amazon 50€ (1,5%), AirPods (0,4%) ou iPhone (0,1%)." },
      { q: "Quais métodos de pagamento são aceitos?", a: "Cartões de crédito/débito, Apple Pay, Google Pay e Bitcoin. Os pagamentos são processados pelo Stripe — 100% seguros." },
      { q: "Posso abrir mais de uma box?", a: "Claro! Silver (100 boxes/350€), Gold (200 boxes/600€), Platinum (600 boxes/1497€)." },
    ],
  },
  ro: {
    title: "Întrebări frecvente",
    subtitle: "Tot ce vrei să știi despre MysteryDrop",
    ctaTitle: "Mai ai întrebări?",
    ctaSub: "Scrie-ne, răspundem în 24 de ore.",
    faqs: [
      { q: "Ce este MysteryDrop?", a: "MysteryDrop este o platformă de mystery box unde deschizi pachete virtuale și descoperi surprize — de la cutii Apple cu reducere la AirPods și iPhone-uri." },
      { q: "Cum funcționează deschiderea?", a: "După plată, vei fi redirecționat către pagina de descoperire. O animație de păcănele îți va dezvălui surpriza." },
      { q: "Ce pot descoperi?", a: "Cutie Apple cu reducere (80%), cutie gratuită (15%), voucher Amazon 20€ (3%), voucher Amazon 50€ (1,5%), AirPods (0,4%) sau iPhone (0,1%)." },
      { q: "Ce metode de plată sunt acceptate?", a: "Carduri de credit/debit, Apple Pay, Google Pay și Bitcoin. Plățile sunt procesate prin Stripe — 100% sigure." },
      { q: "Pot deschide mai mult de un box?", a: "Desigur! Silver (100 boxuri/350€), Gold (200 boxuri/600€), Platinum (600 boxuri/1497€)." },
    ],
  },
  sr: {
    title: "Često postavljana pitanja",
    subtitle: "Sve što želiš da znaš o MysteryDrop-u",
    ctaTitle: "Imaš još pitanja?",
    ctaSub: "Piši nam, odgovaramo u roku od 24 sata.",
    faqs: [
      { q: "Šta je MysteryDrop?", a: "MysteryDrop je platforma za mystery box gde otvaraš virtuelne pakete i otkrivaš iznenađenja — od Apple kutija sa popustom do AirPods-a i iPhone-a." },
      { q: "Kako funkcioniše otvaranje?", a: "Nakon plaćanja bićeš preusmeren na stranicu otkrivanja. Animacija slot mašine će otkriti tvoje iznenađenje." },
      { q: "Šta mogu da otkrijem?", a: "Apple kutija sa popustom (80%), besplatna kutija (15%), Amazon vaučer 20€ (3%), Amazon vaučer 50€ (1,5%), AirPods (0,4%) ili iPhone (0,1%)." },
      { q: "Koje metode plaćanja se prihvataju?", a: "Kreditne/debitne kartice, Apple Pay, Google Pay i Bitcoin. Plaćanja su obrađena putem Stripe-a — 100% sigurna." },
      { q: "Mogu li da otvorim više od jedne kutije?", a: "Naravno! Silver (100 kutija/350€), Gold (200 kutija/600€), Platinum (600 kutija/1497€)." },
    ],
  },
  hr: {
    title: "Često postavljana pitanja",
    subtitle: "Sve što želiš znati o MysteryDropu",
    ctaTitle: "Imaš još pitanja?",
    ctaSub: "Piši nam, odgovaramo u roku od 24 sata.",
    faqs: [
      { q: "Što je MysteryDrop?", a: "MysteryDrop je platforma za mystery box gdje otvaraš virtualne pakete i otkrivaš iznenađenja — od Apple kutija s popustom do AirPodsa i iPhonea." },
      { q: "Kako funkcionira otvaranje?", a: "Nakon plaćanja bit ćeš preusmjeren na stranicu otkrivanja. Animacija slot stroja otkriti će tvoje iznenađenje." },
      { q: "Što mogu otkriti?", a: "Apple kutija s popustom (80%), besplatna kutija (15%), Amazon vaučer 20€ (3%), Amazon vaučer 50€ (1,5%), AirPods (0,4%) ili iPhone (0,1%)." },
      { q: "Koje metode plaćanja se prihvaćaju?", a: "Kreditne/debitne kartice, Apple Pay, Google Pay i Bitcoin. Plaćanja se obrađuju putem Stripea — 100% sigurno." },
      { q: "Mogu li otvoriti više od jedne kutije?", a: "Naravno! Silver (100 kutija/350€), Gold (200 kutija/600€), Platinum (600 kutija/1497€)." },
    ],
  },
  uk: {
    title: "Часті запитання",
    subtitle: "Все, що ти хочеш знати про MysteryDrop",
    ctaTitle: "Є ще запитання?",
    ctaSub: "Напиши нам, відповідаємо протягом 24 годин.",
    faqs: [
      { q: "Що таке MysteryDrop?", a: "MysteryDrop — це платформа mystery box, де ти відкриваєш віртуальні пакети та відкриваєш сюрпризи — від знижених Apple-боксів до AirPods та iPhone." },
      { q: "Як працює відкриття?", a: "Після оплати тебе буде перенаправлено на сторінку відкриття. Анімація слот-машини розкриє твій сюрприз." },
      { q: "Що я можу відкрити?", a: "Знижений Apple-бокс (80%), безкоштовний бокс (15%), ваучер Amazon 20€ (3%), ваучер Amazon 50€ (1,5%), AirPods (0,4%) або iPhone (0,1%)." },
      { q: "Які методи оплати приймаються?", a: "Кредитні/дебетові картки, Apple Pay, Google Pay та Bitcoin. Платежі обробляються через Stripe — 100% безпечно." },
      { q: "Чи можу я відкрити більше одного боксу?", a: "Звичайно! Silver (100 боксів/350€), Gold (200 боксів/600€), Platinum (600 боксів/1497€)." },
    ],
  },
  ar: {
    title: "الأسئلة الشائعة",
    subtitle: "كل ما تريد معرفته عن MysteryDrop",
    ctaTitle: "لديك سؤال آخر؟",
    ctaSub: "راسلنا، نرد خلال 24 ساعة.",
    faqs: [
      { q: "ما هو MysteryDrop؟", a: "MysteryDrop منصة mystery box حيث تفتح حزماً افتراضية وتكتشف مفاجآت — من صناديق Apple بخصم إلى AirPods وiPhones." },
      { q: "كيف يعمل الفتح؟", a: "بعد الدفع ستُحال إلى صفحة الاكتشاف. ستكشف رسوم متحركة لآلة القمار عن مفاجأتك." },
      { q: "ماذا يمكنني اكتشافه؟", a: "صندوق Apple بخصم (80%)، صندوق مجاني (15%)، قسيمة Amazon 20€ (3%)، قسيمة Amazon 50€ (1.5%)، AirPods (0.4%) أو iPhone (0.1%)." },
      { q: "ما طرق الدفع المقبولة؟", a: "بطاقات الائتمان/الخصم، Apple Pay، Google Pay والبيتكوين. تتم معالجة المدفوعات عبر Stripe — آمنة 100%." },
      { q: "هل يمكنني فتح أكثر من صندوق؟", a: "بالطبع! Silver (100 صندوق/350€)، Gold (200 صندوق/600€)، Platinum (600 صندوق/1497€)." },
    ],
  },
};

export default function FAQPage() {
  const locale = useLocale();
  const t = translations[locale] ?? translations.en;
  const [open, setOpen] = useState<number | null>(null);
  const isRtl = locale === "ar";

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <main dir={isRtl ? "rtl" : "ltr"} style={{ minHeight: "100vh", background: "#0a0a0f", padding: "4rem 1rem", color: "#f0eee8", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto 3rem", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#f5c842", color: "#000", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 4, marginBottom: "1.25rem" }}>
          FAQ
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#f0eee8", margin: "0 0 0.75rem", lineHeight: 1.15 }}>{t.title}</h1>
        <p style={{ fontSize: 17, color: "#8a8880", margin: 0 }}>{t.subtitle}</p>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {t.faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{ background: "#13131a", border: `0.5px solid ${isOpen ? "rgba(245,200,66,0.4)" : "rgba(255,255,255,0.08)"}`, borderRadius: 12, marginBottom: 10, overflow: "hidden" }}>
              <button onClick={() => toggle(i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "1.1rem 1.5rem", background: "transparent", border: "none", cursor: "pointer", textAlign: isRtl ? "right" : "left" }} aria-expanded={isOpen}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#f0eee8", lineHeight: 1.4, flex: 1 }}>{item.q}</span>
                <span style={{ width: 28, height: 28, borderRadius: "50%", background: isOpen ? "#f5c842" : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s" }}>
                    <path d="M2 4l4 4 4-4" stroke={isOpen ? "#000" : "#8a8880"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
              {isOpen && (
                <div style={{ padding: "0 1.5rem 1.25rem", borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ fontSize: 14, color: "#8a8880", lineHeight: 1.7, margin: "1rem 0 0" }}>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}

        <div style={{ marginTop: "3rem", padding: "2rem", background: "#13131a", border: "0.5px solid rgba(245,200,66,0.2)", borderRadius: 16, textAlign: "center" }}>
          <p style={{ fontSize: 18, fontWeight: 700, margin: "0 0 0.5rem", color: "#f0eee8" }}>{t.ctaTitle}</p>
          <p style={{ fontSize: 14, color: "#8a8880", margin: "0 0 1.25rem" }}>{t.ctaSub}</p>
          <a href="mailto:support@mysterydrop.eu" style={{ display: "inline-block", background: "#f5c842", color: "#000", padding: "10px 24px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
            support@mysterydrop.eu
          </a>
        </div>
      </div>
    </main>
  );
}
