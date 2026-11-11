document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Tabs ---------- */
  const tabs = document.querySelectorAll('.tab[data-tab]');
  const panes = document.querySelectorAll('.pane');

  if ('IntersectionObserver' in window && tabs.length && panes.length) {
    const setActiveTab = (id) => {
      tabs.forEach((tab) => {
        tab.classList.toggle('active', tab.dataset.tab === id);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveTab(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    panes.forEach((pane) => observer.observe(pane));
  }

  // On a project page the "open file" tab is the last one: keep it in view on narrow screens.
  const tabBar = document.querySelector('.tabs');
  if (tabBar && tabBar.querySelector('.tab-file')) tabBar.scrollLeft = tabBar.scrollWidth;

  /* ---------- Project filter ----------
     Chips are rendered by Jekyll from the projects' own types and tags, so
     this only reads data-type / data-tags off the cards. Inside a group the
     choices add up (Unity or Unreal); the two groups narrow each other
     (student project and Unity). */
  const filter = document.querySelector('[data-filter]');
  const filterGrid = document.querySelector('[data-filter-grid]');
  if (filter && filterGrid) {
    const toggle = filter.querySelector('.filter-toggle');
    const panel = filter.querySelector('.filter-panel');
    const badge = filter.querySelector('[data-filter-badge]');
    const status = filter.querySelector('[data-filter-status]');
    const empty = document.querySelector('[data-filter-empty]');
    const chips = Array.from(filter.querySelectorAll('.filter-chip'));
    const resets = document.querySelectorAll('[data-filter-reset]');
    const cards = Array.from(filterGrid.querySelectorAll('.card'));
    filter.hidden = false;

    const setOpen = (open) => {
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
    };

    const apply = () => {
      const picked = (attr) => chips
        .filter((c) => c.hasAttribute(attr) && c.getAttribute('aria-pressed') === 'true')
        .map((c) => c.getAttribute(attr));
      const types = picked('data-filter-type');
      const tags = picked('data-filter-tag');
      let shown = 0;
      cards.forEach((card) => {
        const cardTags = (card.dataset.tags || '').split('|');
        const ok = (!types.length || types.includes(card.dataset.type))
          && (!tags.length || tags.some((t) => cardTags.includes(t)));
        card.hidden = !ok;
        if (ok) shown += 1;
      });
      const active = types.length + tags.length;
      badge.hidden = !active;
      badge.textContent = active;
      resets.forEach((b) => { if (b.closest('[data-filter]')) b.disabled = !active; });
      status.textContent = shown + ' / ' + cards.length;
      if (empty) empty.hidden = shown > 0;
    };

    chips.forEach((chip) => chip.addEventListener('click', () => {
      chip.setAttribute('aria-pressed', String(chip.getAttribute('aria-pressed') !== 'true'));
      apply();
    }));
    resets.forEach((btn) => btn.addEventListener('click', () => {
      chips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
      apply();
    }));
    toggle.addEventListener('click', () => setOpen(panel.hidden));
    document.addEventListener('click', (e) => {
      if (!panel.hidden && !filter.contains(e.target)) setOpen(false);
    });
    filter.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !panel.hidden) { setOpen(false); toggle.focus(); }
    });
    apply();
  }

  /* ---------- Fake build in the Output panels ----------
     Contact = success, 404 = failure: log lines print one by one and each
     status spins briefly before settling on OK / FAILED. Everything stays in
     the DOM, so the contact links are always there; a click on the panel
     skips straight to the end, and without JS or under
     prefers-reduced-motion the final state is shown right away. */
  const compilePanels = document.querySelectorAll('.output-panel[data-compile]');
  if (compilePanels.length && 'IntersectionObserver' in window && !reduceMotion) {
    const SPIN = ['|', '/', '-', '\\'];
    const LINE_MS = 180;
    const SPIN_MS = 300;

    const runBuild = (panel) => {
      const lines = Array.from(panel.querySelectorAll('.oline'));
      const timers = [];
      const spinners = new Map();
      let finished = false;

      const settle = (status) => {
        clearInterval(spinners.get(status));
        status.textContent = status.dataset.final;
        status.classList.remove('is-pending');
      };

      const finish = () => {
        if (finished) return;
        finished = true;
        timers.forEach(clearTimeout);
        panel.querySelectorAll('.status').forEach(settle);
        panel.classList.remove('is-compiling');
      };

      panel.querySelectorAll('.status').forEach((status) => {
        status.dataset.final = status.textContent;
      });
      panel.classList.add('is-compiling');

      let t = 0;
      lines.forEach((line) => {
        const status = line.querySelector('.status');
        const showAt = t;
        timers.push(setTimeout(() => {
          line.classList.add('is-shown');
          if (!status) return;
          let frame = 0;
          status.classList.add('is-pending');
          status.textContent = SPIN[0];
          spinners.set(status, setInterval(() => {
            frame += 1;
            status.textContent = SPIN[frame % SPIN.length];
          }, 90));
        }, showAt));
        if (status) {
          timers.push(setTimeout(() => settle(status), showAt + SPIN_MS));
          t = showAt + SPIN_MS + 40;
        } else {
          t = showAt + LINE_MS;
        }
      });
      timers.push(setTimeout(finish, t + 120));
      panel.addEventListener('click', finish, { once: true });
    };

    const buildObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          buildObserver.unobserve(entry.target);
          runBuild(entry.target);
        });
      },
      { threshold: 0.35 }
    );
    compilePanels.forEach((panel) => buildObserver.observe(panel));
  }

  /* ---------- Gallery: silent preview on hover ----------
     Thumbnails only load a small poster image. The video itself is fetched
     when the pointer rests on it (mouse only) or when it opens full size. */
  const canHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (canHover && !reduceMotion) {
    document.querySelectorAll('.gallery-item[data-type="video"]').forEach((tile) => {
      const video = tile.querySelector('video');
      if (!video) return;
      tile.addEventListener('pointerenter', () => {
        tile.classList.add('is-playing');
        video.play().catch(() => {});
      });
      tile.addEventListener('pointerleave', () => {
        tile.classList.remove('is-playing');
        video.pause();
        video.load();
      });
    });
  }

  /* ---------- Code blocks: language label + copy button ----------
     kramdown/Rouge already colours the code at build time; this only adds the
     small label and the copy button. Without JS the block still reads fine. */
  const LANG_NAMES = {
    cpp: 'C++', c: 'C', cs: 'C#', csharp: 'C#', python: 'Python', py: 'Python',
    js: 'JavaScript', javascript: 'JavaScript', ts: 'TypeScript', typescript: 'TypeScript',
    json: 'JSON', yaml: 'YAML', yml: 'YAML', xml: 'XML', html: 'HTML', css: 'CSS',
    glsl: 'GLSL', hlsl: 'HLSL', lua: 'Lua', java: 'Java', sql: 'SQL', diff: 'Diff',
    bash: 'Shell', sh: 'Shell', shell: 'Shell', powershell: 'PowerShell', ini: 'INI',
    markdown: 'Markdown', md: 'Markdown', liquid: 'Liquid',
  };
  const copyText = (text) => {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise((resolve, reject) => {
      const area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand && document.execCommand('copy');
      area.remove();
      ok ? resolve() : reject(new Error('copy failed'));
    });
  };
  document.querySelectorAll('.project-body .highlighter-rouge').forEach((block) => {
    const pre = block.querySelector('pre');
    if (!pre) return;
    const tools = document.createElement('div');
    tools.className = 'code-tools';

    const kind = (block.className.match(/language-([\w+#-]+)/) || [])[1];
    if (kind && kind !== 'plaintext') {
      const name = document.createElement('span');
      name.className = 'code-lang';
      name.textContent = LANG_NAMES[kind.toLowerCase()] || kind;
      tools.appendChild(name);
    }

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'code-copy';
    btn.innerHTML =
      '<span class="idle"><span lang="fr">Copier</span><span lang="en" hidden>Copy</span></span>' +
      '<span class="done"><span lang="fr">Copié</span><span lang="en" hidden>Copied</span></span>';
    let timer = null;
    btn.addEventListener('click', () => {
      copyText(pre.textContent.replace(/\n$/, '')).then(() => {
        btn.classList.add('is-copied');
        clearTimeout(timer);
        timer = setTimeout(() => btn.classList.remove('is-copied'), 1600);
      }).catch(() => {});
    });
    tools.appendChild(btn);
    block.appendChild(tools);
  });

  /* ---------- Media viewer ----------
     Every picture and video on a project page opens full size: the cover,
     the gallery thumbnails, the images inside the text. Arrow keys / buttons /
     swipe move between them, Escape or a click outside closes. Without JS the
     thumbnails are plain links to the files. */
  const isSvg = (url) => /\.svg([?#]|$)/i.test(url || '');
  const zoomEls = Array.from(
    document.querySelectorAll('.project-hero-media img, .gallery-item, .project-body img, .media-compare img')
  ).filter((el) => !(el.tagName === 'IMG' && isSvg(el.getAttribute('src'))));

  if (zoomEls.length && typeof HTMLDialogElement === 'function') {
    const LABELS = {
      fr: { close: 'Fermer', prev: 'Précédent', next: 'Suivant', viewer: 'Visionneuse de médias' },
      en: { close: 'Close', prev: 'Previous', next: 'Next', viewer: 'Media viewer' },
    };
    const label = (key) => (LABELS[document.documentElement.lang] || LABELS.fr)[key];
    const svg = (d) =>
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + d +
      '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    const describe = (el) => {
      if (el.tagName === 'A') {
        return { type: el.dataset.type || 'image', src: el.getAttribute('href'), caption: el.dataset.caption || '' };
      }
      const figure = el.closest('figure');
      const figcaption = figure && figure.querySelector('figcaption');
      return {
        type: 'image',
        src: el.currentSrc || el.src,
        caption: (figcaption ? figcaption.textContent.trim() : el.getAttribute('alt')) || '',
      };
    };

    let dialog = null;
    let stage = null;
    let captionEl = null;
    let countEl = null;
    let prevBtn = null;
    let nextBtn = null;
    let index = 0;

    const render = () => {
      const item = describe(zoomEls[index]);
      stage.textContent = '';
      let media;
      if (item.type === 'video') {
        media = document.createElement('video');
        media.src = item.src;
        media.controls = true;
        media.autoplay = true;
        media.muted = true;
        media.loop = true;
        media.playsInline = true;
      } else {
        media = document.createElement('img');
        media.src = item.src;
        media.alt = item.caption;
      }
      stage.appendChild(media);
      captionEl.textContent = item.caption;
      countEl.textContent = index + 1 + ' / ' + zoomEls.length;
      prevBtn.hidden = nextBtn.hidden = zoomEls.length < 2;
      [index - 1, index + 1].forEach((j) => {
        const neighbour = describe(zoomEls[(j + zoomEls.length) % zoomEls.length]);
        if (neighbour.type === 'image') new Image().src = neighbour.src;
      });
    };

    const step = (delta) => {
      index = (index + delta + zoomEls.length) % zoomEls.length;
      render();
    };

    const build = () => {
      dialog = document.createElement('dialog');
      dialog.className = 'lightbox';
      dialog.setAttribute('aria-label', label('viewer'));
      dialog.innerHTML =
        '<button type="button" class="lightbox-btn lightbox-close" aria-label="' + label('close') + '">' + svg('M6 6l12 12M18 6L6 18') + '</button>' +
        '<button type="button" class="lightbox-btn lightbox-prev" aria-label="' + label('prev') + '">' + svg('M15 5l-7 7 7 7') + '</button>' +
        '<button type="button" class="lightbox-btn lightbox-next" aria-label="' + label('next') + '">' + svg('M9 5l7 7-7 7') + '</button>' +
        '<div class="lightbox-stage"></div>' +
        '<div class="lightbox-bar"><span class="lightbox-caption"></span><span class="lightbox-count"></span></div>';
      document.body.appendChild(dialog);

      stage = dialog.querySelector('.lightbox-stage');
      captionEl = dialog.querySelector('.lightbox-caption');
      countEl = dialog.querySelector('.lightbox-count');
      prevBtn = dialog.querySelector('.lightbox-prev');
      nextBtn = dialog.querySelector('.lightbox-next');

      dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
      prevBtn.addEventListener('click', () => step(-1));
      nextBtn.addEventListener('click', () => step(1));
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog || e.target === stage) dialog.close();
      });
      dialog.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') step(-1);
        if (e.key === 'ArrowRight') step(1);
      });
      dialog.addEventListener('close', () => {
        stage.textContent = '';
        document.documentElement.classList.remove('has-lightbox');
      });

      let startX = null;
      dialog.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
      dialog.addEventListener('touchend', (e) => {
        if (startX === null) return;
        const dx = e.changedTouches[0].clientX - startX;
        startX = null;
        if (Math.abs(dx) > 50) step(dx > 0 ? -1 : 1);
      }, { passive: true });
    };

    const open = (i) => {
      if (!dialog) build();
      index = i;
      render();
      document.documentElement.classList.add('has-lightbox');
      dialog.showModal();
    };

    zoomEls.forEach((el, i) => {
      if (el.tagName === 'A') {
        el.addEventListener('click', (e) => {
          if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          open(i);
        });
      } else {
        el.classList.add('is-zoomable');
        el.tabIndex = 0;
        el.setAttribute('role', 'button');
        el.addEventListener('click', () => open(i));
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            open(i);
          }
        });
      }
    });

    // "preview here" links in the text point at #gallery-N: open that item instead of scrolling.
    document.addEventListener('click', (e) => {
      const link = e.target.closest && e.target.closest('a[href^="#gallery-"]');
      if (!link) return;
      const i = zoomEls.indexOf(document.getElementById(link.getAttribute('href').slice(1)));
      if (i < 0) return;
      e.preventDefault();
      open(i);
    });
  }
});

(function () {
  var STORAGE_KEY = 'site-lang';
  var SUPPORTED = ['fr', 'en'];

  function applyLang(lang) {
    document.documentElement.lang = lang;

    document.body.querySelectorAll('[lang="fr"], [lang="en"]').forEach(function (el) {
      el.hidden = el.getAttribute('lang') !== lang;
    });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var active = btn.dataset.langBtn === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* localStorage unavailable, ignore */
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      /* localStorage unavailable, ignore */
    }
    var initial = SUPPORTED.indexOf(stored) !== -1 ? stored : 'fr';
    applyLang(initial);

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(btn.dataset.langBtn);
      });
    });
  });
})();
