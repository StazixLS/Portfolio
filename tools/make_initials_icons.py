"""Génère l'icône à initiales (PNG 256x256) de chaque projet qui n'a pas de favicon.

Même rendu que la couverture à initiales du site : les initiales du projet sur la
couleur de son type. L'icône sert d'onglet (favicon) et d'aperçu de lien (og:image).

Usage : python3 tools/make_initials_icons.py
Sortie : assets/projects/_initials/<nom du fichier projet>.png
Dépendances : Pillow, PyYAML
"""
from pathlib import Path
import re
import yaml
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets/projects/_initials"
FONT = ROOT / "tools/fonts/JetBrainsMono-Bold.ttf"
SIZE = 256
RADIUS = 56  # coins arrondis, transparents autour

SURFACE = (31, 29, 46)
COLORS = {  # mêmes valeurs que les variables CSS --rose, --foam...
    "rose": (235, 111, 146), "foam": (156, 207, 216), "gold": (246, 193, 119),
    "iris": (196, 167, 231), "peach": (235, 188, 186), "ok": (158, 206, 106),
    "neutral": (144, 140, 170),
}
SKIP = set("-&+/|:–—·.")


def front_matter(path):
    m = re.match(r"^---\n(.*?)\n---", path.read_text(encoding="utf8"), re.S)
    return yaml.safe_load(m.group(1)) if m else {}


def initials(fm):
    if fm.get("initials"):
        return str(fm["initials"])
    ini = "".join(w[0] for w in str(fm.get("title_fr", "")).split() if w and w[0] not in SKIP)
    return (ini or str(fm.get("title_fr", "?"))[:1])[:4]


def blend(c, a=0.12):
    return tuple(round(s + (x - s) * a) for s, x in zip(SURFACE, c))


def render(text, color):
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((0, 0, SIZE - 1, SIZE - 1), radius=RADIUS, fill=blend(color))
    size = {1: 150, 2: 128, 3: 96, 4: 74}.get(len(text), 74)
    font = ImageFont.truetype(str(FONT), size)
    draw.text((SIZE / 2, SIZE / 2), text, font=font, fill=color, anchor="mm")
    return img


def same_pixels(path, img):
    try:
        old = Image.open(path).convert("RGBA")
    except OSError:
        return False
    return old.size == img.size and old.tobytes() == img.tobytes()


def main():
    types = yaml.safe_load((ROOT / "_data/project_types.yml").read_text(encoding="utf8"))
    OUT.mkdir(parents=True, exist_ok=True)
    wanted = set()
    for md in sorted((ROOT / "_projects").glob("*.md")):
        fm = front_matter(md)
        if fm.get("favicon"):
            continue
        color = COLORS.get((types.get(fm.get("project_type")) or {}).get("color"), COLORS["neutral"])
        out = OUT / f"{md.stem}.png"
        img = render(initials(fm), color)
        # Réécrit seulement si l'image change : évite des commits pour rien
        # quand deux versions de Pillow encodent le même PNG différemment.
        if not (out.exists() and same_pixels(out, img)):
            img.save(out, optimize=True)
        wanted.add(out.name)
        print(f"{md.stem}: {initials(fm)}")
    for old in OUT.glob("*.png"):  # projets supprimés ou qui ont reçu un vrai favicon
        if old.name not in wanted:
            old.unlink()


if __name__ == "__main__":
    main()
