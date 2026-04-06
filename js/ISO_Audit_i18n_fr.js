// ═══════════════════════════════════════════════════════════════════════
// ISO Audit — Traductions FR
// ═══════════════════════════════════════════════════════════════════════

_registerTranslations("fr", {
    // Label
    "audit.label": "audit",

    // Toolbar
    "audit.title": "Audit",
    "audit.menu.file": "Fichier",
    "audit.menu.open": "Ouvrir",
    "audit.menu.save": "Enregistrer",
    "audit.menu.save_as": "Enregistrer sous",
    "audit.menu.import": "Import JSON",
    "audit.menu.new": "Nouvel audit",
    "audit.menu.encrypt": "Activer le chiffrement",
    "audit.menu.decrypt": "Désactiver le chiffrement",

    // Sidebar
    "audit.sidebar.dashboard": "Tableau de bord",
    "audit.sidebar.section_clauses": "Clauses ISO 27001",
    "audit.sidebar.domain.4": "§4 Contexte de l'organisme",
    "audit.sidebar.domain.5": "§5 Leadership",
    "audit.sidebar.domain.6": "§6 Planification",
    "audit.sidebar.domain.7": "§7 Support",
    "audit.sidebar.domain.8": "§8 Réalisation",
    "audit.sidebar.domain.9": "§9 Évaluation",
    "audit.sidebar.domain.10": "§10 Amélioration",
    "audit.sidebar.section_annexe": "Annexe A",
    "audit.sidebar.domain.A5": "A.5 Organisationnelles",
    "audit.sidebar.domain.A6": "A.6 Personnes",
    "audit.sidebar.domain.A7": "A.7 Physiques",
    "audit.sidebar.domain.A8": "A.8 Technologiques",
    "audit.sidebar.section_outils": "Outils",
    "audit.sidebar.docreview": "Revue documentaire",
    "audit.sidebar.planning": "Planning",
    "audit.sidebar.journal": "Journal",
    "audit.sidebar.section_historique": "Historique",
    "audit.sidebar.snapshots": "Snapshots",

    // Panel descriptions
    "audit.desc.dashboard": "Tableau de bord de l'audit : indicateurs, scores par domaine, non-conformités.",
    "audit.desc.domain.4": "Compréhension de l'organisme et de son contexte, parties intéressées, domaine d'application du SMSI.",
    "audit.desc.domain.5": "Engagement de la direction, politique de sécurité, rôles et responsabilités.",
    "audit.desc.domain.6": "Actions face aux risques et opportunités, objectifs de sécurité et planification.",
    "audit.desc.domain.7": "Ressources, compétences, sensibilisation, communication et informations documentées.",
    "audit.desc.domain.8": "Planification et maîtrise opérationnelles, appréciation et traitement des risques.",
    "audit.desc.domain.9": "Surveillance, mesure, analyse, évaluation, audit interne et revue de direction.",
    "audit.desc.domain.10": "Non-conformités, actions correctives et amélioration continue.",
    "audit.desc.domain.A5": "Mesures organisationnelles : politiques, rôles, classification, relations fournisseurs, incidents.",
    "audit.desc.domain.A6": "Mesures liées aux personnes : vérification, conditions d'emploi, sensibilisation, télétravail.",
    "audit.desc.domain.A7": "Mesures physiques : périmètres, contrôles d'accès, équipements, supports, câblage.",
    "audit.desc.domain.A8": "Mesures technologiques : terminaux, accès privilégiés, code source, authentification, chiffrement, développement.",
    "audit.desc.docreview": "Revue documentaire : vérification des documents et preuves attendus.",
    "audit.desc.planning": "Planning de l'audit : répartition des domaines sur les créneaux.",
    "audit.desc.journal": "Journal d'audit : historique chronologique des actions.",
    "audit.desc.history": "Points de sauvegarde et historique des modifications.",

    // Meta fields
    "audit.meta.name": "Nom du client",
    "audit.meta.ref": "Référence audit",
    "audit.meta.date": "Date",
    "audit.meta.auditor": "Auditeur",
    "audit.meta.scope": "Périmètre",
    "audit.meta.hds": "HDS",
    "audit.meta.hds_non": "Non",
    "audit.meta.hds_oui": "Oui",
    "audit.meta.hds_partiel": "Partiel",

    // Status labels
    "audit.status.c": "Conforme",
    "audit.status.ncmaj": "NC majeure",
    "audit.status.ncmin": "NC mineure",
    "audit.status.ps": "Point sensible",
    "audit.status.pp": "Piste de progrès",
    "audit.status.na": "N/A",
    "audit.status.non_audite": "Non audité",

    // Finding fields
    "audit.field.preuve": "Preuves / Références",
    "audit.field.constats": "Constats",
    "audit.field.ecart_critere": "Critère de référence",
    "audit.field.ecart_constat": "Constat factuel",
    "audit.field.ecart_cause": "Cause",
    "audit.field.ecart_action": "Action corrective",

    // Filters
    "audit.filter.all_status": "Tous les statuts",
    "audit.filter.all_hds": "Tous",
    "audit.filter.hds_only": "HDS uniquement",
    "audit.filter.search": "Rechercher...",
    "audit.filter.count": "{shown}/{total} contrôles",

    // Buttons
    "audit.btn.questions": "Questions",
    "audit.btn.templates": "Modèles",
    "audit.btn.copy": "Copier",

    // Dashboard
    "audit.dash.score": "Score de maturité",
    "audit.dash.conformity": "Répartition de la conformité",
    "audit.dash.by_domain": "Score par domaine",
    "audit.dash.radar": "Radar",
    "audit.dash.kpis": "Indicateurs clés",
    "audit.dash.nc_table": "Non-conformités",
    "audit.dash.total": "Total contrôles",
    "audit.dash.audited": "Audités",
    "audit.dash.conformes": "Conformes",
    "audit.dash.nc_maj": "NC majeures",
    "audit.dash.nc_min": "NC mineures",
    "audit.dash.ps": "Points sensibles",
    "audit.dash.pp": "Pistes de progrès",
    "audit.dash.na": "N/A",
    "audit.dash.progress": "Progression",
    "audit.dash.ecarts": "Écarts identifiés",

    // Timer
    "audit.timer.domain": "Domaine",
    "audit.timer.global": "Global",
    "audit.timer.start": "Démarrer",
    "audit.timer.pause": "Pause",
    "audit.timer.reset": "Reset",

    // Journal
    "audit.journal.type_status": "Statut",
    "audit.journal.type_field": "Champ",
    "audit.journal.type_create": "Création",
    "audit.journal.type_template": "Modèle",
    "audit.journal.type_doc": "Document",
    "audit.journal.type_import": "Import",
    "audit.journal.empty": "Aucune entrée dans le journal.",
    "audit.journal.export_csv": "Exporter CSV",
    "audit.journal.clear": "Vider le journal",

    // Doc review
    "audit.doc.recu": "Reçu",
    "audit.doc.incomplet": "Incomplet",
    "audit.doc.manquant": "Manquant",
    "audit.doc.na": "N/A",
    "audit.doc.observations": "Observations",
    "audit.doc.summary": "{recu} reçus · {incomplet} incomplets · {manquant} manquants · {na} N/A",

    // Planning
    "audit.planning.start_date": "Date de début",
    "audit.planning.day": "Jour",
    "audit.planning.days": "Nombre de jours",
    "audit.planning.start_time": "Heure de début",
    "audit.planning.slot_duration": "Durée du créneau (min)",
    "audit.planning.lunch_start": "Début déjeuner",
    "audit.planning.lunch_duration": "Durée déjeuner (min)",
    "audit.planning.generate": "Générer le planning",
    "audit.planning.export_csv": "Exporter CSV",
    "audit.planning.export_word": "Exporter Word",

    // Export
    "audit.export.csv": "Export CSV",
    "audit.export.word": "Export Word",
    "audit.export.pack": "Pack export",

    // Images
    "audit.images.title": "Images de preuves",
    "audit.images.add": "Ajouter",
    "audit.images.added": "Image ajoutée",
    "audit.images.deleted": "Image supprimée",

    // Report
    "audit.report.export_word": "Exporter en Word",
    "audit.report.word_exported": "Rapport Word exporté",

    // Snapshots
    "audit.history.create": "+ Créer un point de sauvegarde",
    "audit.history.decrypt": "Déchiffrer les snapshots",
    "audit.history.encrypt": "Chiffrer les snapshots",
    "audit.history.encryption_active": "Chiffrement actif",
    "audit.history.none": "Aucun snapshot enregistré.",
    "audit.history.col_name": "Nom",
    "audit.history.col_date": "Date",
    "audit.history.col_client": "Client",
    "audit.history.col_actions": "Actions",
    "audit.history.restore": "Restaurer",
    "audit.history.export": "Exporter",
    "audit.history.hint": "Les snapshots sont stockés dans le navigateur (localStorage). Ils sont perdus si vous effacez les données du navigateur. Utilisez \"Exporter\" pour les sauvegarder en fichier.",

    // Footer
    "audit.footer": "Audit — Audit ISO 27001 interactif, sauvegarde JSON",

    // Status messages
    "audit.status.modified": "Modifié",
    "audit.status.status_changed": "Statut modifié : {ctrl} → {status}",
    "audit.status.field_changed": "Champ modifié : {ctrl}.{field}",

    // Search
    "audit.search.placeholder": "Rechercher dans tous les contrôles...",
    "audit.search.footer": "Échap pour fermer · Ctrl+K pour ouvrir",
    "audit.search.no_results": "Aucun résultat",
    "audit.search.type_to_search": "Tapez au moins 2 caractères...",
    "audit.search.count": "{count} résultat(s)",
    "audit.search.more": "+{count} autres résultats — affinez la recherche",
    "audit.search.scope.all": "Tous les champs",
    "audit.search.scope.findings": "Constats uniquement",
    "audit.search.scope.nc": "NC uniquement",

    // Enhanced dashboard
    "audit.dash.gauge_title": "Score de maturité",
    "audit.dash.donut_title": "Répartition des statuts",
    "audit.dash.radar_title": "Radar par domaine",
    "audit.dash.stacked_title": "Répartition détaillée par domaine",
    "audit.dash.hds_title": "Focus HDS",
    "audit.dash.hds_conformes": "Conformes",
    "audit.dash.hds_nc": "Non-conformes",
    "audit.dash.hds_other": "Autres",
    "audit.dash.grade_level": "Niveau",
    "audit.dash.maturity_formula": "Formule : C=100% PP=75% PS=50% NCm=25% NCM=0%",
    "audit.dash.non_audited": "non audités",
    "audit.dash.generate_report": "Générer rapport IA",
    "audit.dash.nc_control": "Contrôle",

    // AI Report
    "audit.report.title": "Rapport d'audit IA",
    "audit.report.loading": "Génération du rapport en cours...",
    "audit.report.copy": "Copier le rapport",
    "audit.report.copied": "Rapport copié",
    "audit.report.no_ai": "L'IA n'est pas configurée. Allez dans Paramètres pour configurer votre clé API.",
    "audit.report.error": "Erreur lors de la génération du rapport",
    "audit.menu.report": "Générer rapport IA",
    "audit.export.csv_ok": "CSV exporte",
    "audit.export.word_ok": "Word exporte",
    "audit.export.word_loading": "Preparation de l'export...",
    "audit.export.docreview_ok": "Revue documentaire exportee",
    "audit.status.na_export": "Non audite",

    "matrix.low": "Faible",
    "matrix.moderate": "Modere",
    "matrix.significant": "Significatif",
    "matrix.high": "Eleve",
    "matrix.critical": "Critique",
    "matrix.extreme": "Extreme",
    "matrix.x": "Impact",
    "matrix.y": "Vraisemblance",
});
