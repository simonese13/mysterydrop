"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function TikTokPixel() {
  const pathname = usePathname();

  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
      !function (w, d, t) {
        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
        ttq.load('D8C128RC77UA33STK4J0');
        ttq.page();
      }(window, document, 'ttq');
    `;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ttq) {
      (window as any).ttq.page();
      if (pathname.includes("/success")) {
        (window as any).ttq.track("Purchase", {
          contents: [{ content_id: "mystery-box", content_type: "product", content_name: "Mystery Box Apple", price: 4.99, num_items: 1 }],
          value: 4.99,
          currency: "EUR",
        });
      }
    }
  }, [pathname]);

  return null;
}