export type MusicPlatform = {
  id: "spotify" | "appleMusic" | "deezer" | "youtube";
  label: string;
  href: string;
};

export const musicPlatforms: MusicPlatform[] = [
  { id: "spotify", label: "Spotify", href: "https://open.spotify.com/intl-tr/artist/3AEqDrB4idgxwcyyU5tiki" },
  { id: "appleMusic", label: "Apple Music", href: "https://music.apple.com/az/artist/cavidan-fatihi/1595136758" },
  { id: "deezer", label: "Deezer", href: "https://www.deezer.com/en/artist/151213112" },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com/channel/UCImTvP7AwEg-co6yJmJe2TA/videos" },
];

export type YouTubeRelease = {
  id: string;
  title: string;
};

// Official channel's accessible Video-tab catalogue, collected 20 August 2026.
export const officialYouTubeReleases: YouTubeRelease[] = [
  { id: "GVeEua_IEls", title: "TUTQUN" },
  { id: "m__RAMNnchA", title: "Ay Gecikən Məhəbbətim" },
  { id: "ri3veh_4pPw", title: "Bir Xumar Baxışla" },
  { id: "2oLE2h9dhPI", title: "Xatirə | Yay Festivalı" },
  { id: "RkzfTWUQcJg", title: "Solo Konsert | Video Hesabat" },
  { id: "VTJKg61o1Ro", title: "Daha Gəlməz" },
  { id: "ak7VKHedKqI", title: "Məhəbbət Olmayanda | Akustik" },
  { id: "NScZ1hYCBac", title: "Sənsizlik | Akustik" },
  { id: "PpCsMJOJKL0", title: "Ay Gecə | Akustik" },
  { id: "Xq2fC5es2cA", title: "Sevgi Ən Axırda Ölür | Akustik" },
  { id: "o8rMCWuaL40", title: "Ürəyim Yanar | Akustik" },
  { id: "XgzsprHcEl0", title: "Çıx Qatar Yoluna | Akustik" },
  { id: "MOe4PmaqpVM", title: "Kurşun Adres Sormaz Ki | Cover" },
  { id: "p_GQExs6wz0", title: "Yoxsan Artıq | Rəsmi Audio" },
  { id: "ztSF0EtqkuY", title: "Təslim Oluram" },
  { id: "5Vhv-DNr2CM", title: "Sən Getdin" },
  { id: "Y1-vPb4Ap5U", title: "Sən Uzaq Yaşıl Ada | Cover" },
  { id: "v_XCA1-D434", title: "Wicked Game | Cover" },
  { id: "NpHAuhbryLE", title: "Yağış Yuyur, Gün Qurudur | Cover" },
  { id: "_JWuOWW5s24", title: "Sənsiz Keçən Ömür" },
  { id: "D1VdLtdEB4M", title: "Mənə Bircə Məktub Yaz | Danışan Məktublar" },
  { id: "ID3LcoDh3vU", title: "Vətən Desin | Vətən Sağ Olsun" },
  { id: "Th8xHMEPIX4", title: "Zəfər Marşı" },
  { id: "TOKSJhENdYw", title: "Ayrılığa Dözərəm | Cover" },
  { id: "Fl5VKBWdACI", title: "Al Məndən Gülüşlərini" },
  { id: "zgP6U5SdMBI", title: "Tufanla Oynama" },
  { id: "kGljd5kntYQ", title: "Xatirə | Şeir: Xəzər Süleymanlı" },
  { id: "RXhf5R_OQzM", title: "Resimler Hayaller | Cover" },
  { id: "2200-bV8TSc", title: "Sən Bir Başqasan | Rəsmi Audio" },
  { id: "EbLiTvVpB9o", title: "Aman Ayrılıq | Canlı İfa" },
  { id: "Ro6Ex9OMfTs", title: "Yada Sal Məni | Cover" },
  { id: "clx1rHMKNDw", title: "Sənsiz | Rəsmi Audio" },
  { id: "DNWz4q2b7N0", title: "Batmış Gəminin Mahnısı | Cover" },
  { id: "4hH2zlU_kL4", title: "Mənə Bircə Məktub Yaz | Rəsmi Audio" },
];
