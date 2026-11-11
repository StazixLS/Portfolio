---
layout: default
title: Accueil
---

<section id="about" class="pane">
  <div class="hero">
    {% if site.avatar and site.avatar != "" %}
    {% if site.avatar contains "://" %}
    <img src="{{ site.avatar }}" alt="{{ site.author }}" class="hero-avatar" onerror="this.remove()">
    {% else %}
    <img src="{{ site.avatar | relative_url }}" alt="{{ site.author }}" class="hero-avatar" onerror="this.remove()">
    {% endif %}
    {% endif %}
    <div class="hero-text">
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
        <span class="hero-social">
          <a class="icon-btn" href="https://github.com/{{ site.author }}" target="_blank" rel="noopener" aria-label="GitHub" title="GitHub">{% include icon.html name="github" %}</a>
          <a class="icon-btn" href="{{ site.data.contact.linkedin }}" target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn">{% include icon.html name="linkedin" %}</a>
          <a class="icon-btn" href="mailto:{{ site.data.contact.email }}" aria-label="Mail" title="Mail">{% include icon.html name="mail" %}</a>
        </span>
      </div>
    </div>
  </div>
</section>

<section id="projets" class="pane">
  <div class="pane-head">
    <h2 class="pane-title">
      <span lang="fr">Projets</span>
      <span lang="en" hidden>Projects</span>
    </h2>
    {% include project-filter.html %}
  </div>

  <div class="grid" data-filter-grid>
    {% assign sorted_projects = site.projects | sort: "start_date" | reverse %}
    {% for project in sorted_projects %}{% unless project.locked %}
    {% include project-card.html project=project %}
    {% endunless %}{% endfor %}
    {% for project in sorted_projects %}{% if project.locked %}
    {% include project-card.html project=project %}
    {% endif %}{% endfor %}
  </div>
  <p class="filter-empty" data-filter-empty hidden>
    <span lang="fr">Aucun projet ne correspond à ce filtre.</span>
    <span lang="en" hidden>No project matches this filter.</span>
    <button type="button" class="filter-reset" data-filter-reset>
      <span lang="fr">Réinitialiser</span><span lang="en" hidden>Reset</span>
    </button>
  </p>
</section>

<section id="profile" class="pane">
  <h2 class="pane-title">
    <span lang="fr">Profil</span>
    <span lang="en" hidden>Profile</span>
  </h2>

  <div class="profile-layout">
    <div class="profile-prose">
      <div>
        <h3 class="profile-heading">
          <span lang="fr">qui je suis</span>
          <span lang="en" hidden>who I am</span>
        </h3>
        <p class="profile-text">
          <span lang="fr">Je m'appelle Sev. Ce qui m'a attiré vers le développement de jeux vidéo, c'est cette idée qu'une poignée de lignes de code peut devenir une expérience que quelqu'un d'autre va ressentir, manette en main. Je suis plutôt branché gameplay et outils : concevoir des systèmes qui tiennent la route, et construire ce qui permet à toute une équipe d'avancer plus vite.</span>
          <span lang="en" hidden>My name is Sev. What drew me to game development is the idea that a handful of lines of code can become an experience someone else actually feels, controller in hand. I lean toward gameplay and tools: designing systems that hold up, and building the things that let a whole team move faster.</span>
        </p>
      </div>

      <div>
        <h3 class="profile-heading">
          <span lang="fr">mes débuts</span>
          <span lang="en" hidden>how it started</span>
        </h3>
        <p class="profile-text">
          <span lang="fr">Avant de me lancer dans le développement de jeux vidéo, j'ai commencé par bidouiller des command blocks dans Minecraft, puis des datapacks. C'est là que j'ai pris goût à comprendre comment un système fonctionne sous le capot, et à vouloir le refaire moi-même. La suite s'est imposée naturellement : si j'aimais déjà bricoler des mécaniques dans un jeu, autant apprendre à en faire un vrai.</span>
          <span lang="en" hidden>Before getting into game development, I started out tinkering with command blocks in Minecraft, then datapacks. That's where I got a taste for understanding how a system works under the hood, and wanting to rebuild it myself. The next step came naturally: if I already enjoyed tinkering with mechanics inside a game, I might as well learn to make one for real.</span>
        </p>
      </div>

      <div>
        <h3 class="profile-heading">
          <span lang="fr">ce que j'ai appris</span>
          <span lang="en" hidden>what I learned</span>
        </h3>
        <p class="profile-text">
          <span lang="fr">Nelli the Seer et La Poste m'ont surtout appris à travailler en équipe sur un vrai projet : versionner proprement avec Perforce et Git, documenter ce que je fais, et accepter qu'un outil n'a de valeur que si les autres s'en servent vraiment.</span>
          <span lang="en" hidden>Nelli the Seer and La Poste mostly taught me how to work as part of a real team: versioning cleanly with Perforce and Git, documenting what I build, and accepting that a tool only has value if people actually use it.</span>
        </p>
      </div>

      <div>
        <h3 class="profile-heading">
          <span lang="fr">ce que j'aimerais faire</span>
          <span lang="en" hidden>what I'd like to do</span>
        </h3>
        <p class="profile-text">
          <span lang="fr">La suite, j'aimerais la construire comme programmeur gameplay / outils dans un studio, continuer à apprendre au contact d'autres développeurs, et creuser des sujets qui m'intéressent comme la réalité virtuelle et l'intégration de l'IA dans les outils de production.</span>
          <span lang="en" hidden>Looking ahead, I'd like to keep building as a gameplay/tools programmer in a studio, keep learning alongside other developers, and dig deeper into things that interest me, like virtual reality and bringing AI into production tooling.</span>
        </p>
      </div>
    </div>

    <aside class="panel properties" aria-label="Properties">
      <div class="panel-bar">
        <span class="panel-title">Properties</span>
      </div>
      <dl class="properties-list">
        <div class="prop">
          <dt><span lang="fr">Rôle</span><span lang="en" hidden>Role</span></dt>
          <dd>Gameplay / AI / Tools Programmer</dd>
        </div>
        <div class="prop">
          <dt><span lang="fr">Langages</span><span lang="en" hidden>Languages</span></dt>
          <dd>C++, C#, Python</dd>
        </div>
        <div class="prop">
          <dt>Tech</dt>
          <dd>Unity, Unreal Engine, WPF</dd>
        </div>
        <div class="prop">
          <dt><span lang="fr">Outils</span><span lang="en" hidden>Tools</span></dt>
          <dd>Visual Studio, Rider, Perforce, Git, GitHub</dd>
        </div>
        <div class="prop">
          <dt><span lang="fr">Intérêts</span><span lang="en" hidden>Interests</span></dt>
          <dd>
            <span lang="fr">Réalité virtuelle, IA dans les outils de production</span>
            <span lang="en" hidden>Virtual reality, AI in production tooling</span>
          </dd>
        </div>
        <div class="prop">
          <dt><span lang="fr">Objectif</span><span lang="en" hidden>Goal</span></dt>
          <dd>
            <span lang="fr">Programmeur gameplay / outils en studio</span>
            <span lang="en" hidden>Gameplay / tools programmer in a studio</span>
          </dd>
        </div>
      </dl>
    </aside>
  </div>
