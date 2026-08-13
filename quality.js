(function(){
const BAD=new Set(['tazh-6','arshan-12']);
const CAUTION=new Set(['arshan-13','arshan-14','slud-6','lena-17']);
const ACCESS={
 'tazh-1':'🚗 Грунтовый подъезд','tazh-2':'🚗 Грунтовый подъезд','tazh-3':'🚗 Грунтовый подъезд','tazh-4':'🚗 Грунтовый подъезд','tazh-5':'🚗 Грунтовый подъезд',
 'arshan-1':'🚶 Пешая часть','arshan-2':'🚶 Короткая пешая часть','arshan-3':'🚶 Около 20 мин пешком',
 'slud-1':'🚗 Городской подъезд','slud-2':'🚗 Городской подъезд','slud-3':'🚶 Около 3 км маршрут',
 'lena-2':'🚗 Подъезд в село','lena-7':'🚗 Подъезд в село','lena-8':'🚗 Подъезд в село','lena-9':'🚗 Подъезд в село','lena-11':'🚗 Подъезд в село'
};
function qm(p){
 const insta=p.c&&p.c.includes('photo');
 const strong=p.v==='verified' && (insta || p.c.includes('unusual') || p.c.includes('history') || p.c.includes('culture')) && !p.c.includes('food');
 let fit='ok';
 if(BAD.has(p.i))fit='bad'; else if(p.v!=='verified'||p.s||CAUTION.has(p.i)||/разреш|провер|уточн|грунт|дожд|доступ/i.test(p.o||''))fit='caution';
 return {insta,strong,fit,access:ACCESS[p.i]||'🚗 Доступ уточнить'};
}
window.qm=qm;
function baseTags(p){
 let t=(p.c||[]).map(k=>`<span class="tag">${C[k]?.[0]||'📍'} ${C[k]?.[1]||k}</span>`).join('');
 if(p.s)t+='<span class="tag sac">🟣 Сакральное</span>';
 return t;
}
function cautionBadge(p){
 const o=(p.o||'').toLowerCase();
 if(/разреш|допуск/.test(o))return '<span class="qtag qcaution">🎫 Нужен допуск / проверка разрешения</span>';
 if(/дожд/.test(o))return '<span class="qtag qcaution">🌧 После дождя — проверить</span>';
 if(/грунт/.test(o))return '<span class="qtag qcaution">🚗 Грунтовка — проверить состояние</span>';
 if(/доступ|подъезд|уточн|провер/.test(o)||CAUTION.has(p.i))return '<span class="qtag qcaution">🔎 Доступ требует проверки</span>';
 if(p.s)return '<span class="qtag qcaution">🟣 Сакральное место</span>';
 return '<span class="qtag qcaution">🔎 Есть нюанс — см. ниже</span>';
}
function qbadges(p){
 const m=qm(p),a=[];
 if(m.strong)a.push('<span class="qtag qstrong">🔥 Сильное место</span>');
 if(m.insta)a.push('<span class="qtag qinsta">📸 Instagram</span>');
 a.push(m.fit==='ok'?'<span class="qtag qok">✅ Подходит нам</span>':m.fit==='bad'?'<span class="qtag qbad">❌ Не наш формат</span>':cautionBadge(p));
 a.push(`<span class="qtag qaccess">${m.access}</span>`);
 return `<div class="qtags">${a.join('')}</div>`;
}
const style=document.createElement('style');
style.textContent='.qtags{display:flex;flex-wrap:wrap;gap:5px;margin:10px 0 2px}.qtag{font-size:11px;padding:5px 7px;border-radius:999px;background:#f0eee8}.qstrong{background:#fff0d1;color:#7d5100}.qinsta{background:#f5e9f4;color:#70466d}.qok{background:#e5f1e8;color:#27633d}.qcaution{background:#fff0d5;color:#8a5b13}.qbad{background:#f8e2df;color:#8a352c}.qaccess{background:#edf0f2;color:#4d5962}.firemark{font-size:.88em;margin-right:3px}';
document.head.appendChild(style);
tag=baseTags;
const rawCard=card;
card=function(p){
 let html=rawCard(p);
 html=html.replace(/<div class="qtags">[\s\S]*?<\/div>/g,'');
 if(qm(p).strong) html=html.replace('<h3>','<h3><span class="firemark">🔥</span>');
 return html;
};
const rawRP=RP;
RP=function(i){
 rawRP(i);
 const p=P.find(x=>x.i===i);
 if(!p)return;
 const detail=document.querySelector('.detail');
 if(!detail)return;
 detail.querySelectorAll('.qtags').forEach(x=>x.remove());
 const status=detail.querySelector('.status');
 if(status)status.insertAdjacentHTML('afterend',qbadges(p));
};
chips=function(){
 const list=[['all','Все'],['strong','🔥 Сильные'],['insta','📸 Instagram'],['fit','✅ Подходит нам'],['photo','📸 Красиво'],['rest','🌿 Отдых'],['culture','🛕 Культура'],['history','🗿 История'],['food','🍲 Еда'],['unusual','🏚 Необычное'],['sacred','🟣 Сакральное']];
 return `<div class="chips">${list.map(x=>`<button class="chip ${f===x[0]?'on':''}" onclick="setf('${x[0]}')">${x[1]}</button>`).join('')}</div>`;
};
match=function(p){
 const m=qm(p);
 let a=f==='all'||(f==='sacred'?p.s:f==='strong'?m.strong:f==='insta'?m.insta:f==='fit'?m.fit==='ok':p.c.includes(f)),z=(p.n+' '+p.x).toLowerCase();
 return a&&(!q||z.includes(q.toLowerCase()));
};
setf=function(x){f=x;route(false)};
route(false);
if(!document.querySelector('script[data-best]')){const s=document.createElement('script');s.src='best.js?v=1';s.dataset.best='1';document.body.appendChild(s)}
if(!document.getElementById('details-data')){const d=document.createElement('script');d.id='details-data';d.src='details.js?v=3';d.onload=()=>{const c=document.createElement('link');c.rel='stylesheet';c.href='details-style.css?v=1';document.head.appendChild(c);const r=document.createElement('script');r.src='details-render.js?v=3';document.body.appendChild(r)};document.body.appendChild(d)}
})();