export type MerchLocale = "az" | "en";

type MerchCopy = {
  title: string;
  description: string;
};

type LocalizedMerch = Record<MerchLocale, MerchCopy>;

export const localizedMerchByHandle: Record<string, LocalizedMerch> = {
  "xatire-limited-edition-vinyl": {
    az: {
      title: "Xatirə - Məhdud Sayda Vinil",
      description: "Cavidan Fatihi imzalı, məhdud sayda “Xatirə” vinil buraxılışı.",
    },
    en: {
      title: "Xatirə - Limited Edition Vinyl",
      description: "A signed, limited-edition vinyl release of “Xatirə” by Cavidan Fatihi.",
    },
  },
  "fatihi-tote-bag": {
    az: {
      title: "FATİHİ - Bez Çanta",
      description: "Gündəlik istifadə üçün Cavidan Fatihi imzalı FATİHİ bez çanta.",
    },
    en: {
      title: "FATİHİ - Tote Bag",
      description: "A signed FATİHİ tote bag made for everyday use.",
    },
  },
  "cavidanfatihi-keyrings": {
    az: {
      title: "CavidanFatihi - Açarlıqlar",
      description: "Cavidan Fatihi imzalı, gündəlik istifadə üçün seçilmiş açarlıq dəsti.",
    },
    en: {
      title: "CavidanFatihi - Keyrings",
      description: "A selected set of signed CavidanFatihi keyrings for everyday use.",
    },
  },
  "fatihi-cup": {
    az: {
      title: "FATİHİ - Fincan",
      description: "Cavidan Fatihi imzalı FATİHİ fincan.",
    },
    en: {
      title: "FATİHİ - Cup",
      description: "A signed FATİHİ cup from the official collection.",
    },
  },
  "fatihi-pullover-hoodie": {
    az: {
      title: "FATİHİ - Kapüşonlu Hoodie",
      description: "Cavidan Fatihi imzalı, rahat kəsimli FATİHİ pullover hoodie.",
    },
    en: {
      title: "FATİHİ - Pullover Hoodie",
      description: "A signed FATİHİ pullover hoodie with a relaxed fit.",
    },
  },
  "cf-hat": {
    az: {
      title: "CF - Kepka",
      description: "Cavidan Fatihi imzalı CF kepka.",
    },
    en: {
      title: "CF - Hat",
      description: "A signed CF hat from the official collection.",
    },
  },
};

export function getLocalizedMerch(handle: string, locale: MerchLocale, fallbackTitle: string): MerchCopy {
  return localizedMerchByHandle[handle]?.[locale] ?? { title: fallbackTitle, description: "" };
}
