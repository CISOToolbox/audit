# Audit (ISO 27001) -- Architecture Document

## 1. Overview

The Audit module is a browser-based, client-side tool for conducting ISO 27001:2022 compliance audits with optional HDS (Hebergeur de Donnees de Sante) scope. It allows auditors to evaluate 93 Annex A controls plus 24 ISMS clause requirements (totalling ~117 controls), record findings, track non-conformities, generate dashboards, and export reports.

- **URL**: https://audit.cisotoolbox.org
- **Stack**: 100% vanilla HTML/CSS/JS, no build step, no framework
- **Data persistence**: Browser localStorage (autosave) + JSON file download/upload
- **Images**: IndexedDB (separate from JSON save, exported/imported alongside)
- **Standard**: ISO/IEC 27001:2022 (clauses 4--10 + Annex A controls A.5--A.8)
- **HDS support**: Controls flagged as HDS-relevant; dedicated dashboard breakdown when HDS mode is enabled

---

## 2. File Structure

### `audit/app/` directory

| File | Size | Purpose |
|------|------|---------|
| `index.html` | 16 KB | Single-page app shell: toolbar, sidebar, 15 tab panels, modals, search overlay, script imports |
| `favicon.svg` | 5 KB | App icon |
| `logo.svg` | 5 KB | CISO Toolbox logo |
| `README.md` | 2 KB | English readme |
| `README-FR.md` | 9 KB | French readme (detailed) |

### `audit/app/css/`

| File | Purpose |
|------|---------|
| `cisotoolbox.css` | Shared styles (toolbar, sidebar, tables, buttons, layout, responsive) |
| `ISO_Audit.css` | App-specific: control cards, status buttons, filters, dashboard charts, doc review, planning, journal, search overlay, images, responsive overrides |

### `audit/app/js/`

| File | Size | Purpose |
|------|------|---------|
| `i18n.js` | 12 KB | Shared bilingual system: `t()`, `_registerTranslations()`, `switchLang()` |
| `cisotoolbox.js` | 41 KB | Shared library: event delegation, `esc()`, file I/O, AES-256, undo/redo, autosave |
| `cisotoolbox_local.js` | 15 KB | App-local extensions: `newAnalysis()`, snapshot management, local helpers |
| `ISO_Audit_data.js` | 674 B | Initial empty data structure (`ISO_AUDIT_INIT_DATA`) and asset base path |
| `ISO_Audit_controls.js` | 44 KB | All 117 controls (`ISO_AUDIT_CONTROLS`), 11 domains (`ISO_AUDIT_DOMAINS`), audit questions (`ISO_AUDIT_QUESTIONS`) |
| `ISO_Audit_i18n_fr.js` | 11 KB | French translation keys (loaded at startup) |
| `ISO_Audit_i18n_en.js` | 9 KB | English translation keys (lazy-loaded) |
| `ISO_Audit_app.js` | 62 KB | **Main application**: navigation, dashboard, charts, domain rendering, filters, search, journal, AI report, init |
| `ISO_Audit_docreview.js` | 15 KB | Document review module: 34 expected documents with status tracking |
| `ISO_Audit_planning.js` | 16 KB | Audit planning: time slot generation, domain assignment |
| `ISO_Audit_export.js` | 24 KB | Export: CSV, Word (OOXML), doc review CSV |
| `ISO_Audit_images.js` | 10 KB | Evidence image management via IndexedDB: upload, compress, view, delete |
| `ai_common.js` | 36 KB | Shared AI module: Anthropic/OpenAI providers, settings panel |
| `ct_refselect.js` | 6 KB | Shared multi-select dropdown (not actively used in Audit) |
| `referentiels_catalog.js` | 3 KB | Shared compliance framework catalog (not actively used in Audit) |

---

## 3. Architecture Diagram

