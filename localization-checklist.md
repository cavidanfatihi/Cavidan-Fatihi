# AZ/EN Çok Sayfalı Yerelleştirme Denetimi

## Küresel yüzeyler

| Yüzey | Kapsam | Doğrulanan davranış |
|---|---|---|
| Ana sayfa `/` | Header, hero slider, klip önizleme, Spotify/Apple Music çağrıları, sabit WhatsApp düğmesi ve footer | AZ/EN seçimi hero metinlerini, belge başlığını ve WhatsApp hazır mesajını değiştirir. |
| Header ve footer | Navigasyon, AZ/EN düğmeleri, sepet düğmesi, sosyal bağlantılar, mobil menü, telif ve rezervasiya çağrısı | Görünür metinler aktif dilde; ana marka ve platform adları bilinçli olarak dil bağımsızdır. |
| Sepet çekmecesi | Başlık, boş durum, toplam, checkout çağrısı ve kaldır/azalt/artır aria-label’ları | AZ/EN seçimi sepet görünür metnini ve kritik buton etiketlerini değiştirir. |

| Rota | Kontrol edilen alanlar | EN sonucu | Not |
|---|---|---|---|
| `/about` | Navigasyon, sayfa başlığı, biyografi, zaman çizelgesi, WhatsApp hazır mesajı | Başarılı | Belge başlığı da İngilizce güncellendi. |
| `/concerts` | Navigasyon, hero, yaklaşan etkinlik metni, booking çağrısı, galeri alt metinleri | Düzeltildi | Görsel alt metinleri aktif dile bağlandı. |
| `/music` | Navigasyon, hero, Spotify alanı, YouTube başlıkları ve klip çağrıları | Başarılı | Resmi eser isimleri korunurken arayüz metinleri İngilizce sunuldu. |
| `/media` | Navigasyon, hero, kategori filtreleri, galeri alt metinleri | Başarılı | Konser, portre ve backstage görselleri İngilizce açıklayıcı alt metinlerle doğrulandı. |
| `/shop` | Navigasyon, hero, resmi ürün katalog metni, ürün kartı ve sepet çağrısı | Başarılı | Canlı Shopify ürünü `Cavidan Fatihi Signature Tee`, AZN 29 fiyatı ve İngilizce “Add to bag” çağrısı yüklendi. |
| `/contact` | Navigasyon, hero, WhatsApp booking, form etiketleri, alan ipuçları, form seçenekleri ve gönderim çağrısı | Başarılı | EN ve AZ içerikleri, belge başlığı ve locale-aware WhatsApp hazır mesajı canlı olarak doğrulandı. |

## Azerbaycanca rota doğrulaması

| Rota | AZ sonucu | Not |
|---|---|---|
| `/` | Başarılı | Slider, sessiz önizleme, sosyal erişim, footer ve rezervasiya çağrısı Azerbaycanca görüntülendi. |
| `/about` | Başarılı | Biyografi, zaman çizelgesi, navigasyon ve belge başlığı Azerbaycanca doğrulandı. |
| `/concerts` | Başarılı | Səhnə, Növbəti, Canlı, galeri açıklamaları ve rezervasiya çağrısı Azerbaycanca doğrulandı. |
| `/contact` | Başarılı | WhatsApp rezervasiya alanı, form etiketleri, seçenekler ve alan ipuçları Azerbaycanca doğrulandı. |
| `/music` | Başarılı | Dinlə, Rəsmi kliplər, navigasyon ve müzik yüzeyleri Azerbaycanca doğrulandı. |
| `/media` | Başarılı | Kategori filtreleri, galeri başlıkları ve sağlanan Azerbaycanca alt metinler doğrulandı. |
| `/shop` | Başarılı | Rəsmi məhsullar, canlı Shopify ürün kartı, AZN fiyatı ve “Səbətə əlavə et” çağrısı Azerbaycanca doğrulandı. |
