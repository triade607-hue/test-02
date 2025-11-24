# 🧠 Design Brain — IMO2TUN Platform

## 🎨 1. Identité visuelle globale

### Palette de couleurs

#### Couleur principale (Primary - Bleu)

```css
primary-50:  #E6F4F9
primary-100: #CCE9F3
primary-200: #99D3E7
primary-300: #66BDDB
primary-400: #33A7CF
primary-500: #0891B2  /* Bleu clair */
primary-600: #0077B6  /* Bleu principal */
primary-700: #005A8A
primary-800: #003D5E
primary-900: #002032
```

#### Couleur secondaire (Secondary - Orange/Jaune)

```css
secondary-50:  #FFF8E6
secondary-100: #FFF1CC
secondary-200: #FFE399
secondary-300: #FFD566
secondary-400: #FFC733
secondary-500: #F9A825  /* Orange/Jaune principal */
secondary-600: #F57C00
secondary-700: #C46200
secondary-800: #934A00
secondary-900: #623100
```

#### Couleur d'accent (Accent - Vert/Teal)

```css
accent-50:  #E6F7F5
accent-100: #CCEFEB
accent-200: #99DFD7
accent-300: #66CFC3
accent-400: #33BFAF
accent-500: #26A69A  /* Vert/Teal principal */
accent-600: #00897B
accent-700: #006B5E
accent-800: #004D42
accent-900: #002F28
```

#### Couleurs neutres

```css
neutral-50:  #F8FAFC  /* Background principal */
neutral-100: #F1F5F9
neutral-200: #E2E8F0  /* Bordures */
neutral-300: #CBD5E1
neutral-400: #94A3B8
neutral-500: #64748B
neutral-600: #475569
neutral-700: #334155
neutral-800: #1E293B
neutral-900: #0F172A  /* Texte principal */
```

#### Couleurs sémantiques

```css
success:  #10B981  /* Vert */
warning:  #F59E0B  /* Orange */
error:    #EF4444  /* Rouge */
info:     #3B82F6  /* Bleu */
```

### Typographie

- **Police titres**: Poppins (Google Fonts)
- **Police corps**: Inter (Google Fonts)
- **Fallback**: system-ui, sans-serif
- **Poids disponibles**: 400, 500, 600, 700

#### Échelle typographique

```css
h1: text-4xl (36px) md:text-5xl (48px) font-bold font-heading
h2: text-3xl (30px) md:text-4xl (36px) font-bold font-heading
h3: text-2xl (24px) font-semibold font-heading
h4: text-xl (20px) font-semibold font-heading
h5: text-lg (18px) font-medium
body: text-base (16px) font-normal
small: text-sm (14px) text-neutral-600
label: text-sm (14px) font-medium text-neutral-700
```

### Espacements

- **Container max-width**: `max-w-7xl` (1280px)
- **Padding container**: `px-4 md:px-6 lg:px-8`
- **Padding sections**: `py-16 md:py-20 lg:py-24`
- **Gap entre éléments**: `gap-4` (16px), `gap-6` (24px), `gap-8` (32px)
- **Espacement vertical sections**: `space-y-8`, `space-y-12`, `space-y-16`

### Arrondis (Border Radius)

```css
sm:      0.375rem (6px)   /* Badges */
DEFAULT: 0.5rem (8px)     /* Boutons, inputs */
md:      0.75rem (12px)   /* Cards */
lg:      1rem (16px)      /* Cards larges */
xl:      1.5rem (24px)    /* Sections, modals */
2xl:     2rem (32px)      /* Hero sections */
full:    9999px           /* Avatars, badges ronds */
```

### Ombres

```css
shadow-sm:   0 1px 2px rgba(0,0,0,0.05)
shadow:      0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)
shadow-md:   0 4px 6px rgba(0,0,0,0.1)
shadow-lg:   0 10px 15px rgba(0,0,0,0.1)
shadow-xl:   0 20px 25px rgba(0,0,0,0.1)
```

---

## ⚙️ 2. Principes de design

### Philosophie visuelle

