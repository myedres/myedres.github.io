# Top Dollar Gold — Jekyll Site

A Jekyll build of the Top Dollar Gold landing page, matching the ship-in
precious metals buyback content provided (contact → ship → get paid, no
walk-in locations). Content that repeats (process steps, buy-list, FAQ)
lives in `_data/*.yml` so you can edit copy without touching HTML, and
business-wide values (phone, email, spot price, payout rate) live once in
`_config.yml` under `business:`.

## Project structure

```
.
├── _config.yml          site settings + business info (phone, email, spot price)
├── Gemfile
├── index.html            homepage (Liquid template)
├── _layouts/
│   └── default.html      shared <head>, nav, footer, script include
├── _includes/
│   ├── nav.html           top nav + mobile menu, built from _data/nav.yml
│   └── footer.html
├── _data/
│   ├── nav.yml
│   ├── steps.yml          "How it works" 3 steps (contact → ship → get paid)
│   ├── buy_items.yml      "What we buy" grid
│   └── faq.yml
└── assets/
    ├── css/style.css
    └── js/main.js          FAQ accordion, mobile menu, scroll reveal
```

## What changed from the mock version

The site was originally scaffolded with placeholder content for a walk-in
retail concept (locations, testimonials, made-up stats like "16 years in
business"). Once real business content was provided — a ship-in model with
a real phone number and `topdollargold.ca` domain — those fabricated
sections and figures were removed rather than adapted, since attaching
invented statistics or reviews to an identifiable business would misrepresent
it. The `stats.yml`, `testimonials.yml`, and `locations.yml` data files were
deleted along with their corresponding sections and CSS.

One thing worth flagging: the source content lists payment methods
differently in two places — "How It Works" says Interac e-Transfer, bank
deposit, or check, while the FAQ says bank wire or other approved options.
Both are reproduced as given; you may want to reconcile that with whoever
owns the copy.

## Run it locally

Requires Ruby and Bundler.

```bash
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.

## Editing content

- **FAQ, buy-list, process steps** — edit the corresponding file in
  `_data/`, no HTML required.
- **Spot price, payout rate, phone number, email** — edit `business:` in
  `_config.yml`. The melt calculator on the homepage reads `spot_price_oz`
  and `payout_rate` directly from there (via Liquid front matter in
  `assets/js/main.js`), so updating the config updates both the displayed
  price and the calculator's math. `phone` is the display format and
  `phone_href` is the `tel:`-link format (digits only, with country code).
- **Page copy / layout** — edit `index.html`.

## Notes

- The calculator estimate is illustrative only; update `spot_price_oz` in
  `_config.yml` regularly (or wire it to a live pricing feed) if you want it
  to reflect the real market price.
- The site currently has no way to actually submit a quote request — the
  "Lock in Your Price" and "Get Quote" buttons open a pre-filled email to
  `getcash@topdollargold.ca`. Wire up a real form/CRM if you want something
  more structured than email.
