export const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@cavidanfatihi" },
  { label: "Instagram", href: "https://www.instagram.com/cavidanfatihi/" },
  { label: "Spotify", href: "https://open.spotify.com/intl-tr/artist/3AEqDrB4idgxwcyyU5tiki" },
  { label: "Apple Music", href: "https://music.apple.com/az/artist/cavidan-fatihi/1595136758" },
  { label: "TikTok", href: "https://www.tiktok.com/@cavidanfatihi" },
  { label: "Facebook", href: "https://www.facebook.com/fatihicavidan" },
  { label: "X", href: "https://x.com/CavidanFatihi" },
] as const;

export type GalleryCategory = "all" | "concert" | "session" | "backstage";

export type GalleryItem = {
  src: string;
  category: Exclude<GalleryCategory, "all">;
  alt: string;
};

export type GalleryLocale = "az" | "en";

export const galleryItems: GalleryItem[] = [
  { src: "/manus-storage/IMG_2412_bf2c98fd.JPG", category: "concert", alt: "Cavidan Fatihi konsert anı" },
  { src: "/manus-storage/IMG_20210628_130144_929_29dd54a9.JPG", category: "concert", alt: "Konsertdən səhnə görüntüsü" },
  { src: "/manus-storage/IMG_9661_d08d2c57.webp", category: "concert", alt: "Cavidan Fatihi səhnədə" },
  { src: "/manus-storage/IMG_9662_508d06f8.webp", category: "concert", alt: "Canlı ifa görüntüsü" },
  { src: "/manus-storage/_M5T1727_4098138f.webp", category: "concert", alt: "Konsert işıqları altında ifa" },
  { src: "/manus-storage/IMG_9729_ca222a09.webp", category: "concert", alt: "Səhnə performansı" },
  { src: "/manus-storage/IMG_9667_c13605b3.webp", category: "concert", alt: "Konsert atmosferi" },
  { src: "/manus-storage/IMG_4082_f034e579.webp", category: "concert", alt: "Canlı musiqi anı" },
  { src: "/manus-storage/IMG_3435_90049385.JPG", category: "session", alt: "Peşəkar fotosessiya portreti" },
  { src: "/manus-storage/2019-10-0702.54.021copy-1_cf9521cf.webp", category: "session", alt: "Fotosessiya görüntüsü" },
  { src: "/manus-storage/IMG_1925_a27fb084.webp", category: "session", alt: "Cavidan Fatihi portreti" },
  { src: "/manus-storage/IMG_0726_d83aa2df.webp", category: "session", alt: "Studiya portreti" },
  { src: "/manus-storage/IMG_8446_f2f1cc25.webp", category: "session", alt: "Cavidan Fatihi rəsmi profil portreti" },
  { src: "/manus-storage/DSC07769_78dad879.webp", category: "session", alt: "Fotosessiya portreti" },
  { src: "/manus-storage/IMG_1932_56630017.webp", category: "session", alt: "Peşəkar portret" },
  { src: "/manus-storage/IMG_2811_12344922.webp", category: "session", alt: "Fotosessiya görüntüsü" },
  { src: "/manus-storage/IMG_8851_679519fc.webp", category: "session", alt: "Peşəkar fotosessiya" },
  { src: "/manus-storage/IMG_8855_2a3109af.webp", category: "session", alt: "Cavidan Fatihi portreti" },
  { src: "/manus-storage/IMG_1926_b8114bf8.webp", category: "session", alt: "Studiya fotosessiyası" },
  { src: "/manus-storage/IMG_2820_b4064311.webp", category: "session", alt: "Musiqiçi portreti" },
  { src: "/manus-storage/IMG_9824_b1c20ab5.webp", category: "session", alt: "Fotosessiya kadrı" },
  { src: "/manus-storage/IMG_8438_c22cd5bc.webp", category: "session", alt: "Gitara ilə portret" },
  { src: "/manus-storage/IMG_2814_1629574b.webp", category: "session", alt: "Peşəkar portret görüntüsü" },
  { src: "/manus-storage/IMG_9820_2ff853e3.webp", category: "session", alt: "Fotosessiya görüntüsü" },
  { src: "/manus-storage/IMG_9827_5213b4a0.webp", category: "session", alt: "Portret fotosessiyası" },
  { src: "/manus-storage/IMG_9561_90b8df5b.webp", category: "session", alt: "Cavidan Fatihi peşəkar portreti" },
  { src: "/manus-storage/IMG_6379_78130cea.webp", category: "backstage", alt: "Kadr arxası an" },
  { src: "/manus-storage/IMG_6377_11a0c80a.webp", category: "backstage", alt: "Backstage portreti" },
  { src: "/manus-storage/_AHM2862-01_f090d351.webp", category: "backstage", alt: "Qrup ilə səhnəarxası an" },
  { src: "/manus-storage/_AHM2914_5b65de39.webp", category: "backstage", alt: "Qrup backstage görüntüsü" },
];

export function filterGalleryItems(category: GalleryCategory) {
  return category === "all" ? galleryItems : galleryItems.filter(item => item.category === category);
}

export function getLocalizedGalleryAlt(item: GalleryItem, locale: GalleryLocale) {
  if (locale === "az") return item.alt;
  const categoryAlt = {
    concert: "Cavidan Fatihi in live performance",
    session: "Cavidan Fatihi portrait session",
    backstage: "Cavidan Fatihi behind the scenes",
  } as const;
  return categoryAlt[item.category];
}

const galleryObjectPositions: Record<string, string> = {
  "/manus-storage/IMG_3435_90049385.JPG": "object-[50%_8%]",
  "/manus-storage/IMG_1925_a27fb084.webp": "object-[50%_10%]",
  "/manus-storage/IMG_0726_d83aa2df.webp": "object-[50%_8%]",
  "/manus-storage/IMG_8446_f2f1cc25.webp": "object-[50%_6%]",
  "/manus-storage/IMG_8438_c22cd5bc.webp": "object-[50%_8%]",
  "/manus-storage/IMG_9561_90b8df5b.webp": "object-[50%_10%]",
  "/manus-storage/IMG_6379_78130cea.webp": "object-[50%_8%]",
  "/manus-storage/IMG_6377_11a0c80a.webp": "object-[50%_8%]",
};

export function getGalleryObjectPosition(item: GalleryItem) {
  return galleryObjectPositions[item.src] ?? "object-top";
}
