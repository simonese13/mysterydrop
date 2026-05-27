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
      <body>{children}</body>
    </html>
  );
}