- **Dynamisme africain**: Couleurs vives et chaleureuses inspirées du continent
- **Professionnalisme**: Interface moderne et épurée pour un public B2B
- **Confiance**: Bleu dominant pour la crédibilité, orange pour l'action
- **Accessibilité**: Contraste élevé, tailles tactiles généreuses
- **Fluidité**: Animations douces et micro-interactions soignées

### Conventions UX

1. **Bouton primaire** = Action principale (S'inscrire, Soumettre) → Orange `secondary-500`
2. **Bouton secondaire** = Action secondaire (En savoir plus) → Blanc avec bordure ou outline
3. **Liens navigation** = Texte neutre, actif en `primary-600`
4. **Bouton CTA header** = Orange sur fond coloré, inversé sur fond blanc
5. **États hover** = Scale léger (1.02), ombre accrue, transition couleur

### Accessibilité

- Contraste WCAG AA respecté (4.5:1 minimum)
- Focus visible avec `ring-2 ring-primary-500 ring-offset-2`
- Tailles tactiles minimum 44x44px
- Textes alternatifs pour toutes les images
- Navigation clavier complète

---

## 🧱 3. Composants fondamentaux

### 3.1 Boutons

#### Bouton Primaire (Orange)

```tsx
<button className="btn-primary">Devenir Membre</button>
```

```css
.btn-primary {
  @apply bg-secondary-500 text-white
         hover:bg-secondary-600
         shadow-md hover:shadow-lg
         px-6 py-3 rounded-lg
         text-base font-semibold
         transition-all duration-300
         inline-flex items-center justify-center gap-2
         hover:scale-[1.02];
}
```

#### Bouton Secondaire (Outline)

```tsx
<button className="btn-secondary">En savoir plus</button>
```

```css
.btn-secondary {
  @apply bg-white text-primary-600
         border-2 border-primary-600
         hover:bg-primary-600 hover:text-white
         px-6 py-3 rounded-lg
         text-base font-semibold
         transition-all duration-300
         inline-flex items-center justify-center gap-2;
}
```

#### Bouton Ghost (Transparent)

```tsx
<button className="btn-ghost">Voir tous</button>
```

```css
.btn-ghost {
  @apply text-primary-600
         hover:bg-primary-50
         px-4 py-2 rounded-lg
         text-sm font-medium
         transition-all duration-300
         inline-flex items-center justify-center gap-2;
}
```

#### Bouton Icône

```tsx
<button className="btn-icon">
  <ChevronRight className="w-5 h-5" />
</button>
```

```css
.btn-icon {
  @apply w-10 h-10 rounded-full
         flex items-center justify-center
         hover:bg-neutral-100
         transition-colors
         text-neutral-600 hover:text-neutral-900;
}
```

### 3.2 Inputs & Formulaires

#### Champ de saisie standard

```tsx
<div>
  <label className="input-label">Nom*</label>
  <input type="text" className="input-field" placeholder="Votre nom" />
</div>
```

```css
.input-label {
  @apply block text-sm font-medium text-neutral-700 mb-2;
}

.input-field {
  @apply w-full px-4 py-3
         text-base
         border border-neutral-200
         rounded-lg
         focus:outline-none focus:ring-2
         focus:ring-primary-500 focus:border-transparent
         bg-white text-neutral-900
         placeholder-neutral-400
         transition-all duration-200;
}
```

#### Textarea

```tsx
<textarea className="input-field" rows={4} placeholder="Votre message..." />
```

#### Select

```tsx
<select className="input-field">
  <option value="">Sélectionnez une option</option>
  <option value="1">Option 1</option>
</select>
```

#### Checkbox

```tsx
<label className="flex items-start gap-3 cursor-pointer">
  <input
    type="checkbox"
    className="w-5 h-5 rounded border-neutral-300
               text-primary-600
               focus:ring-primary-500 mt-0.5"
  />
  <span className="text-sm text-neutral-600">
    J'accepte les conditions générales
  </span>
</label>
```

### 3.3 Cartes (Cards)

#### Carte Événement (Grande)

```tsx
<div className="card-event">
  <div className="relative">
    <img src="..." alt="..." className="w-full h-48 object-cover" />
    <span className="badge-status absolute top-3 right-3">À venir</span>
    <div className="logo-overlay">
      <img src="/logo-icon.svg" alt="" />
    </div>
  </div>
  <div className="p-5">
    <h3 className="text-lg font-semibold text-white mb-3">Titre événement</h3>
    <div className="space-y-2 text-white/90 text-sm">
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        <span>20 octobre 2025</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4" />
        <span>8h - 17h</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        <span>Cotonou, Azalaï Hotel</span>
      </div>
    </div>
  </div>
</div>
```

```css
.card-event {
  @apply bg-primary-600 rounded-xl overflow-hidden
         shadow-lg hover:shadow-xl
         transition-all duration-300
         hover:-translate-y-1;
}

.logo-overlay {
  @apply absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2
         w-12 h-12 bg-white rounded-full
         flex items-center justify-center
         shadow-md border-4 border-white;
}
```

#### Carte Article

```tsx
<div className="card-article">
  <div className="relative">
    <img src="..." alt="..." className="w-full h-52 object-cover" />
    <span className="badge absolute top-3 right-3">Tech</span>
  </div>
  <div className="p-5">
    <h3 className="text-lg font-semibold text-neutral-900 mb-2 line-clamp-2">
      Titre de l'article
    </h3>
    <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
      Description de l'article...
    </p>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src="..." alt="" className="w-8 h-8 rounded-full" />
        <span className="text-sm font-medium">Auteur</span>
      </div>
      <span className="text-sm text-neutral-500">20 oct. 2025</span>
    </div>
    <a
      href="#"
      className="text-secondary-500 text-sm font-medium mt-4 inline-flex items-center gap-1 hover:gap-2 transition-all"
    >
      Lire la suite <ChevronRight className="w-4 h-4" />
    </a>
  </div>
</div>
```

```css
.card-article {
  @apply bg-white rounded-xl overflow-hidden
         border border-neutral-200
         shadow-sm hover:shadow-md
         transition-all duration-300;
}
```

#### Carte Mission/Avantage

```tsx
<div className="card-mission">
  <div className="icon-circle">
    <GraduationCap className="w-6 h-6" />
  </div>
  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
    Former les talents
  </h3>
  <p className="text-sm text-neutral-600 mb-4">Description de l'avantage...</p>
  <a href="#" className="btn-ghost text-sm">
    En savoir plus
  </a>
</div>
```

```css
.card-mission {
  @apply bg-white rounded-xl p-6
         border border-neutral-200
         text-center
         hover:shadow-lg hover:border-primary-200
         transition-all duration-300;
}

.icon-circle {
  @apply w-14 h-14 rounded-full
         bg-primary-100 text-primary-600
         flex items-center justify-center
         mx-auto mb-4;
}
```

#### Carte Témoignage

```tsx
<div className="card-testimonial">
  <div className="flex items-center gap-1 mb-3">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-secondary-500 text-secondary-500" />
    ))}
  </div>
  <p className="text-neutral-700 mb-4 italic">"Témoignage du membre..."</p>
  <div className="flex items-center gap-3">
    <img src="..." alt="" className="w-10 h-10 rounded-full" />
    <div>
      <p className="font-semibold text-neutral-900">Nom Prénom</p>
      <p className="text-sm text-neutral-500">Fonction</p>
    </div>
  </div>
</div>
```

```css
.card-testimonial {
  @apply bg-white rounded-xl p-6
         border border-neutral-200
         shadow-sm;
}
```

#### Carte Tarif (Pricing)

```tsx
<div className="card-pricing card-pricing--featured">
  <div className="badge-tier">SUNUN</div>
  <div className="price">
    <span className="text-4xl font-bold">20.000</span>
    <span className="text-lg text-neutral-500">FCFA</span>
  </div>
  <ul className="features">
    <li>
      <Check className="w-4 h-4 text-accent-500" /> Avantage 1
    </li>
    <li>
      <Check className="w-4 h-4 text-accent-500" /> Avantage 2
    </li>
  </ul>
  <button className="btn-primary w-full">Choisir</button>
</div>
```

```css
.card-pricing {
  @apply bg-white rounded-2xl p-6
         border border-neutral-200
         text-center
         transition-all duration-300;
}

.card-pricing--featured {
  @apply border-secondary-500 border-2
         shadow-xl scale-105
         relative;
}

.badge-tier {
  @apply inline-block px-4 py-1
         bg-primary-600 text-white
         text-sm font-semibold
         rounded-full mb-4;
}
```

### 3.4 Badges

#### Badge Catégorie

```tsx
<span className="badge">Tech</span>
```

```css
.badge {
  @apply inline-block px-3 py-1
         bg-primary-600 text-white
         text-xs font-semibold
         rounded-full;
}
```

#### Badge Statut

```tsx
<span className="badge-status badge-status--upcoming">À venir</span>
<span className="badge-status badge-status--past">Passé</span>
```

```css
.badge-status {
  @apply inline-block px-3 py-1
         text-xs font-semibold
         rounded-full;
}

.badge-status--upcoming {
  @apply bg-accent-500 text-white;
}

.badge-status--past {
  @apply bg-neutral-500 text-white;
}
```

---

## 🏗️ 4. Composants de structure

### 4.1 Top Bar (Accueil uniquement)

```tsx
<div className="top-bar">
  <div className="container flex items-center justify-between">
    <a href="tel:+33632808316" className="flex items-center gap-2 text-sm">
      <Phone className="w-4 h-4" />
      <span>+33 6 32 80 83 16</span>
    </a>
    <div className="flex items-center gap-4">
      <a href="#">
        <Facebook className="w-4 h-4" />
      </a>
      <a href="#">
        <Instagram className="w-4 h-4" />
      </a>
      <a href="#">
        <Linkedin className="w-4 h-4" />
      </a>
    </div>
  </div>
</div>
```

```css
.top-bar {
  @apply bg-primary-900 text-white py-2;
}
```

### 4.2 Header / Navigation

#### Header Standard (fond blanc)

```tsx
<header className="header">
  <div className="container flex items-center justify-between">
    <Logo />
    <nav className="nav-links">
      <a href="/" className="nav-link nav-link--active">
        Accueil
      </a>
      <a href="/a-propos" className="nav-link">
        À propos
      </a>
      <a href="/actualites" className="nav-link">
        Actualités
      </a>
      <a href="/evenements" className="nav-link">
        Événements
      </a>
      <a href="/adherer" className="nav-link">
        Adhérer
      </a>
    </nav>
    <a href="/contact" className="btn-primary">
      Contactez-nous
    </a>
  </div>
</header>
```

```css
.header {
  @apply bg-white shadow-sm sticky top-0 z-50;
}

.nav-links {
  @apply hidden lg:flex items-center gap-8;
}

.nav-link {
  @apply text-neutral-600 font-medium
         hover:text-primary-600
         transition-colors;
}

.nav-link--active {
  @apply text-primary-600;
}
```

#### Header Transparent (pages intérieures)

```tsx
<header className="header-transparent">
  {/* Même contenu mais couleurs inversées */}
</header>
```

```css
.header-transparent {
  @apply absolute top-0 left-0 right-0 z-50
         bg-transparent;
}

.header-transparent .nav-link {
  @apply text-white/90 hover:text-white;
}

.header-transparent .nav-link--active {
  @apply text-secondary-500;
}
```

### 4.3 Page Header (Pages intérieures)

```tsx
<section className="page-header">
  <div className="page-header__overlay" />
  <Header transparent />
  <div className="container relative z-10 text-center py-20">
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
      Nos Événements
    </h1>
    <p className="text-white/80 text-lg">Participez à nos rencontres</p>
  </div>
  <div className="page-header__wave" />
</section>
```

```css
.page-header {
  @apply relative bg-cover bg-center min-h-[300px] md:min-h-[350px];
  background-image: url("/images/header-bg.jpg");
}

.page-header__overlay {
  @apply absolute inset-0 bg-gradient-to-r
         from-accent-600/90 to-primary-600/90;
}

.page-header__wave {
  @apply absolute bottom-0 left-0 right-0 h-16;
  background: url("/images/wave.svg") no-repeat bottom center;
  background-size: cover;
}
```

### 4.4 Hero Home (Accueil)

```tsx
<section className="hero-home">
  <div className="container grid lg:grid-cols-2 gap-12 items-center py-16">
    <div>
      <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
        Construisons ensemble l'écosystème numérique africain
      </h1>
      <p className="text-lg text-neutral-600 mb-8">
        imo2tun est une association loi 1901...
      </p>
      <div className="flex flex-wrap gap-4">
        <a href="/adherer" className="btn-primary">
          Devenir Membre
        </a>
        <a href="/a-propos" className="btn-secondary">
          Découvrir nos programmes
        </a>
      </div>
    </div>
    <div className="relative">
      <img src="/images/hero-image.png" alt="" className="w-full" />
    </div>
  </div>
</section>
```

```css
.hero-home {
  @apply bg-gradient-to-br from-white to-neutral-50;
}
```

### 4.5 Newsletter Banner

```tsx
<section className="newsletter-banner">
  <div className="container">
    <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
      Pour plus d'informations
    </h2>
    <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Votre Nom"
        className="input-field flex-1"
      />
      <input
        type="email"
        placeholder="Votre E-mail"
        className="input-field flex-1"
      />
      <button type="submit" className="btn-primary bg-secondary-500">
        Soumettre
      </button>
    </form>
  </div>
</section>
```

```css
.newsletter-banner {
  @apply bg-gradient-to-r from-primary-600 to-accent-500
         py-16 relative overflow-hidden;
}

/* Motifs décoratifs en pseudo-éléments */
.newsletter-banner::before {
  content: "";
  @apply absolute bottom-0 left-0 w-full h-24
         bg-[url('/images/pattern-dots.svg')]
         opacity-20;
}
```

### 4.6 Footer

```tsx
<footer className="footer">
  <div className="container grid md:grid-cols-3 gap-12 py-16">
    {/* Colonne 1 - Logo & Description */}
    <div>
      <Logo className="mb-4" />
      <p className="text-neutral-400 text-sm">
        L'expérience d'une connaissance nouvelle au service de la jeunesse
        africaine...
      </p>
    </div>

    {/* Colonne 2 - Liens rapides */}
    <div>
      <h4 className="text-white font-semibold mb-4 underline underline-offset-4">
        Liens rapides
      </h4>
      <ul className="space-y-2">
        <li>
          <a href="/" className="footer-link">
            Accueil
          </a>
        </li>
        <li>
          <a href="/a-propos" className="footer-link">
            À propos
          </a>
        </li>
        <li>
          <a href="/actualites" className="footer-link">
            Actualités
          </a>
        </li>
        <li>
          <a href="/evenements" className="footer-link">
            Événements
          </a>
        </li>
        <li>
          <a href="/adherer" className="footer-link">
            Adhérer
          </a>
        </li>
      </ul>
    </div>

    {/* Colonne 3 - Contact */}
    <div>
      <h4 className="text-white font-semibold mb-4 underline underline-offset-4">
        Contactez-nous
      </h4>
      <ul className="space-y-2 text-neutral-400 text-sm">
        <li>(33) 632808316</li>
        <li>info@imo2tun.org</li>
        <li>12 rue Pasteur 60280 Margny-lès-Compiègne</li>
      </ul>
      <div className="flex gap-4 mt-4">
        <a href="#" className="footer-social">
          <Facebook />
        </a>
        <a href="#" className="footer-social">
          <Instagram />
        </a>
        <a href="#" className="footer-social">
          <Linkedin />
        </a>
      </div>
    </div>
  </div>

  {/* Copyright */}
  <div className="border-t border-neutral-800 py-4">
    <div className="container flex flex-col md:flex-row justify-between text-sm text-neutral-500">
      <span>Copyright © 2025 imo2tun.</span>
      <div className="flex gap-4">
        <a href="#">Mentions légales</a>
        <a href="#">Politique de confidentialité</a>
        <a href="#">CGU</a>
      </div>
    </div>
  </div>
</footer>
```

```css
.footer {
  @apply bg-primary-900 text-white;
}

.footer-link {
  @apply text-neutral-400 hover:text-white transition-colors text-sm;
}

.footer-social {
  @apply w-8 h-8 rounded-full bg-white/10
         flex items-center justify-center
         text-white hover:bg-white hover:text-primary-900
         transition-all;
}
```

### 4.7 Breadcrumb Bar

```tsx
<div className="breadcrumb-bar">
  <div className="container flex items-center justify-between py-4">
    <nav className="breadcrumb">
      <a href="/" className="breadcrumb-link">
        Accueil
      </a>
      <ChevronRight className="w-4 h-4 text-neutral-400" />
      <a href="/evenements" className="breadcrumb-link">
        Événements
      </a>
      <ChevronRight className="w-4 h-4 text-neutral-400" />
      <span className="text-secondary-500 font-medium">Détails</span>
    </nav>
    <button className="flex items-center gap-2 text-secondary-500 hover:text-secondary-600">
      <Share2 className="w-4 h-4" />
      <span>Partager</span>
    </button>
  </div>
</div>
```

```css
.breadcrumb-bar {
  @apply bg-white border-b border-neutral-100;
}

.breadcrumb {
  @apply flex items-center gap-2 text-sm;
}

.breadcrumb-link {
  @apply text-neutral-600 hover:text-primary-600 transition-colors;
}
```

---

## 🧩 5. Sections réutilisables

### 5.1 Section Title

```tsx
<div className="section-title">
  <h2>Notre Mission</h2>
  <div className="section-title__line" />
</div>
```

```css
.section-title {
  @apply text-center mb-12;
}

.section-title h2 {
  @apply text-3xl md:text-4xl font-bold text-neutral-900 mb-4;
}

.section-title__line {
  @apply w-20 h-1 bg-secondary-500 mx-auto rounded-full;
}
```

### 5.2 Stats Banner

```tsx
<section className="stats-banner">
  <div className="container grid grid-cols-3 gap-8 text-center text-white">
    <div>
      <span className="text-4xl md:text-5xl font-bold">500+</span>
      <p className="text-white/80 mt-2">Membres</p>
    </div>
    <div>
      <span className="text-4xl md:text-5xl font-bold">50+</span>
      <p className="text-white/80 mt-2">Experts</p>
    </div>
    <div>
      <span className="text-4xl md:text-5xl font-bold">20+</span>
      <p className="text-white/80 mt-2">Formations</p>
    </div>
  </div>
</section>
```

```css
.stats-banner {
  @apply bg-cover bg-center bg-fixed py-16 relative;
  background-image: url("/images/stats-bg.jpg");
}

.stats-banner::before {
  content: "";
  @apply absolute inset-0 bg-primary-900/80;
}
```

### 5.3 Partners Slider

```tsx
<section className="partners-slider">
  <div className="container">
    <div className="flex items-center justify-between gap-8 overflow-x-auto py-4">
      {partners.map((partner) => (
        <img
          key={partner.id}
          src={partner.logo}
          alt={partner.name}
          className="h-12 object-contain grayscale hover:grayscale-0 transition-all"
        />
      ))}
    </div>
  </div>
</section>
```

### 5.4 Process Steps

```tsx
<section className="process-steps">
  <div className="container">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {steps.map((step, index) => (
        <div key={index} className="process-step">
          <div className="process-step__icon">{step.icon}</div>
          <h4 className="font-semibold text-neutral-900 mb-2">{step.title}</h4>
          <p className="text-sm text-neutral-600">{step.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

```css
.process-step {
  @apply text-center;
}

.process-step__icon {
  @apply w-16 h-16 rounded-full
         bg-primary-100 text-primary-600
         flex items-center justify-center
         mx-auto mb-4
         transition-all duration-300;
}

.process-step:hover .process-step__icon {
  @apply bg-primary-600 text-white scale-110;
}
```

### 5.5 FAQ Section

```tsx
<section className="faq-section">
  <div className="container grid lg:grid-cols-3 gap-12">
    <div className="lg:col-span-2">
      <Accordion items={faqItems} />
    </div>
    <div className="bg-neutral-50 rounded-xl p-6 h-fit">
      <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <MessageCircle className="w-8 h-8 text-secondary-500" />
      </div>
      <h4 className="font-semibold text-center mb-2">
        Avez-vous d'autres questions ?
      </h4>
      <p className="text-sm text-neutral-600 text-center mb-4">
        Lorem ipsum dolor sit amet...
      </p>
      <a href="/contact" className="btn-primary w-full justify-center">
        Écrivez-nous directement
      </a>
    </div>
  </div>
</section>
```

### 5.6 CTA Section

```tsx
<section className="cta-section">
  <div className="container grid lg:grid-cols-2 gap-12 items-center">
    <div className="relative">
      <img src="/images/cta-image.jpg" alt="" className="rounded-2xl" />
    </div>
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
        Prêt à rejoindre l'aventure ?
      </h2>
      <p className="text-neutral-600 mb-8">
        Cum soluta nobis est eligendi optio cumque nihil...
      </p>
      <a href="/adherer" className="btn-primary">
        Devenir Membre Maintenant
      </a>
    </div>
  </div>
</section>
```

---

## 🎭 6. Animations et transitions

### Animations Framer Motion

#### Fade In Up (par défaut)

```tsx
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};
```

#### Stagger Children (listes)

```tsx
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
```

#### Scale In (modals, cartes)

```tsx
const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2 },
};
```

#### Slide In (menus)

```tsx
const slideIn = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
  transition: { type: "spring", damping: 25, stiffness: 200 },
};
```

### Transitions CSS standards

```css
/* Transition par défaut */
.transition-default {
  @apply transition-all duration-300 ease-out;
}

