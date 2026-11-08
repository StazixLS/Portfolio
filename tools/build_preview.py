#!/usr/bin/env python3
"""Render the Jekyll site to plain HTML without Jekyll, for local previews.

GitHub Pages builds the real site; this script only exists so the site can be
looked at (and tested) on a machine without Ruby. It understands the small
subset of Jekyll this repo uses: layouts, includes with parameters, the
`projects` collection, `_data`, and the filters relative_url, absolute_url,
jsonify, slugify and markdownify.

Usage (from the repo root):
    pip install python-liquid markdown pyyaml
    python tools/build_preview.py            # writes _site_preview/ (serve it with
                                             # `python -m http.server -d _site_preview`)
    python tools/build_preview.py --baseurl=/portfolio   # same, under a sub-path
    python tools/build_preview.py --snapshots  # also refreshes preview.html and
                                             # preview-project.html at the repo root
"""
import datetime
import json
import re
import shutil
import sys
from pathlib import Path

import markdown
import yaml
from liquid import DictLoader, Environment
from pygments import highlight
from pygments.formatters import HtmlFormatter
from pygments.lexers import TextLexer, get_lexer_by_name

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_site_preview"

FRONT = re.compile(r"\A---\n(.*?)\n---\n?(.*)\Z", re.S)


def split_front(text):
    m = FRONT.match(text)
    if not m:
        return {}, text
    return (yaml.safe_load(m.group(1)) or {}), m.group(2)


def prep_template(src, is_include=False):
    """Turn Jekyll's include syntax into python-liquid's."""

    def include_tag(m):
        name, args = m.group(1), m.group(2).strip()
        if not args:
            return '{% include "' + name + '" %}'
        pairs = re.findall(r'(\w+)=("[^"]*"|\'[^\']*\'|[\w.\[\]]+)', args)
        return '{% include "' + name + '", ' + ", ".join(
            f"inc_{k}: {v}" for k, v in pairs
        ) + " %}"

    src = re.sub(r"\{%-?\s*include\s+([\w./-]+)([^%]*?)-?%\}", include_tag, src)
    if is_include:
        src = re.sub(r"\binclude\.(\w+)", r"inc_\1", src)
    return src


def slugify(value):
    value = str(value).lower()
    return re.sub(r"[^a-z0-9]+", "-", value).strip("-")


FENCE = re.compile(r"^[ \t]*(```|~~~)[ \t]*([\w+#.-]*)[^\n]*\n(.*?)\n?[ \t]*\1[ \t]*$", re.M | re.S)


def rouge_like(match, stash):
    """Fenced block -> the markup kramdown + Rouge produce on GitHub Pages.

    Pygments and Rouge share their token class names (k, kt, nf, s1, c1, mi...),
    so the real stylesheet colours this preview exactly like the live site."""
    lang = match.group(2) or "plaintext"
    try:
        lexer = get_lexer_by_name(lang)
    except Exception:
        lexer = TextLexer()
    inner = highlight(match.group(3), lexer, HtmlFormatter(nowrap=True))
    stash.append(
        f'<div class="language-{lang} highlighter-rouge"><div class="highlight">'
        f'<pre class="highlight"><code>{inner}</code></pre></div></div>'
    )
    return f"\n\nCODESTASH{len(stash) - 1}X\n\n"


def md_to_html(text):
    text = re.sub(r"^\s*\{::nomarkdown\}\s*$|^\s*\{:/nomarkdown\}\s*$", "", str(text), flags=re.M)
    stash = []
    text = FENCE.sub(lambda m: rouge_like(m, stash), text)

    def encode_url(m):
        url = m.group(2)
        if " " in url and '"' not in url:
            url = url.replace(" ", "%20")
        return f"{m.group(1)}({url})"

    text = re.sub(r"(\])\(([^)]*)\)", encode_url, text)
    html = markdown.markdown(text, extensions=["attr_list", "tables", "sane_lists"])
    for i, block in enumerate(stash):
        html = html.replace(f"<p>CODESTASH{i}X</p>", block)
    return html


