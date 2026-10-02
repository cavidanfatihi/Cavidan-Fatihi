import { BookingForm } from "@/components/BookingForm";
import { buildCatalogWhatsAppUrl, catalogProducts } from "@/data/catalog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useLocale } from "@/contexts/LocaleContext";
import { trpc } from "@/lib/trpc";
import { filterGalleryItems, getGalleryObjectPosition, getLocalizedGalleryAlt, type GalleryCategory, type GalleryItem } from "@shared/siteContent";
import { mediaLinks, type MediaLinkCategory } from "@shared/mediaLinks";
import { musicPlatforms, officialYouTubeReleases } from "@shared/musicCatalog";
import { BOOKING_PHONE_DISPLAY, buildBookingWhatsAppUrl } from "@shared/siteBrand";
import { ArrowDownRight, CalendarDays, ChevronRight, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useMemo, useRef, useState } from "react";

export { default as HomePage } from "./HomePage";

const translations = {
  az: {
    home: "Ana səhifə", latest: "Son buraxılış", listen: "Dinlə", preview: "Səssiz klip önizləməsi", booking: "Əməkdaşlıq üçün yaz", about: "Bioqrafiya", concerts: "Konsertlər", music: "Musiqi", media: "Media", shop: "Mağaza", contact: "Əlaqə", explore: "Kəşf et", upcoming: "Növbəti tarixlər tezliklə elan olunacaq.", eventHint: "Yeni səhnə tarixləri və bilet keçidləri burada paylaşılacaq.", biography: "Bioqrafiya", selected: "Seçilmiş anlar", photoGallery: "Fotoqalereya", interviews: "Müsahibələr & Çıxışlar", all: "Hamısı", concert: "Konsert", session: "Fotosessiya", backstage: "Backstage", clips: "Rəsmi kliplər", catalogue: "Rəsmi məhsullar", noProducts: "Merch kolleksiyası tezliklə genişlənəcək.", noProductsHint: "İlk məhsul seçimi artıq mağazada görünür; yeni parçalar əlavə olunduqca burada yer alacaq.", add: "Səbətə əlavə et", contactTitle: "Bir səhnə, bir fikir, bir layihə.", contactCopy: "Tədbir, ad günü, korporativ gecə, toy-nişan və ya xüsusi yaradıcı layihə üçün əlaqə saxlayın.", whatsapp: "WhatsApp ilə yaz", formTitle: "Müraciətinizi göndərin", formCopy: "Tarix, məkan və istədiyiniz formatı paylaşın.", timeline: ["Yevlax · məktəb illəri və fortepiano", "Təhsil · gitara ilə yenidən musiqiyə dönüş", "Sənsiz · professional musiqi karyerasının başlanğıcı"], upNext: "NÖVBƏTİ", live: "CANLI", spotify: "Spotify", youtube: "YouTube", image: "Görüntü", slide: "Slayd", whatsappBooking: "WhatsApp ilə əməkdaşlıq",
  },
  en: {
    home: "Home", latest: "Latest release", listen: "Listen", preview: "Silent video preview", booking: "Book an event", about: "About", concerts: "Concerts", music: "Music", media: "Media", shop: "Shop", contact: "Contact", explore: "Explore", upcoming: "New dates will be announced soon.", eventHint: "Upcoming shows, cities and ticket links will be shared here.", biography: "Biography", selected: "Selected moments", photoGallery: "Photo gallery", interviews: "Interviews & appearances", all: "All", concert: "Concerts", session: "Portraits", backstage: "Backstage", clips: "Official videos", catalogue: "Official merchandise", noProducts: "The merch collection will grow soon.", noProductsHint: "The first official item is already in the shop; new pieces will appear here as the collection expands.", add: "Add to bag", contactTitle: "A stage, an idea, a project.", contactCopy: "For events, birthdays, corporate evenings, weddings, engagements and special creative projects, get in touch.", whatsapp: "Message on WhatsApp", formTitle: "Send an enquiry", formCopy: "Share the date, venue and format you have in mind.", timeline: ["Yevlakh · early years, school and piano", "Education · rediscovering music through guitar", "Sənsiz · the beginning of a professional music career"], upNext: "UP NEXT", live: "LIVE", spotify: "Spotify", youtube: "YouTube", image: "Image", slide: "Slide", whatsappBooking: "Booking via WhatsApp",
  },
} as const;