```
index.html
    |
    +-- css/cisotoolbox.css          (shared styles)
    +-- css/ISO_Audit.css            (app styles)
    |
    +-- js/i18n.js                   (bilingual engine)
    +-- js/cisotoolbox.js            (shared: esc, file I/O, undo, autosave, event delegation)
    +-- js/cisotoolbox_local.js      (snapshots, newAnalysis, local helpers)
    +-- js/ISO_Audit_data.js         (init data, _ASSET_BASE)
    +-- js/ISO_Audit_controls.js     (CONTROLS[], DOMAINS[], QUESTIONS{})
    +-- js/ISO_Audit_i18n_fr.js      (FR translations)
    +-- js/ISO_Audit_i18n_en.js      (EN translations)
    +-- js/ISO_Audit_app.js          (MAIN: nav, dashboard, charts, domain, search, journal, AI)
    +-- js/ISO_Audit_docreview.js    (document review panel)
    +-- js/ISO_Audit_planning.js     (planning panel)
    +-- js/ISO_Audit_export.js       (CSV, Word exports)
    +-- js/ISO_Audit_images.js       (IndexedDB image management)
    +-- js/ai_common.js              (AI providers: Anthropic, OpenAI)

                     +-------------------+
                     |   Browser State   |
                     +-------------------+
                     | D (global object) |<---- JSON file load/save
                     | localStorage      |<---- autosave (debounced)
                     | IndexedDB         |<---- evidence images
                     +-------------------+

    User Interaction Flow:
    data-click="fn" --> cisotoolbox.js _safeDispatch() --> window[fn]()
```

---

## 4. Data Model

### 4.1 The `D` Object (global state)

```javascript
D = {
    meta: {
        name: "",           // Client/organization name
        ref: "",            // Audit reference (e.g. "AUD-2026-001")
        date: "",           // Audit date (ISO format)
        auditor: "",        // Lead auditor name
        scope: "",          // Audit scope description
        hds: "non"          // HDS mode: "non" | "oui" | "partiel"
    },
    findings: {
        // Keyed by control ID (e.g. "4.1", "A.5.12")
        "4.1": {
            status: "",             // "" | "c" | "ncmaj" | "ncmin" | "ps" | "pp" | "na"
            preuve: "",             // Evidence collected
            constats: "",           // Audit observations
            ecart_critere: "",      // Gap: requirement criterion (shown for NC/PS/PP)
            ecart_constat: "",      // Gap: factual finding
            ecart_cause: "",        // Gap: root cause
            ecart_action: "",       // Gap: corrective action
            images: []              // Array of IndexedDB image IDs
        }
    },
    doc_review: {
        // Keyed by document reference (e.g. "D-01")
        "D-01": {
            status: "",             // "" | "recu" | "incomplet" | "manquant" | "na"
            observations: ""        // Auditor observations
        }
    },
    planning: {
        params: {
            start_date: "",         // First day of audit
            days: 3,                // Number of audit days
            start_time: "09:00",    // Daily start time
            slot_duration: 60,      // Minutes per slot
            lunch_start: "12:30",   // Lunch break start
            lunch_duration: 60      // Lunch break duration
        },
        slots: []                   // Generated time slots with domain assignments
    },
    journal: [
        // Reverse-chronological log entries (max 2000)
        {
            ts: "2026-04-05T10:30:00.000Z",   // ISO timestamp
            type: "status",                     // "status" | "field" | "create"
            author: "Auditor name",
            data: { ctrl: "A.5.1", status: "c" }
        }
    ],
    timers: {}                      // Reserved (unused currently)
}
```

### 4.2 `CONTROLS` Array

Defined in `ISO_Audit_controls.js`. Each control is:

```javascript
{ id: "A.5.12", d: "A5", t: "Classification de l'information", desc: "...", hds: true }
```

- `id` -- Control identifier (clause number or Annex A reference)
- `d` -- Domain ID linking to `DOMAINS`
- `t` -- Short title
- `desc` -- Description of the requirement
- `hds` -- Boolean flag for HDS relevance

Total: ~117 controls (24 ISMS clauses + 93 Annex A controls).

### 4.3 `DOMAINS` Array

11 domains organized in two groups:

| ID | Label | Group |
|----|-------|-------|
| `4` | Section 4 Contexte | Clauses ISO 27001 |
| `5` | Section 5 Leadership | Clauses ISO 27001 |
| `6` | Section 6 Planification | Clauses ISO 27001 |
| `7` | Section 7 Support | Clauses ISO 27001 |
| `8` | Section 8 Fonctionnement | Clauses ISO 27001 |
| `9` | Section 9 Evaluation | Clauses ISO 27001 |
| `10` | Section 10 Amelioration | Clauses ISO 27001 |
| `A5` | A.5 Organisationnels | Annexe A |
| `A6` | A.6 RH | Annexe A |
| `A7` | A.7 Physique | Annexe A |
| `A8` | A.8 Technologique | Annexe A |

### 4.4 `QUESTIONS` Object

Keyed by control ID, maps to an array of auditor interview questions (French). Example:

```javascript
"5.2": [
    "Pouvez-vous me montrer la politique de securite de l'information ?",
    "Quand a-t-elle ete approuvee et par qui ?",
    "Comment est-elle communiquee au personnel ?"
]
```

### 4.5 `STATUS_MAP`

Maps status codes to display labels and colors:

| Code | Label (FR) | Color | Meaning |
|------|-----------|-------|---------|
| `c` | Conforme | `#16a34a` (green) | Compliant |
| `ncmaj` | NC majeure | `#dc2626` (red) | Major non-conformity |
| `ncmin` | NC mineure | `#f59e0b` (amber) | Minor non-conformity |
| `ps` | Point sensible | `#7c3aed` (violet) | Sensitive point |
| `pp` | Piste de progres | `#3b82f6` (blue) | Improvement opportunity |
| `na` | Non applicable | `#94a3b8` (gray) | Not applicable |

### 4.6 Finding Keying

Findings are keyed by the control `id` string inside `D.findings`. The function `getFinding(id)` lazily creates an empty finding entry if none exists (mutating `D`). The read-only variant `readFinding(id)` returns a shared empty object without mutation (used in exports).

---

## 5. Navigation

### 5.1 `selectPanel(panelId)`

Central navigation function. The `panelId` maps to a `data-panel` attribute on `<div class="tab-panel">` elements in `index.html`.

Panel IDs and their rendering:

| panelId | Renders via |
|---------|-------------|
| `dashboard` | `renderDashboard()` |
| `domain-4` through `domain-10` | `renderDomain("4")` through `renderDomain("10")` |
| `domain-A5` through `domain-A8` | `renderDomain("A5")` through `renderDomain("A8")` |
| `docreview` | `renderDocReview()` (from `ISO_Audit_docreview.js`) |
| `planning` | `renderPlanning()` (from `ISO_Audit_planning.js`) |
| `journal` | `renderJournal()` |
| `history` | `renderHistory()` |

### 5.2 Sidebar Accordion Groups

The sidebar organizes panels into three collapsible groups:

1. **Clauses ISO 27001** -- Sections 4 through 10 (7 panels)
2. **Annexe A** -- A.5 through A.8 (4 panels)
3. **Outils** (Tools) -- Document review, Planning, Journal (3 panels)

Plus standalone items: Dashboard, Methodology help, Usage help, Snapshots (History).

Each group uses `data-click="toggleGroup"` (from `cisotoolbox.js`) to expand/collapse. `_updateSidebarAccordion(panelId)` auto-expands the group containing the selected panel.

### 5.3 Domain Badges

Each sidebar domain item has a badge (e.g. "5/12") showing how many controls have been audited. Updated by `updateSidebarBadges()` after every status change. The badge gets a `.complete` CSS class when all controls are audited.

---

## 6. Scoring System

### 6.1 `computeStats()`

Computes global and per-domain statistics from all controls and their findings.

**Global counters:**
- `total` -- Total number of controls
- `audited` -- Controls with a non-empty status
- `c`, `ncmaj`, `ncmin`, `ps`, `pp`, `na` -- Count per status

**Score formula:**

```
scored = audited - na
score = round(((c * 1.0 + pp * 0.75 + ps * 0.5 + ncmin * 0.25) / scored) * 100)
```

