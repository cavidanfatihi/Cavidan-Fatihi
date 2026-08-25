export type CatalogLocale = "az" | "en";

export type CatalogProduct = {
  id: string;
  image: string;
  price: number;
  az: {
    title: string;
    description: string;
  };
  en: {
    title: string;
    description: string;
  };
};

export const catalogProducts: CatalogProduct[] = [
  {
    id: "keyrings",
    image: "/manus-storage/cf-keyrings-monogram_11d64340.webp",
    price: 8,
    az: {
      title: "CavidanFatihi — Açarlıqlar",
      description: "Cavidan Fatihi imzalı, gündəlik istifadə üçün seçilmiş açarlıq dəsti.",
    },
    en: {
      title: "CavidanFatihi — Keyrings",
      description: "A selected Cavidan Fatihi keyring set for everyday use.",
    },
  },
  {
    id: "hat",
    image: "/manus-storage/cf-hat-monogram_becad9b0.webp",
    price: 15,
    az: {
      title: "CF — Kepka",
      description: "Cavidan Fatihi imzalı CF kepka.",
    },
    en: {
      title: "CF — Hat",
      description: "A signed CF hat from the official collection.",
    },
  },
  {
    id: "cup",
    image: "/manus-storage/cf-cup-monogram_37860047.webp",
    price: 10,
    az: {
      title: "FATİHİ — Fincan",
      description: "Cavidan Fatihi imzalı FATİHİ fincan.",
    },
    en: {
      title: "FATİHİ — Cup",
      description: "A signed FATİHİ cup from the official collection.",
    },
  },
  {
    id: "hoodie",
    image: "/manus-storage/cf-hoodie-fatihi-thin_681d723e.webp",
    price: 50,
    az: {
      title: "FATİHİ — Kapüşonlu Hoodie",
      description: "Cavidan Fatihi imzalı, rahat kəsimli FATİHİ pullover hoodie.",
    },
    en: {
      title: "FATİHİ — Pullover Hoodie",
      description: "A signed FATİHİ pullover hoodie with a relaxed fit.",
    },
  },
  {
    id: "tote",
    image: "/manus-storage/cf-tote-fatihi-thin_5d27b4f4.webp",
    price: 15,
    az: {
      title: "FATİHİ — Bez Çanta",
      description: "Gündəlik istifadə üçün Cavidan Fatihi imzalı FATİHİ bez çanta.",
    },
    en: {
      title: "FATİHİ — Tote Bag",
      description: "A Cavidan Fatihi tote bag for everyday use.",
    },
  },
  {
    id: "vinyl",
    image: "/manus-storage/cf-vinyl-fatihi-thin_ae6d8e28.webp",
    price: 40,
    az: {
      title: "Xatirə — Məhdud Sayda Vinil",
      description: "Cavidan Fatihi imzalı, məhdud sayda “Xatirə” vinil buraxılışı.",
    },
    en: {
      title: "Xatirə — Limited Edition Vinyl",
      description: "A signed, limited-edition vinyl release of “Xatirə” by Cavidan Fatihi.",
    },
  },
];

export function buildCatalogWhatsAppUrl(title: string, price: number, locale: CatalogLocale) {
  const message = locale === "az"
    ? `Salam, ${title} (AZN ${price}) haqqında məlumat almaq və sifariş vermək istəyirəm.`
    : `Hello, I would like to ask about and order ${title} (AZN ${price}).`;
  return `https://wa.me/994992991177?text=${encodeURIComponent(message)}`;
}
