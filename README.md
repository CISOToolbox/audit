# ISO 27001 Audit -- Interactive Audit Web Application

A 100% client-side web application for conducting **ISO 27001:2022** and **HDS** (Health Data Hosting) certification audits interactively.

> This tool is part of the **[CISO Toolbox](https://www.cisotoolbox.org)** suite -- a collection of open-source security tools designed for CISOs, auditors, and compliance officers. The suite is built to be modular and lightweight so that everyone can use only the tool(s) they need.
>
> To see the other tools in the suite, visit [cisotoolbox.org](https://www.cisotoolbox.org/#tools)

---

## Why this tool?

Most audit tools are either heavyweight GRC platforms that require server infrastructure, or simple spreadsheets that lack structure and traceability. This application fills the gap:

**1) No data leaves the browser**

- No application server, no database, no user accounts
- All processing is done client-side in JavaScript
- Data stays on the auditor's machine
- The application works offline once loaded
- Encryption/decryption of saved files (AES-256-GCM) is performed locally

**2) Built for the audit workflow**

- All 93 ISO 27001:2022 Annex A controls, organized by domain
- Per-control status assessment (Compliant, Major NC, Minor NC, Sensitive Point, Improvement Track, N/A)
- Structured non-conformity fields (criterion, factual finding, root cause, corrective action)
- Photographic evidence capture (images stored locally in IndexedDB)
- Document review checklist
- Audit planning with time slots
- Weighted maturity scoring with grade (A-E)
- Full audit journal with timestamped entries

---

## Features

### Control assessment

- **93 controls** from ISO 27001:2022 Annex A, organized in 4 domains (Organizational, People, Physical, Technological)
- **HDS mode** -- enables HDS-specific controls when activated
- **6 statuses** per control: Compliant, Major NC, Minor NC, Sensitive Point, Improvement Track, N/A
- **Structured NC fields** -- criterion, factual finding, root cause, corrective action (appear only for non-conformities)
- **Evidence fields** -- free text for findings and proof, plus photographic evidence (images)
- **Helper questions** -- contextual questions per control to guide the auditor
- **Formulation templates** -- pre-written NC formulations that can be copied into the findings

### Dashboard

- Radar chart by domain
- Stacked conformity bars per domain
- Score gauge with weighted maturity formula and grade
- NC summary table with severity sorting
- KPI boxes (audited, conformity rate, NC count)
- HDS focus panel (when HDS mode is active)

### Document review

- Structured checklist of documents to collect
- Per-document status (Received, Incomplete, Missing, N/A)
- Observations field per document
- CSV export of the document review

### Audit planning

- Multi-day planning with configurable time slots
- Drag-and-assign domains to time slots
- Printable planning view
- CSV and Word export of the planning

### Exports

| Format | Description |
|--------|-------------|
| **JSON** | Native format, full backup (Save / Save As) |
| **Encrypted JSON** | Secure backup (AES-256-GCM, PBKDF2 250k iterations) |
| **CSV** | All controls with status, findings, evidence, NC details |
| **Word (.docx)** | Professional audit report with cover page, executive summary, detail per domain, NC table, photographic evidence |
| **Document review CSV** | Document checklist export |
| **Planning CSV/Word** | Audit schedule export |

### Bilingual interface (FR/EN)

The application automatically detects the browser language and can be switched between French and English via Settings (gear icon in the toolbar).

### AI Assistant (optional)

An AI assistant can be enabled in Settings to generate audit reports from the collected findings. It supports **Anthropic (Claude)** and **OpenAI (GPT)** providers. The generated report can be exported as a Word document.

---

## Getting started

### Live demo

The application is available online: **https://audit.cisotoolbox.org/**

### Demo file

A demonstration file (`demo-en.json`) is included with the application. It contains a complete audit for a fictional company (MedSecure SAS) and lets you explore all features.

### Quick start

1. Open the application in a browser
2. Click **File > Open**
3. Select the `demo-en.json` file
4. Browse the domains using the sidebar

If you are using the online version, you can automatically load the demo data from Settings (gear icon in the top right corner).

