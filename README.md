# ENEPLUS Website

Jekyll website for ENEPLUS - konsultantska firma za energetski menadžment i energetsku efikasnost.

## O projektu

Ova Jekyll website je kreirana na osnovu postojeće Wix stranice [www.eneplus.rs](https://www.eneplus.rs/). Website je optimizovan za GitHub Pages i sadrži sve ključne informacije o kompaniji, uslugama i timu.

## Funkcionalnosti

- **Responzivni dizajn** - prilagođava se svim uređajima
- **Brza učitavanja** - optimizovan za performanse
- **SEO optimizovan** - sa odgovarajućim meta tagovima
- **Kontakt forma** - funkcionalna kontakt forma
- **Mobilni meni** - prilagođen mobilnim uređajima
- **Smooth scrolling** - glatko skrolovanje kroz stranicu
- **Animacije** - elegantne animacije prilikom skrolovanja

## Struktura stranica

- **Početna** (`/`) - glavna stranica sa pregledom usluga
- **O nama** (`/o-nama/`) - informacije o kompaniji i timu
- **Naše usluge** (`/nase-usluge/`) - detaljno o svim uslugama
- **Softver** (`/softver/`) - digitalna rešenja (uskoro)
- **Media** (`/media/`) - resursi i medijski sadržaj (uskoro)
- **Kontakt** (`/kontakt/`) - kontakt informacije i forma

## Tehnologije

- **Jekyll 4.3** - static site generator
- **Sass/SCSS** - za stilove
- **Vanilla JavaScript** - za interaktivnost
- **Font Awesome** - za ikone
- **Google Fonts** - Roboto i Open Sans fontovi

## Lokalno pokretanje

### Preduslovi

- Ruby 2.7 ili noviji
- Bundler gem

### Instalacija

1. Klonirajte repozitorijum:
```bash
git clone https://github.com/constantine2nd/eneplus.git
cd eneplus
```

2. Instalirajte dependencies:
```bash
bundle install
```

3. Pokrenite Jekyll server:
```bash
bundle exec jekyll serve
```

4. Otvorite browser na `http://localhost:4000`

### Development

Za development sa live reload:
```bash
bundle exec jekyll serve --livereload
```

Za build produkcijske verzije:
```bash
bundle exec jekyll build
```

## GitHub Pages deployment

Website je konfigurisan za automatski deployment na GitHub Pages:

1. Push kod na GitHub repozitorijum
2. Idite na Settings → Pages
3. Izaberite source "Deploy from a branch"
4. Izaberite branch "main" i folder "/ (root)"
5. Website će biti dostupan na `https://constantine2nd.github.io/eneplus`

### Custom domen

Za podešavanje custom domena:

1. Dodajte CNAME file u root direktorijum:
```bash
echo "www.eneplus.rs" > CNAME
```

2. U GitHub Settings → Pages, unesite custom domen
3. Podesite DNS record kod provajdera domena

## Konfiguracija

Glavne postavke se menjaju u `_config.yml`:

- **Osnovne informacije** - title, description, URL
- **Kompanijske informacije** - adresa, telefoni, email
- **Navigacija** - meni stavke
- **Tim** - članovi tima
- **Usluge** - lista usluga

## Kontakt forma

Kontakt forma trenutno koristi JavaScript simulaciju. Za produkciju, potrebno je podesiti:

- **Netlify Forms** (preporučeno za Netlify hosting)
- **Formspree** (za GitHub Pages)
- **EmailJS** (client-side solution)
- **Custom backend** (Node.js, PHP, itd.)

## Dodavanje sadržaja

### Dodavanje nove stranice

1. Kreirajte novi `.html` ili `.md` file
2. Dodajte YAML front matter:
```yaml
---
layout: page
title: "Naziv stranice"
permalink: /url-stranice/
---
```

### Dodavanje člana tima

U `_config.yml`, dodajte u `team` sekciju:
```yaml
- name: "Ime Prezime"
  title: "Titula"
  phone: "+381 xx xxxxxxx"
```

### Dodavanje usluge

U `_config.yml`, dodajte u `services_list` sekciju:
```yaml
- name: "Naziv usluge"
  icon: "font-awesome-ikona"
```

## Stilizovanje

CSS stilovi se nalaze u:
- `assets/css/main.scss` - glavni SCSS file
- `_sass/` direktorijum - parcijalni SCSS files (ako se koriste)

### CSS varijable

Glavne boje se definišu kao CSS custom properties:
```css
:root {
  --primary-color: #2c5aa0;
  --secondary-color: #4a90c2;
  --accent-color: #f39c12;
  /* ... */
}
```

## JavaScript funkcionalnosti

JavaScript kod se nalazi u `assets/js/main.js` i sadrži:

- Mobilni meni
- Smooth scrolling
- Kontakt forma
- Scroll animacije
- Back to top button
- Lazy loading slika

## Slike

Slike se čuvaju u `assets/images/` direktorijumu:
- `hero-image.jpg` - glavna slika na početnoj strani
- `about-image.jpg` - slika u "O nama" sekciji
- `team/` - fotografije članova tima
- `placeholder-person.jpg` - placeholder za fotografije

## Performance optimizacije

- **Minifikacija CSS-a** - automatski u production build-u
- **Image optimization** - koristite optimizovane slike
- **Lazy loading** - implementiran za slike
- **Critical CSS** - važni stilovi su inline
- **Service Worker** - za offline funkcionalnost (opcionalno)

## SEO optimizacije

- **Meta tagovi** - automatski generisani
- **Open Graph** - za social media
- **Structured data** - dodajte JSON-LD ako je potrebno
- **Sitemap** - automatski generisan
- **Robots.txt** - dodajte po potrebi

## Browser podrška

Website podržava:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- Mobile browsers

## Licenca

Ovaj projekt je kreiran za ENEPLUS kompaniju. Sva prava zadržana.

## Kontakt za razvoj

Za pitanja o development-u ovog website-a, kontaktirajte razvojni tim.

---

*Poslednje ažuriranje: December 2024*