function WhatsAppLink({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { locale } = useLocale();
  return <a href={buildBookingWhatsAppUrl(locale)} target="_blank" rel="noreferrer" className={className}>{children}</a>;
}

function PageIntro({ number, eyebrow, title, copy, image, portrait = false, colorOnHover = false }: { number: string; eyebrow: string; title: string; copy: string; image: string; portrait?: boolean; colorOnHover?: boolean }) {
  const imageStyle = colorOnHover ? `${portrait ? "opacity-95" : "opacity-75"} brightness-110 contrast-110 grayscale transition duration-700 group-hover:opacity-100 group-hover:brightness-100 group-hover:grayscale-0` : portrait ? "opacity-95 brightness-110 contrast-110 grayscale" : "opacity-50 grayscale";
  const overlayStyle = portrait ? "bg-gradient-to-r from-black via-black/45 to-black/5" : "bg-gradient-to-r from-black via-black/70 to-black/25";
  return <section className="group relative isolate min-h-[52svh] overflow-hidden border-b border-white/10 bg-black"><img src={image} alt="" className={`absolute inset-0 -z-20 size-full object-contain object-center ${imageStyle}`} /><div className={`absolute inset-0 -z-10 ${overlayStyle}`} /><div className="mx-auto flex min-h-[52svh] max-w-[1600px] items-end px-5 pb-14 pt-28 lg:px-10 lg:pb-18"><div className="max-w-2xl"><p className="mono text-zinc-400">{number}</p><p className="mono mt-7 text-zinc-400">{eyebrow}</p>{title && <h1 className="type-display mt-4 text-5xl leading-[.92] sm:text-7xl">{title}</h1>}{copy && <p className="mt-6 max-w-xl text-base leading-8 text-zinc-300">{copy}</p>}</div></div></section>;
}

function BackgroundVideo({ src, title, poster, monochrome = false }: { src: string; title: string; poster: string; monochrome?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMotionCapableDesktop, setIsMotionCapableDesktop] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const syncEligibility = () => setIsMotionCapableDesktop(mediaQuery.matches);
    syncEligibility();
    mediaQuery.addEventListener("change", syncEligibility);
    return () => mediaQuery.removeEventListener("change", syncEligibility);
  }, []);

  useEffect(() => {
    if (!isMotionCapableDesktop || !containerRef.current) {
      setShouldLoadVideo(false);
      setReady(false);
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
  }, [isMotionCapableDesktop]);

  const monochromeClass = monochrome ? "grayscale contrast-110" : "";
  return <div ref={containerRef} className="absolute inset-0"><img src={poster} alt="" aria-hidden="true" fetchPriority="high" className={`absolute inset-0 z-0 size-full bg-black object-cover object-[50%_18%] transition-opacity duration-500 ${monochromeClass} ${ready ? "opacity-0" : "opacity-100"}`} />{shouldLoadVideo ? <video aria-label={title} autoPlay loop muted playsInline preload="metadata" poster={poster} onCanPlay={() => setReady(true)} onError={() => setReady(false)} className={`absolute inset-0 z-10 size-full bg-transparent object-cover object-[50%_18%] ${monochromeClass}`}><source src={src} type="video/mp4" /></video> : null}</div>;
}

