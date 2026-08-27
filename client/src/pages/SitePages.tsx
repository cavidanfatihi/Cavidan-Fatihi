import { BookingForm } from "@/components/BookingForm";
import { buildCatalogWhatsAppUrl, catalogProducts } from "@/data/catalog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useLocale } from "@/contexts/LocaleContext";
import { trpc } from "@/lib/trpc";
import { filterGalleryItems, getGalleryObjectPosition, getLocalizedGalleryAlt, type GalleryCategory, type GalleryItem } from "@shared/siteContent";
import { musicPlatforms, officialYouTubeReleases } from "@shared/musicCatalog";
import { BOOKING_PHONE_DISPLAY, buildBookingWhatsAppUrl } from "@shared/siteBrand";
import { ArrowDownRight, CalendarDays, ChevronRight, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useMemo, useRef, useState } from "react";

export { default as HomePage } from "./HomePage";

const translations = {
  az: {
    home: "Ana səhifə", latest: "Son buraxılış", listen: "Dinlə", preview: "Səssiz klip önizləməsi", booking: "Əməkdaşlıq üçün yaz", about: "Bioqrafiya", concerts: "Konsertlər", music: "Musiqi", media: "Media", shop: "Mağaza", contact: "Əlaqə", explore: "Kəşf et", upcoming: "Növbəti tarixlər tezliklə elan olunacaq.", eventHint: "Yeni səhnə tarixləri və bilet keçidləri burada paylaşılacaq.", biography: "Bioqrafiya", selected: "Seçilmiş anlar", all: "Hamısı", concert: "Konsert", session: "Fotosessiya", backstage: "Backstage", clips: "Rəsmi kliplər", catalogue: "Rəsmi məhsullar", noProducts: "Merch kolleksiyası tezliklə genişlənəcək.", noProductsHint: "İlk məhsul seçimi artıq mağazada görünür; yeni parçalar əlavə olunduqca burada yer alacaq.", add: "Səbətə əlavə et", contactTitle: "Bir səhnə, bir fikir, bir layihə.", contactCopy: "Tədbir, ad günü, korporativ gecə, toy-nişan və ya xüsusi yaradıcı layihə üçün əlaqə saxlayın.", whatsapp: "WhatsApp ilə yaz", formTitle: "Müraciətinizi göndərin", formCopy: "Tarix, məkan və istədiyiniz formatı paylaşın.", timeline: ["Yevlax · məktəb illəri və fortepiano", "Təhsil · gitara ilə yenidən musiqiyə dönüş", "Sənsiz · professional musiqi karyerasının başlanğıcı"], upNext: "NÖVBƏTİ", live: "CANLI", spotify: "Spotify", youtube: "YouTube", image: "Görüntü", slide: "Slayd", whatsappBooking: "WhatsApp ilə əməkdaşlıq",
  },
  en: {
    home: "Home", latest: "Latest release", listen: "Listen", preview: "Silent video preview", booking: "Book an event", about: "About", concerts: "Concerts", music: "Music", media: "Media", shop: "Shop", contact: "Contact", explore: "Explore", upcoming: "New dates will be announced soon.", eventHint: "Upcoming shows, cities and ticket links will be shared here.", biography: "Biography", selected: "Selected moments", all: "All", concert: "Concerts", session: "Portraits", backstage: "Backstage", clips: "Official videos", catalogue: "Official merchandise", noProducts: "The merch collection will grow soon.", noProductsHint: "The first official item is already in the shop; new pieces will appear here as the collection expands.", add: "Add to bag", contactTitle: "A stage, an idea, a project.", contactCopy: "For events, birthdays, corporate evenings, weddings, engagements and special creative projects, get in touch.", whatsapp: "Message on WhatsApp", formTitle: "Send an enquiry", formCopy: "Share the date, venue and format you have in mind.", timeline: ["Yevlakh · early years, school and piano", "Education · rediscovering music through guitar", "Sənsiz · the beginning of a professional music career"], upNext: "UP NEXT", live: "LIVE", spotify: "Spotify", youtube: "YouTube", image: "Image", slide: "Slide", whatsappBooking: "Booking via WhatsApp",
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
      "Cavidan Fatihi — 30 iyul 1994-cü ildə Azərbaycanın Yevlax şəhərində anadan olmuş azərbaycanlı müğənni, musiqiçi və ifaçıdır. 10 ildən artıqdır peşəkar səhnə fəaliyyətində olan sənətçi özünəməxsus vokal tembri, gitara ifası və canlı performansları ilə tanınır. Onun yaradıcılığında Azərbaycan musiqisinin melodik irsi, retro estetika, akustik səslənmə və müasir musiqi elementləri özünəməxsus şəkildə bir araya gəlir.",
      "Cavidan Fatihinin ifa üslubunu fərqləndirən əsas cəhətlərdən biri səsindəki özünəməxsus rəng və sehrli ahəngdir — bu xüsusiyyət onun ifa etdiyi əsərlərə fərqli emosional dərinlik və yadda qalan xarakter bəxş edir. O, Azərbaycan dili ilə yanaşı, müxtəlif dillərdə ifaları ilə də repertuarının coğrafiyasını genişləndirərək fərqli musiqi mədəniyyətlərinə müraciət edir.",
      "Sənətçi yaradıcılıq fəaliyyəti ərzində həm müəllif əsərləri, həm də Azərbaycan musiqisinin tanınmış nümunələrinə verdiyi yeni interpretasiyalarla geniş auditoriya qazanıb. Onun ifasında təqdim etdiyi “Xatirə” mahnısı YouTube platformasında milyonlarla baxış toplayaraq yaradıcılığının ən çox tanınan işlərindən birinə çevrilib. Daha sonra Cavidan Fatihi həmin əsəri Azərbaycanın Xalq artisti Mübariz Tağıyev ilə böyük və mötəbər dövlət tədbirlərindən birində duet şəklində ifa edib.",
      "Cavidan Fatihi yalnız ifaçı kimi deyil, həm də bəstəkar, aranjimançı və musiqi prodüseri kimi fəaliyyət göstərir. Musiqinin yaradıcı və texniki mərhələlərində iştirak etməsi ona əsərlərin ideyasından son səslənməsinə qədər bütöv yaradıcılıq prosesini formalaşdırmaq imkanı verir. Bu çoxşaxəli fəaliyyət onun fərdi musiqi dilinin və artistik üslubunun formalaşmasında mühüm rol oynayır.",
      "Müxtəlif illərdə tanınmış sənətçilərlə eyni səhnəni bölüşən Cavidan Fatihi solo konsert proqramları və canlı musiqi layihələri ilə də çıxış edib. Onun musiqiləri YouTube, Spotify, Apple Music və digər rəqəmsal platformalarda yayımlanır.",
      "Hazırda Cavidan Fatihi yeni müəllif layihələri, musiqi prodakşnı və canlı səhnə proqramları üzərində fəaliyyətini davam etdirir. Sənətçi Azərbaycan musiqisinin zəngin irsini müasir ifa dili ilə təqdim etməklə yanaşı, yaradıcılığını beynəlxalq səhnəyə daşımağı və Azərbaycan musiqisini daha geniş auditoriyaya çatdırmağı qarşısına məqsəd qoyur.",
    ],
  } : {
    heading: "Cavidan Fatihi",
    paragraphs: [
      "Cavidan Fatihi is an Azerbaijani singer, musician and performer, born on 30 July 1994 in Yevlakh, Azerbaijan. With more than a decade of professional stage experience, he is known for his distinctive vocal tone, guitar playing and live performances. His work brings together the melodic heritage of Azerbaijani music, retro aesthetics, acoustic sonics and contemporary musical elements in a personal way.",
      "One of the defining qualities of Cavidan Fatihi’s performance style is the unique colour and captivating resonance in his voice. This gives the works he performs a distinct emotional depth and memorable character. Alongside Azerbaijani, his performances in different languages broaden the scope of his repertoire and engage with a range of musical cultures.",
      "Throughout his creative career, the artist has built a wide audience through both original works and new interpretations of well-known Azerbaijani music. His rendition of “Xatirə” has received millions of views on YouTube, becoming one of his best-known works. Later, Cavidan Fatihi performed the piece as a duet with People’s Artist of Azerbaijan Mübariz Tağıyev at a major state event.",
      "Cavidan Fatihi works not only as a performer, but also as a composer, arranger and music producer. His involvement in music’s creative and technical stages allows him to shape the full artistic process, from an idea to a finished sound. This multidisciplinary practice plays an important role in forming his individual musical language and artistic identity.",
      "Over the years, Cavidan Fatihi has shared the stage with acclaimed artists and has also appeared with solo concert programmes and live music projects. His music is available on YouTube, Spotify, Apple Music and other digital platforms.",
      "Cavidan Fatihi is currently continuing work on new original projects, music production and live stage programmes. While presenting Azerbaijan’s rich musical heritage through a contemporary performance language, he aims to bring his work to international stages and introduce Azerbaijani music to a wider audience.",
    ],
  };
  return <><PageIntro number="01" eyebrow={t.about} title="" copy="" image="/manus-storage/IMG_8446_f2f1cc25.webp" portrait colorOnHover /><section className="mx-auto grid max-w-[1600px] gap-12 px-5 py-18 lg:grid-cols-[.72fr_1.28fr] lg:px-10 lg:py-28"><div className="lg:sticky lg:top-28 lg:h-fit"><img src="/manus-storage/IMG_3435_90049385.JPG" alt="Cavidan Fatihi" className="aspect-[4/5] w-full object-cover object-top brightness-110 contrast-110 grayscale transition duration-700 hover:brightness-100 hover:grayscale-0" /><p className="mono mt-5 text-zinc-500">CAVIDAN FATIHI / 1994 —</p></div><div><h1 className="type-display text-5xl leading-none text-white sm:text-7xl">{biography.heading}</h1><div className="mt-10 max-w-2xl space-y-7 text-base leading-8 text-zinc-300">{biography.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></div></section></>;
}

