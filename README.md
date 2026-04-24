# Beyond Tomorrow Studios — Website

First draft of the Beyond Tomorrow Studios marketing site.

Static HTML / CSS / vanilla JS — deployable to GitHub Pages with no build step.

## Local preview

Open `index.html` directly, or run any static server:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Structure

- `index.html` — all page content
- `styles.css` — design tokens + layout
- `script.js` — year stamp, scroll-reveal, active-section nav
- `BTS_website_reference.png` — original design reference

## Deploy (GitHub Pages)

1. Push to GitHub.
2. Repo → **Settings → Pages**.
3. Source: **Deploy from a branch** → `main` / root.
4. Site goes live at `https://<user>.github.io/<repo>/`.
