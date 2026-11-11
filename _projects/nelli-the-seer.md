---
start_date: "2025-03"
end_date: "2025-07"
project_type: "student"
title_fr: "Nelli the Seer"
title_en: "Nelli the Seer"
subtitle_fr: "Projet étudiant : action-aventure & puzzle-platformer"
subtitle_en: "Student project: action-adventure & puzzle-platformer"
summary_fr: "Action-aventure à la troisième personne mêlant plateforme et énigmes basées sur la mémoire, sorti gratuitement sur Steam en juillet 2025."
summary_en: "Third-person action-adventure blending platforming and memory-based puzzles, released for free on Steam in July 2025."
role_fr: "UI/UX : architecture de widgets, menus, navigation manette. Débogage au-delà de l'UI : crashs, 3C, GPE"
role_en: "UI/UX: widget architecture, menus, gamepad navigation. Debugging beyond the UI: crashes, 3C, GPE"
tags: ["Unreal Engine 5", "C++", "Blueprint", "UI/UX"]
link: "https://store.steampowered.com/app/3801320/Nelli_The_Seer/"
image: "/assets/projects/Nelli The Seer/Cover.png"
favicon: "/assets/projects/Nelli The Seer/Flavicon.png"
video: ""
video_embed: ""
gallery:
  - "/assets/projects/Nelli The Seer/Vision Plate Crash (fix).mp4"
  - "/assets/projects/Nelli The Seer/Loading Screen (between levels).mp4"
  - "/assets/projects/Nelli The Seer/Gameplay Glide Without Bonus Gem.mp4"
  - "/assets/projects/Nelli The Seer/Gameplay Glide With Bonus Gem.mp4"
  - "/assets/projects/Nelli The Seer/Graphic Options V1.0.0.mp4"