export function ConcertsPage() { const { locale } = useLocale(); const t = translations[locale]; const images = filterGalleryItems("concert"); return <><section className="relative isolate min-h-[72svh] overflow-hidden bg-black"><BackgroundVideo src="/manus-storage/solo-konsert-hero-loop-720p_cf221356.mp4" title={locale === "az" ? "Cavidan Fatihi solo konsert görüntüləri" : "Cavidan Fatihi solo concert footage"} poster="/manus-storage/solo-konsert-poster_5e2cafda.jpg" /><div className="absolute inset-0 z-20 bg-black/35" /><h1 className="sr-only">{t.concerts}</h1></section><section aria-labelledby="concert-gallery" className="mx-auto max-w-[1600px] px-5 py-10 lg:px-10 lg:py-16"><h2 id="concert-gallery" className="sr-only">{t.concerts}</h2><div className="grid gap-3 md:grid-cols-3">{images.slice(0, 6).map(image => <article key={image.src} className="overflow-hidden bg-zinc-900"><img src={image.src} alt={getLocalizedGalleryAlt(image, locale)} className="aspect-[4/3] w-full object-cover object-top grayscale transition duration-700 hover:scale-105 hover:grayscale-0" /></article>)}</div></section></>; }

export function MusicPage() { const { locale } = useLocale(); const t = translations[locale]; return <><PageIntro number="03" eyebrow={t.music} title="" copy={locale === "az" ? "Bütün rəsmi platformalar və Cavidan Fatihi kanalı." : "Official music platforms and the Cavidan Fatihi channel."} image="/manus-storage/IMG_8438_c22cd5bc.webp" colorOnHover /><section className="mx-auto max-w-[1600px] px-5 py-18 lg:px-10 lg:py-28"><div className="grid gap-px border border-white/15 sm:grid-cols-2 lg:grid-cols-4">{musicPlatforms.map(platform => <a key={platform.id} href={platform.href} target="_blank" rel="noreferrer" className="group flex min-h-32 flex-col justify-between bg-black p-6 transition hover:bg-white hover:text-black"><span className="mono text-zinc-400 transition group-hover:text-zinc-600">{locale === "az" ? "Dinlə" : "Listen"}</span><span className="flex items-center justify-between gap-4 text-xl font-semibold tracking-[.04em]"><span>{platform.label}</span><ArrowDownRight className="size-5 transition group-hover:translate-x-1 group-hover:translate-y-1" /></span></a>)}</div><div className="mt-18 max-w-4xl"><div className="flex items-end justify-between gap-4"><div><p className="mono">{t.youtube}</p><h2 className="type-display mt-3 text-4xl sm:text-6xl">{t.clips}</h2></div><a href={musicPlatforms[3].href} target="_blank" rel="noreferrer" className="line-link">YouTube <ChevronRight className="size-4" /></a></div><p className="mt-4 text-sm leading-7 text-zinc-400">{locale === "az" ? `${officialYouTubeReleases.length} rəsmi video yayımı` : `${officialYouTubeReleases.length} official video releases`}</p><div className="mt-8 border-y border-white/15">{officialYouTubeReleases.map((video, index) => <a key={video.id} href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-5 border-b border-white/10 py-5 last:border-b-0"><span className="mono shrink-0 text-zinc-500">{String(index + 1).padStart(2, "0")}</span><span className="flex-1 text-base font-medium tracking-[.04em] text-zinc-100 transition group-hover:text-white sm:text-lg">{video.title}</span><span aria-label={locale === "az" ? `${video.title} videosunu YouTube-da aç` : `Open ${video.title} on YouTube`} className="text-[.65rem] font-bold uppercase tracking-[.15em] text-zinc-400 transition group-hover:text-white">YouTube</span><ChevronRight className="size-4 shrink-0 text-zinc-500 transition group-hover:translate-x-1 group-hover:text-white" /></a>)}</div></div></section></>; }

export function MediaPage() { const { locale } = useLocale(); const t = translations[locale]; const [filter, setFilter] = useState<GalleryCategory>("all"); const [selected, setSelected] = useState<GalleryItem | null>(null); const images = useMemo(() => filterGalleryItems(filter), [filter]); const filters: { value: GalleryCategory; label: string }[] = [{ value: "all", label: t.all }, { value: "concert", label: t.concert }, { value: "session", label: t.session }, { value: "backstage", label: t.backstage }]; return <><PageIntro number="04" eyebrow={t.media} title="" copy="" image="/manus-storage/IMG_1926_b8114bf8.webp" portrait colorOnHover /><section className="mx-auto max-w-[1600px] px-5 py-18 lg:px-10 lg:py-28"><div className="flex flex-wrap gap-2">{filters.map(item => <button onClick={() => setFilter(item.value)} key={item.value} className={`border px-4 py-2 text-[.68rem] uppercase tracking-[.13em] transition ${filter === item.value ? "border-white bg-white text-black" : "border-white/20 text-zinc-500 hover:border-white hover:text-white"}`}>{item.label}</button>)}</div><div className="mt-8 columns-2 gap-3 sm:columns-3 lg:columns-4">{images.map((image, index) => <button onClick={() => setSelected(image)} key={image.src} className="group relative mb-3 block w-full overflow-hidden bg-zinc-900 text-left"><img src={image.src} alt={getLocalizedGalleryAlt(image, locale)} loading="lazy" className={`w-full object-cover ${getGalleryObjectPosition(image)} brightness-110 contrast-110 grayscale transition duration-700 group-hover:scale-105 group-hover:brightness-100 group-hover:grayscale-0 ${index % 5 === 0 ? "aspect-square" : ""}`} /><span className="absolute inset-0 bg-white/0 transition group-hover:bg-white/10" /></button>)}</div></section><Dialog open={Boolean(selected)} onOpenChange={open => !open && setSelected(null)}><DialogContent className="max-h-[92vh] max-w-5xl border-white/15 bg-black p-2 text-white"><DialogTitle className="sr-only">{selected ? getLocalizedGalleryAlt(selected, locale) : t.image}</DialogTitle>{selected && <img src={selected.src} alt={getLocalizedGalleryAlt(selected, locale)} className="max-h-[85vh] w-full object-contain" />}</DialogContent></Dialog></>; }

export function ShopPage() {
  const { locale } = useLocale();
  const t = translations[locale];
  const catalogTitle = locale === "az" ? "Rəsmi məhsullar" : "Official collection";
  const catalogCopy = locale === "az" ? "Məhsul haqqında məlumat və sifariş üçün birbaşa WhatsApp-dan yazın." : "Message directly on WhatsApp for product details and orders.";
  const orderLabel = locale === "az" ? "WhatsApp ilə soruş" : "Ask on WhatsApp";

  return <>
    <PageIntro number="05" eyebrow={t.shop} title="" copy={locale === "az" ? "Rəsmi Cavidan Fatihi məhsulları və seçilmiş kolleksiya." : "Official Cavidan Fatihi products and selected collection."} image="/manus-storage/IMG_0726_d83aa2df.webp" />
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

export function ContactPage() { const { locale } = useLocale(); const t = translations[locale]; return <><PageIntro number="06" eyebrow={t.contact} title="" copy={t.contactCopy} image="/manus-storage/IMG_9662_508d06f8.webp" /><section className="mx-auto grid max-w-[1600px] gap-12 px-5 py-18 lg:grid-cols-[.75fr_1.25fr] lg:px-10 lg:py-28"><div><p className="text-[.68rem] font-semibold uppercase tracking-[.16em] text-zinc-300">{t.whatsappBooking}</p><a href={buildBookingWhatsAppUrl(locale)} target="_blank" rel="noreferrer" className="mt-5 block text-2xl font-semibold tracking-[.12em] text-white transition hover:text-zinc-400 sm:text-3xl">{BOOKING_PHONE_DISPLAY}</a><p className="mt-6 max-w-md text-[.72rem] font-medium uppercase leading-7 tracking-[.08em] text-zinc-400">{locale === "az" ? "Tədbir formatı, tarix və məkan barədə qısa məlumatla birbaşa WhatsApp üzərindən yaza bilərsiniz." : "You can write directly on WhatsApp with a short outline of your event format, date and venue."}</p><WhatsAppLink className="mt-8 inline-flex items-center gap-2 border-b border-white/40 pb-2 text-[.72rem] font-bold uppercase tracking-[.15em] text-white transition hover:border-white hover:text-zinc-300">{t.whatsapp} <MessageCircle className="size-4" /></WhatsAppLink></div><div className="border-t border-white/20 pt-6"><p className="text-[.68rem] font-semibold uppercase tracking-[.16em] text-zinc-300">{t.formTitle}</p><h2 className="mt-4 max-w-xl text-xl font-medium leading-8 text-zinc-200 sm:text-2xl">{t.formCopy}</h2><div className="mt-10"><BookingForm locale={locale} /></div></div></section></>; }
