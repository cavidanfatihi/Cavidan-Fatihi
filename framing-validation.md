# Portre Kadrajı Doğrulaması

Ana sayfa, Hakkımda, Müzik ve Medya rotaları masaüstü görünümünde kontrol edildi. Ana girişte gitar performansı görseli yüzün tamamını gösteriyor. Hakkımda, Müzik ve Medya girişlerinde `object-contain` kullanılarak portreler kırpılmadan sunuluyor; baş ve yüz alanı görünür kalırken siyah zemin kompozisyonun boş alanlarını dengeliyor.

Müzik video kartları, Medya galerisi ve konser görselleri için üst odaklı kadraj kullanıldı. Bu sayede dikey portrelerde baş bölgesinin kesilmesi önleniyor ve galerideki farklı görsel oranları daha tutarlı görünüyor.

| Rota / yüzey | Kadraj yaklaşımı | Doğrulanan sonuç |
|---|---|---|
| `/` ana giriş | `IMG_8438` için `object-[50%_16%]` | Gitarlı portrede yüz, saç ve enstrüman görünür kalır. |
| `/about` giriş ve portre bloğu | `object-contain` ve üst odak | Profil görseli ile biyografi portresinde baş kesilmez. |
| `/music` giriş ve klip kartları | `object-contain` ile `object-top` | Gitar performansı ve klip portrelerinde yüz üst kadrajda korunur. |
| `/media` giriş ve galeri | `object-contain`; seçili `IMG_3435`, `IMG_8446`, `IMG_0726`, `IMG_8438`, `IMG_9561`, `IMG_6379` ve `IMG_6377` için özel odak | Dik görüntüler, square kartlarda da yüzü üst odakta tutar. |
| `/concerts` medya kartları | `object-top` | Sahne ve portre karelerinin üst bölgesi görünür kalır. |
