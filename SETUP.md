# Setup

## Voir le rendu tout de suite (sans installer Jekyll)
Il suffit de Python :

```bash
pip install python-liquid markdown pyyaml pygments
python3 tools/build_preview.py            # écrit le site dans _site_preview/
python3 -m http.server -d _site_preview 8765   # puis http://localhost:8765
```
`tools/build_preview.py` rejoue les templates du vrai site (accueil, pages projet, 404) sans
Ruby. Ce n'est pas le vrai Jekyll : GitHub Pages reste ce qui build le site en ligne, ce script
sert juste à vérifier le rendu avant de pousser. Option `--baseurl=/portfolio` pour tester sous
un sous-dossier, et `--snapshots` pour rafraîchir `preview.html` / `preview-project.html`
(copies qui s'ouvrent d'un double-clic).

## Faire tourner le vrai site en local
Il faut Ruby + Bundler installés sur ta machine.

```bash
bundle install
bundle exec jekyll serve
```

Puis ouvre http://localhost:4000

## Montrer le site hors-ligne (job dating, salon...)
Le site marche sans connexion internet, polices comprises (elles sont en local dans
`assets/fonts/`, plus de dépendance à Google Fonts).

Avant l'événement (avec internet) :
```bash
bundle install
bundle exec jekyll build
```
Ça crée un dossier `_site/` avec le site complet, prêt à l'emploi.

Le jour J (sans internet) :
```bash
bundle exec jekyll serve --skip-initial-build
```
ou plus simple : ouvre directement `_site/index.html` dans un navigateur (double-clic), aucune
commande nécessaire. Les deux marchent sans wifi.

