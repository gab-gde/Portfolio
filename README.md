# Gabin Goude — Portfolio

Portfolio personnel de Gabin Goude, développeur Full-Stack freelance basé à Paris.

## Stack

Site statique HTML/CSS/JS — aucun framework, déploiement direct sur Vercel ou GitHub Pages.

- **GSAP 3** + ScrollTrigger pour les animations au scroll
- **Hanken Grotesk** (Google Fonts)
- Smooth scroll custom (Lenis-like, pur JS)

## Structure

```
portfolio/
├── index.html          ← page principale
├── css/
│   └── style.css       ← tous les styles
├── js/
│   ├── smooth-scroll.js  ← inertia scroll
│   ├── cursor.js         ← curseur custom
│   ├── preloader.js      ← écran de chargement
│   ├── marquee.js        ← bande de texte animée
│   ├── preview-card.js   ← carte hover projets
│   └── animations.js     ← toutes les animations GSAP
├── assets/
│   └── images/
│       └── photo.jpg   ← TA PHOTO ICI
├── vercel.json
├── .gitignore
└── README.md
```

## Personnalisation

### Ajouter ta photo
1. Place ton fichier image dans `assets/images/photo.jpg`
2. Dans `index.html`, remplace le bloc placeholder par :
```html
<img src="assets/images/photo.jpg" alt="Gabin Goude" />
```

### Ajouter un projet
Dans `index.html`, copie un `<li class="project-item">` et modifie :
- `data-color` → couleur de fond de la preview card (hex sombre)
- `data-label` → catégorie affichée dans la card
- `data-href`  → lien vers la page ou le site du projet
- `.project-name` → nom du projet
- `.project-cat`  → catégorie courte

### Modifier les stats
Dans `index.html`, change `data-t="XX"` sur chaque `.cnt` pour le chiffre cible.

### Modifier le marquee
Dans `js/marquee.js`, édite le tableau `TAGS`.

## Déploiement

### Vercel (recommandé)
```bash
# 1. Push sur GitHub
git init
git add .
git commit -m "init portfolio"
git remote add origin https://github.com/ton-user/portfolio.git
git push -u origin main

# 2. Sur vercel.com → Import Git Repository → Done
```

### GitHub Pages
```bash
# Dans les Settings du repo → Pages → Deploy from branch → main / root
```

## Animation 360° (à venir)
Quand tu auras la vidéo filmée autour de toi, on remplacera le placeholder photo
par le système de video scrubbing lié au scroll.
