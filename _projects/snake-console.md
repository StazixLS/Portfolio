---
start_date: "2024-12-02"
end_date: "2024-12-08"
project_type: "course"
team_size: 1
title_fr: "Snake Console"
title_en: "Console Snake"
subtitle_fr: "Projet de cours de première année : Snake en C++ dans la console"
subtitle_en: "First-year course project: Snake in C++ in the console"
summary_fr: "Un Snake en console avec cinq niveaux de difficulté, des fruits à effets, des meilleurs scores sauvegardés et un système de logs."
summary_en: "A console Snake with five difficulty levels, fruits with effects, saved best scores and a logging system."
role_fr: ""
role_en: ""
tags: ["C++"]
link: ""
image: ""
video: ""
video_embed: ""
gallery:
  - "/assets/projects/Snake Console/Partie.mp4"
  - "/assets/projects/Snake Console/Menus et options.mp4"
description_fr: |
  Un Snake jouable dans la console Windows, écrit seul en C++ en une semaine (du 2 au 8 décembre 2024), pendant ma première année. Déplacement aux flèches ou à ZQSD, affichage en couleurs ([aperçu](#gallery-1)).

  ## Gameplay

  - **5 niveaux de difficulté**, qui jouent sur la taille de la grille : 20, 15, 10, 7 ou 5 cases de côté.
  - **Fruits à effets** : chaque fruit modifie la taille du serpent, et on choisit dans les options lesquels apparaissent ([aperçu](#gallery-2)).
  - **Meilleur score par difficulté**, sauvegardé dans un fichier. Une clé de chiffrement optionnelle permet de chiffrer ce fichier.

  <div class="media-compare">
    <figure>
      <img src="/assets/projects/Snake Console/Mort et meilleur score.png" alt="Fin de partie avec un nouveau meilleur score">
      <figcaption>Fin de partie</figcaption>
    </figure>
  </div>

  ## Côté code

  Découpage en classes (`Snake`, `SnakePart`, `Grid`, `Tile`, `Game`, `Consumable`...), un `SaveManager` pour les sauvegardes, un `Logger` qui écrit un fichier de log et tient des statistiques (parties lancées, historique des dix dernières parties), et un diagramme de classes (`ClassDiagram.cd`) dans le projet.

  ## Défis techniques

  L'affichage. Effacer et redessiner toute la console à chaque image la faisait clignoter, alors je ne réécris que ce qui change : il faut savoir exactement où placer le curseur, et écrire des espaces par-dessus les anciens caractères pour les effacer.

  ## Ce que j'en ai retenu

  C'était très amusant à faire, et j'étais vraiment fier d'avoir sorti ce petit jeu. Si je le reprends, je déplacerai la sauvegarde dans AppData et je publierai un exécutable en release sur GitHub.
description_en: |
  A playable Snake in the Windows console, written solo in C++ in one week (December 2 to 8, 2024), during my first year. Arrow keys or ZQSD to move, colour display ([preview](#gallery-1)).

  ## Gameplay

  - **5 difficulty levels**, which change the grid size: 20, 15, 10, 7 or 5 tiles per side.
  - **Fruits with effects**: each fruit changes the snake's size, and the options let you pick which ones spawn ([preview](#gallery-2)).
  - **Best score per difficulty**, saved to a file. An optional encryption key lets you encrypt that file.

  <div class="media-compare">
    <figure>
      <img src="/assets/projects/Snake Console/Mort et meilleur score.png" alt="Game over with a new best score">
      <figcaption>Game over</figcaption>
    </figure>
  </div>

  ## Under the hood

  Split into classes (`Snake`, `SnakePart`, `Grid`, `Tile`, `Game`, `Consumable`...), a `SaveManager` for saves, a `Logger` that writes a log file and keeps statistics (games started, history of the last ten games), and a class diagram (`ClassDiagram.cd`) in the project.

  ## Technical challenges

  The display. Clearing and redrawing the whole console every frame made it flicker, so I only rewrite what changes: you need to know exactly where to put the cursor, and write spaces over the old characters to erase them.

  ## What I took away from it

  It was a lot of fun to make, and I was really proud to have finished this little game. If I pick it back up, I'll move the save into AppData and publish an executable as a GitHub release.
---
