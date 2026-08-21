import { useEffect } from "react";
import { useLocation } from "wouter";
import { type Locale, useLocale } from "@/contexts/LocaleContext";

const SITE_URL = "https://www.cavidanfatihi.com";
const SOCIAL_IMAGE = `${SITE_URL}/manus-storage/IMG_8446_f2f1cc25.webp`;
const LOGO = `${SITE_URL}/manus-storage/cf-monogram-black-square_15332b2e.png`;

type LocalizedMeta = Record<Locale, { title: string; description: string }>;

const pageMeta: Record<string, LocalizedMeta> = {
  "/": {
    az: {
      title: "Cavidan Fatihi | Rəsmi Sayt",
      description: "Cavidan Fatihinin rəsmi saytı: musiqi, konsertlər, kliplər, media və məhsul kataloqu.",
    },
    en: {
      title: "Cavidan Fatihi | Official Website",
      description: "The official website of Cavidan Fatihi: music, concerts, videos, media and official merchandise.",
    },
  },
  "/about": {
    az: {
      title: "Cavidan Fatihi haqqında | Bioqrafiya",
      description: "Cavidan Fatihinin bioqrafiyası, musiqi yolunun başlanğıcı və yaradıcılıq hekayəsi.",
    },
    en: {
      title: "About Cavidan Fatihi | Biography",
      description: "Read the biography, musical journey and creative story of Cavidan Fatihi.",
    },
  },
  "/concerts": {
    az: {
      title: "Cavidan Fatihi konsertləri | Canlı çıxışlar",
      description: "Cavidan Fatihinin canlı çıxışları, konsert görüntüləri və səhnə anları.",
    },
    en: {
      title: "Cavidan Fatihi Concerts | Live Performances",
      description: "Explore live performances, concert footage and stage moments from Cavidan Fatihi.",
    },
  },
  "/music": {
    az: {
      title: "Cavidan Fatihi musiqiləri | Rəsmi platformalar",
      description: "Cavidan Fatihinin rəsmi musiqilərini Spotify, Apple Music, Deezer və YouTube-da dinləyin.",
    },
    en: {
      title: "Cavidan Fatihi Music | Official Platforms",
      description: "Listen to official Cavidan Fatihi music on Spotify, Apple Music, Deezer and YouTube.",
    },
  },
  "/media": {
    az: {
      title: "Cavidan Fatihi media | Foto və videolar",
      description: "Cavidan Fatihinin konsert, səhnəarxası və fotosessiya görüntülərindən seçilmiş media arxivi.",
    },
    en: {
      title: "Cavidan Fatihi Media | Photos and Videos",
      description: "Browse selected concert, backstage and portrait media from Cavidan Fatihi.",
    },
  },
  "/shop": {
    az: {
      title: "Cavidan Fatihi məhsulları | Rəsmi kataloq",
      description: "Cavidan Fatihinin rəsmi məhsul kataloqu: vinil, hoodie, kepka, fincan, çanta və açarlıqlar.",
    },
    en: {
      title: "Cavidan Fatihi Merchandise | Official Catalogue",
      description: "Explore official Cavidan Fatihi merchandise including vinyl, hoodie, hat, cup, tote bag and keyrings.",
    },
  },
  "/contact": {
    az: {
      title: "Cavidan Fatihi ilə əlaqə | Əməkdaşlıq",
      description: "Tədbir, konsert və yaradıcı əməkdaşlıq üçün Cavidan Fatihi ilə əlaqə saxlayın.",
    },
    en: {
      title: "Contact Cavidan Fatihi | Booking",
      description: "Contact Cavidan Fatihi for events, concerts and creative collaborations.",
    },
  },
};

function setMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = url;
}

export function SeoMeta() {
  const [location] = useLocation();
  const { locale } = useLocale();
  const path = location === "/" ? "/" : location.replace(/\/+$/, "");
  const meta = (pageMeta[path] ?? pageMeta["/"])[locale];
  const canonicalUrl = `${SITE_URL}${path}`;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = meta.title;
    setMeta('meta[name="description"]', "name", "description", meta.description);
    setMeta('meta[property="og:title"]', "property", "og:title", meta.title);
    setMeta('meta[property="og:description"]', "property", "og:description", meta.description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[property="og:image"]', "property", "og:image", SOCIAL_IMAGE);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", meta.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", meta.description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", SOCIAL_IMAGE);
    setCanonical(canonicalUrl);

    const schema = [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Cavidan Fatihi",
        alternateName: "CavidanFatihi",
        url: SITE_URL,
        image: SOCIAL_IMAGE,
        logo: LOGO,
        jobTitle: "Musician",
        telephone: "+994992991177",
        sameAs: [
          "https://www.facebook.com/fatihicavidan",
          "https://www.instagram.com/cavidanfatihi/",
          "https://open.spotify.com/intl-tr/artist/3AEqDrB4idgxwcyyU5tiki",
          "https://music.apple.com/az/artist/cavidan-fatihi/1595136758",
          "https://www.deezer.com/en/artist/151213112",
          "https://www.youtube.com/channel/UCImTvP7AwEg-co6yJmJe2TA/videos",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: meta.title,
        description: meta.description,
        url: canonicalUrl,
        inLanguage: locale === "az" ? "az" : "en",
        isPartOf: {
          "@type": "WebSite",
          name: "Cavidan Fatihi",
          url: SITE_URL,
        },
      },
    ];

    let structuredData = document.head.querySelector<HTMLScriptElement>('script[data-cavidan-seo="structured-data"]');
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.type = "application/ld+json";
      structuredData.dataset.cavidanSeo = "structured-data";
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(schema);
  }, [canonicalUrl, locale, meta.description, meta.title]);

  return null;
}
