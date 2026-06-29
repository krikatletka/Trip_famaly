const data=[
{day:'30 июня',tasks:['✈️ Прилет 16:30','🚋 Трамвай L2 до отеля','🏨 Заселение','🛒 Покупки','🍽️ Ресторан (?)','🌅 Прогулка']},
{day:'1 июля',tasks:['🏖️ Пляж','📍 Le Plongeoir','🏛️ Старый город','📸 Фотографии','🍽️ Ужин (?)']},
{day:'2 июля',tasks:['🇲🇨 Монако','🛍️ Шопинг','🍽️ Ресторан (?)']},
{day:'3 июля',tasks:['🏖️ Пляж','🛍️ Магазины','🌇 Закат']},
{day:'4 июля',tasks:['🎒 Сбор вещей','✈️ Аэропорт']}
];
const app=document.getElementById('days');
data.forEach((d,di)=>{
 const c=document.createElement('section');
 c.className='card';
 c.innerHTML=`<h2>${d.day}</h2><small>Отмеченные пункты сохраняются автоматически.</small>`;
 d.tasks.forEach((t,ti)=>{
   const id=`${di}-${ti}`;
   const l=document.createElement('label');
   const cb=document.createElement('input');
   cb.type='checkbox';
   cb.checked=localStorage.getItem(id)==='1';
   cb.onchange=()=>localStorage.setItem(id,cb.checked?'1':'0');
   l.append(cb,' ',t);
   c.append(l);
 });
 app.append(c);
});