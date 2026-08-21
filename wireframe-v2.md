# Cavidan Fatihi — Yeni Tasarım Wireframe’i

Bu ikinci yön, referans sitedeki **tam ekran, sinematik ve müzik-merkezli deneyim** yaklaşımını Cavidan Fatihi’ne özgü beyaz-siyah bir kimlikle yeniden yorumlar. Amaç, uzun bir içerik duvarı yerine seçilmiş görüntüler, güçlü boşluklar ve net yönlendirmelerle daha etkili bir resmi sanatçı dünyası oluşturmaktır.

> Referans alınan özellikler: tam ekran slider, sabit sosyal erişim, minimalist menü, klip merkezli başlangıç deneyimi ve hızlı iletişim çağrısı. Birebir görsel ya da kod kopyalanmayacaktır.

## 1. Görsel Kimlik

| Öğe | Karar |
|---|---|
| Ana palet | Saf siyah `#050505`, kırık beyaz `#F5F4EF`, yumuşak gri `#A3A3A3` |
| Vurgu | Renk yerine kontrast, ışık, tipografik ölçek ve ince beyaz çizgiler |
| Logo | Bağlı, tek çizgide inşa edilmiş **CF** monogramı; yanında küçük “Cavidan Fatihi” kelime işareti |
| Tipografi | Yüksek kontrastlı editorial serif başlıklar + dar, modern sans-serif arayüz metinleri |
| Görsel ritim | Büyük portreler, siyah-beyaz baskın katmanlar ve yalnızca seçilmiş karelerde doğal renk |

## 2. Site Haritası

| Sayfa | Görev | Ana içerik |
|---|---|---|
| `/` | İlk izlenim | Tam ekran slider, sessiz klip önizlemesi, şarkı/metin bilgisi, hızlı dinleme ve WhatsApp booking |
| `/about` | Sanatçı hikâyesi | Kısa biyografi, seçilmiş portre dizisi, yaratıcı yaklaşım |
| `/concerts` | Sahne takvimi | Yaklaşan etkinlikler, geçmiş konser seçkisi ve medya |
| `/music` | Dinleme merkezi | Spotify, Apple Music, resmi klip ızgarası ve sessiz video önizlemeleri |
| `/media` | Görsel arşiv | Konser, fotosessiya ve backstage kategorileri; tam ekran lightbox |
| `/shop` | Resmi merch | Sade ürün kataloğu, sepet ve Shopify checkout |
| `/contact` | Booking & iletişim | Etkinlik türleri, kısa form ve WhatsApp’a doğrudan geçiş |

## 2.1 Hakkımda Sayfası — Onaylı Biyografi İçeriği

Hakkımda sayfası, kısa bir giriş cümlesi, üç parçalı zaman çizelgesi ve aşağıdaki Azerbaycanca biyografi metniyle kurulacaktır. İngilizce görünümde, metnin anlamını koruyan profesyonel bir çeviri kullanılacaktır.

> Cavidan Fatihi — 30 iyul 1994-cü ildə Yevlax şəhərində anadan olmuşdur. 2000-ci ildə Yevlax şəhər Vüqar Əmiraslanov adına 2 sayılı orta məktəbdə təhsil aldıqdan sonra, 2011-ci ildə Mingəçevir Özəl Türk Liseyindən məzun olmuşdur. Uşaqlıqdan musiqiyə həvəsi olan Cavidan Fatihi fortepiano təhsili almışdır və həm məktəb, həm də liseyin əksər tədbirlərində və beynəlxalq yarışmalarda fəal çıxış etmişdir. 2011-ci ildə Milli Aviasiya Akademiyasının Hüquqşünaslıq fakültəsinə qəbul olmuş və 2015-ci ildə məzun olmuşdur. 2012-ci ildə onlayn gitara dərsləri aldıqdan sonra yenidən musiqi ilə yolları birləşmişdir. Professional musiqi karyerasına 2018-ci ildə “Sənsiz” mahnısı ilə başlamışdır. Cavidan Fatihi həm öz bəstələrini, həm də bir çox xalq və bəstəkar mahnılarının coverlərini dinləyicilərinə təqdim etmişdir.

| Zaman çizelgesi düğümü | İçerik |
|---|---|
| 1994–2011 | Yevlax’ta çocukluk, eğitim, piyano ve sahne deneyimi |
| 2011–2017 | Hukuk eğitimi ve gitarayla yeniden kurulan müzik yolculuğu |
| 2018–bugün | “Sənsiz” ile profesyonel başlangıç; besteler, cover’lar ve sahne çalışmaları |

## 3. Ana Sayfa Akışı

```text
┌──────────────────────────────────────────────────────────────┐
│ CF logo      Haqqımda · Konsertlər · Musiqi · Media · Əlaqə  │
│                                               AZ / EN  Menu  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│   TAM EKRAN GÖRSEL / SESSİZ VİDEO SLIDER                     │
│   01 — 05   seçilmiş konser & portre kareleri                │
│                                                              │
│   CAVIDAN FATIHI                                              │
│   Son parça / kısa şiirsel satır                             │
│   [ Dinlə ]    [ Booking ]                    Prev · Play · Next │
│                                                              │
│  IG · YT · SP · TT · FB · X                     WhatsApp     │
└──────────────────────────────────────────────────────────────┘
```

Slider, ilk yüklemede sessiz çalışacak ya da sabit bir fotoğraf karesi gösterecek; ziyaretçi oynat düğmesi ile kısa klip önizlemesini isteyerek başlatacaktır. Otomatik ses kullanılmayacaktır.

## 4. Etkileşimler

| Alan | Davranış |
|---|---|
| Slider | Klavye, dokunma ve numaralı navigasyonla geçiş; kısa ve yumuşak fade hareketleri |
| Dil seçici | AZ / EN arasında sayfayı ve navigasyonu anında değiştirir |
| Sabit sosyal şerit | Masaüstünde dikey, mobilde altta kompakt erişim |
| WhatsApp | `+994 99 299 11 77` hattına, booking amacı içeren hazır mesajla yönlendirir |
| Klipler | Kart üzerinde sessiz kısa önizleme veya tıklanınca resmi YouTube videosuna geçiş |
| Galeri | Ayrı medya sayfasında kategori filtresi ve tam ekran inceleme |

## 5. İçerik ve Görsel Seçim İlkesi

Ana slider için mevcut koleksiyondan farklı ruhlara sahip beş görsel seçilecektir: bir geniş konser sahnesi, bir mikrofon/gitar anı, bir güçlü profil portresi, bir grup/backstage anı ve bir atmosfer karesi. Seçim, yüksek kontrast, metin için boş alan ve masaüstü-mobil kırpma güvenliği esas alınarak yapılacaktır.

## 6. Onay Sonrası Uygulama Sırası

1. CF monogramı ve beyaz-siyah arayüz sistemi hazırlanır.
2. Yeni, çok sayfalı iskelet ve AZ/EN içerik modeli kurulur.
3. Ana sayfa sliderı, sessiz klip önizlemeleri ve WhatsApp booking uygulanır.
4. Sanatçı, konser, müzik, medya, mağaza ve iletişim sayfaları gerçek içeriklerle tamamlanır.
5. Mobil, klavye erişimi, SEO ve bağlantılar doğrulanır.
