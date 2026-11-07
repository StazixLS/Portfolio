---
layout: default
title: Accueil
---

<section id="about" class="pane">
  <p class="pane-label">About.cs</p>
  {% if site.avatar and site.avatar != "" %}
  {% if site.avatar contains "://" %}
  <img src="{{ site.avatar }}" alt="{{ site.author }}" class="hero-avatar" onerror="this.remove()">
  {% else %}
  <img src="{{ site.avatar | relative_url }}" alt="{{ site.author }}" class="hero-avatar" onerror="this.remove()">
  {% endif %}
  {% endif %}
  <h1 class="hero-name">Sev FORNER<span class="cursor">_</span></h1>
  <p class="hero-role">
    <span lang="fr">&gt; Gameplay / AI / Tools Programmer</span>
    <span lang="en" hidden>&gt; Gameplay / AI / Tools Programmer</span>
  </p>
  <p class="hero-bio">
    <span lang="fr">Développeur passionné par le jeu vidéo, je code en C++, C# et Python, et je navigue entre Unity, Unreal Engine et WPF selon les projets. J'aime particulièrement le gameplay et les outils qui simplifient le travail en équipe : transformer une idée en quelque chose de jouable, du prototype à la version finale.</span>
    <span lang="en" hidden>I'm a game developer who codes in C++, C#, and Python, moving between Unity, Unreal Engine, and WPF depending on the project. I especially enjoy gameplay programming and building tools that make teamwork easier: turning an idea into something playable, from first prototype to final build.</span>
  </p>
  <div class="hero-actions">
    <a href="#projets" class="btn btn-fill">
      <span lang="fr">Voir mes projets</span>
      <span lang="en" hidden>View my projects</span>
    </a>
    <a href="#contact" class="btn btn-line">
      <span lang="fr">Me contacter</span>
      <span lang="en" hidden>Get in touch</span>
    </a>
  </div>
</section>

<section id="projets" class="pane">
  <p class="pane-label">Projects.json</p>
  <h2 class="pane-title">
    <span lang="fr">Projets</span>
    <span lang="en" hidden>Projects</span>
  </h2>

  <div class="grid">
    {% assign sorted_projects = site.projects | sort: "start_date" | reverse %}
    {% for project in sorted_projects %}
    {% assign vt_slug = project.title_fr | slugify %}
    <article class="card" id="project-{{ vt_slug }}">
      {% if project.image and project.image != "" %}
      <div class="card-media" style="view-transition-name: card-media-{{ vt_slug }};">
        <img src="{{ project.image | relative_url }}" alt="{{ project.title_fr }}" loading="lazy">
      </div>
      {% elsif project.video and project.video != "" %}
      <div class="card-media" style="view-transition-name: card-media-{{ vt_slug }};">
        <video src="{{ project.video | relative_url }}" controls preload="none"></video>
      </div>
      {% elsif project.video_embed and project.video_embed != "" %}
      <div class="card-media card-media-embed" style="view-transition-name: card-media-{{ vt_slug }};">
        <iframe src="{{ project.video_embed }}" title="{{ project.title_fr }}" loading="lazy" allowfullscreen></iframe>
      </div>
      {% endif %}

      <div class="card-body">
        <p class="card-meta">// project_{{ forloop.index }}</p>
        {% if project.project_type and project.project_type != "" %}
        {% assign ptype = site.data.project_types[project.project_type] %}
        <span class="project-type project-type-{{ ptype.color }}">
          <span lang="fr">{{ ptype.fr }}</span>
          <span lang="en" hidden>{{ ptype.en }}</span>
        </span>
        {% endif %}
        <h3 class="card-title" style="view-transition-name: card-title-{{ vt_slug }};">
          <span lang="fr">{{ project.title_fr }}</span>
          <span lang="en" hidden>{{ project.title_en | default: project.title_fr }}</span>
        </h3>
        {% if project.start_date and project.start_date != "" %}
        <p class="card-dates">
          <span lang="fr">{% include date-range.html start=project.start_date end=project.end_date lang="fr" %}</span>
          <span lang="en" hidden>{% include date-range.html start=project.start_date end=project.end_date lang="en" %}</span>
        </p>
        {% endif %}
        <p class="card-subtitle">
          <span lang="fr">{{ project.subtitle_fr }}</span>
          <span lang="en" hidden>{{ project.subtitle_en | default: project.subtitle_fr }}</span>
        </p>
        <p class="card-summary">
          <span lang="fr">{{ project.summary_fr }}</span>
          <span lang="en" hidden>{{ project.summary_en | default: project.summary_fr }}</span>
        </p>
        {% if project.tags %}
        <div class="tags">
          {% for tag in project.tags %}<span class="tag">{{ tag }}</span>{% endfor %}
        </div>
        {% endif %}
        <div class="card-actions">
          {% if project.locked %}
          <span class="card-locked">
            <span lang="fr">🔒 Bientôt disponible</span>
            <span lang="en" hidden>🔒 Coming soon</span>
          </span>
          {% else %}
          <a class="card-link" href="{{ project.url | relative_url }}">
            <span lang="fr">→ en savoir plus</span>
            <span lang="en" hidden>→ learn more</span>
          </a>
          {% endif %}
          {% if project.link and project.link != "" %}
          <a class="card-link card-link-ext" href="{{ project.link }}" target="_blank" rel="noopener">
            <span lang="fr">↗ voir en ligne</span>
            <span lang="en" hidden>↗ view live</span>
          </a>
          {% endif %}
        </div>
      </div>
    </article>
    {% endfor %}

    <!--
    <article class="card card-empty">
      <p class="card-meta">// project_next</p>
      <p class="card-empty-text">
        <span lang="fr">+ prochain projet</span>
        <span lang="en" hidden>+ next project</span>
      </p>
      <p class="card-empty-hint">
        <span lang="fr">ajoute un fichier dans <code>_projects/</code></span>
        <span lang="en" hidden>add a file in <code>_projects/</code></span>
      </p>
    </article>
     -->
  </div>
