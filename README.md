# Beşiktaş Fan Portalı Complete

Beşiktaş odaklı, Vercel backend destekli fan portalı.

## Özellikler

- Beşiktaş JK sabit kulüp alanı
- API verisi yanlış takım döndürürse filtreleme
- Sıradaki maçlar
- Son maçlar
- Geri sayım
- Oyuncu kartları
- Favori oyuncu/kart seçimi
- Taraftar not panosu
- Koyu/açık tema
- LocalStorage kayıt sistemi
- Vercel API endpoint

## Dosya yapısı

```txt
api/
  besiktas.js
index.html
package.json
README.md
```

## API

```txt
/api/besiktas
```

## Not

Yanlış bilgi göstermemek için oyuncu alanı gerçek kişi adı yerine rol bazlı kartlardan oluşur. API sadece Beşiktaş içeren maçları gösterir.
