import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MysteryDrop — Apri la box, vinci Apple",
  description: "Ogni box nasconde un premio Apple. iPhone, AirPods, MacBook e molto altro. Vinci sempre qualcosa — garantito. Solo 4,99€.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "MysteryDrop — Apri la box, vinci Apple",
    description: "Ogni box nasconde un premio Apple. Solo 4,99€. Vinci sempre qualcosa — garantito.",
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
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
            ttq.load('D8C128RC77UA33STK4J0');
            ttq.page();
          }(window, document, 'ttq');
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}