def build(baseurl=""):
    config = yaml.safe_load((ROOT / "_config.yml").read_text(encoding="utf-8"))
    config["baseurl"] = baseurl

    data = {}
    for f in (ROOT / "_data").glob("*.yml"):
        data[f.stem] = yaml.safe_load(f.read_text(encoding="utf-8"))

    templates = {}
    for f in (ROOT / "_includes").glob("*.html"):
        templates[f.name] = prep_template(f.read_text(encoding="utf-8"), is_include=True)
    layouts = {}
    for f in (ROOT / "_layouts").glob("*.html"):
        fm, body = split_front(f.read_text(encoding="utf-8"))
        layouts[f.stem] = (fm, prep_template(body))

    env = Environment(loader=DictLoader(templates))
    env.filters["relative_url"] = lambda v, *a: baseurl + str(v) if str(v).startswith("/") else str(v)
    env.filters["absolute_url"] = lambda v, *a: baseurl + str(v) if str(v).startswith("/") else str(v)
    env.filters["jsonify"] = lambda v, *a: json.dumps(v, ensure_ascii=False)
    env.filters["slugify"] = lambda v, *a: slugify(v)
    env.filters["markdownify"] = lambda v, *a: md_to_html(v)

    static_files = []
    for p in ROOT.rglob("*"):
        rel = p.relative_to(ROOT).as_posix()
        if p.is_dir() or rel.startswith((".", "_", "tools/")) or "/." in rel:
            continue
        static_files.append({"path": "/" + rel})

    projects = []
    for f in sorted((ROOT / "_projects").glob("*.md")):
        fm, _ = split_front(f.read_text(encoding="utf-8"))
        fm = dict(fm)
        fm["url"] = f"/projects/{f.stem}/"
        fm["layout"] = "project"
        projects.append(fm)

    site = dict(config)
    site.update(
        {
            "data": data,
            "projects": projects,
            "static_files": static_files,
            "time": datetime.datetime.now(),
        }
    )

    def render_page(page, body):
        content = env.from_string(prep_template(body)).render(site=site, page=page)
        layout = page.get("layout")
        while layout:
            lfm, lbody = layouts[layout]
            content = env.from_string(lbody).render(site=site, page=page, content=content)
            layout = lfm.get("layout")
        return content

    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    for name in ("assets",):
        shutil.copytree(ROOT / name, OUT / name)

    pages = []
    for f in (ROOT / "index.md", ROOT / "404.html"):
        fm, body = split_front(f.read_text(encoding="utf-8"))
        fm = dict(fm)
        fm["url"] = "/" if f.stem == "index" else "/404.html"
        pages.append((fm, body, OUT / ("index.html" if f.stem == "index" else "404.html")))
    for proj in projects:
        pages.append((dict(proj), "", OUT / "projects" / proj["url"].strip("/").split("/")[-1] / "index.html"))

    for fm, body, target in pages:
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(render_page(fm, body), encoding="utf-8")
    return OUT, projects


def write_snapshots(out, projects):
    """Static copies that open straight from disk (file://), for preview.html."""

    def localize(html, to_project=None):
        html = re.sub(r'(href|src)="/assets/', r'\1="assets/', html)
        html = html.replace('href="/#', 'href="preview.html#')
        html = html.replace('href="/"', 'href="preview.html"')
        if to_project:
            html = html.replace(f'href="/projects/{to_project}/"', 'href="preview-project.html"')
        html = re.sub(r'href="/projects/[^"]*"', 'href="#"', html)
        # the JS-built favicon needs an absolute URL; on disk, keep it relative
        html = html.replace('"/assets/', '"assets/')
        return html

    first = projects[0]["url"].strip("/").split("/")[-1]
    index = (out / "index.html").read_text(encoding="utf-8")
    (ROOT / "preview.html").write_text(localize(index, first), encoding="utf-8")
    proj = (out / "projects" / first / "index.html").read_text(encoding="utf-8")
    (ROOT / "preview-project.html").write_text(localize(proj), encoding="utf-8")


if __name__ == "__main__":
    base = next((a.split("=", 1)[1] for a in sys.argv if a.startswith("--baseurl=")), "")
    out, projects = build(base)
    if "--snapshots" in sys.argv:
        write_snapshots(out, projects)
    print("rendered to", out)
