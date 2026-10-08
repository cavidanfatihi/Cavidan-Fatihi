export type MediaItem = {
  id: string;
  kind: "video" | "article";
  title: string;
  href: string;
  image: string;
  source: string;
  startSeconds?: number;
};

const youtube = (id: string, title: string, href = `https://www.youtube.com/watch?v=${id}`, startSeconds?: number): MediaItem => ({
  id: `youtube-${id}`,
  kind: "video",
  title,
  href: startSeconds ? `${href}&t=${startSeconds}s` : href,
  image: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  source: "YouTube",
  startSeconds,
});

const article = (id: string, title: string, href: string, image: string, source: string): MediaItem => ({ id, kind: "article", title, href, image, source });

const mediaItemsBase: MediaItem[] = [
  youtube("UJ1vhixlt7E", "Bella ciao | Cavidan Fatihi | TEDxBHOS", "https://www.youtube.com/watch?v=UJ1vhixlt7E"),
  youtube("fseRT9jPDfQ", "İntizar | Cavidan Fatihi | TEDxBHOS", "https://www.youtube.com/watch?v=fseRT9jPDfQ"),
  youtube("nhYLVF0tFfM", "Space tv- Novruz bayramı buraxılışı", "https://www.youtube.com/watch?v=nhYLVF0tFfM"),
  youtube("lKenR9fWcBU", "Space Tv - Dördün ağı - tokşou", "https://www.youtube.com/watch?v=lKenR9fWcBU"),
  youtube("YWc7K5uOlvE", "Hekayəm Var - Stand Up şou", "https://www.youtube.com/watch?v=YWc7K5uOlvE"),
  youtube("DJhKjWCK8z4", "Dəşti | Cavidan Fatihi | TEDxBHOS", "https://www.youtube.com/watch?v=DJhKjWCK8z4"),
  youtube("7edatnHtVAE", "Tezdən oyan 17.03.2021"),
  youtube("AonFQCocN4g", "YERALTI #8 | YUXU rock qrupu tribute"),
  youtube("6SWlyNO8XeE", "Sənətin səsi verilişinin növbəti qonağı Cavidan Fatihidir", "https://www.youtube.com/watch?v=6SWlyNO8XeE", 12),
  youtube("ZScDAHKJtlU", "Akustik - Cavidan Fatihi | 13.09.2023"),
  youtube("dxPcy2T9i3o", "YERALTI: söhbət var #58 | Şahin Əlizadə, Cavidan Fatihi, Zaur Kərimli"),
  youtube("KyPkhjvF1gE", "Akustik - Cavidan Fatihi | 30.10.2025"),
  youtube("259lKa8K-xU", "Cavidan Fatihi - Xatirə"),
  youtube("rYk36qwts28", "#dogmaistedadlar - Cavidan Fatihi", "https://www.youtube.com/watch?v=rYk36qwts28", 131),
  youtube("ThwZ2TIb5yM", "Çölçünün Səsi - Cavidan Fatihi - Səndən Nigaranam"),
  youtube("VWr3hRCXru4", "Cavidan Fatihi, Elvin Paşa, Rəşad Nağı Mustafa və Fariz İlyas ilə Bir Axşam Səhnədə", "https://www.youtube.com/watch?v=VWr3hRCXru4", 738),
  youtube("_fy3vgN0YuU", "Qaranın Səsi (18.02.2022)", "https://www.youtube.com/watch?v=_fy3vgN0YuU", 1457),
  youtube("3912BgHt7gA", "Söhbət-4 | Cavidan Fatihi (Tərlədən suallar!)", "https://www.youtube.com/watch?v=3912BgHt7gA", 22),
  youtube("t-QDbnT5i3o", "8 Mart Beynəlxalq Qadınlar Günü konsert buraxılışı | Kazım Can | Cavidan Fatihi", "https://www.youtube.com/watch?v=t-QDbnT5i3o", 1031),
  youtube("STyBZUCTC6I", "GEDİRƏM... (Cavidan Fatihi - Yada sal məni)"),
  youtube("Z4WQjH6uZbg", "Music Room #2 | Şahin Əlizadə, Kadir Özel, Cavidan Fatihi, Ravan, Sadiq Abbasov, Eren Mumcu"),
  youtube("OthTuGAKu_4", "Karaoke Özəl - Cavidan Fatihi (21.05.2022)", "https://www.youtube.com/watch?v=OthTuGAKu_4", 951),
  youtube("NN59gi9LCI8", "Cavidan Fatihi: Atam demişdi, neynirsən gitaranı?"),
  youtube("Xjp9nuOXT-o", "Günə Bax | Cavidan Fatihi əsl ixtisasından danışdı | Yönümü dəyişmişəm"),
  youtube("e7YQ8wLw8D4", "Cavidan Fatihi — Sən Bir Başqasan (LIVE)"),
  youtube("xP4HMtzKR5A", "Cavidan Fatihi — Sənsiz (LIVE)"),
  youtube("GwMphNG6PAo", "Trendə düşən müğənnidən maraqlı açıqlamalar - Ekstra müsahibə"),
  youtube("YFsHp_mYPI8", "Cavidan Fatihi & Çimnaz Sultanova - Fortuna 12.05.2022"),
  article("kulis-interview", "Cavidan Fatihi: “Meyxananı ciddi sənət kimi sırımayın” – Müsahibə", "https://kulis.az/xeber/media/cavidan-fatihi-meyxanani-ciddi-senet-kimi-sirimayin-musahibe-52252", "https://kulis.az/storage/news/2024/january/23/big/65b27535534b865b27535534b9170619422965b27535534b665b27535534b7.jpg", "Kulis.az"),
  article("bbc-interview", "Cavidan Fatihi: Atam demişdi, neynirsən gitaranı?", "https://www.bbc.com/azeri/azerbaijan-45833081.amp", "https://ichef.bbci.co.uk/news/1200/branded_azeri/CAC9/production/_103831915_screenshot2018-10-12at12.15.44.png", "BBC Azərbaycanca"),
  article("edebiyyat-interview", "“Çox fərqli tərzlər eşidəcəksiniz…” – Cavidan Fatihi ilə müsahibə", "https://www.edebiyyatveincesenet.az/musiqi/item/13846-dzhokh-faerzhli-taerzlaer-eshidaedzaeksiniz-dzavidan-fatehlae-musahibae", "https://www.edebiyyatveincesenet.az/media/k2/items/cache/69117e8d209efe150e4637070c826491_XL.jpg", "Ədəbiyyat və İncəsənət"),
  article("azerbaijan-news-festival", "Heydər Əliyev Mərkəzinin parkında “Yay Festivalı”nın bağlanış konserti təşkil olunub", "https://azerbaijan-news.az/az/posts/detail/heyder-eliyev-merkezinin-parkinda-yay-festivalinin-baglanis-konserti-teskil-olunub-1724650229", "https://eu2.contabostorage.com/71933ea89b5a4d0ca528a15679956e5d:azerbaijannews/uploads/img/posts/2024/08/26/172464776761905260_1200x630jpg-1724650216.jpg", "Azərbaycan News"),
  article("ikisahil-solo", "Cavidan Fatihi solo konsert proqramı ilə çıxış edib - FOTO", "https://ikisahil.az/post/503498-cavidan-fatihi-solo-konsert-proqrami-ile-chixish-edib-foto", "https://ikisahil.az/photo/800x500_2/upload/2024/03/11/-11958dfe17101545114681197481017469.jpg", "İki Sahil"),
  article("kulis-festival", "“Yay Festivalı”nın bağlanış konserti təşkil olundu", "https://kulis.az/xeber/media/yay-festivalinin-baglanis-konserti-teskil-olundu-56065", "https://kulis.az/storage/news/2024/august/26/big/66cc1f4e500ce66cc1f4e500cf172465338966cc1f4e500cc66cc1f4e500cd.jpg", "Kulis.az"),
  article("azertag-festival", "Heydər Əliyev Mərkəzinin parkında “Yay Festivalı”nın bağlanış konserti təşkil olunub VİDEO", "https://azertag.az/xeber/heyder_eliyev_merkezinin_parkinda_yay_festivalinin_baglanis_konserti_teskil_olunub_video-3149914", "https://kulis.az/storage/news/2024/august/26/big/66cc1f4e500ce66cc1f4e500cf172465338966cc1f4e500cc66cc1f4e500cd.jpg", "AZƏRTAC"),
  article("525-interview", "“Sosial media mənim üçün daha əlçatandır” - Cavidan Fatihi", "https://525.az/news/166139-sosial-media-menim-ucun-daha-elcatandir-cavidan-fatihi", "https://525.az/img/pics/large/2021-04/189250_kzj3zvgc0u.jpg", "525-ci qəzet"),
  article("lent-interview", "Cavidan Fatihi: “Məndən “Can-cana” oxumağımı istəyirlər”", "https://lent.az/xeber/maqazin/cavidan-fatihi-menden-can-cana-oxumagimi-isteyirler-40657258", "https://lent.az/storage/news/2026/january/14/big/6967a48f0b7226967a48f0b72317684000156967a48f0b71f6967a48f0b721.webp", "Lent.az"),
  article("qht-zafar", "5 ilin Zəfər sədası", "https://qht.az/az/xeber/5-ilin-zefer-seda", "https://qht.az/og-default.png", "QHT.az"),
  article("baau-nowruz-fest", "Bakı Avrasiya Universitetində “Novruz Fest” festivalı keçirilib", "https://baau.edu.az/en/article/baki-avrasiya-universitetinde-quot-novruz-fest-quot-festivali-kecirilib-228", "https://baau.edu.az/uploads/files/baau_edu_az/news/tgt1.png", "Bakı Avrasiya Universiteti"),
  article("turkic-summer-festival", "Heydər Əliyev Mərkəzinin parkında “Yay Festivalı”nın bağlanış konserti keçirilib", "https://turkic.world/en/articles/video_news/273166", "https://turkic.world/media/2024/08/26/1.jpg", "TurkicWorld"),
  article("bsu-victory-echo", "“Five Years of the Victory Echo” konsert proqramı BSU-da keçirilib", "https://sdg.bsu.edu.az/news/five-years-of-the-victory-echo-concert-program-held-at-bsu", "/manus-storage/IMG_5953_b988ee9a.PNG", "Bakı Dövlət Universiteti"),
  article("trend-summer-festival", "Heydar Aliyev Center to host final concert of Summer Festival", "https://www.trend.az/azerbaijan/society/3936651.html", "https://www.trend.az/media/2024/08/23/festival.jpg", "Trend News Agency"),
  article("today-summer-festival", "Heydər Əliyev Mərkəzinin parkında “Yay Festivalı”nın bağlanış konserti keçirilib", "https://www.today.az/print/news/entertainment/252143.html", "https://www.today.az/pictures/pic252143.jpg", "Today.az"),
  article("azertag-simurq", "“Simurq” olimpiadasının qalibləri müəyyənləşib", "https://special.azertag.az/az/xeber/4047555", "https://special.azertag.az/favicon.ico", "AZƏRTAC"),
  article("proses-solo-concert", "Cavidan Fatihi ilk solo konsertini verəcək – TARİX AÇIQLANDI", "https://proses.az/news/17724/", "https://proses.az/wp-content/uploads/2024/03/Screenshot_2024-03-02-18-58-53-629_com.facebook.katana-edit.jpg", "Proses.az"),
];

const mediaPriorityIds = [
  "turkic-summer-festival",
  "bsu-victory-echo",
  "trend-summer-festival",
  "today-summer-festival",
  "azertag-simurq",
  "proses-solo-concert",
  "azertag-festival",
  "bbc-interview",
  "kulis-interview",
  "kulis-festival",
  "youtube-DJhKjWCK8z4",
] as const;

export const mediaItems: MediaItem[] = [
  ...mediaPriorityIds.map(id => mediaItemsBase.find(item => item.id === id)).filter((item): item is MediaItem => Boolean(item)),
  ...mediaItemsBase.filter(item => !mediaPriorityIds.includes(item.id as typeof mediaPriorityIds[number])),
];