/* Transition rapide (boutons) */
.transition-fast {
  @apply transition-all duration-200 ease-out;
}

/* Transition lente (sections) */
.transition-slow {
  @apply transition-all duration-500 ease-out;
}
```

---

## 📱 7. Responsive Design

### Breakpoints

```css
sm:  640px   /* Mobile landscape */
md:  768px   /* Tablette */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Extra large */
```

### Patterns responsives

#### Navigation Mobile

```tsx
{
  /* Desktop */
}
<nav className="hidden lg:flex items-center gap-8">{/* Nav links */}</nav>;

{
  /* Mobile burger */
}
<button className="lg:hidden btn-icon">
  <Menu className="w-6 h-6" />
</button>;
```

#### Grilles adaptatives

```tsx
{
  /* 1 col mobile → 2 cols tablette → 3 cols desktop */
}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>;
```

#### Typographie responsive

```tsx
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Titre</h1>
```

---

```src/
├── app/
│   ├── (vitrine)/
│   │   ├── layout.tsx                    # Layout vitrine (Header + Footer)
│   │   ├── page.tsx                      # Accueil
│   │   ├── a-propos/
│   │   │   └── page.tsx                  # Page À propos
│   │   ├── actualites/
│   │   │   ├── page.tsx                  # Liste des articles
│   │   │   └── [slug]/
│   │   │       └── page.tsx              # Détail article
│   │   ├── evenements/
│   │   │   ├── page.tsx                  # Liste des événements
│   │   │   └── [slug]/
│   │   │       └── page.tsx              # Détail événement
│   │   ├── adherer/
│   │   │   ├── page.tsx                  # Présentation offres
│   │   │   └── candidature/
│   │   │       └── page.tsx              # Formulaire candidature
│   │   └── contact/
│   │       └── page.tsx                  # Page contact
│   ├── layout.tsx                        # Layout racine (fonts)
│   ├── globals.css                       # Styles globaux + Tailwind v4
│   └── test/
│       └── page.tsx                      # Page de test (à supprimer après)
│
├── components/
│   ├── ui/                               # Composants de base
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── modal.tsx
│   │   ├── accordion.tsx
│   │   └── index.ts
│   │
│   ├── layout/                           # Structure globale
│   │   ├── top-bar.tsx
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── newsletter-banner.tsx
│   │   └── index.ts
│   │
│   └── shared/                           # Sections réutilisables
│       ├── hero-home.tsx
│       ├── page-header.tsx
│       ├── breadcrumb-bar.tsx
│       ├── section-title.tsx
│       ├── event-card.tsx
│       ├── article-card.tsx
│       ├── mission-card.tsx
│       ├── testimonial-card.tsx
│       ├── pricing-card.tsx
│       ├── speaker-card.tsx
│       ├── process-steps.tsx
│       ├── faq-section.tsx
│       ├── stats-banner.tsx
│       ├── partners-slider.tsx
│       ├── cta-section.tsx
│       └── index.ts
│
├── lib/
│   ├── data/                             # Données statiques
│   │   ├── events.ts
│   │   ├── articles.ts
│   │   ├── partners.ts
│   │   ├── testimonials.ts
│   │   ├── faq.ts
│   │   ├── team.ts
│   │   ├── pricing.ts
│   │   └── index.ts
│   ├── constants.ts                      # Config site, navigation
│   └── utils.ts                          # Fonctions utilitaires (cn, formatDate)
│
├── hooks/
│   ├── use-modal.ts
│   └── index.ts
│
└── types/
    └── index.ts                          # Tous les types (Event, Article, etc.)```