Weight interpretation:
- **Conforme (c)**: 100% -- Fully compliant
- **Piste de progres (pp)**: 75% -- Good but has improvement opportunities
- **Point sensible (ps)**: 50% -- Partially concerning
- **NC mineure (ncmin)**: 25% -- Minor non-conformity
- **NC majeure (ncmaj)**: 0% -- Major non-conformity (not counted)
- **N/A**: Excluded from scoring denominator

**Grade thresholds:**

| Score | Grade | Color |
|-------|-------|-------|
| >= 80% | A | `#16a34a` (green) |
| >= 65% | B | `#22c55e` (light green) |
| >= 50% | C | `#f59e0b` (amber) |
| >= 35% | D | `#f97316` (orange) |
| < 35% | E | `#dc2626` (red) |

### 6.2 Per-Domain Scoring

The same formula is applied independently to each domain. Results stored in `S.domains[domainId]` with the same structure (`total`, `audited`, `c`, `ncmaj`, etc., plus `score`).

---

## 7. Functions Reference

### ISO_Audit_app.js

#### Helpers

| Function | Line | Purpose |
|----------|------|---------|
| `statusLabel(s)` | 36 | Return localized label for a status code |
| `statusColor(s)` | 37 | Return hex color for a status code |
| `getCtrl(id)` | 39 | Find a control object by ID in CONTROLS array |
| `getFinding(id)` | 41 | Get or lazily create a finding entry in D.findings (mutating) |
| `readFinding(id)` | 47 | Get finding without mutation; returns shared empty object if missing |
| `domainControls(domainId)` | 51 | Filter CONTROLS array to a specific domain |
| `isEcart(status)` | 55 | Check if status indicates a gap (ncmaj, ncmin, ps, pp) |

#### Navigation

| Function | Line | Purpose |
|----------|------|---------|
| `selectPanel(panelId)` | 61 | Switch active panel, trigger appropriate render function |

#### Dashboard / Charts

| Function | Line | Purpose |
|----------|------|---------|
| `renderMeta()` | 90 | Populate meta input fields from D.meta |
| `computeStats()` | 269 | Compute global + per-domain audit statistics and score |
| `renderDashboard()` | 305 | Render full dashboard: KPIs, charts, NC table |
| `buildGauge(S)` | 399 | Build SVG half-circle gauge showing overall score and grade |
| `buildDonut(S)` | 437 | Build SVG donut chart showing status distribution with legend |
| `buildRadar(S)` | 481 | Build SVG radar chart showing per-domain scores |
| `buildStackedBars(S)` | 552 | Build stacked horizontal bars showing status breakdown per domain |
| `buildHDSBreakdown(S)` | 582 | Build HDS vs non-HDS compliance comparison (shown when HDS enabled) |
| `buildHDSBar(F, label)` | 600 | Build a single HDS bar group (conformes/NC/other) |
| `buildDomainBars(S)` | 619 | Build colored domain score bars with percentage labels |

#### Domain / Controls

| Function | Line | Purpose |
|----------|------|---------|
| `cardHTML(c, f)` | 106 | Generate HTML for a single control card: header, status buttons, fields, questions, images |
| `renderDomain(domainId)` | 162 | Render a domain panel: filters bar + filtered control cards |
| `setStatus(ctrlId, status)` | 208 | Toggle a control's audit status, log to journal, re-render |
| `setField(ctrlId, field, val)` | 221 | Update a finding field value (preuve, constats, ecart_*) |
| `onFilterStatus(val)` | 229 | Apply status filter on current domain view |
| `onFilterHDS(val)` | 230 | Apply HDS-only filter on current domain view |
| `onFilterText(val)` | 231 | Apply text search filter on current domain view |
| `toggleQuestions(ctrlId)` | 236 | Toggle visibility of audit questions panel for a control |
| `copyQuestion(text)` | 242 | Copy an audit question to clipboard |
| `updateSidebarBadges()` | 254 | Update audited/total badges on each sidebar domain item |
| `onMetaChange(field, val)` | 81 | Handle meta field changes (name, ref, date, auditor, scope, hds) |

