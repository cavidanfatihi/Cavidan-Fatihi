import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import { musicPlatforms } from "@shared/musicCatalog";

function BackgroundVideo({ desktopSrc, mobileSrc, title, poster }: { desktopSrc: string; mobileSrc: string; title: string; poster: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMotionAllowed, setIsMotionAllowed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const syncEligibility = () => {
      setIsMotionAllowed(motionQuery.matches);
      setIsDesktop(desktopQuery.matches);
    };
    syncEligibility();
    motionQuery.addEventListener("change", syncEligibility);
    desktopQuery.addEventListener("change", syncEligibility);
    return () => {
      motionQuery.removeEventListener("change", syncEligibility);
      desktopQuery.removeEventListener("change", syncEligibility);
    };
  }, []);

  useEffect(() => {
    if (!isMotionAllowed || !containerRef.current) {
      setShouldLoadVideo(false);
      setReady(false);
      return;
    }
    if (!isDesktop) {
      setShouldLoadVideo(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setShouldLoadVideo(true);
        observer.disconnect();
      }
    }, { rootMargin: "160px" });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isDesktop, isMotionAllowed]);

  const videoSrc = isDesktop ? desktopSrc : mobileSrc;
  return <div ref={containerRef} className="absolute inset-0"><img src={poster} alt="" aria-hidden="true" fetchPriority="high" className={`absolute inset-0 z-0 size-full bg-black object-cover object-[50%_18%] grayscale contrast-110 transition-opacity duration-500 ${ready ? "opacity-0" : "opacity-100"}`} />{shouldLoadVideo ? <video aria-label={title} autoPlay loop muted playsInline preload="metadata" poster={poster} onCanPlay={() => setReady(true)} onError={() => setReady(false)} className="absolute inset-0 z-10 size-full bg-transparent object-cover object-[50%_18%] grayscale contrast-110"><source src={videoSrc} type="video/mp4" /></video> : null}</div>;
}

export default function HomePage() {
  const { locale } = useLocale();
  const homePlatforms = [{ label: "Facebook", href: "https://www.facebook.com/fatihicavidan", icon: "/manus-storage/facebook_853659b8.svg" }, { label: "Instagram", href: "https://www.instagram.com/cavidanfatihi/", icon: "/manus-storage/instagram_192fc148.svg" }, { label: "Spotify", href: musicPlatforms[0].href, icon: "/manus-storage/spotify_b551067a.svg" }, { label: "Apple Music", href: musicPlatforms[1].href, icon: "/manus-storage/applemusic_c94f89de.svg" }, { label: "Deezer", href: musicPlatforms[2].href, icon: "/manus-storage/deezer_ca18166c.svg" }, { label: "YouTube", href: musicPlatforms[3].href, icon: "/manus-storage/youtube_06949fb2.svg" }];
  return <><section className="relative isolate min-h-[100svh] overflow-hidden bg-black"><BackgroundVideo desktopSrc="/manus-storage/xatire-hero-loop-720p_6d47568f.mp4" mobileSrc="/manus-storage/xatire-hero-loop-mobile_5bac7b8a.mp4" title={locale === "az" ? "Cavidan Fatihi — Xatirə, 30-cu saniyədən" : "Cavidan Fatihi — Xatirə, from 30 seconds"} poster="/manus-storage/xatire-30-poster_f1c34901.jpg" /><div className="absolute inset-0 z-20 bg-black/30" /><h1 className="sr-only">{locale === "az" ? "Cavidan Fatihi rəsmi saytı" : "Cavidan Fatihi official website"}</h1></section><nav aria-label={locale === "az" ? "Rəsmi platformalar" : "Official platforms"} className="fixed inset-x-5 bottom-20 z-30 flex justify-center sm:bottom-8"><div className="grid grid-cols-6 gap-2">{homePlatforms.map(({ label, href, icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="group grid size-10 place-items-center border border-white/35 bg-black/45 transition hover:scale-105 hover:border-white hover:bg-white sm:size-11"><img src={icon} alt="" aria-hidden="true" className="size-5 object-contain brightness-0 invert transition group-hover:brightness-0 group-hover:invert-0 sm:size-5.5" /></a>)}</div></nav></>;
}