## Ça reste 100% GitHub Pages
Chaque projet a maintenant sa propre page (`/projects/nom-du-projet/`), générée automatiquement
à partir des fichiers dans `_projects/`. C'est une fonctionnalité native de Jekyll (les "collections"),
pas un plugin — donc ça continue de marcher avec le build Jekyll standard de GitHub Pages, sans
rien changer à ta config ni passer par un hébergement externe. Le site est à
`https://stazixls.github.io/Portfolio/` (le repo s'appelle `Portfolio`, voir "Mettre en ligne").

## Structure d'un projet (`_projects/*.md`)
- `start_date` / `end_date`: toujours entre guillemets, au mois (`"2024-09"`) ou au jour
  (`"2024-09-02"`). Les projets sont triés automatiquement du plus récent au plus ancien sur
  `start_date`. Laisse `end_date: ""` si le projet est toujours en cours, ça affichera "Présent".
  Ce que ça donne :
  - `"2026-01"` → `"2026-03"` : Janvier 2026 - Mars 2026
  - `"2026-03"` → `"2026-03"` : Mars 2026 (même mois, affiché une seule fois)
  - `"2026-03-02"` → `"2026-03-08"` : 2 - 8 mars 2026 (utile pour une jam d'une semaine)
  - `"2026-03-02"` → `"2026-03-02"` : 2 mars 2026
- `duration_fr` / `duration_en` (facultatif): une durée écrite à la main, affichée après les dates.
  Ex: `duration_fr: "1 semaine"` / `duration_en: "1 week"` → "2 - 8 mars 2026 · 1 semaine"
- `project_type`: un des types définis dans `_data/project_types.yml` : `pro` (rose), `student`
  (bleu-vert), `personal` (or), `gamejam` (violet) et `team` (pêche, "Projet d'équipe", pour un
  projet fait à plusieurs en dehors d'un cadre client ou scolaire). Affiché en pastille colorée
  à côté des dates. Pour un nouveau type, il suffit d'ajouter une entrée dans ce fichier
  (`color` = `rose`, `foam`, `gold`, `iris` ou `peach`), sans toucher au code. "En cours" n'a pas
  besoin de type : une `end_date` vide affiche déjà "Présent"
- `title_fr` / `title_en`, `subtitle_fr` / `subtitle_en`
- `summary_fr` / `summary_en`: UNE phrase courte, affichée sur la carte de la page d'accueil
- `description_fr` / `description_en`: le texte complet, affiché sur la page dédiée du projet
  (`/projects/nom-du-projet/`) — aussi long que tu veux, plusieurs paragraphes
- `tags`: liste de technos. Chaque tag a sa propre couleur, définie dans `_data/tags.yml` (la même sur
  tout le site, pour que les tags d'un projet se distinguent d'un coup d'œil). Un tag absent de ce
  fichier reçoit quand même une couleur d'après son nom : ajoute-le à la liste pour choisir laquelle
- `link`: lien externe optionnel (Steam, page du studio, itch.io...), affiché en plus du lien interne
- `image` / `video` / `video_embed`: média principal, affiché en haut de la carte ET en haut de
  la page dédiée. Ne remplis qu'un seul des trois
- `favicon`: icône de l'onglet du navigateur pour la page de ce projet uniquement (chemin vers
  une image dans `assets/`, ex: `/assets/projects/mon-jeu/icon.png`). Laisse `favicon: ""` (ou un
  chemin qui n'existe pas) pour utiliser ta photo de profil GitHub à la place — voir "Photo de
  profil & icône de l'onglet" plus bas
- `gallery`: liste d'images/vidéos supplémentaires, affichées sous le texte de la page dédiée du
  projet (pas sur la carte d'accueil). Ce sont des vignettes : un clic les ouvre en grand dans la
  visionneuse (voir plus bas). Le nom du fichier sert de légende (sans l'extension), donc
  nomme-les proprement, ex: `Gameplay Glide Without Bonus Gem.mp4`
- `locked`: mets `true` pour un projet encore en cours que tu ne veux pas détailler publiquement.
  La carte reste visible (titre, tags, dates, résumé) mais le lien "en savoir plus" est remplacé
  par "🔒 Bientôt disponible". La page dédiée existe toujours si quelqu'un devine/tape l'URL, mais
  n'affiche qu'un message générique — jamais le vrai contenu (image, description, galerie).
  Laisse `locked: false` (ou retire le champ) pour le rendre public normalement

## Ajouter un nouveau projet
Duplique un fichier dans `_projects/`, donne-lui un nom de fichier différent (ex: `mon-jeu.md`).
Il apparaît automatiquement dans la grille (à la bonne place selon sa date) et obtient sa propre page.

## Photo de profil & icône de l'onglet
Dans `_config.yml`, remplis `avatar` avec le chemin vers ta photo (ex: `/assets/avatar.jpg`).
Mets le fichier dans `assets/`. Laisse `avatar: ""` si tu ne veux pas de photo — la section About
s'affiche normalement sans.

Par défaut, `avatar` est réglé sur l'URL CDN de ta photo de profil GitHub — elle se met à jour
toute seule si tu la changes sur GitHub, rien à retoucher ici. Dans la section About, elle s'affiche
en rond (CSS).

Icône de l'onglet : les navigateurs ne laissent pas le CSS toucher à l'icône d'onglet, donc la
forme est appliquée automatiquement par un petit script au chargement de la page (rognage sur un
canvas). Tu n'as jamais besoin d'arrondir tes images toi-même, n'importe quel PNG carré fait
l'affaire :
- **Page d'accueil** : ta photo de profil, en rond
- **Page d'un projet** : le `favicon` du projet, en carré à bords arrondis. Si le champ est vide ou
  pointe vers un fichier qui n'existe pas, c'est ta photo de profil en carré arrondi (pour qu'on
  distingue un onglet projet de l'onglet principal)
- **Page 404** : une texture "manquante" rose/noir (`assets/missing-texture.png`), sans rognage

Si le navigateur refuse de lire l'image pour la rogner (image externe sans CORS, par exemple),
l'icône d'origine est affichée telle quelle : ça ne casse rien, elle est juste non arrondie.
Pour un `favicon` de projet, prends une image locale dans `assets/` (256×256 suffit, garde-la
légère).

## Comparaison avant / après (2 images côte à côte)
Pour montrer une évolution (ex: version greybox vs version finale), utilise ce petit bloc HTML
directement dans `description_fr`/`description_en` :

```markdown
description_fr: >
  Texte avant.

  <div class="media-compare">
    <figure>
      <img src="/assets/projects/nelli-the-seer/pause-greybox.jpg" alt="Version greybox">
      <figcaption>Avril 2025 — greybox</figcaption>
    </figure>
    <figure>
      <img src="/assets/projects/nelli-the-seer/pause-final.jpg" alt="Version finale">
      <figcaption>Juillet 2025 — version finale</figcaption>
    </figure>
  </div>

  Texte après.
```

Les deux images s'affichent côte à côte (l'une sous l'autre sur mobile), avec la légende de ton
choix sous chacune.

## Vidéo YouTube / Vimeo qui ne s'affiche pas
Si une `<iframe>` (ou une balise HTML un peu spéciale) ne s'affiche pas correctement dans
`description_fr`/`description_en`, c'est que kramdown (le moteur Markdown) ne reconnaît pas
toujours certaines balises HTML placées au milieu d'un texte. Solution fiable : entoure-la avec
`{::nomarkdown}` / `{:/nomarkdown}`, qui force un passage brut sans interprétation :

```markdown
description_fr: >
  Texte avant.

  {::nomarkdown}
  <iframe src="https://www.youtube.com/embed/VIDEO_ID" class="float-right" allowfullscreen></iframe>
  {:/nomarkdown}

  Texte après.
```

Si une vidéo locale (`<video>`) ou une image avec `{: .float-right }` ne s'affiche pas non plus,
le même enrobage `{::nomarkdown}` / `{:/nomarkdown}` résout le problème.

## Placer une image ou vidéo précisément dans le texte
Dans `description_fr` / `description_en`, tu écris du Markdown normal. Pour insérer une image ou
une vidéo à un endroit précis (par exemple flottante à droite, avec le texte qui s'enroule autour) :

```markdown
description_fr: >
  Premier paragraphe qui présente le projet.

  ![Description de l'image](/assets/projects/nelli-combat.jpg){: .float-right }

  Le texte continue ici et s'enroule autour de l'image à droite.
  Utilise `.float-left` pour la faire flotter à gauche à la place.

  Un paragraphe normal, sans image, redevient pleine largeur.
```

Pour une vidéo au même endroit dans le texte (au lieu d'une image), utilise du HTML directement :

```markdown
description_fr: >
  Texte avant la vidéo.

  <video src="/assets/projects/nelli-demo.mp4" controls class="float-right"></video>

  Le texte continue autour de la vidéo.
```

Mets tes fichiers médias dans `assets/projects/` (crée le dossier s'il n'existe pas), puis
référence-les avec un chemin qui commence par `/assets/projects/...`.

### Une image ou vidéo qui vient d'ailleurs (URL externe)
Marche pareil, remplace juste le chemin par une URL complète :
```markdown
![Description](https://exemple.com/mon-image.jpg){: .float-right }
```

### Vidéo YouTube (ou Vimeo, etc.) en plein milieu du texte
Une vidéo YouTube n'est pas un fichier vidéo direct, donc `<video>` ne marche pas pour ça —
utilise une `<iframe>` avec le lien "embed" de YouTube (Partager > Intégrer, ou remplace juste
`watch?v=` par `embed/` dans l'URL) :

```markdown
description_fr: >
  Texte avant la vidéo.

  <iframe src="https://www.youtube.com/embed/VIDEO_ID" class="float-right" allowfullscreen></iframe>

  Le texte continue autour.
```
Même chose, `.float-left` ou pas de classe pour l'afficher pleine largeur.

## Liens (hyperliens) dans le texte
Un lien normal vers n'importe quelle URL marche directement en Markdown, pas besoin de balise
spéciale :
```markdown
description_fr: >
  Le moteur physique est développé avec [Box2D](https://box2d.org/), en complément d'Unity.
```
Ça donne un vrai lien cliquable (rose, souligné) — exactement le même style que les liens vers
la galerie (`#gallery-2`), simplement vers une adresse externe au lieu d'une image du site.

## Titres et sous-titres dans le texte (comme sur Discord, avec #)
Pareil que sur Discord, le `#` en début de ligne fait un titre — la taille dépend du nombre de `#` :

| Discord | Ici | Rendu |
|---|---|---|
| `# Titre` | `# Titre` | Gros titre |
| `## Titre` | `## Titre` | Titre moyen |
| `### Titre` | `### Titre` | Petit titre |
| — | `#### Titre` | Encore plus petit, en majuscules (en plus des 3 niveaux de Discord) |

```markdown
description_fr: >
  ## Contexte du projet

  Un paragraphe qui explique le contexte.

  ### Mon rôle

  Un autre paragraphe.
```

## Gras, italique, etc. (comme sur Discord) — ce qui marche et ce qui diffère
Le Markdown standard (utilisé ici) et le format de Discord se ressemblent mais ne sont pas
identiques :

| Effet | Syntaxe | Marche ici ? |
|---|---|---|
| **Gras** | `**texte**` ou `__texte__` | Oui, les deux |
| *Italique* | `*texte*` ou `_texte_` | Oui, les deux |
| ~~Barré~~ | `~~texte~~` | Oui |
| Souligné | — | **Non en Markdown standard** |

Piège à connaître : sur Discord, `__texte__` fait du **souligné**. Ici (Markdown classique),
`__texte__` fait du **gras** — comme `**texte**`. Il n'existe pas de syntaxe Markdown pour le
soulignement ; si tu en as vraiment besoin, écris directement `<u>texte</u>` dans la description,
ça marche aussi (HTML brut autorisé dans les champs `description_fr`/`description_en`).

## Résumé (carte) vs description (page dédiée) — deux textes différents
`summary_fr`/`summary_en` et `description_fr`/`description_en` sont deux champs séparés, pense
à écrire un texte différent dans chacun :
- `summary` : une phrase vague, juste pour donner envie de cliquer sur la carte de l'accueil
- `description` : le vrai texte détaillé (contexte, ton rôle, défis techniques, résultats),
  avec tes images/vidéos placées dedans comme au-dessus — c'est ce qui s'affiche sur
  `/projects/nom-du-projet/`

## Lier un mot du texte à une image de la galerie (hyperlien)
En plus de placer des médias en plein milieu du texte, tu peux garder une galerie d'images/vidéos
en bas de la page (`gallery`) et faire pointer un mot ou une phrase du texte vers l'une d'elles.
Chaque élément de la galerie a un identifiant `#gallery-1`, `#gallery-2`, etc. (dans l'ordre de la
liste).

```markdown
description_fr: >
  On voit bien le problème sur [cette capture d'écran](#gallery-2) : le cadenas
  ne se verrouille pas correctement dans certains angles de caméra.
```

Ça donne un vrai lien (rose, souligné) dans le texte : au clic, le média n°2 de la galerie s'ouvre
directement dans la visionneuse. Les deux approches (image en plein milieu du texte, et lien
texte → galerie) marchent en même temps, tu choisis au cas par cas ce qui convient le mieux.

## Animation de "compilation" (Contact et 404)
Les panneaux "Output" de la section Contact et de la page 404 font semblant de compiler : les lignes
s'affichent une par une, chaque statut tourne (`| / - \`) puis finit sur `OK` (Contact) ou `FAILED`
(404). Ça se lance une seule fois, quand le panneau arrive à l'écran, et dure environ 1,5 s. Les
liens (Mail, GitHub, LinkedIn) sont déjà dans la page et un clic sur le panneau saute directement
à la fin. Sans JavaScript, ou si le visiteur a réduit les animations, tout s'affiche tout de suite.

Pour l'activer sur un autre panneau : ajoute `data-compile` sur son `<div class="output-panel">` et
mets `class="status ok"` (ou `status fail`) sur le mot de fin de ligne (`OK`, `FAILED`...). Les
durées se règlent en haut du bloc dans `assets/js/main.js` (`LINE_MS` et `SPIN_MS`).

## Blocs de code dans le texte
Dans `description_fr` / `description_en`, un bloc de code entouré de trois accents graves, avec le
nom du langage juste après les premiers, est coloré automatiquement (couleurs Rosé Pine), avec le
nom du langage et un bouton "Copier" en haut à droite :

````markdown
description_fr: |
  Pour planer, je coupe la gravité tant que le bouton est maintenu :

  ```cpp
  void ANelliCharacter::StartGlide()
  {
      GetCharacterMovement()->GravityScale = 0.25f;
  }
  ```
````

Langages utiles : `cpp`, `csharp`, `python`, `json`, `yaml`, `hlsl`, `glsl`, `bash`, `diff`.
Sans nom de langage, le bloc s'affiche sans couleur. Pour du code au milieu d'une phrase, entoure-le
d'un seul accent grave : `UPROPERTY(EditAnywhere)`. Avec `description: |` (barre verticale) les
retours à la ligne et l'indentation du code sont conservés. Écris le bloc dans les deux langues si
tu veux qu'il apparaisse en FR et en EN.

## Agrandir les images et vidéos (visionneuse)
Sur une page projet, un clic sur le média du haut, une vignette de la galerie ou une image du texte
l'ouvre en grand. Flèches du clavier ou boutons pour passer au suivant, `Échap` ou un clic à côté
pour fermer, balayage du doigt sur mobile. Rien à configurer : ça marche pour toutes les images et
vidéos de la page (sauf les SVG et les vidéos YouTube intégrées).

## Posters des vidéos de la galerie
Les vignettes vidéo n'envoient pas la vidéo entière : elles affichent une petite image (poster),
et la vidéo ne se charge qu'au survol (souris) ou à l'ouverture. Le poster d'une vidéo
`Nom.mp4` est simplement `Nom.poster.jpg` dans le même dossier (640 px de large environ). Sans
poster, la vignette charge juste la première image de la vidéo. Pour en générer un :

```bash
ffmpeg -ss 1 -i "Nom.mp4" -frames:v 1 -vf scale=640:-2 -q:v 4 "Nom.poster.jpg"
```

## Parcours
La section "Parcours" de l'accueil vient de `_data/parcours.yml` : une entrée par étape (formation,
stage, emploi), de la plus récente à la plus ancienne. Champs : `title`, `kind_fr`/`kind_en`
(pastille), `place`, `period_fr`/`period_en` (facultatif, ex: "2023 - Présent"),
`description_fr`/`description_en` et `projects` (liste de noms de fichiers de `_projects/` sans
`.md`, affichés comme liens). Un champ vide est simplement ignoré.

## Contact
Mail, GitHub et LinkedIn sont dans `_data/contact.yml`. C'est la seule source : les icônes du haut
de l'accueil et le panneau Contact s'y réfèrent tous les deux. Les logos sont dans
`_includes/icon.html`.

## Navigation et couleur des liens
Sur une page projet, l'onglet du projet est affiché à droite des onglets du site avec une croix
qui ramène à la carte du projet dans la liste. Un bouton "Tous les projets" est aussi en haut et
en bas de la page. Les cartes de l'accueil sont cliquables partout. Tous les liens sont roses
(`--rose` dans `assets/css/style.css`), pas de bleu nulle part.

## Langue FR / EN
Le site est bilingue : un bouton FR/EN en haut à droite bascule tout le texte, et le choix est
mémorisé dans le navigateur du visiteur. Ça marche avec le Jekyll natif de GitHub Pages (pas besoin
de plugin ni de build spécial) : les deux langues sont générées dans la même page HTML, et un petit
script JS affiche/masque le bon bloc. Pense à toujours remplir les deux versions (`_fr` et `_en`)
de chaque champ.

## Mettre en ligne avec GitHub Pages
Le site est un "site de projet" : le repo s'appelle `Portfolio`, donc il est servi à
`https://stazixls.github.io/Portfolio/`. C'est `baseurl: "/Portfolio"` dans `_config.yml` qui le dit
à Jekyll : tous les liens et chemins du site (CSS, polices, images, pages) en tiennent compte.
Attention à la casse : les adresses GitHub Pages distinguent majuscules et minuscules, et
`baseurl` doit être écrit exactement comme le nom du repo. Si tu renommes le repo un jour, change
cette ligne en même temps, sinon plus rien ne se charge.

1. Repo `StazixLS/Portfolio` (nom identique à `baseurl`, sans le `/`)
2. Settings > Pages, source = branche `main`, dossier `/ (root)`
3. GitHub build automatiquement le site Jekyll : pas besoin de lancer `jekyll build` toi-même,
   ni de pousser le dossier `_site`
4. Le site est en ligne en quelques minutes (onglet "Actions" du repo si ça ne s'affiche pas, le
   log de build y est visible)

Dans les textes des projets, écris toujours les chemins comme `/assets/projects/...` (avec le `/`
au début) : le préfixe `/Portfolio` est ajouté tout seul au moment de la génération.

La racine `https://stazixls.github.io/` ne sert plus le portfolio. Pour que les anciens liens vers
le site continuent de marcher, il faudrait un repo `StazixLS.github.io` avec une page de
redirection vers `/Portfolio/`.