</section>

<section id="profile" class="pane">
  <p class="pane-label">Profile.md</p>
  <h2 class="pane-title">
    <span lang="fr">Profil</span>
    <span lang="en" hidden>Profile</span>
  </h2>

  <div class="profile-body">
    <div class="profile-block">
      <p class="profile-label">
        <span lang="fr">qui je suis</span>
        <span lang="en" hidden>who I am</span>
      </p>
      <p class="profile-text">
        <span lang="fr">Je m'appelle Sev. Ce qui m'a attiré vers le développement de jeux vidéo, c'est cette idée qu'une poignée de lignes de code peut devenir une expérience que quelqu'un d'autre va ressentir, manette en main. Je suis plutôt branché gameplay et outils : concevoir des systèmes qui tiennent la route, et construire ce qui permet à toute une équipe d'avancer plus vite.</span>
        <span lang="en" hidden>My name is Sev. What drew me to game development is the idea that a handful of lines of code can become an experience someone else actually feels, controller in hand. I lean toward gameplay and tools: designing systems that hold up, and building the things that let a whole team move faster.</span>
      </p>
    </div>

    <div class="profile-block">
      <p class="profile-label">
        <span lang="fr">mes débuts</span>
        <span lang="en" hidden>how it started</span>
      </p>
      <p class="profile-text">
        <span lang="fr">Avant de me lancer dans le développement de jeux vidéo, j'ai commencé par bidouiller des command blocks dans Minecraft, puis des datapacks. C'est là que j'ai pris goût à comprendre comment un système fonctionne sous le capot, et à vouloir le refaire moi-même. La suite s'est imposée naturellement : si j'aimais déjà bricoler des mécaniques dans un jeu, autant apprendre à en faire un vrai.</span>
        <span lang="en" hidden>Before getting into game development, I started out tinkering with command blocks in Minecraft, then datapacks. That's where I got a taste for understanding how a system works under the hood, and wanting to rebuild it myself. The next step came naturally: if I already enjoyed tinkering with mechanics inside a game, I might as well learn to make one for real.</span>
      </p>
    </div>

    <div class="profile-block">
      <p class="profile-label">
        <span lang="fr">mon parcours</span>
        <span lang="en" hidden>what I learned</span>
      </p>
      <p class="profile-text">
        <span lang="fr">Nelli the Seer et La Poste m'ont surtout appris à travailler en équipe sur un vrai projet : versionner proprement avec Perforce et Git, documenter ce que je fais, et accepter qu'un outil n'a de valeur que si les autres s'en servent vraiment.</span>
        <span lang="en" hidden>Nelli the Seer and La Poste mostly taught me how to work as part of a real team: versioning cleanly with Perforce and Git, documenting what I build, and accepting that a tool only has value if people actually use it.</span>
      </p>
    </div>

    <div class="profile-block profile-block-highlight">
      <p class="profile-label">
        <span lang="fr">ce que j'aimerais faire</span>
        <span lang="en" hidden>what I'd like to do</span>
      </p>
      <p class="profile-text">
        <span lang="fr">La suite, j'aimerais la construire comme programmeur gameplay / outils dans un studio, continuer à apprendre au contact d'autres développeurs, et creuser des sujets qui m'intéressent comme la réalité virtuelle et l'intégration de l'IA dans les outils de production.</span>
        <span lang="en" hidden>Looking ahead, I'd like to keep building as a gameplay/tools programmer in a studio, keep learning alongside other developers, and dig deeper into things that interest me, like virtual reality and bringing AI into production tooling.</span>
      </p>
    </div>
  </div>
</section>

<section id="contact" class="pane">
  <p class="pane-label">Contact.xaml</p>
  <h2 class="pane-title">Contact</h2>

  <div class="output-panel" data-compile>
    <div class="output-bar">
      <span class="output-title">Output</span>
      <span class="output-scope">
        <span lang="fr">Afficher la sortie de : Contact</span>
        <span lang="en" hidden>Show output from: Contact</span>
      </span>
    </div>
    <div class="output-body">
      <p class="oline">1&gt;------ Build started: Project: Contact, Configuration: Release Any CPU ------</p>
      <p class="oline">
        1&gt;&nbsp;
        <span lang="fr">Sev FORNER : ouvert aux opportunités</span>
        <span lang="en" hidden>Sev FORNER: open to opportunities</span>
      </p>
      <p class="oline">1&gt;  Resolving reference <a href="mailto:sev.forner@gmail.com">Mail</a>... <span class="status ok">OK</span></p>
      <p class="oline">1&gt;  Resolving reference <a href="https://github.com/{{ site.author }}" target="_blank" rel="noopener">GitHub</a>... <span class="status ok">OK</span></p>
      <p class="oline">1&gt;  Resolving reference <a href="https://linkedin.com/in/sev-forner-13300a44a" target="_blank" rel="noopener">LinkedIn</a>... <span class="status ok">OK</span></p>
      <p class="oline oline-summary">========== Build: 1 succeeded, 0 failed ==========</p>
    </div>
  </div>
</section>