---

## Architecture

### Design principles

| Principle | Detail |
|-----------|--------|
| 100% client-side | No backend, no database, no user accounts |
| Data sovereignty | All data stays in the browser (localStorage + IndexedDB for images + files) |
| No build step | Vanilla JavaScript, no framework, no transpiler |
| Shared library | Common code (`cisotoolbox.js`, `i18n.js`, `ai_common.js`) shared across CISO Toolbox apps |
| CSP compliant | No inline scripts, no `eval`, no `unsafe-inline` for JS |

### File structure

```
index.html                    Entry point
css/
  cisotoolbox.css             Shared styles (toolbar, sidebar, tables, dialogs)
  ISO_Audit.css               App-specific styles
js/
  i18n.js                     i18n engine (t(), switchLang, data-i18n attributes)
  cisotoolbox.js              Shared library (events, files, encryption, undo, snapshots)
  ai_common.js                Shared AI module (providers, settings, API calls)
  ISO_Audit_data.js           Default data structure (empty audit)
  ISO_Audit_controls.js       93 ISO 27001:2022 controls definition
  ISO_Audit_i18n_fr.js        French translations
  ISO_Audit_i18n_en.js        English translations
  ISO_Audit_app.js            Main application logic (dashboard, controls, sidebar)
  ISO_Audit_docreview.js      Document review panel
  ISO_Audit_planning.js       Audit planning panel
  ISO_Audit_export.js         CSV, Word, document review exports
  ISO_Audit_images.js         Image management (IndexedDB storage, compression)
```

### Key patterns

**D** -- The global data object containing the entire audit. Structure: `{ meta, findings, doc_review, planning, timers }`. Serialized to JSON for save/export.

**Event delegation** -- No inline event handlers. All interactions use `data-click`, `data-change`, `data-input` attributes dispatched by `_safeDispatch()`.

**IndexedDB for images** -- Photographic evidence is stored in IndexedDB (not in the JSON save file) to avoid bloating save files. Images are compressed to JPEG (800px max width, 70% quality) before storage.

**Weighted maturity score** -- `Score = (C×1 + PP×0.75 + PS×0.5 + NCmin×0.25) / (Audited - N/A)`. Grade: A (>=80%), B (>=65%), C (>=50%), D (>=35%), E (<35%).

---

## Security

| Measure | Detail |
|---------|--------|
| **CSP** | `script-src 'self' https://cdn.jsdelivr.net` -- no inline scripts, no `eval` |
| **X-Frame-Options** | `DENY` -- prevents clickjacking |
| **X-Content-Type-Options** | `nosniff` |
| **Permissions-Policy** | Disables camera, microphone, geolocation, payment, USB, sensors |
| **Encryption** | AES-256-GCM with PBKDF2 derivation (250,000 iterations) |
| **API Keys** | Stored only in localStorage, never in saved files |
| **HTML escaping** | All user input escaped via `esc()` before DOM insertion |
| **Image validation** | Only `data:image/*` URIs accepted for evidence images |
| **No server** | No data transits through a third-party server (except AI if enabled) |

---

## Deployment

The application is a set of static files. No application server is required.

### Hosting options

- **Web server** (Apache, Nginx, static hosting) -- drop in the files
- **Local machine** -- open `index.html` in a browser
- **Intranet** -- no Internet connection required after initial load

### Deploy scripts

| Script | Target | Description |
|--------|--------|-------------|
| `deploy-staging.sh` | staging.audit.cisotoolbox.org | Raw files (no minification) |
| `deploy.sh` | audit.cisotoolbox.org | Minified JS/CSS/HTML via terser |

### Live instances

| Environment | URL |
|-------------|-----|
| Production | https://audit.cisotoolbox.org |
| Staging | https://staging.audit.cisotoolbox.org |

---

## Contributing

This project is open source. Contributions are welcome: bug reports, feature suggestions, translations, code improvements.

GitHub repository: **https://github.com/CollectiveMakers/audit.cisotoolbox.org**

---

## License

MIT