## 📚 8. Recommandations et bonnes pratiques

### Cohérence visuelle

✅ **À FAIRE:**

- Utiliser `primary-600` pour les éléments de navigation et liens
- Utiliser `secondary-500` pour les CTA et actions principales
- Utiliser `accent-500` pour les overlays et effets de profondeur
- Appliquer `transition-all duration-300` sur les éléments interactifs
- Respecter les espacements: `gap-6`, `py-16`, `space-y-8`
- Utiliser `rounded-xl` pour les cartes et `rounded-lg` pour les boutons
- Toujours inclure des hover states avec scale ou shadow

❌ **À ÉVITER:**

- Mélanger les couleurs primaires dans un même composant
- Oublier les overlays sur les images de fond
- Utiliser des ombres trop prononcées
- Négliger les états focus pour l'accessibilité
- Créer des animations trop longues (> 500ms)

### Accessibilité

- Contraste minimum WCAG AA (4.5:1)
- Focus visible sur tous les éléments interactifs
- Labels explicites pour les formulaires
- Tailles tactiles minimales (44px)
- Textes alternatifs pour les images

### Performance

- Utiliser les classes Tailwind natives
- Lazy-load les images hors viewport
- Optimiser les SVG (inline pour icônes)
- Utiliser next/image pour l'optimisation automatique

