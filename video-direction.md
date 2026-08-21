# Video Odaklı Yön Notları

Murat Boz referansı, koyu ve tam ekran video arka planı üzerinde ince bir navigasyon kullanıyor. Girişte büyük sloganlar yerine logo, temel sayfa bağlantıları, dil seçimi, ses kontrolü ve sınırlı sosyal erişim öne çıkıyor. Cavidan Fatihi ana sayfası bu sade hiyerarşiyi yorumlayacak; video önde, metin ise yalnızca zorunlu gezinme öğelerinde kalacak.

Kullanıcının verdiği `kGljd5kntYQ` videosu, Cavidan Fatihi’nin **Xatirə** resmi YouTube videosudur. Ana sayfada bu kaynak, 30. saniyeden başlayacak, sessiz ve döngülü arka plan videosu olarak kullanılacaktır. Arka plan için aşırı kırpma uygulanmayacak; `object-position` yüz ve baş kadrajını koruyacak şekilde ayarlanacaktır.

Konserler sayfası için kullanıcı tarafından verilen `RkzfTWUQcJg` YouTube kaynağı, kullanıcı talimatı doğrultusunda sessiz arka plan videosu olarak uygulanacaktır. Harici video sayfası tarayıcıda yükleme sorunu verdiği için kaynak kimliği doğrudan kullanıcı tarafından sağlanan bağlantıdan alınmıştır; canlı site içinde gömülü yükleme ayrıca doğrulanacaktır.

İlk canlı denetimde, her iki YouTube kaynağının `youtube-nocookie.com` iframe sürümü “Video unavailable” mesajı gösterdi. Bu nedenle bir sonraki adımda standart YouTube embed kaynağı test edilecek; gömme engeli sürerse kullanıcıdan arka plan videosu için doğrudan video dosyası istenecek ve bu dosya kalıcı site varlığına dönüştürülecektir.

Standart `youtube.com/embed` kaynağı ve dağıtılmış alan adı için `origin` parametresi de test edildi. Her iki denemede de YouTube `Error 153: Video player configuration error` döndürdü. Bu ortamda, kullanıcı videolarını kesintisiz arka plan olarak göstermek için doğrudan MP4/WebM yüklemesi gereklidir; yalnızca YouTube bağlantısı güvenilir bir tam ekran arka plan videosu sunmuyor.
