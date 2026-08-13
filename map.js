(function(){
const COORDS={
 'tazh-1':[52.791616,106.527685],
 'tazh-3':[52.925877,106.759206],
 'tazh-4':[52.951578,106.749014],
 'tazh-5':[52.719069,106.533435]
};
const style=document.createElement('style');
style.textContent='.mapwrap{margin-top:14px}.mapbox{height:58vh;min-height:420px;border-radius:20px;overflow:hidden;border:1px solid #e6e0d6;background:#e9ece7;position:relative}.mapnote{margin:10px 0 0;font-size:12px;color:var(--m);line-height:1.45}.maploading,.maperror{position:absolute;inset:0;display:grid;place-items:center;padding:24px;text-align:center;color:var(--m);font-size:14px;line-height:1.45}.maperror{color:#7c443d}.leaflet-popup-content-wrapper{border-radius:14px}.mpop b{display:block;font-size:14px;margin-bottom:5px}.mpop button{border:0;background:var(--a);color:white;border-radius:10px;padding:7px 10px;font-size:12px;font-weight:700;margin-top:7px}';
document.head.appendChild(style);

const navEl=document.querySelector('.nav');
if(navEl&&!document.getElementById('nm')){
  const b=document.createElement('button');
  b.id='nm';b.innerHTML='📍<br>Карта';b.onclick=()=>mapPage();
  const best=document.getElementById('nb');
  navEl.insertBefore(b,best||document.getElementById('nf')||null);
  navEl.style.gridTemplateColumns='repeat(5,1fr)';
}

nav=function(k){['h','a','m','b','f'].forEach(x=>{const el=document.getElementById('n'+x);if(el)el.classList.toggle('on',x===k)});};
window.mapPage=function(){f='all';q='';location.hash='#/map'};

function ensureCss(){
 if(document.getElementById('leaflet-css'))return;
 const l=document.createElement('link');
 l.id='leaflet-css';l.rel='stylesheet';
 l.href='https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css';
 l.onerror=()=>{l.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'};
 document.head.appendChild(l);
}
function loadScript(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.async=true;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)})}
async function loadLeaflet(){
 if(window.L)return true;
 ensureCss();
 try{await loadScript('https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js');if(window.L)return true}catch(e){}
 try{await loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js');if(window.L)return true}catch(e){}
 return false;
}
async function renderMap(){
 nav('m');
 const pts=P.filter(p=>COORDS[p.i]);
 v.innerHTML=`<h1>📍 Карта мест</h1><p class="muted">На карте сейчас ${pts.length} мест с подтверждёнными координатами из ${P.length}. Остальные добавляем только после геопроверки.</p><div class="mapwrap"><div id="map" class="mapbox"><div class="maploading">Загружаю карту…</div></div><p class="mapnote">Нажми на маркер → откроется название и кнопка карточки. Координаты не подставляем приблизительно.</p></div>`;
 const ok=await loadLeaflet();
 const box=document.getElementById('map');
 if(!box)return;
 if(!ok){box.innerHTML='<div class="maperror">Не удалось загрузить картографический модуль. Проверь интернет и обнови страницу — карта попробует резервный источник.</div>';return;}
 box.innerHTML='';
 try{
   const map=L.map('map',{zoomControl:true});
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(map);
   const bounds=[];
   pts.forEach(p=>{
     const [lat,lng]=COORDS[p.i];bounds.push([lat,lng]);
     const m=L.marker([lat,lng]).addTo(map);
     m.bindPopup(`<div class="mpop"><b>${E(p.n)}</b><span>${E((D[p.d]||[''])[0]||'')}</span><br><button onclick="place('${p.i}')">Открыть карточку</button></div>`);
   });
   if(bounds.length>1)map.fitBounds(bounds,{padding:[24,24]});
   else if(bounds.length===1)map.setView(bounds[0],11);
   else map.setView([52.3,104.3],7);
   setTimeout(()=>map.invalidateSize(),180);
 }catch(e){box.innerHTML='<div class="maperror">Карта загрузилась некорректно. Обнови страницу — если повторится, я переключу её на другой способ отображения.</div>';}
}
const baseRoute=route;
route=function(scroll=true){
 const h=location.hash||'#/';
 if(h==='#/map'){renderMap();if(scroll)scrollTo(0,0);}
 else baseRoute(scroll);
};
route(false);
})();