#### Journal

| Function | Line | Purpose |
|----------|------|---------|
| `logEntry(type, data)` | 646 | Add an entry to D.journal (max 2000 entries, reverse-chronological) |
| `renderJournal()` | 657 | Render journal entries as timestamped, typed, colored entries |

#### Search

| Function | Line | Purpose |
|----------|------|---------|
| `openSearch()` | 692 | Open the Ctrl+K search overlay |
| `closeSearch()` | 703 | Close the search overlay |
| `onSearchScope(val)` | 709 | Change search scope: all, findings, NC only |
| `onSearchInput(val)` | 715 | Execute search across controls and findings, render results with highlighted snippets |
| `goToSearchResult(ctrlId)` | 799 | Navigate to the domain containing a control and scroll to its card |

#### History / Snapshots

| Function | Line | Purpose |
|----------|------|---------|
| `renderHistory()` | 1036 | Render snapshot list with create/restore/export/delete/encrypt actions |

#### AI Report

| Function | Line | Purpose |
|----------|------|---------|
| `generateReport()` | 842 | Build audit context, call AI API, display generated ISO 27001 report |
| `_exportAIReportAsWord(text)` | 931 | Convert AI report text to OOXML Word document with formatting |

#### Import / Export (init, data migration)

| Function | Line | Purpose |
|----------|------|---------|
| `ensureKeys()` | 1021 | Migrate/initialize D object with required keys and defaults |
| `renderAll()` | 1074 | Full re-render: toolbar, meta, badges, current panel |
| `_initDataAndRender(afterFn)` | 1098 | Call ensureKeys() + renderAll() + optional callback |

---

### ISO_Audit_docreview.js

| Function | Line | Purpose |
|----------|------|---------|
| `_getDocEntry(ref)` | 46 | Get or create doc review entry in D.doc_review |
| `renderDocReview()` | 53 | Render 34 document review items grouped by category, with status buttons, observations, and progress stats |
| `cycleDocStatus(ref)` | 139 | Cycle document status through recu/incomplet/manquant/na |
| `setDocObs(ref, val)` | 149 | Set observation text for a document |

Data: 34 expected documents defined in `ISO_AUDIT_DOC_REVIEW`, grouped by category (Gouvernance, Organisation, Actifs et acces, Securite physique, Securite technique, Continuite, Fournisseurs, HDS). Each document has linked controls for auto-gap detection.

---

### ISO_Audit_planning.js

| Function | Line | Purpose |
|----------|------|---------|
| `_pad2(n)` | 9 | Zero-pad number to 2 digits |
| `_addMinutes(timeStr, minutes)` | 11 | Add minutes to a "HH:MM" time string |
| `_timeToMin(timeStr)` | 20 | Convert "HH:MM" to total minutes |
| `_formatDayHeader(dateStr, dayNum)` | 30 | Format date as "Jour N -- lundi 15 mars 2026" |
| `_domainGroup(domainId)` | 43 | Look up domain's group label |
| `_domainLabel(domainId)` | 50 | Look up domain's display label |
| `renderPlanning()` | 59 | Render planning panel: parameters form, generated schedule with time slots |
| `exportPlanningCSV()` | 175 | Export planning as CSV |
| `exportPlanningWord()` | 190 | Export planning as Word document |
| `onPlanningParam(field, val)` | 219 | Handle planning parameter changes |
| `onSlotDomain(idx, val)` | 230 | Assign domain to a planning slot |
| `generatePlanning()` | 240 | Auto-generate time slots across audit days (respecting lunch breaks) |
| `deleteSlot(idx)` | 302 | Delete a specific planning slot |

---

### ISO_Audit_export.js

| Function | Line | Purpose |
|----------|------|---------|
| `exportCSV()` | 7 | Export all findings as semicolon-delimited CSV with BOM |
| `exportWord()` | 53 | Orchestrate full Word report export (preloads images first) |
| `_preloadAllImages(CONTROLS, cb)` | 69 | Load all evidence images from IndexedDB into memory for Word export |
| `_buildWordDoc(CONTROLS, DOMAINS, imageMap)` | 85 | Build complete OOXML Word document: cover page, summary, KPIs, per-domain findings, NC table, doc review status |
| `exportDocReviewCSV()` | 422 | Export document review status as CSV |

