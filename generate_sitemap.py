#!/usr/bin/env python3
"""Generate a complete sitemap.xml by scanning every published .html page.

Run from repo root:  python3 generate_sitemap.py
"""
import os
import datetime

BASE_URL = "https://ylearner.org/"
ROOT = os.path.dirname(os.path.abspath(__file__))

# Pages that must never be indexed.
EXCLUDE = {"404.html", "generate_sitemap.py"}
# Directories to skip entirely.
SKIP_DIRS = {".git", ".claude", "assets", "css", "js"}

# Top-level course sections (used for priority tuning).
SECTIONS = {"python", "javascript", "sql", "git", "odoo", "owljs", "html", "csslessons"}


def lastmod(path):
    ts = os.path.getmtime(path)
    return datetime.date.fromtimestamp(ts).isoformat()


def classify(rel):
    """Return (priority, changefreq) for a relative url path."""
    name = os.path.basename(rel)
    depth = rel.count("/")

    # Homepage
    if rel == "":
        return "1.0", "weekly"
    # Legal / low-value pages
    if name in {"privacy-policy.html", "terms.html", "disclaimer.html"}:
        return "0.3", "yearly"
    if name in {"about.html", "contact.html"}:
        return "0.5", "monthly"
    if name == "sitemap.html":
        return "0.6", "weekly"

    # Course content
    section = rel.split("/")[0]
    if section in SECTIONS:
        if name == "quiz.html":
            return "0.5", "monthly"
        if "exercises" in name or "questions" in name:
            return "0.6", "monthly"
        # Section overview / intro pages sit shallow (section/page.html, depth 1)
        if depth == 1:
            return "0.9", "monthly"
        return "0.7", "monthly"

    return "0.5", "monthly"


def collect():
    urls = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS and not d.startswith(".")]
        for f in filenames:
            if not f.endswith(".html") or f in EXCLUDE:
                continue
            full = os.path.join(dirpath, f)
            rel = os.path.relpath(full, ROOT).replace(os.sep, "/")
            # Treat index.html as the homepage at its directory level.
            url_path = "" if rel == "index.html" else rel
            urls.append((url_path, full))
    # Stable sort: homepage first, then alphabetical.
    urls.sort(key=lambda x: (x[0] != "", x[0]))
    return urls


def main():
    urls = collect()
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        "",
    ]
    current_section = None
    for url_path, full in urls:
        section = url_path.split("/")[0] if "/" in url_path else "(root)"
        if section != current_section:
            current_section = section
            label = section if section != "(root)" else "Main Pages"
            lines.append(f"  <!-- {label} -->")
        prio, freq = classify(url_path)
        loc = BASE_URL + url_path
        lines.append(
            f"  <url><loc>{loc}</loc><lastmod>{lastmod(full)}</lastmod>"
            f"<changefreq>{freq}</changefreq><priority>{prio}</priority></url>"
        )
    lines.append("")
    lines.append("</urlset>")
    out = os.path.join(ROOT, "sitemap.xml")
    with open(out, "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines))
    print(f"Wrote {len(urls)} URLs to sitemap.xml")


if __name__ == "__main__":
    main()