export function AboutPage() {
  const { locale } = useLocale(); const t = translations[locale];
  const biography = locale === "az" ? {
    heading: "Cavidan Fatihi",
    paragraphs: [
      "Cavidan Fatihi — Azərbaycanın tanınmış müğənnisi, bəstəkarı və musiqi prodüseridir. 30 iyul 1994-cü ildə Yevlaxda anadan olub. On ildən artıqdır ki, peşəkar səhnədə fəaliyyət göstərir.",
      "Erkən yaşlarından musiqi ilə bağlı olan sənətçi fortepiano üzrə 7 illik musiqi məktəbini bitirmişdir. Sonralar vokal və gitara sənətini təkmilləşdirərək özünəməxsus ifa üslubunu formalaşdırmışdır.",
      "Onun yaradıcılığında Azərbaycan musiqisinin zəngin melodik irsi, retro estetika, akustik səslənmə və müasir elementlər harmonik şəkildə birləşir. Cavidan Fatihi həm orijinal əsərləri, həm də klassik nümunələrin yeni interpretasiyaları ilə auditoriyanı cəlb edir.",
      "Onun ifasında səslənən “Xatirə” mahnısı geniş dinləyici kütləsi qazanmış və sənətçinin ən tanınan əsərlərindən birinə çevrilmişdir. Bu mahnını Azərbaycanın Xalq artisti Mübariz Tağıyev ilə birgə duet şəklində ifa etmişdir.",
      "Karyerası boyunca solo konsertlər, televiziya proqramları, festivallar və müxtəlif musiqi layihələrində çıxış edən Cavidan Fatihinin əsərləri YouTube, Spotify, Apple Music və digər aparıcı platformalarda təqdim olunur.",
      "Hazırda sənətçi müəllif musiqisi, prodakşn və canlı səhnə layihələri üzərində çalışır, Azərbaycan musiqisini müasir ifadə formaları ilə yeni auditoriyalara çatdırmağa davam edir.",
    ],
  } : {
    heading: "Cavidan Fatihi",
    paragraphs: [
      "Cavidan Fatihi is a renowned Azerbaijani singer, composer and music producer. Born in Yevlakh on 30 July 1994, he has worked professionally on stage for more than a decade.",
      "Connected to music from an early age, he completed seven years of piano studies at a music school. He later developed his vocal and guitar skills, shaping a distinctive performance style.",
      "His work brings together the rich melodic heritage of Azerbaijani music, retro aesthetics, acoustic sonics and contemporary elements. Cavidan Fatihi connects with audiences through original works and fresh interpretations of classic pieces.",
      "His rendition of “Xatirə” reached a wide audience and became one of his best-known works. He performed the song as a duet with People’s Artist of Azerbaijan Mübariz Tağıyev.",
      "Throughout his career, Cavidan Fatihi has appeared in solo concerts, television programmes, festivals and musical projects. His work is available on YouTube, Spotify, Apple Music and other leading platforms.",
      "He is currently working on original music, production and live stage projects, continuing to bring Azerbaijani music to new audiences through contemporary forms of expression.",
    ],
  };
  return <><PageIntro number="01" eyebrow={t.about} title="" copy="" image="/manus-storage/IMG_8446_f2f1cc25.webp" portrait colorOnHover /><section className="mx-auto grid max-w-[1600px] gap-12 px-5 py-18 lg:grid-cols-[.72fr_1.28fr] lg:px-10 lg:py-28"><div className="lg:sticky lg:top-28 lg:h-fit"><img src="/manus-storage/IMG_3435_90049385.JPG" alt="Cavidan Fatihi" className="aspect-[4/5] w-full object-cover object-top brightness-110 contrast-110 grayscale transition duration-700 hover:brightness-100 hover:grayscale-0" /><p className="mono mt-5 text-zinc-500">CAVIDAN FATIHI / 1994 —</p></div><div><h1 className="type-display text-5xl leading-none text-white sm:text-7xl">{biography.heading}</h1><div className="mt-10 max-w-2xl space-y-7 text-base leading-8 text-zinc-300">{biography.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></div></section></>;
}

export function ConcertsPage() { const { locale } = useLocale(); const t = translations[locale]; const images = filterGalleryItems("concert"); return <><section className="relative isolate min-h-[72svh] overflow-hidden bg-black"><BackgroundVideo src="/manus-storage/solo-konsert-hero-loop-720p_cf221356.mp4" title={locale === "az" ? "Cavidan Fatihi solo konsert görüntüləri" : "Cavidan Fatihi solo concert footage"} poster="/manus-storage/solo-konsert-poster_5e2cafda.jpg" /><div className="absolute inset-0 z-20 bg-black/35" /><h1 className="sr-only">{t.concerts}</h1></section><section aria-labelledby="concert-gallery" className="mx-auto max-w-[1600px] px-5 py-10 lg:px-10 lg:py-16"><h2 id="concert-gallery" className="sr-only">{t.concerts}</h2><div className="grid gap-3 md:grid-cols-3">{images.slice(0, 6).map(image => <article key={image.src} className="overflow-hidden bg-zinc-900"><img src={image.src} alt={getLocalizedGalleryAlt(image, locale)} className="aspect-[4/3] w-full object-cover object-top grayscale transition duration-700 hover:scale-105 hover:grayscale-0" /></article>)}</div></section></>; }

export function MusicPage() { const { locale } = useLocale(); const t = translations[locale]; return <><PageIntro number="03" eyebrow={t.music} title="" copy={locale === "az" ? "Bütün rəsmi platformalar və Cavidan Fatihi kanalı." : "Official music platforms and the Cavidan Fatihi channel."} image="/manus-storage/IMG_8438_c22cd5bc.webp" colorOnHover /><section className="mx-auto max-w-[1600px] px-5 py-18 lg:px-10 lg:py-28"><div className="grid gap-px border border-white/15 sm:grid-cols-2 lg:grid-cols-4">{musicPlatforms.map(platform => <a key={platform.id} href={platform.href} target="_blank" rel="noreferrer" className="group flex min-h-32 flex-col justify-between bg-black p-6 transition hover:bg-white hover:text-black"><span className="mono text-zinc-400 transition group-hover:text-zinc-600">{locale === "az" ? "Dinlə" : "Listen"}</span><span className="flex items-center justify-between gap-4 text-xl font-semibold tracking-[.04em]"><span>{platform.label}</span><ArrowDownRight className="size-5 transition group-hover:translate-x-1 group-hover:translate-y-1" /></span></a>)}</div><div className="mt-18"><div className="flex items-end justify-between gap-4"><div><p className="mono">{t.youtube}</p><h2 className="type-display mt-3 text-4xl sm:text-6xl">{t.clips}</h2></div><a href={musicPlatforms[3].href} target="_blank" rel="noreferrer" className="line-link">YouTube <ChevronRight className="size-4" /></a></div><p className="mt-4 text-sm leading-7 text-zinc-400">{locale === "az" ? String(officialYouTubeReleases.length) + " rəsmi video yayımı" : String(officialYouTubeReleases.length) + " official video releases"}</p><div className="mt-8 border-y border-white/15">{officialYouTubeReleases.map(video => <a key={video.id} href={"https://www.youtube.com/watch?v=" + video.id} target="_blank" rel="noreferrer" className="group flex items-center gap-4 border-b border-white/10 py-4 last:border-b-0 sm:gap-6"><img src={"https://i.ytimg.com/vi/" + video.id + "/hqdefault.jpg"} alt="" aria-hidden="true" loading="lazy" className="size-16 shrink-0 object-cover grayscale transition duration-500 group-hover:grayscale-0 sm:size-20" /><span className="min-w-0 flex-1"><span className="block text-base font-medium tracking-[.04em] text-zinc-100 transition group-hover:text-white sm:text-xl">{video.title}</span><span className="mono mt-2 block text-[.62rem] uppercase tracking-[.14em] text-zinc-500">{locale === "az" ? "YouTube · Rəsmi klip" : "YouTube · Official video"}</span></span><span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/20 text-lg font-light text-zinc-400 transition group-hover:border-white group-hover:bg-white group-hover:text-black">+</span></a>)}</div></div></section></>; }
export function PhotoPage() {
  const { locale } = useLocale();
  const t = translations[locale];
  const [filter, setFilter] = useState<GalleryCategory>("all");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const images = useMemo(() => filterGalleryItems(filter), [filter]);
  const filters: { value: GalleryCategory; label: string }[] = [{ value: "all", label: t.all }, { value: "concert", label: t.concert }, { value: "session", label: t.session }, { value: "backstage", label: t.backstage }];
  return <>
    <PageIntro number="05" eyebrow={locale === "az" ? "Foto" : "Photos"} title="" copy="" image="/manus-storage/IMG_1926_b8114bf8.webp" portrait colorOnHover />
    <section aria-labelledby="photo-gallery" className="mx-auto max-w-[1600px] px-5 py-18 lg:px-10 lg:py-28"><div className="flex items-end justify-between gap-6 border-b border-white/15 pb-6"><div><p className="mono text-zinc-500">05 / 01</p><h1 id="photo-gallery" className="type-display mt-3 text-4xl sm:text-6xl">{locale === "az" ? "Foto" : "Photos"}</h1></div><p className="hidden max-w-xs text-right text-sm leading-6 text-zinc-500 sm:block">{locale === "az" ? "Fotosessiya, səhnə və backstage görüntüləri." : "Portrait, stage and backstage photographs."}</p></div><div className="mt-8 flex flex-wrap gap-2">{filters.map(item => <button onClick={() => setFilter(item.value)} key={item.value} className={`border px-4 py-2 text-[.68rem] uppercase tracking-[.13em] transition ${filter === item.value ? "border-white bg-white text-black" : "border-white/20 text-zinc-500 hover:border-white hover:text-white"}`}>{item.label}</button>)}</div><div className="mt-8 columns-2 gap-3 sm:columns-3 lg:columns-4">{images.map((image, index) => <button onClick={() => setSelected(image)} key={image.src} className="group relative mb-3 block w-full overflow-hidden bg-zinc-900 text-left"><img src={image.src} alt={getLocalizedGalleryAlt(image, locale)} loading="lazy" className={`w-full object-cover ${getGalleryObjectPosition(image)} brightness-110 contrast-110 grayscale transition duration-700 group-hover:scale-105 group-hover:brightness-100 group-hover:grayscale-0 ${index % 5 === 0 ? "aspect-square" : ""}`} /><span className="absolute inset-0 bg-white/0 transition group-hover:bg-white/10" /></button>)}</div></section><Dialog open={Boolean(selected)} onOpenChange={open => !open && setSelected(null)}><DialogContent className="max-h-[92vh] max-w-5xl border-white/15 bg-black p-2 text-white"><DialogTitle className="sr-only">{selected ? getLocalizedGalleryAlt(selected, locale) : t.image}</DialogTitle>{selected && <img src={selected.src} alt={getLocalizedGalleryAlt(selected, locale)} className="max-h-[85vh] w-full object-contain" />}</DialogContent></Dialog>
  </>;
}

export function MediaPage() {
  const { locale } = useLocale();
  const t = translations[locale];
  const [mediaFilter, setMediaFilter] = useState<MediaLinkCategory | "all">("all");
  const links = useMemo(() => mediaFilter === "all" ? mediaLinks : mediaLinks.filter(item => item.category === mediaFilter), [mediaFilter]);
  const mediaFilters: { value: MediaLinkCategory | "all"; label: string; labelEn: string }[] = [{ value: "all", label: "Hamısı", labelEn: "All" }, { value: "tv", label: "TV", labelEn: "TV" }, { value: "press", label: "Mətbuat", labelEn: "Press" }, { value: "music", label: "Musiqi / Radio", labelEn: "Music / Radio" }, { value: "concert", label: "Konsertlər", labelEn: "Concerts" }];
  return <>
    <PageIntro number="04" eyebrow={t.media} title="" copy="" image="/manus-storage/IMG_1926_b8114bf8.webp" portrait colorOnHover />
    <section aria-labelledby="media-links" className="mx-auto max-w-[1600px] px-5 py-18 lg:px-10 lg:py-28"><div className="max-w-3xl"><p className="mono text-zinc-500">04 / 01</p><h1 id="media-links" className="type-display mt-3 text-4xl sm:text-6xl">{t.media}</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400">{locale === "az" ? "Yayımlanan xəbərlər, müsahibələr, efir çıxışları, videolar və konsert materialları." : "Published news, interviews, broadcast appearances, videos and concert features."}</p></div><div className="mt-8 flex flex-wrap gap-2">{mediaFilters.map(item => <button onClick={() => setMediaFilter(item.value)} key={item.value} className={`border px-4 py-2 text-[.68em] uppercase tracking-[.13em] transition ${mediaFilter === item.value ? "border-white bg-white text-black" : "border-white/20 text-zinc-500 hover:border-white hover:text-white"}`}>{locale === "az" ? item.label : item.labelEn}</button>)}</div><div className="mt-10 grid gap-px border border-white/15 md:grid-cols-2 lg:grid-cols-3">{links.map(item => <a key={item.id} href={item.href} target="_blank" rel="noreferrer" className="group flex min-h-64 flex-col justify-between bg-black p-5 transition hover:bg-white hover:text-black"><img src={item.thumbnailUrl} alt={locale === "az" ? item.title : item.titleEn} loading="lazy" className="mb-8 aspect-video w-full object-cover grayscale transition duration-500 group-hover:grayscale-0" /><div><p className="mono text-zinc-500 transition group-hover:text-zinc-600">{item.source} · {item.category === "tv" ? "TV" : item.category === "press" ? (locale === "az" ? "Mətbuat" : "Press") : item.category === "music" ? (locale === "az" ? "Musiqi / Radio" : "Music / Radio") : (locale === "az" ? "Konsert" : "Concert")}</p><h2 className="mt-3 text-lg font-medium leading-6 text-zinc-100 transition group-hover:text-black">{locale === "az" ? item.title : item.titleEn}</h2><span className="mt-5 inline-flex items-center gap-2 text-[.68rem] font-bold uppercase tracking-[.15em] text-zinc-400 transition group-hover:text-black">{locale === "az" ? "Keçidə bax" : "Open feature"} <ArrowDownRight className="size-4" /></span></div></a>)}</div></section>
  </>;
}

export function ShopPage() {
  const { locale } = useLocale();
  const t = translations[locale];
  const catalogTitle = locale === "az" ? "Rəsmi məhsullar" : "Official collection";
  const catalogCopy = locale === "az" ? "Məhsul haqqında məlumat və sifariş üçün birbaşa WhatsApp-dan yazın." : "Message directly on WhatsApp for product details and orders.";
  const orderLabel = locale === "az" ? "WhatsApp ilə soruş" : "Ask on WhatsApp";

  return <>
    <PageIntro number="06" eyebrow={t.shop} title="" copy={locale === "az" ? "Rəsmi Cavidan Fatihi məhsulları və seçilmiş kolleksiya." : "Official Cavidan Fatihi products and selected collection."} image="/manus-storage/IMG_0726_d83aa2df.webp" />
    <section className="mx-auto max-w-[1600px] px-5 py-18 lg:px-10 lg:py-28">
      <div className="max-w-2xl border-l border-white/30 pl-5">
        <p className="mono">{catalogTitle}</p>
        <p className="mt-3 text-sm leading-7 text-zinc-400">{catalogCopy}</p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {catalogProducts.map(product => {
          const copy = product[locale];
          return <article key={product.id} className="group overflow-hidden border border-white/15 bg-zinc-950">
            <div className="aspect-square overflow-hidden bg-zinc-900">
              <img src={product.image} alt={copy.title} loading="lazy" className="size-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <p className="mono text-zinc-500">AZN {product.price}</p>
              <h2 className="mt-3 text-xl font-semibold tracking-[.03em] text-white">{copy.title}</h2>
              <p className="mt-3 min-h-12 text-sm leading-6 text-zinc-400">{copy.description}</p>
              <a href={buildCatalogWhatsAppUrl(copy.title, product.price, locale)} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 border-b border-white/50 pb-2 text-[.68rem] font-bold uppercase tracking-[.15em] text-white transition hover:border-white hover:text-zinc-300">{orderLabel} <ArrowDownRight className="size-4" /></a>
            </div>
          </article>;
        })}
      </div>
    </section>
  </>;
}

export function ContactPage() { const { locale } = useLocale(); const t = translations[locale]; return <><PageIntro number="07" eyebrow={t.contact} title="" copy={t.contactCopy} image="/manus-storage/IMG_9662_508d06f8.webp" /><section className="mx-auto grid max-w-[1600px] gap-12 px-5 py-18 lg:grid-cols-[.75fr_1.25fr] lg:px-10 lg:py-28"><div><p className="text-[.68rem] font-semibold uppercase tracking-[.16em] text-zinc-300">{t.whatsappBooking}</p><a href={buildBookingWhatsAppUrl(locale)} target="_blank" rel="noreferrer" className="mt-5 block text-2xl font-semibold tracking-[.12em] text-white transition hover:text-zinc-400 sm:text-3xl">{BOOKING_PHONE_DISPLAY}</a><p className="mt-6 max-w-md text-[.72rem] font-medium uppercase leading-7 tracking-[.08em] text-zinc-400">{locale === "az" ? "Tədbir formatı, tarix və məkan barədə qısa məlumatla birbaşa WhatsApp üzərindən yaza bilərsiniz." : "You can write directly on WhatsApp with a short outline of your event format, date and venue."}</p><WhatsAppLink className="mt-8 inline-flex items-center gap-2 border-b border-white/40 pb-2 text-[.72rem] font-bold uppercase tracking-[.15em] text-white transition hover:border-white hover:text-zinc-300">{t.whatsapp} <MessageCircle className="size-4" /></WhatsAppLink></div><div className="border-t border-white/20 pt-6"><p className="text-[.68rem] font-semibold uppercase tracking-[.16em] text-zinc-300">{t.formTitle}</p><h2 className="mt-4 max-w-xl text-xl font-medium leading-8 text-zinc-200 sm:text-2xl">{t.formCopy}</h2><div className="mt-10"><BookingForm locale={locale} /></div></div></section></>; }
