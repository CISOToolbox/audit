// ═══════════════════════════════════════════════════════════════════════
// ISO Audit — DOCUMENT REVIEW
// ═══════════════════════════════════════════════════════════════════════

window.ISO_AUDIT_DOC_REVIEW = [
    {ref:"D-01", cat:"Gouvernance", label:"Politique de securite de l'information", desc:"Document cadre approuve par la direction, diffuse et revise periodiquement.", critical:true, hds:true, linkedControls:["5.2","A.5.1"], ecartAuto:"Absence de politique SSI formalisee - NC majeure probable sur §5.2 et A.5.1"},
    {ref:"D-02", cat:"Gouvernance", label:"Declaration d'Applicabilite (SoA)", desc:"Liste des mesures de l'Annexe A avec justification d'inclusion/exclusion et statut de mise en oeuvre.", critical:true, hds:true, linkedControls:["6.1.3"], ecartAuto:"SoA absente - NC majeure sur §6.1.3"},
    {ref:"D-03", cat:"Gouvernance", label:"Registre des risques SSI", desc:"Resultats de l'appreciation des risques avec mesures de traitement associees.", critical:true, hds:true, linkedControls:["6.1.2","8.2"], ecartAuto:"Registre absent - NC majeure sur §6.1.2"},
    {ref:"D-04", cat:"Gouvernance", label:"Plan de traitement des risques", desc:"Plan d'action pour traiter les risques identifies avec responsables et echeances.", critical:true, hds:false, linkedControls:["6.1.3","8.3"], ecartAuto:"Plan de traitement absent - NC sur §6.1.3 et §8.3"},
    {ref:"D-05", cat:"Gouvernance", label:"Compte-rendu de revue de direction", desc:"PV de la derniere revue annuelle du SMSI par la direction.", critical:true, hds:false, linkedControls:["9.3"], ecartAuto:"Absence de revue de direction documentee - NC sur §9.3"},
    {ref:"D-06", cat:"Gouvernance", label:"Rapport du dernier audit interne", desc:"Resultats et plan d'actions du dernier audit interne SMSI.", critical:false, hds:false, linkedControls:["9.2"], ecartAuto:"Absence d'audit interne documente - NC sur §9.2"},
    {ref:"D-07", cat:"Gouvernance", label:"Tableau de bord des indicateurs SSI", desc:"Indicateurs de performance et d'efficacite du SMSI.", critical:false, hds:false, linkedControls:["9.1"], ecartAuto:""},
    {ref:"D-08", cat:"Organisation", label:"Organigramme SSI et fiches de poste RSSI", desc:"Structure organisationnelle SSI avec roles et responsabilites documentes.", critical:true, hds:false, linkedControls:["5.3","A.5.2"], ecartAuto:"Roles SSI non documentes - Ecart potentiel sur §5.3"},
    {ref:"D-09", cat:"Organisation", label:"Plan de sensibilisation et formation SSI", desc:"Programme annuel de sensibilisation et formation du personnel.", critical:false, hds:true, linkedControls:["7.2","7.3","A.6.3"], ecartAuto:""},
    {ref:"D-10", cat:"Organisation", label:"Accords de confidentialite (NDA)", desc:"Modele NDA et liste des signatures du personnel et prestataires.", critical:false, hds:true, linkedControls:["A.6.6"], ecartAuto:""},
    {ref:"D-11", cat:"Organisation", label:"Registre des exigences legales et reglementaires", desc:"Inventaire des obligations legales applicables (HDS, RGPD, NIS2, Code sante).", critical:true, hds:true, linkedControls:["A.5.31"], ecartAuto:"Registre absent - Ecart sur A.5.31"},
    {ref:"D-12", cat:"Organisation", label:"Procedure de gestion des incidents SSI", desc:"Processus de detection, signalement, classification et traitement des incidents.", critical:true, hds:true, linkedControls:["A.5.24","A.5.26"], ecartAuto:"Absence de procedure incidents - NC sur A.5.24"},
    {ref:"D-13", cat:"Organisation", label:"Procedure de gestion des non-conformites", desc:"Processus de traitement des NC et actions correctives.", critical:false, hds:false, linkedControls:["10.1"], ecartAuto:""},
    {ref:"D-14", cat:"Actifs et acces", label:"Inventaire des actifs informationnels", desc:"Inventaire complet des actifs avec proprietaire, classification et localisation.", critical:true, hds:true, linkedControls:["A.5.9","A.5.10"], ecartAuto:"Inventaire absent - NC sur A.5.9"},
    {ref:"D-15", cat:"Actifs et acces", label:"Politique de classification de l'information", desc:"Niveaux de classification, criteres d'attribution et regles de traitement.", critical:true, hds:true, linkedControls:["A.5.12"], ecartAuto:"Politique de classification absente - Ecart sur A.5.12"},
    {ref:"D-16", cat:"Actifs et acces", label:"Politique de controle d'acces", desc:"Regles d'acces logique aux systemes et donnees, principe du moindre privilege.", critical:true, hds:true, linkedControls:["A.5.15","A.5.16","A.5.18"], ecartAuto:"Politique d'acces absente - NC potentielle sur A.5.15"},
    {ref:"D-17", cat:"Actifs et acces", label:"Resultats de la derniere revue des droits d'acces", desc:"Rapport de revue periodique des droits utilisateurs et acces privilegies.", critical:true, hds:true, linkedControls:["A.5.18","A.8.2"], ecartAuto:"Absence de revue des droits - NC sur A.5.18"},
    {ref:"D-18", cat:"Actifs et acces", label:"Politique de gestion des mots de passe", desc:"Exigences de complexite, duree de vie, stockage et renouvellement.", critical:false, hds:false, linkedControls:["A.5.17"], ecartAuto:""},
    {ref:"D-19", cat:"Securite physique", label:"Plan des zones de securite physique", desc:"Cartographie des perimetres physiques, zones d'acces controle, salle serveurs.", critical:true, hds:true, linkedControls:["A.7.1","A.7.2"], ecartAuto:""},
    {ref:"D-20", cat:"Securite physique", label:"Procedure de mise au rebut des equipements", desc:"Processus d'effacement securise des donnees avant cession ou destruction.", critical:false, hds:true, linkedControls:["A.7.14","A.8.10"], ecartAuto:""},
    {ref:"D-21", cat:"Securite technique", label:"Schema d'architecture reseau", desc:"Topologie reseau, segmentation VLAN, flux autorises, DMZ.", critical:true, hds:true, linkedControls:["A.8.20","A.8.22"], ecartAuto:"Schema reseau absent - Verification architecture impossible"},
    {ref:"D-22", cat:"Securite technique", label:"Politique de sauvegarde", desc:"Frequence, retention, tests de restauration et stockage hors-site.", critical:true, hds:true, linkedControls:["A.8.13"], ecartAuto:"Politique sauvegarde absente - NC probable sur A.8.13"},
    {ref:"D-23", cat:"Securite technique", label:"Dernier rapport de scan de vulnerabilites", desc:"Resultats du dernier scan avec criticites et plan de remediation.", critical:true, hds:true, linkedControls:["A.8.8"], ecartAuto:"Absence de scan de vulnerabilites - NC sur A.8.8"},
    {ref:"D-24", cat:"Securite technique", label:"Politique de gestion des correctifs (patch management)", desc:"Frequence de mise a jour, delais selon criticite, procedure d'urgence.", critical:true, hds:true, linkedControls:["A.8.8"], ecartAuto:""},
    {ref:"D-25", cat:"Securite technique", label:"Politique cryptographique", desc:"Algorithmes autorises, longueurs de cle, gestion du cycle de vie des cles.", critical:false, hds:true, linkedControls:["A.8.24"], ecartAuto:""},
    {ref:"D-26", cat:"Securite technique", label:"Politique de journalisation et surveillance", desc:"Evenements journalises, durees de conservation, procedure d'analyse.", critical:true, hds:true, linkedControls:["A.8.15","A.8.16"], ecartAuto:"Politique journalisation absente - Ecart sur A.8.15"},
    {ref:"D-27", cat:"Continuite", label:"Plan de Continuite d'Activite (PCA/DRP)", desc:"Procedures de continuite et reprise incluant les objectifs RTO/RPO.", critical:true, hds:true, linkedControls:["A.5.29","A.5.30"], ecartAuto:"PCA absent - NC majeure sur A.5.30"},
    {ref:"D-28", cat:"Continuite", label:"Rapport du dernier test du PCA/DRP", desc:"Compte-rendu du dernier exercice de continuite avec resultats et actions.", critical:false, hds:true, linkedControls:["A.5.30"], ecartAuto:"PCA non teste - Ecart sur A.5.30"},
    {ref:"D-29", cat:"Fournisseurs", label:"Politique de securite des fournisseurs", desc:"Exigences SSI applicables aux tiers, processus d'evaluation et de suivi.", critical:false, hds:true, linkedControls:["A.5.19","A.5.22"], ecartAuto:""},
    {ref:"D-30", cat:"Fournisseurs", label:"Contrats fournisseurs avec clauses SSI", desc:"Echantillon de contrats incluant les clauses de confidentialite et securite.", critical:true, hds:true, linkedControls:["A.5.19","A.5.20"], ecartAuto:"Absence de clauses SSI dans les contrats - NC sur A.5.20"},
    {ref:"D-31", cat:"HDS", label:"Certificat ou attestation HDS en cours de validite", desc:"Document prouvant l'habilitation HDS de l'hebergeur ou de l'organisme.", critical:true, hds:true, linkedControls:["A.5.31"], ecartAuto:"Certification HDS absente ou expiree - NC critique"},
    {ref:"D-32", cat:"HDS", label:"Contrats d'hebergement HDS", desc:"Contrat avec l'hebergeur certifie HDS avec responsabilites definies.", critical:true, hds:true, linkedControls:["A.5.19","A.5.20"], ecartAuto:"Contrat HDS absent - NC majeure"},
    {ref:"D-33", cat:"HDS", label:"Registre des traitements de donnees de sante (RGPD)", desc:"Inventaire des traitements de donnees de sante avec bases legales.", critical:true, hds:true, linkedControls:["A.5.34"], ecartAuto:"Registre traitements absent - NC sur A.5.34"},
    {ref:"D-34", cat:"HDS", label:"Analyse d'Impact (PIA/DPIA) pour les traitements a risque", desc:"Etudes d'impact sur la protection des donnees pour les traitements sensibles.", critical:false, hds:true, linkedControls:["A.5.34"], ecartAuto:""}
];

