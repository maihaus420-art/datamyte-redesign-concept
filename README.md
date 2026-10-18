# datamyte-redesign-concept

> **Unsolicited concept; not affiliated with or endorsed by DataMyte.** DATAMYTE, Digital Clipboard and related product names are trademarks of their owner and are used here only to describe the concept.

An unsolicited website and app-UI concept by [chrismai.ai](https://chrismai.ai), a solo, early-stage AI web and agent studio run by Chris Mai.

## What's here

Static HTML/CSS only (no build step, no backend):

| Path | What it is |
|---|---|
| `site/dm-lx2imsn8jzo/` | Concept homepage for datamyte.com with a demo chat widget that answers from public pages |
| `site/dm-lx2imsn8jzo/proposal/` | One-page proposal |
| `site/dm-lx2imsn8jzo/app/` | Fifteen concept app screens (HTML) on one design system: nine for a fictional automotive tier-1 plant (including a multi-plant global view), one SiC/GaN power-semiconductor quality view, and five product-suite concept screens |
| `site/dm-lx2imsn8jzo/tour/` | App tour gallery |
| `site/dm-lx2imsn8jzo/manual/` | User manual in 13 languages, with a language switcher |
| `site/dm-lx2imsn8jzo/docs/` | Concept technical manuals for the five concept products (English; not DataMyte software, no certification claimed) |
| `site/dm-lx2imsn8jzo/products/` | Product suite concept: DataMyte's established products (cited) mapped to five new-era SaaS concepts, one page and one screen each |
| `site/dm-lx2imsn8jzo/credits/` | Photo and data credits |
| `site/dm-lx2imsn8jzo/showcase/` | Showcase of everything above |
| `site/dm-lx2imsn8jzo/manifest.webmanifest` | Web app manifest and icon kit (SVG favicon, 32px PNG, ICO, 180px apple-touch-icon, 192/512 PNG and a maskable 512) |

Live preview (noindex): https://chrismai-proposals.chrismai.workers.dev/dm-lx2imsn8jzo/showcase/

Every page shares one header: inline links on wide screens and a 44px menu button on phones that opens a sheet of 52px rows, each with an icon from one custom line-icon set (24px grid, 1.75px stroke, `currentColor`). The sheet supports Escape to close, `aria-expanded`, `:focus-visible` rings and safe-area padding.

## Important caveats

- **Concept UI by chrismai.ai, not DataMyte's actual software.** No DataMyte screenshots or logos are copied. Feature names come from DataMyte's public pages, which are cited on each screen. Layouts and anything marked "Imagined UI" are invented.
- **Sample data only.** The plants are fictional and no real customer names are used. SPC figures come from real public datasets (Montgomery piston rings via the qcc R package; UCI SECOM, CC BY 4.0). Figures marked "Estimate" or "Simulated" are model-derived, and their basis is shown on screen.
- The vision RFC and Methods pages linked from the screens are on the live preview only and are not part of this repo.
- **Translations are machine-assisted** and need native-speaker review. Arabic and Urdu use right-to-left layouts.
- No existing DataMyte relationship, integration or endorsement is claimed.

## Photos and datasets

Third-party material keeps its own license; the all-rights-reserved notice below covers only chrismai.ai's own work.

- Photos: Unsplash (Unsplash License), Wikimedia Commons (CC BY 2.0/3.0/4.0, CC0, public domain) and NIST (US government work). Each is credited with author, source and license in its caption and on `credits/`. No DataMyte photos or logos.
- The one CC BY-SA photo (SiC wafers, FDominec, CC BY-SA 4.0) is **not** in this repo; it appears on the live preview only.
- Defect images: VisA (Zou et al., ECCV 2022), CC BY 4.0; boxes are drawn from the dataset's ground-truth masks.
- Data: piston rings (Montgomery, via qcc), UCI SECOM (CC BY 4.0), NIST/SEMATECH e-Handbook MPC61 (US government work), PyScrew s01 (West & Deuse, CC BY 4.0), OICA 2024, Natural Earth (public domain).

## License

All rights reserved. Viewing is permitted; reuse, copying or redistribution requires written permission. See [LICENSE](LICENSE). This is **not** an open-source license.
