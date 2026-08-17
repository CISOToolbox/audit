# Audit ISO 27001 -- Application web d'audit interactif


> **Ceci est la version 100 % navigateur** — tout s'exécute dans votre
> navigateur, les données n'en sortent jamais (localStorage + export JSON).
> Idéale en solo, pour évaluer, pour un consultant sur les données d'un
> client, ou en contexte isolé. Besoin de comptes, d'une base partagée,
> d'une API et du multi-utilisateurs ? Le **backend standalone** du même
> module est à la [racine de ce dépôt](../) — mêmes fonctionnalités, même
> format de données, un export JSON fait passer votre travail de l'un à
> l'autre. Voir « One repository, two versions » dans le README principal.

Application web 100% client-side pour realiser des audits de certification **ISO 27001:2022** et **HDS** (Hebergement de Donnees de Sante) de maniere interactive.

> Cet outil fait partie de la suite **[CISO Toolbox](https://www.cisotoolbox.org)** -- une collection d'outils de securite open source conçus pour les RSSI, auditeurs et responsables conformite. La suite est modulaire et legere : chacun peut utiliser uniquement le(s) outil(s) dont il a besoin.
>
> Pour decouvrir les autres outils de la suite, visitez [cisotoolbox.org](https://www.cisotoolbox.org/#tools)

---

## Pourquoi cet outil ?

La plupart des outils d'audit sont soit des plateformes GRC lourdes necessitant une infrastructure serveur, soit de simples tableurs manquant de structure et de traçabilite. Cette application comble le vide :

**1) Aucune donnee ne quitte le navigateur**

- Pas de serveur applicatif, pas de base de donnees, pas de comptes utilisateurs
- Tout le traitement est effectue cote client en JavaScript
- Les donnees restent sur la machine de l'auditeur
- L'application fonctionne hors ligne une fois chargee
- Le chiffrement/dechiffrement des fichiers (AES-256-GCM) est realise localement

**2) Conçu pour le workflow d'audit**

- Les 93 mesures de l'Annexe A de l'ISO 27001:2022, organisees par domaine
- Evaluation par mesure (Conforme, NC Majeure, NC Mineure, Point Sensible, Piste de Progres, N/A)
- Champs structures pour les non-conformites (critere, constat factuel, cause, action corrective)
- Capture de preuves sous forme d'images (images stockees localement dans IndexedDB)
- Checklist de revue documentaire
- Planning d'audit avec creneaux horaires
- Score de maturite pondere avec note (A-E)
- Journal d'audit complet avec horodatage

---

## Fonctionnalites

### Evaluation des mesures

- **93 mesures** de l'Annexe A ISO 27001:2022, organisees en 4 domaines (Organisationnel, Personnel, Physique, Technologique)
- **Mode HDS** -- active les mesures specifiques HDS
- **6 statuts** par mesure : Conforme, NC Majeure, NC Mineure, Point Sensible, Piste de Progres, N/A
- **Champs NC structures** -- critere, constat factuel, cause, action corrective (affiches uniquement pour les non-conformites)
- **Champs de preuves** -- texte libre pour constats et preuves, plus preuves sous forme d'images
- **Questions d'aide** -- questions contextuelles par mesure pour guider l'auditeur
- **Modeles de formulation** -- formulations de NC pre-redigees copiables dans les constats

### Tableau de bord

- Graphique radar par domaine
- Barres de conformite empilees par domaine
- Jauge de score avec formule de maturite ponderee et note
- Tableau des NC trie par severite
- Indicateurs cles (audites, taux de conformite, nombre de NC)
- Focus HDS (quand le mode HDS est actif)

### Revue documentaire

- Checklist structuree des documents a collecter
- Statut par document (Reçu, Incomplet, Manquant, N/A)
- Champ d'observations par document
- Export CSV de la revue documentaire

### Planning d'audit

- Planning multi-jours avec creneaux configurables
- Attribution des domaines aux creneaux
- Vue imprimable du planning
- Export CSV et Word du planning

### Exports

| Format | Description |
|--------|-------------|
| **JSON** | Format natif, sauvegarde complete (Enregistrer / Enregistrer sous) |
| **JSON chiffre** | Sauvegarde securisee (AES-256-GCM, PBKDF2 250k iterations) |
| **CSV** | Toutes les mesures avec statut, constats, preuves, details NC |
| **Word (.docx)** | Rapport d'audit professionnel avec page de garde, synthese executive, detail par domaine, tableau des NC, images preuves |
| **CSV revue documentaire** | Export de la checklist documentaire |
| **CSV/Word planning** | Export du calendrier d'audit |

### Interface bilingue (FR/EN)

L'application detecte automatiquement la langue du navigateur et peut etre basculee entre français et anglais via les Parametres (icone engrenage dans la barre d'outils).

### Assistant IA (optionnel)

Un assistant IA peut etre active dans les Parametres pour generer des rapports d'audit a partir des constats collectes. Il supporte les fournisseurs **Anthropic (Claude)** et **OpenAI (GPT)**. Le rapport genere peut etre exporte en document Word.

---

## Demarrage rapide

