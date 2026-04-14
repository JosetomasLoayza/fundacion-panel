// FIREBASE CONFIG - reemplaza con tus valores
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyA0dQT5egfSedBcxdBU32z_M0d2cxiQ5SM",
  authDomain:        "panel-control-2026.firebaseapp.com",
  databaseURL:       "https://panel-control-2026-default-rtdb.firebaseio.com",
  projectId:         "panel-control-2026",
  storageBucket:     "panel-control-2026.firebasestorage.app",
  messagingSenderId: "1001785626322",
  appId:             "1:1001785626322:web:24a859b412a9affe56670b"
};

const MONTHS   = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const MONTHS_S = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const QUARTERS = ['Q1 Ene-Mar','Q2 Abr-Jun','Q3 Jul-Sep','Q4 Oct-Dic'];

function escH(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fmt(n){ const x=parseFloat(n); if(isNaN(x)) return '0'; return x.toLocaleString('es-CL',{minimumFractionDigits:0,maximumFractionDigits:0}); }
function pct(a,t){ if(!t||t==0) return 0; return Math.min(100,Math.round((a/t)*100)); }
function initials(name){ const p=(name||'').trim().split(' '); return ((p[0]||'P')[0]).toUpperCase()+((p[1]||'')[0]||'').toUpperCase(); }
function calcSummary(metas){
  if(!metas||!metas.length) return {total:0,pct:0,logradas:0};
  const tm=metas.reduce((s,m)=>s+(parseFloat(m.meta)||0),0);
  const ta=metas.reduce((s,m)=>s+(parseFloat(m.actual)||0),0);
  const p=tm>0?Math.min(100,Math.round((ta/tm)*100)):0;
  return {total:metas.length,pct:p,logradas:metas.filter(m=>(parseFloat(m.actual)||0)>=(parseFloat(m.meta)||1)).length};
}
function calcCC(cc){
  const cats=cc.categorias||[];
  const presup=cats.reduce((s,c)=>s+(parseFloat(c.presupuesto)||0),0);
  const used=cats.reduce((s,c)=>s+(c.gastos||[]).reduce((ss,g)=>ss+(parseFloat(g.monto)||0),0),0);
  return {presup,used,avail:presup-used,p:presup>0?Math.min(100,Math.round((used/presup)*100)):0};
}
function defaultPersona(i){ return {
  name:'Persona '+(i+1), role:'Cargo / Area',
  centrosCosto:[], metasAnuales:[],
  metasMensuales:{}, metasTrimestrales:{},
  tareasMensuales:{}, rendiciones:[], donaciones:[], notas:''
};}
