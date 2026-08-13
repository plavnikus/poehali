(function(){
const BAD=new Set(['tazh-6','arshan-12']);
const CAUTION=new Set(['arshan-13','arshan-14','slud-6','lena-17']);
const ACCESS={
 'tazh-1':'🚗 грунтовый подъезд','tazh-2':'🚗 грунтовый подъезд','tazh-3':'🚗 грунтовый подъезд','tazh-4':'🚗 грунтовый подъезд','tazh-5':'🚗 грунтовый подъезд',
 'arshan-1':'🚶 пешая часть','arshan-2':'🚶 короткая пешая часть','arshan-3':'🚶 около 20 мин пешком',
 'slud-1':'🚗 городской подъезд','slud-2':'🚗 городской подъезд','slud-3':'🚶 около 3 км маршрут',
 'lena-2':'🚗 подъезд в село','lena-7':'🚗 подъезд в село','lena-8':'🚗 подъезд в село','lena-9':'🚗 подъезд в село','lena-11':'🚗 подъезд в село'
};
function qm(p){
 const insta=p.c&&p.c.includes('photo');
 const strong=p.v==='verified' && (insta || p.c.includes('unusual') || p.c.includes('history') || p.c.includes('culture')) && !p.c.includes('food');
 let fit='ok';
 if(BAD.has(p.i))fit='bad'; else if(p.v!=='verified'||p.s||CAUTION.has(p.i)||/разреш|провер|уточн|грунт|дожд|доступ/i.test(p.o||''))fit='caution';
 return {insta,strong,fit,access:ACCESS[p.i]||'🚗 доступ уточнить'};
}
function qbadges(p){const m=qm(p);let a=[];if(m.strong)a.push('<span class="qtag qstrong">🔥 Сильное место</span>');if(m.insta)a.push('<span class="qtag qinsta">📸 Instagram</span>');a.push(m.fit==='ok'?'<span class="qtag qok">✅ Подходит нам</span>':m.fit==='bad'?'<span class="qtag qbad">❌ Не наш формат</span>':'<span class="qtag qcaution">🟡 С оговорками</span>');a.push(`<span class="qtag qaccess">${m.access}</span>`);return `<div class="qtags">${a.join('')}</div>`}
const style=document.createElement('style');style.textContent='.qtags{display:flex;flex-wrap:wrap;gap:5px;margin:9px 0 2px}.qtag{font-size:11px;padding:5px 7px;border-radius:999px;background:#f0eee8}.qstrong{background:#fff0d1;color:#7d5100}.qinsta{background:#f5e9f4;color:#70466d}.qok{background:#e5f1e8;color:#27633d}.qcaution{background:#fff0d5;color:#8a5b13}.qbad{background:#f8e2df;color:#8a352c}.qaccess{background:#edf0f2;color:#4d5962}';document.head.appendChild(style);
const oldTag=tag;tag=function(p){return oldTag(p)+qbadges(p)};
chips=function(){const list=[['all','Все'],['strong','🔥 Сильные'],['insta','📸 Instagram'],['fit','✅ Подходит нам'],['photo','📸 Красиво'],['rest','🌿 Отдых'],['culture','🛕 Культура'],['history','🗿 История'],['food','🍲 Еда'],['unusual','🏚 Необычное'],['sacred','🟣 Сакральное']];return `<div class="chips">${list.map(x=>`<button class="chip ${f===x[0]?'on':''}" onclick="setf('${x[0]}')">${x[1]}</button>`).join('')}</div>`};
match=function(p){const m=qm(p);let a=f==='all'||(f==='sacred'?p.s:f==='strong'?m.strong:f==='insta'?m.insta:f==='fit'?m.fit==='ok':p.c.includes(f)),z=(p.n+' '+p.x).toLowerCase();return a&&(!q||z.includes(q.toLowerCase()))};
setf=function(x){f=x;route(false)};
route(false);
})();
