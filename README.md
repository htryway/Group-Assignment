# Next Level Gaming & Esports Arena — Website

Plain HTML, CSS and JavaScript — no build step, no dependencies. Matches Phase 3's
brief: *"Complete the HTML of the website only. Home page, about us page, contact
page, fees page done and at least one individual page done."*

## Pages included

| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About Us |
| `contact.html` | Contact Us (form, map, hours, socials) |
| `overview.html` | Packages catalogue |
| `experiences.html` | Individual experiences |
| `fees.html` | **Calculate Fees** — the required fee calculator |
| `package-ultimate-gamer-pass.html` | The required individual package page (fully static) |
| `package.html?id=...` | Bonus: one template that renders any other package/experience |

## How to run it

No server needed — just open `index.html` in a browser. Or, for the map embed and
relative paths to behave exactly like they will on GitHub Pages, serve it locally:

```bash
cd next-level-website
python3 -m http.server 8000
# then open http://localhost:8000
```

## How the pieces fit together

- **`js/data.js`** is the single source of truth for every price, package,
  discount tier and contact detail. Every page reads from it, so a price or
  discount can never disagree between pages again.
- **`js/components.js`** builds the logo, nav bar and footer *once* and injects
  them into every page's `<header id="site-header">` / `<footer id="site-footer">`
  placeholders. It also sets the active nav link automatically by comparing the
  current filename — so the nav highlight bug from the wireframes can't recur here.
- **`js/fees.js`** is the fee calculator: quantity steppers per item, live
  subtotal/discount/VAT/grand total, input validation, and an on-page invoice
  with a working **Print Invoice** button.

## Assets

```
assets/
├── logo/
│   ├── badge.svg            hexagon + chevron mark, no text — used in every nav bar and footer
│   ├── favicon.svg          badge on a dark rounded square — used as the browser tab icon
│   └── primary-lockup.svg   full mark with "NEXT LEVEL / GAMING & ESPORTS ARENA" baked in as
│                            real SVG text (not a pasted image) — for README/social-preview use
└── icons/
    ├── facebook.svg, instagram.svg, twitter.svg, youtube.svg   footer social links
    ├── location.svg, phone.svg, email.svg                      contact details (footer + Contact page)
    └── clock.svg, check.svg                                    spare icons, ready for Operating
                                                                  Hours headings or checklist bullets
                                                                  if you want to use them elsewhere
```

Every icon is real, hand-vectored SVG (not a font or an emoji), drawn as simple
line icons in the brand cyan so they read clearly at the small sizes used in
the header and footer. Because the logo lives in its own file rather than being
generated in JavaScript, it's trivial to swap: replace `assets/logo/badge.svg`
with a new version and every page picks it up automatically — it can't end up
pasted in mirrored or at the wrong size the way it did in the Figma wireframes.

## Pushing to your group's GitHub repository

```bash
git init
git add .
git commit -m "Phase 3: website HTML, CSS and JS"
git branch -M main
git remote add origin <your-group-repo-url>
git push -u origin main
```

Per your infrastructure plan, use a feature branch per page/feature and merge into
`main` via pull request so everyone's commits are visible for the GitHub marking
criterion.

## Extending it later (Phase 4)

To give every package and experience its own dedicated static page like
`package-ultimate-gamer-pass.html`, duplicate that file, change the `id` used in
the "You May Also Like" filter, and replace the hero copy and inclusions list —
or just keep using `package.html?id=vip-gaming-experience` (etc.), which already
works for all six remaining items.
