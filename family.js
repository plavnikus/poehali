window.FAMILY=window.FAMILY||{};
window.FAMILY.people=[['p1','Я'],['p2','Семья 2'],['p3','Семья 3']];
window.FAMILY.get=function(){try{return JSON.parse(localStorage.getItem('poehali_family')||'{}')}catch(e){return{}}};
window.FAMILY.save=function(x){localStorage.setItem('poehali_family',JSON.stringify(x))};