import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPrizeEmail(
  to: string,
  prizeName: string,
  discountCode: string | null
) {
  if (!to) return;

  const isPhysical = prizeName.includes("iPhone") || prizeName.includes("AirPods") || prizeName.includes("iPad") || prizeName.includes("MacBook");

  await resend.emails.send({
    from: "MysteryDrop <noreply@mysterydrop.eu>",
    to,
    subject: `🎉 Hai vinto: ${prizeName}!`,
    html: `
      <div style="background:#0a0a0f;color:#f0eee8;font-family:sans-serif;padding:40px;max-width:600px;margin:0 auto;border-radius:16px;">
        <h1 style="color:#f5c842;font-size:28px;margin-bottom:8px;">🎁 MysteryDrop</h1>
        <h2 style="font-size:22px;margin-bottom:24px;">Hai vinto: ${prizeName}!</h2>
        
        ${discountCode ? `
        <div style="background:#13131a;border:1px solid rgba(245,200,66,0.3);border-radius:12px;padding:24px;margin-bottom:24px;text-align:center;">
          <p style="color:#8a8880;margin-bottom:8px;">Il tuo codice sconto per la prossima box:</p>
          <div style="font-family:monospace;font-size:24px;font-weight:700;color:#f5c842;letter-spacing:4px;">${discountCode}</div>
          <p style="color:#8a8880;font-size:12px;margin-top:8px;">Valido per 90 giorni</p>
        </div>
        ` : ""}

        ${isPhysical ? `
        <p style="color:#8a8880;line-height:1.7;">Complimenti per il tuo premio fisico! Il nostro team ti contatterà entro 24-48 ore per organizzare la spedizione. Assicurati di rispondere a questa email con il tuo indirizzo di consegna.</p>
        ` : ""}

        <a href="https://www.mysterydrop.eu" style="display:inline-block;background:#f5c842;color:#000;font-weight:700;padding:14px 32px;border-radius:10px;text-decoration:none;margin-top:24px;">Apri un'altra box →</a>
        
        <p style="color:#8a8880;font-size:12px;margin-top:32px;">© 2025 MysteryDrop — mysterydrop.eu</p>
      </div>
    `,
  });
}

export async function sendAdminNotification(
  email: string,
  prizeName: string,
  amount: number
) {
  await resend.emails.send({
    from: "MysteryDrop <noreply@mysterydrop.eu>",
    to: "admin@mysterydrop.eu",
    subject: `💰 Nuovo ordine — ${prizeName}`,
    html: `
      <div style="font-family:sans-serif;padding:20px;">
        <h2>Nuovo ordine ricevuto</h2>
        <p><strong>Email:</strong> ${email || "Non fornita"}</p>
        <p><strong>Premio:</strong> ${prizeName}</p>
        <p><strong>Importo:</strong> €${(amount / 100).toFixed(2)}</p>
        <a href="https://www.mysterydrop.eu/admin">Vai al pannello admin →</a>
      </div>
    `,
  });
}