description_fr: |
  Nelli The Seer est un projet étudiant d'Objectif 3D : un action-aventure à la troisième personne mêlant plateforme ([aperçu](#gallery-3)) et énigmes basées sur la mémoire, sorti gratuitement sur Steam le 8 juillet 2025 (89% d'avis positifs, plus de 20 000 téléchargements).

  {::nomarkdown}
  <iframe src="https://www.youtube.com/embed/vjoIUP63a10" class="float-right" allowfullscreen></iframe>
  {:/nomarkdown}

  ## Mon rôle

  Mon travail s'est concentré sur l'UI et l'UX du jeu : conception d'une architecture de widgets réutilisables (BaseWidget, BaseButton, BasePanel, BaseMenu...), et implémentation d'une partie des menus : accueil, sélection de niveau ([aperçu](#gallery-2)), options, pause, crédits, collectibles. Le tout avec prise en charge clavier/souris et manette, en collaboration avec le reste de l'équipe UI.

  <div class="media-compare">
    <figure>
      <img src="/assets/projects/Nelli The Seer/Rebind Options Graybox.png" alt="Menu de remapping des touches, version greybox">
      <figcaption>Greybox</figcaption>
    </figure>
    <figure>
      <img src="/assets/projects/Nelli The Seer/Rebind Options V1.0.0.png" alt="Menu de remapping des touches, version 1.0.0">
      <figcaption>v1.0.0</figcaption>
    </figure>
    <figure>
      <img src="/assets/projects/Nelli The Seer/Rebind Options V1.1.0.png" alt="Menu de remapping des touches, version 1.1.0 après migration">
      <figcaption>v1.1.0</figcaption>
    </figure>
  </div>

  <div class="media-compare">
    <figure>
      <img src="/assets/projects/Nelli The Seer/Graphic Options Graybox.png" alt="Menu des options graphiques, version greybox">
      <figcaption>Greybox</figcaption>
    </figure>
    <figure>
      <img src="/assets/projects/Nelli The Seer/Graphic Options V1.1.0.png" alt="Menu des options graphiques, version finale">
      <figcaption>Version finale</figcaption>
    </figure>
  </div>

  ## Défis techniques

  Trois systèmes m'ont donné le plus de fil à retordre : le focus system (à quel widget la manette/le clavier "s'accroche", [à voir dans la galerie](#gallery-5)), le menu pause, et la détection + rebind clavier ↔ manette. Ce trio a dû être solidifié une seconde fois lors de la migration d'Unreal Engine 5.4.4 (v1.0.0) vers 5.6.1 (v1.1.0), qui a cassé une partie du système existant. D'où les trois versions du menu de remapping ci-dessus.

  ## Ce dont je suis le plus fier

  La transition du menu pause entre deux niveaux : j'ai éliminé le petit "pop" de l'écran de chargement entre deux changements de niveau, pour un résultat fluide et sans accroc visible ([à voir dans la galerie](#gallery-2)).

  ## Après la sortie

  Le travail ne s'est pas arrêté à la sortie Steam. J'ai continué à corriger des bugs bien après la fin officielle du projet : deux crashs majeurs (dont un provoqué par la vision plate, [l'un d'eux dans la galerie](#gallery-1)), des correctifs côté 3C et GPE (des zones auxquelles je n'avais pas touché en production), et la réadaptation du système de rebind/détection clavier-manette après la migration vers UE 5.6.1.

  ## Ce que j'en ai retenu

  Mon premier projet avec Perforce (P4V), donc mon premier apprentissage du travail en versioning sur un gros projet d'équipe. Côté technique : mieux utiliser les Blueprints, et ne pas sur-architecturer. Un système "trop réutilisable" peut surcharger un Blueprint pour un gain quasi nul.
description_en: |
  Nelli The Seer is a student project from Objectif 3D: a third-person action-adventure blending platforming ([preview](#gallery-3)) and memory-based puzzles, released for free on Steam on July 8, 2025 (89% positive reviews, 20,000+ downloads).

  {::nomarkdown}
  <iframe src="https://www.youtube.com/embed/vjoIUP63a10" class="float-right" allowfullscreen></iframe>
  {:/nomarkdown}

  ## My role

  My work focused on the game's UI and UX: designing a reusable widget architecture (BaseWidget, BaseButton, BasePanel, BaseMenu...), and implementing part of the menus: main menu, level select ([preview](#gallery-2)), options, pause, credits, collectibles. All with keyboard/mouse and gamepad support, alongside the rest of the UI team.

  <div class="media-compare">
    <figure>
      <img src="/assets/projects/Nelli The Seer/Rebind Options Graybox.png" alt="Key remapping menu, greybox version">
      <figcaption>Greybox</figcaption>
    </figure>
    <figure>
      <img src="/assets/projects/Nelli The Seer/Rebind Options V1.0.0.png" alt="Key remapping menu, version 1.0.0">
      <figcaption>v1.0.0</figcaption>
    </figure>
    <figure>
      <img src="/assets/projects/Nelli The Seer/Rebind Options V1.1.0.png" alt="Key remapping menu, version 1.1.0 after the migration">
      <figcaption>v1.1.0</figcaption>
    </figure>
  </div>

  <div class="media-compare">
    <figure>
      <img src="/assets/projects/Nelli The Seer/Graphic Options Graybox.png" alt="Graphics options menu, greybox version">
      <figcaption>Greybox</figcaption>
    </figure>
    <figure>
      <img src="/assets/projects/Nelli The Seer/Graphic Options V1.1.0.png" alt="Graphics options menu, final version">
      <figcaption>Final version</figcaption>
    </figure>
  </div>

  ## Technical challenges

  Three systems gave me the most trouble: the focus system (which widget the gamepad/keyboard is "attached" to, [see it in the gallery](#gallery-5)), the pause menu, and keyboard-to-gamepad detection + rebinding. This trio had to be reinforced a second time during the migration from Unreal Engine 5.4.4 (v1.0.0) to 5.6.1 (v1.1.0), which broke part of the existing system, hence the three versions of the remapping menu above.

  ## What I'm most proud of

  The pause menu transition between levels: I eliminated the small loading-screen "pop" that used to appear between level changes, for a smooth result with no visible hitch ([see it in the gallery](#gallery-2)).

  ## After launch

  The work didn't stop at the Steam release. I kept fixing bugs well after the project's official end: two major crashes (one of them caused by the vision plate, [one of them in the gallery](#gallery-1)), fixes on the 3C and GPE side (areas I hadn't touched during production), and re-adapting the rebind/keyboard-gamepad detection system after the UE 5.6.1 migration.

  ## What I took away from it

  My first project using Perforce (P4V), so my first experience with version control on a large team project. On the technical side: using Blueprints more effectively, and not over-architecting. A system that's "too reusable" can overload a Blueprint for almost no gain.
---