---

## 🎯 9. Checklist de génération

Avant de considérer qu'un composant est terminé, vérifier:

- [ ] Palette de couleurs respectée (primary, secondary, accent, neutral)
- [ ] Typographie correcte (Poppins titres, Inter corps)
- [ ] Espacements cohérents (`gap-6`, `py-16`, `space-y-8`)
- [ ] Arrondis appropriés (`rounded-lg` boutons, `rounded-xl` cartes)
- [ ] Transitions appliquées (`transition-all duration-300`)
- [ ] Hover states présents (scale, shadow, couleur)
- [ ] Focus states avec `ring-2 ring-primary-500`
- [ ] Responsive design (mobile-first)
- [ ] Animations Framer Motion si nécessaire
- [ ] Accessibilité respectée (contraste, focus, labels)

---

## 📝 Notes finales

Ce document constitue la **référence complète** pour reproduire l'identité visuelle d'imo2tun.

**Principe directeur**: Dynamisme africain avec professionnalisme B2B - couleurs vives sur fond épuré.

**Couleurs signatures**:

- Bleu `#0077B6` (confiance, professionnalisme)
- Orange `#F9A825` (action, énergie)
- Teal `#26A69A` (croissance, innovation)

**Polices**: Poppins (titres) + Inter (corps) - Modernes et lisibles

**Philosophie**: Chaque élément doit refléter l'ambition panafricaine d'imo2tun tout en inspirant confiance aux partenaires et membres potentiels.

---

**Version**: 1.0
**Dernière mise à jour**: Novembre 2025
**Projet**: IMO2TUN Platform - Vitrine
**Framework**: Next.js 14 + Tailwind CSS + Framer Motion