---

### ISO_Audit_images.js

All functions are inside an IIFE (strict mode). Uses IndexedDB database `iso_audit_images`.

| Function | Line | Purpose |
|----------|------|---------|
| `_openDB(cb)` | 15 | Open/create IndexedDB database |
| `_imgSave(ctrlId, dataUrl, name, cb)` | 28 | Save compressed image to IndexedDB, add ID reference to D.findings |
| `_imgGet(imgId, cb)` | 48 | Retrieve a single image by ID from IndexedDB |
| `_imgGetAll(ctrlId, cb)` | 58 | Retrieve all images for a control |
| `_imgDelete(imgId, ctrlId, cb)` | 78 | Delete image from IndexedDB and remove reference from finding |
| `_imgCompress(file, maxW, quality, cb)` | 98 | Compress image to JPEG 800px max width at 70% quality |
| `addImage(ctrlId)` | 120 | Open file picker, compress, save to IndexedDB |
| `deleteImage(ctrlId, imgId)` | 144 | Delete image with confirmation |
| `viewImage(imgId)` | 153 | Open fullscreen image overlay |
| `renderImages(ctrlId)` | 174 | Render image thumbnails for a control card (async from IndexedDB) |
| `_imgExportAll(cb)` | 195 | Export all images for JSON save bundling |
| `_imgImportAll(images, cb)` | 205 | Import images from loaded JSON file |

---

## 8. Visualization

The dashboard renders five SVG/HTML chart types, all built as HTML string concatenation (no charting library).

### 8.1 Score Gauge (`buildGauge`)

