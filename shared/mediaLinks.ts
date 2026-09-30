export type MediaLinkCategory = "tv" | "press" | "music" | "concert";

export type MediaLink = {
  id: string;
  href: string;
  title: string;
  titleEn: string;
  source: string;
  category: MediaLinkCategory;
  youtubeId?: string;
};

export const mediaLinks: MediaLink[] = [
  {
    id: "kulis-meyxana",
    href: "https://kulis.az/xeber/media/cavidan-fatihi-meyxanani-ciddi-senet-kimi-sirimayin-musahibe-52252",
    title: "Meyxananı ciddi sənət kimi şişirtməyin — müsahibə",
    titleEn: "Interview: Do not present meyxana as serious art",
    source: "Kulis.az",
    category: "press",
  },
  {
    id: "bbc-azeri",
    href: "https://www.bbc.com/azeri/azerbaijan-45833081.amp",
    title: "BBC Azərbaycanca — Cavidan Fatihi",
    titleEn: "BBC Azerbaijani — Cavidan Fatihi",
    source: "BBC Azərbaycanca",
    category: "press",
  },
  {
    id: "youtube-1",
    href: "https://youtu.be/NN59gi9LCI8?si=FlTzd7g9NxRElFw4",
    title: "TV çıxışı və canlı söhbət",
    titleEn: "TV appearance and live conversation",
    source: "YouTube",
    category: "tv",
    youtubeId: "NN59gi9LCI8",
  },
  {
    id: "youtube-2",
    href: "https://youtu.be/DJhKjWCK8z4?si=aeEOerDvim_sw-v3",
    title: "Televiziya proqramında çıxış",
    titleEn: "Television programme appearance",
    source: "YouTube",
    category: "tv",
    youtubeId: "DJhKjWCK8z4",
  },
  {
    id: "youtube-3",
    href: "https://youtu.be/Xjp9nuOXT-o?si=2ekCCTjiya6I3RfG",
    title: "Musiqi proqramında müsahibə",
    titleEn: "Interview on a music programme",
    source: "YouTube",
    category: "music",
    youtubeId: "Xjp9nuOXT-o",
  },
  {
    id: "youtube-4",
    href: "https://youtu.be/e7YQ8wLw8D4?si=vlxM_yldp-n5kGPh",
    title: "Radio və musiqi söhbəti",
    titleEn: "Radio and music conversation",
    source: "YouTube",
    category: "music",
    youtubeId: "e7YQ8wLw8D4",
  },
  {
    id: "youtube-5",
    href: "https://youtu.be/xP4HMtzKR5A?si=lT0REBw7RMxkUkXE",
    title: "TV müsahibəsi",
    titleEn: "TV interview",
    source: "YouTube",
    category: "tv",
    youtubeId: "xP4HMtzKR5A",
  },
  {
    id: "youtube-6",
    href: "https://youtu.be/fseRT9jPDfQ?si=fqLceabSMF4vf86K",
    title: "Canlı ifa və efir çıxışı",
    titleEn: "Live performance and broadcast appearance",
    source: "YouTube",
    category: "tv",
    youtubeId: "fseRT9jPDfQ",
  },
  {
    id: "edebiyyat-incesenet",
    href: "https://www.edebiyyatveincesenet.az/musiqi/item/13846-dzhokh-faerzhli-taerzlaer-eshidaedzaeksiniz-dzavidan-fatehlae-musahibae",
    title: "Cavidan Fatihi ilə müsahibə",
    titleEn: "Interview with Cavidan Fatihi",
    source: "Ədəbiyyat və İncəsənət",
    category: "press",
  },
  {
    id: "youtube-7",
    href: "https://youtu.be/GwMphNG6PAo?si=xlybpBYgLFLbQBx7",
    title: "Musiqi verilişində çıxış",
    titleEn: "Music programme appearance",
    source: "YouTube",
    category: "music",
    youtubeId: "GwMphNG6PAo",
  },
  {
    id: "azerbaijan-news-festival",
    href: "https://azerbaijan-news.az/az/posts/detail/heyder-eliyev-merkezinin-parkinda-yay-festivalinin-baglanis-konserti-teskil-olunub-1724650229",
    title: "Yay festivalının bağlanış konserti",
    titleEn: "Summer festival closing concert",
    source: "Azərbaycan Xəbərləri",
    category: "concert",
  },
  {
    id: "youtube-8",
    href: "https://youtu.be/dxPcy2T9i3o?si=ngI3jjFv_epvzWk-",
    title: "Konsertdən canlı görüntülər",
    titleEn: "Live footage from a concert",
    source: "YouTube",
    category: "concert",
    youtubeId: "dxPcy2T9i3o",
  },
  {
    id: "azertag-festival",
    href: "https://azertag.az/xeber/heyder_eliyev_merkezinin_parkinda_yay_festivalinin_baglanis_konserti_teskil_olunub_video-3149914",
    title: "Yay festivalının bağlanış konserti — video",
    titleEn: "Summer festival closing concert — video",
    source: "AZƏRTAC",
    category: "concert",
  },
  {
    id: "525-social-media",
    href: "https://525.az/news/166139-sosial-media-menim-ucun-daha-elcatandir-cavidan-fatihi",
    title: "Sosial media mənim üçün daha əlçatandır",
    titleEn: "Social media is more accessible for me",
    source: "525-ci qəzet",
    category: "press",
  },
  {
    id: "lent-cana-cana",
    href: "https://lent.az/xeber/maqazin/cavidan-fatihi-menden-can-cana-oxumagimi-isteyirler-40657258",
    title: "Cavidan Fatihi: Məndən can-cana oxumağımı istəyirlər",
    titleEn: "Cavidan Fatihi: They want me to sing can-cana",
    source: "Lent.az",
    category: "press",
  },
  {
    id: "youtube-9",
    href: "https://youtu.be/YFsHp_mYPI8?si=MkHzWsxrlZtIous9",
    title: "TV və radio proqramında çıxış",
    titleEn: "TV and radio programme appearance",
    source: "YouTube",
    category: "tv",
    youtubeId: "YFsHp_mYPI8",
  },
  {
    id: "qht-5-ilin-zefer",
    href: "https://qht.az/az/xeber/5-ilin-zefer-sedasi-adli-konsert-proqrami-kecirilib-fotolar",
    title: "“5 ilin zəfər sədası” konsert proqramı",
    titleEn: "The concert programme “Echo of five years of victory”",
    source: "QHT.az",
    category: "concert",
  },
];
