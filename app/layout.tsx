import type { Metadata } from "next";
import TikTokPixel from "./tiktok-pixel";

export const metadata: Metadata = {
  title: "MysteryDrop — Apri la box, scopri Apple",
  description: "Ogni box nasconde una sorpresa Apple. iPhone, AirPods, MacBook e molto altro. Trovi sempre qualcosa — garantito. Solo 4,99€.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "MysteryDrop — Apri la box, scopri Apple",
    description: "Ogni box nasconde una sorpresa Apple. Solo 4,99€. Trovi sempre qualcosa — garantito.",
    url: "https://www.mysterydrop.eu",
    siteName: "MysteryDrop",
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1457838748446159');
          fbq('track', 'PageView');
        `}} />
      </head>
      <body>
        <TikTokPixel />
        {children}
      </body>
    </html>
  );
}