- **Type**: SVG half-circle arc gauge
- **ViewBox**: 220x130
- **Shows**: Score percentage (0--100%), grade letter (A--E)
- **Elements**: Background arc (#e2e8f0), colored score arc, tick marks at 0/25/50/75/100%, centered score text, grade label
- **Color**: Matches grade color from `S.gradeColor`

### 8.2 Status Donut (`buildDonut`)

- **Type**: SVG annular donut chart with inner/outer ring
- **ViewBox**: 160x160
- **Shows**: Distribution of all statuses (C, NC maj, NC min, PS, PP, NA, non-audited)
- **Elements**: Arc segments per status, white center circle with audited count, color-coded legend below
- **Filters**: Segments with value 0 are excluded

### 8.3 Compliance Radar (`buildRadar`)

- **Type**: SVG spider/radar chart
- **ViewBox**: 500x500
- **Axes**: One per domain (11 axes)
- **Shows**: Per-domain score as a filled polygon
- **Elements**: 4 concentric grid polygons (25/50/75/100%), radial axis lines, data polygon (blue fill with 15% opacity), data point circles, domain labels at edges, score percentage near each point

### 8.4 Stacked Progress Bars (`buildStackedBars`)

- **Type**: HTML div-based stacked horizontal bars
- **Shows**: One bar per domain, segments colored by status (green/blue/violet/amber/red/gray/light gray for unaudited)
- **CSS**: `.stacked-track` flex container with `.stacked-seg` width proportional to count

### 8.5 HDS Focus Bars (`buildHDSBreakdown` + `buildHDSBar`)

- **Type**: HTML horizontal bar chart
- **Shows**: Side-by-side comparison of HDS-tagged vs non-HDS controls
- **Rows**: Conformes (green), NC (red), Other (violet)
- **Visibility**: Only rendered when `D.meta.hds` is "oui" or "partiel"

### 8.6 Domain Score Bars (`buildDomainBars`)

- **Type**: HTML positioned horizontal bars
- **Shows**: One composite bar per domain with absolutely-positioned segments for each status
- **Includes**: Domain label (160px min-width), colored bar, score percentage on the right

### 8.7 NC Summary Table

Rendered inline in `renderDashboard()`. Lists all findings where `isEcart()` is true, sorted by severity (ncmaj first, then ncmin, ps, pp). Columns: ID, Control, Status badge, Factual finding, Corrective action.

---

## 9. Shared Library, Event System, Security, i18n

### 9.1 Shared Library (`cisotoolbox.js`)

The shared library provides:

- **`esc(v)`** -- HTML entity escaping for XSS prevention
- **`_da(...args)`** -- JSON-encode arguments for `data-args` attributes
- **`badge(text, color)`** -- Generate colored badge HTML
- **Event delegation** -- Listens for clicks/changes/inputs on `data-click`, `data-change`, `data-input` attributes
- **`_safeDispatch(fnName, args)`** -- Dispatches events with a blocklist of dangerous function names (eval, fetch, open, etc.)
- **File I/O** -- `openFile()`, `saveJSON()`, `quickSaveJSON()`, `loadJSON()`
- **AES-256-GCM encryption** -- PBKDF2 (250k iterations) for encrypted snapshots
- **Undo/Redo** -- `_saveState()`, `undo()`, `redo()` with state stack
- **Autosave** -- Debounced `_autoSave()` writing to localStorage
- **`_loadAsset(url, cb)`** -- Lazy-load vendored scripts from `js/vendor/` (JSZip, etc.)
- **`_checkAutoSaveBanner()`** -- Restore prompt on page load
- **Sidebar** -- `toggleSidebar()`, `_toggleSidebarMobile()`, `toggleGroup()`, `_updateSidebarAccordion()`
- **Menu** -- `toggleMenu()`, `_menuAction(fnName)`
- **Help** -- `toggleHelp(tab)`

### 9.2 Event System

All user interactions use data attributes instead of inline event handlers:

```html
<button data-click="setStatus" data-args='["A.5.1","c"]'>Conforme</button>
<textarea data-change="setField" data-args='["A.5.1","preuve"]' data-pass-value>...</textarea>
<input data-input="onSearchInput" data-pass-value>
```

Supported attributes:
- `data-click` -- Click handler function name
- `data-change` -- Change handler (select, textarea)
- `data-input` -- Real-time input handler
- `data-args` -- JSON array of arguments
- `data-pass-value` -- Appends element's `.value` as last argument
- `data-pass-el` -- Appends the DOM element as last argument
- `data-pass-event` -- Passes the event object
- `data-stop` -- Calls `event.stopPropagation()`

Keyboard shortcuts:
- `Ctrl+K` / `Cmd+K` -- Open global search
- `Escape` -- Close search overlay
- `Enter` (in search input) -- Navigate to first result
- `Ctrl+Z` / `Ctrl+Y` -- Undo/Redo (via cisotoolbox.js)

### 9.3 Security

**CSP Headers** (`.htaccess`):
- `script-src 'self'` -- No inline scripts, no eval
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

**XSS Prevention**:
- All user data escaped via `esc()` before DOM insertion
- `data-click` delegation instead of inline `onclick=`
- `_safeDispatch()` blocklist prevents calling dangerous functions
- No `eval()`, `Function()`, or `document.write()`

**Data Protection**:
- API keys stored only in localStorage
- Snapshot encryption via AES-256-GCM with PBKDF2
- No secrets in source code or saved files
- Evidence images stored in IndexedDB (browser-local)

### 9.4 i18n (Internationalization)

- **Default language**: French (loaded at startup via `ISO_Audit_i18n_fr.js`)
- **English**: Loaded statically in index.html (both FR and EN script tags present)
- **Translation function**: `t("audit.status.c")` returns localized string
- **HTML attributes**: `data-i18n="key"` for static text, `data-i18n-title="key"` for title attributes, `data-i18n-placeholder="key"` for placeholder text
- **Key convention**: `audit.{section}.{item}` (e.g. `audit.dash.score`, `audit.field.preuve`)
- **Interpolation**: `t("audit.filter.count", { shown: 5, total: 12 })` for parameterized strings
- **Language switch**: `switchLang()` toggles between FR/EN, triggers `renderAll()`
