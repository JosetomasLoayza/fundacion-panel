// Configuración base del panel
// Reemplaza FIREBASE_CONFIG por los datos reales de tu proyecto.

const FIREBASE_CONFIG = {
  apiKey: "REEMPLAZAR_API_KEY",
  authDomain: "REEMPLAZAR_AUTH_DOMAIN",
  databaseURL: "REEMPLAZAR_DATABASE_URL",
  projectId: "REEMPLAZAR_PROJECT_ID",
  storageBucket: "REEMPLAZAR_STORAGE_BUCKET",
  messagingSenderId: "REEMPLAZAR_MESSAGING_SENDER_ID",
  appId: "REEMPLAZAR_APP_ID"
};

const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const MONTHS_S = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const QUARTERS = ['Q1 Ene-Mar','Q2 Abr-Jun','Q3 Jul-Sep','Q4 Oct-Dic'];

function escH(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fmt(n) {
  const x = parseFloat(n);
  if (isNaN(x)) return '—';
  return x.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function pct(a, t) {
  if (!t || t === 0) return 0;
  return Math.min(100, Math.round((a / t) * 100));
}

function progColor(p) {
  if (p >= 90) return '#e05252';
  if (p >= 70) return '#d4a017';
  return '#3aaa6e';
}

function initials(name) {
  const p = (name || '').trim().split(/\s+/);
  return ((p[0] || 'P')[0] || 'P').toUpperCase() + (((p[1] || '')[0]) || '');
}

function calcCC(cc) {
  const presup = parseFloat(cc.presupuesto) || 0;
  const used = (cc.items || []).reduce((s, it) => s + (parseFloat(it.monto) || 0), 0);
  return { presup, used, avail: presup - used, p: pct(used, presup) };
}

function calcSummary(metas) {
  if (!metas || !metas.length) return { total: 0, pct: 0, logradas: 0 };
  const tm = metas.reduce((s, m) => s + (parseFloat(m.meta) || 0), 0);
  const ta = metas.reduce((s, m) => s + (parseFloat(m.actual) || 0), 0);
  const p = tm > 0 ? Math.min(100, Math.round((ta / tm) * 100)) : 0;
  return {
    total: metas.length,
    pct: p,
    logradas: metas.filter(m => (parseFloat(m.actual) || 0) >= (parseFloat(m.meta) || 1)).length
  };
}

function defaultPersona(i) {
  return {
    name: `Persona ${i + 1}`,
    role: 'Cargo / Área',
    centrosCosto: [],
    metasAnuales: [],
    metasMensuales: {},
    metasTrimestrales: {},
    tareasMensuales: {},
    notas: ''
  };
}
