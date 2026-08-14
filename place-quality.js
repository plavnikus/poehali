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

function compactTags(p){
 const categories=['culture','history','unusual','food','rest','photo'];
 const tags=[];
 const main=categories.find(k=>(p.c||[]).includes(k));
 if(main)tags.push(`<span class="tag">${C[main]?.[0]||'📍'} ${C[main]?.[1]||main}</span>`);
 if(p.s)tags.push('<span class="tag sac">🟣 Сакральное</span>');
 const access=qm(p).access;
 if(access&&access!=='🚗 Доступ уточнить')tags.push(`<span class="tag">${access}</span>`);
 return tags.slice(0,3).join('');
}

tag=compactTags;
window.qbadges=function(){return''};

const style=document.createElement('style');
style.textContent='.firemark{font-size:.88em;margin-right:3px}';
document.head.appendChild(style);

const rawCard=card;
card=function(p){
 let html=rawCard(p);
 if(qm(p).strong) html=html.replace('<h3>','<h3><span class="firemark">🔥</span>');
 return html;
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
})();