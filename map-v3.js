(function(){
const COORDS={
 'tazh-1':[52.791616,106.527685],
 'tazh-3':[52.925877,106.759206],
 'tazh-4':[52.951578,106.749014],
 'tazh-5':[52.719069,106.533435]
};
const style=document.createElement('style');
style.textContent='.mapwrap{margin-top:14px}.mapframe{width:100%;height:52vh;min-height:390px;border:1px solid #e6e0d6;border-radius:20px;background:#e9ece7;display:block}.mapnote{margin:10px 0 0;font-size:12px;color:var(--m);line-height:1.45}.mapplaces{display:grid;gap:8px;margin-top:14px}.mapplace{width:100%;border:1px solid #e6e0d6;background:var(--s);border-radius:15px;padding:12px 13px;text-align:left}.mapplace.on{border-color:var(--a);box-shadow:0 0 0 1px var(--a) inset}.mapplace b{display:block;font-size:14px}.mapplace span{font-size:12px;color:var(--m)}.mapactions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}';
document.head.appendChild(style);
const navEl=document.querySelector('.nav');
if(navEl&&!document.getElementById('nm')){const b=document.createElement('button');b.id='nm';b.innerHTML='📍<br>Карта';b.onclick=()=>mapPage();const best=document.getElementById('nb');navEl.insertBefore(b,best||document.getElementById('nf')||null);navEl.style.gridTemplateColumns='repeat(5,1fr)';}
nav=function(k){['h','a','m','b','f'].forEach(x=>{const el=document.getElementById('n'+x);if(el)el.classList.toggle('on',x===k)});};
window.mapPage=function(){f='all';q='';location.hash='#/map'};
let activeId=Object.keys(COORDS)[0];
function embedUrl(lat,lon){const dx=.07,dy=.035;const bbox=[lon-dx,lat-dy,lon+dx,lat+dy].join('%2C');return 'https://www.openstreetmap.org/export/embed.html?bbox='+bbox+'&layer=mapnik&marker='+lat+'%2C'+lon;}
function externalUrl(lat,lon){return 'https://www.openstreetmap.org/?mlat='+lat+'&mlon='+lon+'#map=13/'+lat+'/'+lon;}
window.selectMapPoint=function(id){activeId=id;const p=P.find(x=>x.i===id);if(!p)return;const c=COORDS[id];const fr=document.getElementById('osmframe');if(fr)fr.src=embedUrl(c[0],c[1]);const title=document.getElementById('mapactive');if(title)title.textContent=p.n;const card=document.getElementById('mapcard');if(card)card.onclick=()=>place(id);const ext=document.getElementById('mapexternal');if(ext)ext.href=externalUrl(c[0],c[1]);document.querySelectorAll('.mapplace').forEach(x=>x.classList.toggle('on',x.dataset.id===id));};
function renderMap(){nav('m');const pts=P.filter(p=>COORDS[p.i]);if(!pts.find(p=>p.i===activeId))activeId=pts[0]&&pts[0].i;const p=P.find(x=>x.i===activeId)||pts[0];if(!p){v.innerHTML='<h1>📍 Карта мест</h1><p class="muted">Пока нет точек с подтверждёнными координатами.</p>';return;}const c=COORDS[p.i];v.innerHTML='<h1>📍 Карта мест</h1><p class="muted">Сейчас нанесено '+pts.length+' места из '+P.length+'. Показываем только точки с подтверждёнными координатами.</p><div class="mapwrap"><iframe id="osmframe" class="mapframe" loading="lazy" src="'+embedUrl(c[0],c[1])+'"></iframe><p class="mapnote">Сейчас: <b id="mapactive">'+E(p.n)+'</b>. Выбери другую точку ниже — карта переключится на неё.</p><div class="mapactions"><button id="mapcard" class="btn primary" onclick="place(\''+p.i+'\')">Открыть карточку</button><a id="mapexternal" class="btn" href="'+externalUrl(c[0],c[1])+'" target="_blank" rel="noopener">Открыть в OSM ↗</a></div><div class="mapplaces">'+pts.map(x=>'<button class="mapplace '+(x.i===p.i?'on':'')+'" data-id="'+x.i+'" onclick="selectMapPoint(\''+x.i+'\')"><b>📍 '+E(x.n)+'</b><span>'+E((D[x.d]||[''])[0]||'')+'</span></button>').join('')+'</div><p class="mapnote">Одна точка на карте за раз — зато без внешней JS-библиотеки и устойчиво на iPhone. Приблизительные координаты не используем.</p></div>';}
const baseRoute=route;route=function(scroll=true){const h=location.hash||'#/';if(h==='#/map'){renderMap();if(scroll)scrollTo(0,0);}else baseRoute(scroll);};route(false);
})();