</section>

<section id="parcours" class="pane">
  <h2 class="pane-title">
    <span lang="fr">Parcours</span>
    <span lang="en" hidden>Background</span>
  </h2>

  <ol class="timeline">
    {% for step in site.data.parcours %}
    <li class="timeline-item">
      <span class="timeline-dot" aria-hidden="true"></span>
      <div class="timeline-body">
        <h3 class="timeline-title">{{ step.title }}</h3>
        <div class="meta-row">
          {% if step.kind_fr and step.kind_fr != "" %}
          <span class="project-type project-type-iris">
            <span lang="fr">{{ step.kind_fr }}</span>
            <span lang="en" hidden>{{ step.kind_en | default: step.kind_fr }}</span>
          </span>
          {% endif %}
          {% if step.place and step.place != "" %}<span class="timeline-meta">{{ step.place }}</span>{% endif %}
          {% if step.period_fr and step.period_fr != "" %}
          <span class="timeline-meta">
            <span lang="fr">{{ step.period_fr }}</span>
            <span lang="en" hidden>{{ step.period_en | default: step.period_fr }}</span>
          </span>
          {% endif %}
        </div>
        <p class="timeline-text">
          <span lang="fr">{{ step.description_fr }}</span>
          <span lang="en" hidden>{{ step.description_en | default: step.description_fr }}</span>
        </p>
        {% if step.projects %}
        <p class="timeline-links">
          <span class="timeline-links-label">
            <span lang="fr">Projets réalisés :</span>
            <span lang="en" hidden>Projects:</span>
          </span>
          {% for slug in step.projects %}{% for project in site.projects %}{% if project.url contains slug %}
          <a href="{{ project.url | relative_url }}">
            <span lang="fr">{{ project.title_fr }}</span>
            <span lang="en" hidden>{{ project.title_en | default: project.title_fr }}</span>
          </a>
          {% endif %}{% endfor %}{% endfor %}
        </p>
        {% endif %}
      </div>
    </li>
    {% endfor %}
  </ol>
</section>

<section id="contact" class="pane">
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
      <p class="oline">1&gt;&nbsp; Resolving reference <a class="contact-link" href="mailto:{{ site.data.contact.email }}">{% include icon.html name="mail" %}<span>Mail</span></a><span class="oline-end">... <span class="status ok">OK</span></span></p>
      <p class="oline">1&gt;&nbsp; Resolving reference <a class="contact-link" href="https://github.com/{{ site.author }}" target="_blank" rel="noopener">{% include icon.html name="github" %}<span>GitHub</span></a><span class="oline-end">... <span class="status ok">OK</span></span></p>
      <p class="oline">1&gt;&nbsp; Resolving reference <a class="contact-link" href="{{ site.data.contact.linkedin }}" target="_blank" rel="noopener">{% include icon.html name="linkedin" %}<span>LinkedIn</span></a><span class="oline-end">... <span class="status ok">OK</span></span></p>
      <p class="oline oline-summary">========== Build: 1 succeeded, 0 failed ==========</p>
    </div>
  </div>
</section>
