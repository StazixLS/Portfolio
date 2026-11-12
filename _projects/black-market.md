---
start_date: "2026-04-09"
end_date: "2026-04-13"
project_type: "course"
team_size: 1
title_fr: "Black Market"
title_en: "Black Market"
subtitle_fr: "Projet de cours : boutique en C# / WPF"
subtitle_en: "Course project: a shop in C# / WPF"
summary_fr: "Une boutique façon marché noir en WPF : catalogue filtrable par catégories, panier en databinding avec quantités et total en direct."
summary_en: "A black-market-style shop in WPF: a catalogue filtered by category, and a data-bound cart with quantities and a live total."
role_fr: ""
role_en: ""
initials: "BM"
tags: ["C#", "WPF", "XAML"]
link: ""
image: ""
video: ""
video_embed: ""
gallery:
  - "/assets/projects/Black Market/Panier et quantités.mp4"
  - "/assets/projects/Black Market/Filtre par catégorie.mp4"
  - "/assets/projects/Black Market/Panier complet.mp4"
description_fr: |
  Une boutique en ligne fictive façon marché noir : mercenaires à louer, objets volés, fuites de données, armes… Projet de cours réalisé seul en C# avec WPF, du 9 au 13 avril 2026.

  ## La consigne

  Faire une boutique virtuelle qui vend différents types de produits, chacun avec ses propres informations affichées. On doit pouvoir filtrer par type, ajouter au panier, changer la quantité de chaque article et voir le prix total. L'interface devait être digne d'une vraie boutique, en évitant les simples listes en XAML, avec du databinding sur le panier.

  ## Ce que j'y ai mis

  Chaque type de produit est une classe qui hérite d'une base commune et décide elle-même de son nom affiché et de sa description : un mercenaire a un âge, une origine et un taux de contrats réussis, un objet volé indique où il a été pris et s'il a été signalé à la police, une fuite de données a sa date. Le catalogue est généré au hasard à chaque lancement.

  Pour les catégories, j'ai choisi un enum `[Flags]` plutôt qu'une simple liste : un article peut appartenir à plusieurs catégories à la fois (un « Smuggler Crate » est à la fois dans les armes, les drogues et les divers), et l'onglet « All » n'est que la combinaison de toutes. Le filtre se résume alors à un `HasFlag` sur la vue de la collection ([aperçu](#gallery-2)). Ce n'était pas demandé, mais c'était plus pratique et ça me faisait travailler les flags.

  Le panier est entièrement en databinding : chaque ligne notifie son changement de quantité, et le total de la commande se recalcule tout seul ([aperçu](#gallery-1)).

  <div class="media-compare">
    <figure>
      <img src="/assets/projects/Black Market/Panier.png" alt="Boutique avec le panier ouvert et son total">
      <figcaption>Le panier et son total</figcaption>
    </figure>
  </div>

  ## Ce que j'en ai retenu

  WPF est très pratique pour monter une petite interface Windows. Avant, on passait par Python et Qt ; là tout est en C#, un langage que je connais beaucoup mieux, et le code m'a paru plus simple à écrire.
description_en: |
  A fictional black-market online shop: mercenaries for hire, stolen goods, data leaks, weapons… A solo course project in C# with WPF, from April 9 to 13, 2026.

  ## The brief

  Build a virtual shop selling several kinds of products, each with its own information on display. Users must be able to filter by type, add items to a cart, change each item's quantity and see the total price. The interface had to feel like a real shop, avoiding plain lists in XAML, with data binding on the cart.

  ## What I put into it

  Each product type is a class inheriting from a shared base, and it decides its own display name and description: a mercenary has an age, an origin and a contract success rate, a stolen item says where it was taken and whether it was reported to the police, a data leak has its date. The catalogue is generated randomly on every launch.

  For the categories I went with a `[Flags]` enum instead of a plain list: an item can belong to several categories at once (a "Smuggler Crate" is in weapons, drugs and misc), and the "All" tab is just every flag combined. Filtering then comes down to a `HasFlag` on the collection view ([preview](#gallery-2)). It wasn't required, but it was handier and it got me practising flags.

  The cart is fully data-bound: each line notifies its quantity change, and the order total updates on its own ([preview](#gallery-1)).

  <div class="media-compare">
    <figure>
      <img src="/assets/projects/Black Market/Panier.png" alt="The shop with the cart open and its total">
      <figcaption>The cart and its total</figcaption>
    </figure>
  </div>

  ## What I took away from it

  WPF is very handy for putting together a small Windows interface. We used to go through Python and Qt; here everything is C#, a language I know much better, and the code felt simpler to write.
---