### Demo en ligne

L'application est disponible en ligne : **https://audit.cisotoolbox.org/**

### Fichier de demonstration

Aucun jeu de donnees de demonstration n'est livre avec le depot pour le
moment : les fichiers `demo-*.json` ont ete retires et de nouveaux jeux seront
generes ulterieurement. L'option **Parametres > Charger la demonstration**
reste presente mais affiche une erreur tant qu'aucun jeu n'est livre.

### Utilisation

1. Ouvrir l'application dans un navigateur
2. Saisir les informations de l'audit dans le tableau de bord
3. Parcourir les domaines via la barre laterale
4. Enregistrer via **Fichier > Enregistrer** — tout reste en local

---

## Architecture

### Principes de conception

| Principe | Detail |
|----------|--------|
| 100% client-side | Pas de backend, pas de base de donnees, pas de comptes |
| Souverainete des donnees | Tout reste dans le navigateur (localStorage + IndexedDB pour les images + fichiers) |
| Pas de build | JavaScript vanilla, pas de framework, pas de transpileur |
| Bibliotheque partagee | Code commun (`cisotoolbox.js`, `i18n.js`, `ai_common.js`) partage avec les autres apps CISO Toolbox |
| Conforme CSP | Pas de scripts inline, pas de `eval`, pas de `unsafe-inline` pour le JS |

### Structure des fichiers

```
index.html                    Point d'entree
css/
  cisotoolbox.css             Styles partages (barre d'outils, sidebar, tableaux, dialogues)
  ISO_Audit.css               Styles specifiques a l'app
js/
  i18n.js                     Moteur i18n (t(), switchLang, attributs data-i18n)
  cisotoolbox.js              Bibliotheque partagee (evenements, fichiers, chiffrement, undo, snapshots)
  ai_common.js                Module IA partage (fournisseurs, parametres, appels API)
  ISO_Audit_data.js           Structure de donnees par defaut (audit vide)
  ISO_Audit_controls.js       Definition des 93 mesures ISO 27001:2022
  ISO_Audit_i18n_fr.js        Traductions françaises
  ISO_Audit_i18n_en.js        Traductions anglaises
  ISO_Audit_app.js            Logique principale (dashboard, mesures, sidebar)
  ISO_Audit_docreview.js      Panneau de revue documentaire
  ISO_Audit_planning.js       Panneau de planning d'audit
  ISO_Audit_export.js         Exports CSV, Word, revue documentaire
  ISO_Audit_images.js         Gestion des images (stockage IndexedDB, compression)
```

### Patterns cles

**D** -- L'objet de donnees global contenant l'audit complet. Structure : `{ meta, findings, doc_review, planning, timers }`. Serialise en JSON pour la sauvegarde/export.

**Delegation d'evenements** -- Aucun gestionnaire inline. Toutes les interactions utilisent les attributs `data-click`, `data-change`, `data-input` dispatches par `_safeDispatch()`.

**IndexedDB pour les images** -- Les preuves sous forme d'images sont stockees dans IndexedDB (pas dans le fichier JSON) pour eviter de gonfler les sauvegardes. Les images sont compressees en JPEG (800px max, qualite 70%) avant stockage.

**Score de maturite pondere** -- `Score = (C×1 + PP×0.75 + PS×0.5 + NCmin×0.25) / (Audites - N/A)`. Note : A (>=80%), B (>=65%), C (>=50%), D (>=35%), E (<35%).

---

## Securite

| Mesure | Detail |
|--------|--------|
| **CSP** | `script-src 'self'` -- pas de scripts inline, pas de `eval`, aucun CDN externe |
| **X-Frame-Options** | `DENY` -- empeche le clickjacking |
| **X-Content-Type-Options** | `nosniff` |
| **Permissions-Policy** | Desactive camera, microphone, geolocalisation, paiement, USB, capteurs |
| **Chiffrement** | AES-256-GCM avec derivation PBKDF2 (250 000 iterations) |
| **Cles API** | Stockees uniquement dans localStorage, jamais dans les fichiers sauvegardes |
| **Echappement HTML** | Toutes les saisies utilisateur echappees via `esc()` avant insertion DOM |
| **Validation images** | Seules les URI `data:image/*` sont acceptees pour les preuves |
| **Pas de serveur** | Aucune donnee ne transite par un serveur tiers (sauf IA si activee) |

---

## Deploiement

L'application est un ensemble de fichiers statiques. Aucun serveur applicatif n'est necessaire.

### Options d'hebergement

- **Serveur web** (Apache, Nginx, hebergement statique) -- deposer les fichiers
- **Machine locale** -- ouvrir `index.html` dans un navigateur
- **Intranet** -- aucune connexion Internet requise apres le chargement initial

### Instances en ligne

| Environnement | URL |
|---------------|-----|
| Production | https://audit.cisotoolbox.org |

---

## Contribuer

Ce projet est open source. Les contributions sont les bienvenues : signalements de bugs, suggestions de fonctionnalites, traductions, ameliorations du code.

Depot GitHub : **https://github.com/CISOToolbox/audit**

---

## Licence

MIT
