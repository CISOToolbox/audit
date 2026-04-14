# ISO 27001 Audit -- Interactive Audit Tool

> Part of [CISO Toolbox](https://www.cisotoolbox.org) -- open-source security tools for CISOs.

## Features

- ISO 27001:2022 full coverage: clauses 4-10 + Annex A controls (A.5-A.8, 93 controls)
- HDS (Health Data Hosting) focus mode with additional HDS-specific controls
- 6 statuses per control: Compliant, NC Major, NC Minor, Partial proof, Partial plan, N/A
- Dashboard with score gauge, radar chart, and stacked bars per domain
- Structured non-conformity fields (criterion, factual finding, root cause, corrective action)
- Document review tracking with per-document status and observations
- Audit planning with configurable multi-day time slots
- Journal/timeline with timestamped audit entries
- Photographic evidence capture (compressed JPEG, stored in IndexedDB)
- Word (.docx) export with professional audit report layout
- AI assistant (Anthropic Claude / OpenAI GPT) for report generation
- AES-256-GCM encrypted snapshots (PBKDF2 250k iterations)
- Bilingual FR/EN with lazy-loaded translations

## Quick Start

1. Visit [audit.cisotoolbox.org](https://audit.cisotoolbox.org) or clone this repo
2. Open `index.html` in a browser
3. Load `demo-en.json` from File > Open to explore a complete audit (MedSecure)
4. No backend, no account required

## Architecture

- 100% client-side vanilla JS -- no framework, no build step
- Data stored in browser (localStorage autosave + IndexedDB for evidence images)
- Event delegation via `data-click` attributes (CSP compliant, no inline handlers)
- Weighted maturity scoring with grade (A-E)
- Shared libraries: `cisotoolbox.js`, `i18n.js`, `ai_common.js`

## Import / Export

| Format | Import | Export |
|--------|--------|--------|
| JSON | Yes | Yes |
| Encrypted JSON (AES-256-GCM) | Yes | Yes |
| CSV (controls + findings) | -- | Yes |
| Word (.docx) audit report | -- | Yes |
| Document review (CSV) | -- | Yes |
| Planning (CSV / Word) | -- | Yes |

## Screenshots

_Coming soon_

## License

MIT

## Links

- Website: https://audit.cisotoolbox.org
- GitHub: https://github.com/CISOToolbox/audit
- CISO Toolbox: https://www.cisotoolbox.org