// ── DOC REVIEW HELPERS ──

var DOC_REVIEW = window.ISO_AUDIT_DOC_REVIEW;

function _getDocEntry(ref) {
    if (!D.doc_review[ref]) D.doc_review[ref] = { status: "", observations: "" };
    return D.doc_review[ref];
}

// ── RENDER ──

function renderDocReview() {
    var el = document.getElementById("docreview-content");
    if (!el) return;

    var cats = [];
    DOC_REVIEW.forEach(function(d) { if (cats.indexOf(d.cat) === -1) cats.push(d.cat); });

    // Summary counters
    var counts = { recu: 0, incomplet: 0, manquant: 0, na: 0, total: DOC_REVIEW.length, done: 0 };
    DOC_REVIEW.forEach(function(d) {
        var s = (D.doc_review[d.ref] && D.doc_review[d.ref].status) || "";
        if (s) { counts.done++; if (counts[s] !== undefined) counts[s]++; }
    });

    // KPI row
    var h = '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">';
    h += '<div class="kpi-box"><div class="kpi-value">' + counts.done + '/' + counts.total + '</div><div class="kpi-label">' + t("audit.dash.progress") + '</div></div>';
    h += '<div class="kpi-box"><div class="kpi-value" style="color:#27ae60">' + counts.recu + '</div><div class="kpi-label">' + t("audit.doc.recu") + '</div></div>';
    h += '<div class="kpi-box"><div class="kpi-value" style="color:#f39c12">' + counts.incomplet + '</div><div class="kpi-label">' + t("audit.doc.incomplet") + '</div></div>';
    h += '<div class="kpi-box"><div class="kpi-value" style="color:#e74c3c">' + counts.manquant + '</div><div class="kpi-label">' + t("audit.doc.manquant") + '</div></div>';
    h += '<div class="kpi-box"><div class="kpi-value" style="color:#95a5a6">' + counts.na + '</div><div class="kpi-label">' + t("audit.doc.na") + '</div></div>';
    h += '</div>';

    // Table per category
    cats.forEach(function(cat) {
        var docs = DOC_REVIEW.filter(function(d) { return d.cat === cat; });
        var catDone = docs.filter(function(d) { return D.doc_review[d.ref] && D.doc_review[d.ref].status; }).length;

        h += '<div style="margin-bottom:20px">';
        h += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;padding-bottom:6px;border-bottom:2px solid var(--light-blue)">';
        h += '<h3 style="font-size:0.95em;color:var(--blue);margin:0">' + esc(cat) + '</h3>';
        h += '<span style="font-size:0.75em;color:var(--text-muted)">' + catDone + '/' + docs.length + '</span>';
        h += '</div>';

        h += '<table class="nc-table"><thead><tr>';
        h += '<th style="width:60px">Réf.</th>';
        h += '<th>Document</th>';
        h += '<th style="width:70px">Statut</th>';
        h += '<th>Observations</th>';
        h += '</tr></thead><tbody>';

        docs.forEach(function(d) {
            var entry = _getDocEntry(d.ref);
            var st = entry.status || "";
            var obs = entry.observations || "";
            var stColor = st === "recu" ? "#27ae60" : st === "incomplet" ? "#f39c12" : st === "manquant" ? "#e74c3c" : st === "na" ? "#95a5a6" : "";
            var stLabel = st ? t("audit.doc." + st) : "—";
            var showAlert = st === "manquant" && d.ecartAuto;

            h += '<tr>';
            // Ref + badges
            h += '<td><strong>' + esc(d.ref) + '</strong>';
            if (d.critical) h += ' <span style="color:var(--red);font-size:0.7em;font-weight:700">★</span>';
            if (d.hds) h += ' <span style="font-size:0.6em;background:#3a8a6e;color:white;padding:1px 4px;border-radius:3px">HDS</span>';
            h += '</td>';
            // Document name + description
            h += '<td><div style="font-weight:600;font-size:0.85em">' + esc(d.label) + '</div>';
            h += '<div style="font-size:0.78em;color:var(--text-muted)">' + esc(d.desc) + '</div>';
            if (d.linkedControls && d.linkedControls.length) h += '<div style="font-size:0.72em;color:var(--light-blue);margin-top:2px">§ ' + d.linkedControls.join(', ') + '</div>';
            if (showAlert) h += '<div style="font-size:0.75em;color:var(--red);margin-top:2px">⚠ ' + esc(d.ecartAuto) + '</div>';
            h += '</td>';
            // Status (clickable badge cycling through states)
            h += '<td style="text-align:center">';
            h += '<div class="doc-status-cycle" data-click="cycleDocStatus" data-args=\'' + _da(d.ref) + '\' style="cursor:pointer;user-select:none">';
            if (st) {
                h += '<span style="display:inline-block;padding:3px 8px;border-radius:4px;font-size:0.75em;font-weight:600;color:white;background:' + stColor + '">' + esc(stLabel) + '</span>';
            } else {
                h += '<span style="display:inline-block;padding:3px 8px;border-radius:4px;font-size:0.75em;border:1px dashed var(--border);color:var(--text-muted);cursor:pointer">—</span>';
            }
            h += '</div></td>';
            // Observations
            h += '<td><textarea rows="1" style="width:100%;font-size:0.8em;min-height:28px;resize:vertical" data-change="setDocObs" data-args=\'' + _da(d.ref) + '\' data-pass-value placeholder="' + esc(t("audit.doc.observations")) + '">' + esc(obs) + '</textarea></td>';
            h += '</tr>';
        });

        h += '</tbody></table></div>';
    });

    el.innerHTML = h;
}
window.renderDocReview = renderDocReview;

// ── HANDLERS ──

var DOC_STATUS_CYCLE = ["", "recu", "incomplet", "manquant", "na"];

function cycleDocStatus(ref) {
    _saveState();
    var entry = _getDocEntry(ref);
    var idx = DOC_STATUS_CYCLE.indexOf(entry.status || "");
    entry.status = DOC_STATUS_CYCLE[(idx + 1) % DOC_STATUS_CYCLE.length];
    _autoSave();
    renderDocReview();
}
window.cycleDocStatus = cycleDocStatus;

function setDocObs(ref, val) {
    var entry = _getDocEntry(ref);
    entry.observations = val;
    _autoSave();
}
window.setDocObs = setDocObs;
