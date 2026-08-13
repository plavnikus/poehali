(function(){
const style=document.createElement('style');
style.textContent='.bestgrid{display:grid;gap:12px;margin-top:16px}.besttile{border:1px solid #e6e0d6;background:var(--s);border-radius:20px;padding:18px;text-align:left;box-shadow:0 8px 24px #1c201c12}.besttile:active{transform:scale(.995)}.bestemoji{font-size:34px;display:block;margin-bottom:10px}.besttitle{font-size:20px;font-weight:800;display:block}.bestsub{display:block;color:var(--m);font-size:13px;line-height:1.4;margin-top:5px}.bestcount{display:inline-block;margin-top:12px;font-size:12px;font-weight:700;color:var(--a)}@media(min-width:620px){.bestgrid{grid-template-columns:1fr 1fr}}';
document.head.appendChild(style);

const navEl=document.querySelector('.nav');
if(navEl&&!document.getElementById('nb')){
  const b=document.createElement('button');
  b.id='nb';b.innerHTML='✨<br>Лучшее';b.onclick=()=>bestPage();
  const fav=document.getElementById('nf');
  navEl.insertBefore(b,fav||null);
  navEl.style.gridTemplateColumns='repeat(4,1fr)';
}

nav=function(k){['h','a','b','f'].forEach(x=>{const el=document.getElementById('n'+x);if(el)el.classList.toggle('on',x===k)})};

function meta(p){return window.qm?window.qm(p):{insta:(p.c||[]).includes('photo'),strong:p.v==='verified',fit:p.v==='verified'?'ok':'caution'}}
function selected(kind){
 return P.filter(p=>{
   const m=meta(p),c=p.c||[];
   if(kind==='strong')return !!m.strong;
   if(kind==='photo')return p.v==='verified'&&m.insta&&m.fit!=='bad';
   if(kind==='rest')return p.v==='verified'&&c.includes('rest')&&m.fit!=='bad';
   if(kind==='unusual')return p.v==='verified'&&c.includes('unusual')&&m.fit!=='bad';
   return false;
 });
}
const B={
 strong:['🔥','Самое сильное','Места, ради которых действительно стоит строить поездку.'],
 photo:['📸','Для фото','Самые выразительные пейзажи и визуальные точки.'],
 rest:['🌿','Посидеть и отдохнуть','Красивые места для спокойной остановки без гонки.'],
 unusual:['🏚','Самое необычное','Редкие объекты, необычные ландшафты и небанальная история.']
};
window.bestPage=function(){f='all';q='';location.hash='#/best'};
window.openBest=function(k){f='all';q='';location.hash='#/best/'+k};
function renderBest(){
 nav('b');
 v.innerHTML=`<h1>✨ Лучшее</h1><p class="muted">Короткие подборки из всей базы — когда не хочется листать все места подряд.</p><div class="bestgrid">${Object.entries(B).map(([k,x])=>`<button class="besttile" onclick="openBest('${k}')"><span class="bestemoji">${x[0]}</span><span class="besttitle">${x[1]}</span><span class="bestsub">${x[2]}</span><span class="bestcount">${selected(k).length} мест →</span></button>`).join('')}</div>`;
}
function renderBestList(k){
 const x=B[k];if(!x){bestPage();return}
 nav('b');
 const arr=selected(k);A=arr;const z=A.filter(match);
 v.innerHTML=`<button class="back" onclick="bestPage()">← Лучшее</button><h1>${x[0]} ${x[1]}</h1><div class="muted">${x[2]} · <span id="count">${z.length} из ${A.length} мест</span></div><input class="search" value="${E(q)}" oninput="searchInput(this)" placeholder="Поиск по подборке…">${chips()}<div class="cards" id="cards">${z.map(card).join('')||'<div class="muted">Ничего не найдено</div>'}</div>`;
}
const baseRoute=route;
route=function(scroll=true){
 const h=location.hash||'#/';
 if(h==='#/best')renderBest();
 else if(h.startsWith('#/best/'))renderBestList(h.split('/')[2]);
 else baseRoute(scroll);
 if(scroll&&(h==='#/best'||h.startsWith('#/best/')))scrollTo(0,0);
};
route(false);
})();
if(!document.querySelector('script[src="map-v3.js"]')){const s=document.createElement('script');s.src='map-v3.js';document.body.appendChild(s);}
