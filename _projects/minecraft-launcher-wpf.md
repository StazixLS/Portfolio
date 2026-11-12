---
start_date: "2026-04-13"
end_date: "2026-04-14"
project_type: "course"
team_size: 2
title_fr: "Launcher Minecraft WPF"
title_en: "Minecraft Launcher WPF"
subtitle_fr: "Projet de cours en binôme : launcher en C# / WPF"
subtitle_en: "Course project in pairs: a launcher in C# / WPF"
summary_fr: "Un launcher façon Minecraft en WPF : liste des éditions, cartes d'actualités et comptes locaux avec connexion / inscription, réalisé en deux jours."
summary_en: "A Minecraft-style launcher in WPF: edition list, news cards and local accounts with login / sign-up, built in two days."
role_fr: "Comptes : sauvegarde, validation, connexion et déconnexion"
role_en: "Accounts: saving, validation, login and logout"
tags: ["C#", "WPF", "MVVM"]
link: ""
image: ""
video: ""
video_embed: ""
gallery:
  - "/assets/projects/Minecraft Launcher/Création de compte.mp4"
  - "/assets/projects/Minecraft Launcher/Mauvais mot de passe.mp4"
  - "/assets/projects/Minecraft Launcher/Déconnexion et connexion par pseudo.mp4"
description_fr: |
  Un launcher inspiré de celui de Minecraft, développé en C# avec WPF sur un projet de cours en binôme, en deux jours (13 et 14 avril 2026).

  ## La consigne

  Reproduire en binôme, le plus fidèlement possible, le launcher de notre choix : une boutique comme Steam ou le launcher d'un jeu. Ce qui est impossible à faire (télécharger les jeux, par exemple) pouvait être simulé. L'architecture devait suivre le modèle MVVM, le projet passer par GitHub, et chacun devait faire la moitié de l'interface et la moitié du code. L'étape de connexion était obligatoire, même hors ligne.

  La fenêtre principale liste les éditions du jeu (Java, Bedrock, Dungeons II, Dungeons, Legends) et affiche des cartes d'actualités. Toutes les éditions ne sont pas fonctionnelles, même visuellement : le projet reste une base réalisée en deux jours.

  ## Mon rôle

  J'ai écrit la gestion des comptes. À l'inscription, le mail est vérifié par expression régulière, et le mail comme les deux pseudos doivent être libres ([aperçu](#gallery-1)). On se connecte ensuite avec son mail, son nom de compte Microsoft ou son pseudo Minecraft, plus le mot de passe ; une erreur de saisie affiche un message ([aperçu](#gallery-2)). Le modèle `Account` prévient l'interface à chaque changement, et j'ai fait la fenêtre de déconnexion ([aperçu](#gallery-3)).

  La tête du joueur était récupérée en ligne à partir de son pseudo Minecraft. L'API utilisée ne répond plus aujourd'hui, d'où les têtes vides sur les vidéos.

  Mon binôme s'est occupé des actualités et de l'écran de chargement.

  <div class="media-compare">
    <figure>
      <img src="/assets/projects/Minecraft Launcher/Création de compte.png" alt="Fenêtre de création de compte du launcher">
      <figcaption>Création de compte</figcaption>
    </figure>
  </div>

  ## Défis techniques

  Les comptes sont enregistrés en JSON dans le dossier AppData de l'utilisateur, et c'est ce qui m'a pris le plus de temps : trouver comment obtenir le chemin vers AppData pour que la sauvegarde marche sur n'importe quel PC, quel que soit l'utilisateur.

  ## Ce que j'en ai retenu

  Ce genre de système est très utile pour un launcher de jeu avec des comptes. Ici tout est sauvegardé en local ; avec ce que j'ai appris en fin d'année, je passerais par une API REST et une base de données.
description_en: |
  A launcher inspired by Minecraft's, built in C# with WPF for a course project in pairs, in two days (April 13 and 14, 2026).

  ## The brief

  In pairs, recreate a launcher of our choice as faithfully as possible: a store like Steam or a game's own launcher. Anything impossible to do for real (downloading games, for instance) could be faked. The architecture had to follow MVVM, the project had to live on GitHub, and each of us had to do half of the interface and half of the code. A login step was mandatory, even offline.

  The main window lists the game editions (Java, Bedrock, Dungeons II, Dungeons, Legends) and shows news cards. Not every edition works, even visually: the project is a base built in two days.

  ## My role

  I wrote the account handling. On sign-up the email is checked with a regular expression, and the email and both usernames must not be taken ([preview](#gallery-1)). You then log in with your email, Microsoft account name or Minecraft username, plus the password; a wrong entry shows a message ([preview](#gallery-2)). The `Account` model notifies the interface on every change, and I made the logout window ([preview](#gallery-3)).

  The player's head was fetched online from their Minecraft username. The API it used no longer responds, which is why the heads are empty in the videos.

  My teammate handled the news feed and the loading screen.

  <div class="media-compare">
    <figure>
      <img src="/assets/projects/Minecraft Launcher/Création de compte.png" alt="The launcher's account creation window">
      <figcaption>Account creation</figcaption>
    </figure>
  </div>

  ## Technical challenges

  Accounts are saved as JSON in the user's AppData folder, and that's what took me the longest: finding how to get the path to AppData so saving works on any PC, whoever the user is.

  ## What I took away from it

  This kind of system is really useful for a game launcher with accounts. Here everything is saved locally; with what I learned by the end of the year, I'd go through a REST API and a database.
---
