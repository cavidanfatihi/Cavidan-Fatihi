import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Globe2, Menu, MessageCircle, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLocale } from "@/contexts/LocaleContext";
import { buildBookingWhatsAppUrl } from "@shared/siteBrand";

const labels = {
  az: { about: "Bioqrafiya", concerts: "Konsertlər", music: "Musiqi", media: "Media", shop: "Mağaza", contact: "Əlaqə", booking: "Əməkdaşlıq", menu: "Menyu", cart: "Səbəti aç", socials: "Sosial keçidlər", mobileBooking: "WhatsApp ilə əməkdaşlıq" },
  en: { about: "Biography", concerts: "Concerts", music: "Music", media: "Media", shop: "Shop", contact: "Contact", booking: "Booking", menu: "Menu", cart: "Open bag", socials: "Social links", mobileBooking: "WhatsApp Booking" },
};

function Mark() { return <span className="group flex items-center gap-3"><img src="/manus-storage/cf-monogram-black-square_15332b2e.png" alt="CF monogram" className="size-11 object-contain sm:size-12" /><span className="text-[.76rem] font-bold leading-[.92] tracking-[.2em] text-white drop-shadow-[0_1px_8px_rgba(255,255,255,.2)] sm:text-[.92rem]">CAVİDAN<br /><span className="text-zinc-200">FATİHİ</span></span></span>; }

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  return <div className="flex items-center border border-white/20 text-[.62rem] font-semibold tracking-[.18em]"><button onClick={() => setLocale("az")} className={`px-2.5 py-2 transition ${locale === "az" ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}>AZ</button><button onClick={() => setLocale("en")} className={`px-2.5 py-2 transition ${locale === "en" ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}>EN</button></div>;
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale } = useLocale();
  const { itemCount, openCart } = useCart();
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    let shadowObserver: MutationObserver | undefined;
    const hideWatermark = () => {
      const host = document.querySelector("manus-content-root");
      const watermark = host?.shadowRoot?.querySelector("footer-watermark") as HTMLElement | null;
      watermark?.style.setProperty("display", "none", "important");
    };
    const observeWatermarkHost = () => {
      const host = document.querySelector("manus-content-root");
      if (!host?.shadowRoot || shadowObserver) return;
      shadowObserver = new MutationObserver(hideWatermark);
      shadowObserver.observe(host.shadowRoot, { childList: true, subtree: true });
    };
    const updateWatermark = () => {
      observeWatermarkHost();
      hideWatermark();
    };
    const documentObserver = new MutationObserver(updateWatermark);
    documentObserver.observe(document.documentElement, { childList: true, subtree: true });
    updateWatermark();
    const retryInterval = window.setInterval(() => {
      updateWatermark();
      if (shadowObserver) window.clearInterval(retryInterval);
    }, 100);
    const retryTimeout = window.setTimeout(() => window.clearInterval(retryInterval), 5000);
    return () => {
      documentObserver.disconnect();
      shadowObserver?.disconnect();
      window.clearInterval(retryInterval);
      window.clearTimeout(retryTimeout);
    };
  }, []);
  const text = labels[locale];
  const nav = [{ href: "/about", label: text.about }, { href: "/concerts", label: text.concerts }, { href: "/music", label: text.music }, { href: "/media", label: text.media }, { href: "/shop", label: text.shop }, { href: "/contact", label: text.contact }];
  const whatsapp = buildBookingWhatsAppUrl(locale);
  return <div className="min-h-screen bg-black text-white"><header className="sticky top-0 z-40 w-full border-b border-white/15 bg-black/95 backdrop-blur"><div className="mx-auto flex h-24 max-w-[1600px] items-center justify-between px-5 lg:px-10"><Link href="/"><Mark /></Link><nav className="hidden items-center gap-8 xl:flex">{nav.map(item => <Link key={item.href} href={item.href} className={`text-[.78rem] font-semibold uppercase tracking-[.14em] drop-shadow-[0_1px_8px_rgba(255,255,255,.18)] transition ${location === item.href ? "text-white" : "text-zinc-200 hover:text-white"}`}>{item.label}</Link>)}</nav><div className="flex items-center gap-3"><LanguageToggle /><button onClick={openCart} aria-label={text.cart} className="relative grid size-10 place-items-center border border-white/35 transition hover:bg-white hover:text-black"><ShoppingBag className="size-4" />{itemCount > 0 && <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-white text-[.55rem] text-black">{itemCount}</span>}</button><a className="hidden h-10 items-center gap-2 bg-white px-5 text-[.72rem] font-bold uppercase tracking-[.15em] text-black transition hover:bg-zinc-200 sm:inline-flex" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle className="size-3.5" /> {text.booking}</a><button onClick={() => setMobileOpen(true)} className="grid size-10 place-items-center border border-white/35 xl:hidden" aria-label={text.menu}><Menu className="size-4" /></button></div></div></header>{children}<a href={whatsapp} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-30 flex items-center gap-2 bg-white px-4 py-3 text-xs font-bold text-black shadow-2xl transition hover:scale-[1.03]"><MessageCircle className="size-4" /> WhatsApp</a><footer className="border-t border-white/10 bg-black"><div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-6 px-5 py-8 text-xs text-zinc-500 sm:flex-row sm:items-center lg:px-10"><p>© {new Date().getFullYear()} Cavidan Fatihi. {locale === "az" ? "Bütün hüquqlar qorunur." : "All rights reserved."}</p><div className="flex items-center gap-4"><span className="flex items-center gap-1.5"><Globe2 className="size-3" /> AZ / EN</span><a href={whatsapp} target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-white">{text.booking}</a></div></div></footer>{mobileOpen && <div className="fixed inset-0 z-50 bg-black"><div className="flex h-24 items-center justify-between border-b border-white/10 px-5"><Mark /><button aria-label={locale === "az" ? "Menyunu bağla" : "Close menu"} onClick={() => setMobileOpen(false)} className="grid size-10 place-items-center border border-white/35"><X className="size-4" /></button></div><nav className="flex flex-col px-5 py-10">{nav.map((item, index) => <Link onClick={() => setMobileOpen(false)} key={item.href} href={item.href} className="flex items-center justify-between border-b border-white/10 py-5 text-3xl font-light text-white"><span>{item.label}</span><span className="text-xs text-zinc-500">0{index + 1}</span></Link>)}<a href={whatsapp} target="_blank" rel="noreferrer" className="mt-8 flex items-center gap-2 text-sm font-semibold text-white"><MessageCircle className="size-4" /> {text.mobileBooking}</a></nav></div>}</div>;
}
