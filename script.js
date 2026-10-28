/* =====================================================================
   ADD / EDIT PRODUCTS HERE  (this is the only place you need to touch)
   1. Put the photo in the  assets/  folder (e.g. assets/p11.jpg)
   2. Copy any line below, paste it at the end of the list, and change the values
      - id must be unique, img is the photo file name, price is in naira (no commas)
      - cat is the style name (filter buttons appear automatically when you use a new one)
   ===================================================================== */
const PRODUCTS=[
{id:1, img:'p1.jpg', cat:'Bone Straight',name:'16" Bone Straight Wig',len:16,closure:'2x6',price:195000,texture:'Bone straight (silk strands)',color:'Natural black',parting:'Middle part',grams:200,grade:'SDD'},
{id:2, img:'p2.jpg', cat:'Bone Straight',name:'16" Bone Straight Wig',len:16,closure:'5x5',price:215000,texture:'Bone straight (silk strands)',color:'Natural black',parting:'Middle part',grams:200,grade:'SDD'},
{id:3, img:'p3.jpg', cat:'Bone Straight',name:'24" Bone Straight Wig',len:24,closure:'2x6',price:315000,texture:'Bone straight (silk strands)',color:'Natural black',parting:'Middle part',grams:200,grade:'SDD'},
{id:4, img:'p4.jpg', cat:'Bone Straight',name:'14" Bone Straight Wig',len:14,closure:'2x6',price:170000,texture:'Bone straight (silk strands)',color:'Natural black',parting:'Middle part',grams:200,grade:'SDD'},
{id:5, img:'p5.jpg', cat:'Bone Straight',name:'14" Bone Straight Wig',len:14,closure:'5x5',price:185000,texture:'Bone straight (silk strands)',color:'Natural black',parting:'Middle part',grams:200,grade:'SDD'},
{id:6, img:'p6.jpg', cat:'Bone Straight',name:'24" Bone Straight Wig',len:24,closure:'5x5',price:325000,texture:'Bone straight (silk strands)',color:'Natural black',parting:'Middle part',grams:200,grade:'SDD'},
{id:7, img:'p7.jpg', cat:'Bone Straight',name:'22" Bone Straight Wig',len:22,closure:'2x6',price:280000,texture:'Bone straight (silk strands)',color:'Natural black',parting:'Middle part',grams:200,grade:'SDD'},
{id:8, img:'p8.jpg', cat:'Bone Straight',name:'22" Bone Straight Wig',len:22,closure:'5x5',price:305000,texture:'Bone straight (silk strands)',color:'Natural black',parting:'Middle part',grams:200,grade:'SDD'},
{id:9, img:'p9.jpg', cat:'Bone Straight',name:'10" Bone Straight Wig',len:10,closure:'5x5',price:155000,texture:'Bone straight (silk strands)',color:'Natural black',parting:'Middle part',grams:200,grade:'SDD'},
{id:10,img:'p10.jpg',cat:'Bone Straight',name:'10" Bone Straight Wig',len:10,closure:'2x6',price:130000,texture:'Bone straight (silk strands)',color:'Natural black',parting:'Middle part',grams:200,grade:'SDD'},
/* ← add new products above this line */
];
const WA='2349136339959'; // MJ's WhatsApp number (234 + number without the leading 0)
/* ===================================================================== */
const P=PRODUCTS.sort((a,b)=>a.cat.localeCompare(b.cat)||a.len-b.len||a.price-b.price);
const img=p=>`assets/${p.img}`;
const F=n=>'₦'+n.toLocaleString('en-NG');
const get=()=>JSON.parse(localStorage.getItem('mjcart')||'[]');
const save=c=>{localStorage.setItem('mjcart',JSON.stringify(c));paint()};
const find=id=>P.find(p=>p.id==id),lab=p=>`${p.name} · ${p.closure} closure`;
const toast=m=>{let t=document.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.append(t)}t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)};
function add(id){const c=get(),i=c.find(x=>x.id==id);i?i.q++:c.push({id,q:1});save(c);toast('Added to your cart ✦')}
function chg(id,d){let c=get();c.find(x=>x.id==id).q+=d;save(c.filter(x=>x.q>0))}
const sub=()=>get().reduce((s,i)=>s+find(i.id).price*i.q,0);
const ONO='MJ-'+new Date().toISOString().slice(5,10).replace('-','')+'-'+Math.floor(1000+Math.random()*9000);
function paint(){
 const n=get().reduce((s,i)=>s+i.q,0);document.querySelectorAll('.cc').forEach(e=>e.textContent=n);
 const it=document.getElementById('items');
 if(it){it.innerHTML=get().map(i=>{const p=find(i.id);return`<div class="line"><div>${p.name}<br><small>${p.closure} closure · ${F(p.price)}</small></div><div class="qty"><button onclick="chg(${p.id},-1)">−</button> ${i.q} <button onclick="chg(${p.id},1)">+</button></div></div>`}).join('')||'<p style="opacity:.6;padding:20px 0">Your cart is empty, queen. 👑</p>';
 document.getElementById('sub').textContent=F(sub())}
 const so=document.getElementById('osum');
 if(so){so.innerHTML=`<div class="rno">ORDER ${ONO}</div>`+(get().map(i=>{const p=find(i.id);return`<div class="line"><span>${lab(p)} × ${i.q}</span><span>${F(p.price*i.q)}</span></div>`}).join('')||'<p style="opacity:.6">Your cart is empty.</p>')+`<div class="line"><span>Delivery</span><span>Confirmed on WhatsApp</span></div><div class="total"><span>Total</span><b class="gold">${F(sub())}</b></div>`}
}
let flt={cat:'All',len:'All'};
function chips(){const el=document.getElementById('chips');if(!el)return;
 const cats=[...new Set(P.map(p=>p.cat))],lens=[...new Set(P.map(p=>p.len))].sort((a,b)=>a-b);
 const row=(k,arr,fm,all)=>`<div class="chips">${['All',...arr].map(v=>`<button class="chip ${flt[k]==v?'on':''}" onclick="setF('${k}','${v}')">${v=='All'?all:fm(v)}</button>`).join('')}</div>`;
 el.innerHTML=(cats.length>1?row('cat',cats,v=>v,'All styles'):'')+row('len',lens,v=>v+'"','All lengths')}
function setF(k,v){flt[k]=v=='All'?'All':(k=='len'?+v:v);chips();shop()}
function shop(){const g=document.getElementById('grid');if(!g)return;
 g.innerHTML=P.filter(p=>(flt.cat=='All'||p.cat==flt.cat)&&(flt.len=='All'||p.len==flt.len)).map(p=>`<div class="card reveal"><div class="pimg" onclick="view(${p.id})" style="background:url('${img(p)}') center/cover"><div class="tag">${p.grade}</div></div><div class="pbody"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><h3 onclick="view(${p.id})">${p.name}</h3><span class="cl">${p.closure}</span></div><p class="spec">Human hair · ${p.parting}<br>${p.color} · ${p.grams}g</p><div class="prow"><span class="price">${F(p.price)}</span><button class="add" onclick="add(${p.id})" title="Add to cart">+</button></div></div></div>`).join('');obs()}
function view(id){const p=find(id),o=P.find(x=>x.len==p.len&&x.cat==p.cat&&x.id!=p.id);
 let m=document.getElementById('modal');if(!m){m=document.createElement('div');m.id='modal';m.onclick=e=>{if(e.target==m)closeM()};document.body.append(m)}
 const r=(a,b)=>`<tr><td>${a}</td><td>${b}</td></tr>`,q=encodeURIComponent(`Hello MJ 👑 I'm interested in the ${lab(p)} (${F(p.price)}).`);
 m.innerHTML=`<div class="mbox"><button class="add mx" onclick="closeM()">×</button><div class="mimg" style="background:url('${img(p)}') center/cover"></div><div class="minfo"><p class="eyebrow">LUXE WITH MJ · ${p.grade}</p><h2>${p.name}</h2><div class="price big">${F(p.price)}</div><table>${r('Length',p.len+' inches')}${r('Hair type',p.hair||'Human hair')}${r('Texture',p.texture)}${r('Parting',p.parting)}${r('Colour',p.color)}${r('Closure',p.closure)}${r('Weight',p.grams+'g')}${r('Grade',p.grade)}</table>${o?`<p class="alt">Also in ${o.len}" with ${o.closure} closure: <a onclick="view(${o.id})">${F(o.price)} →</a></p>`:''}<div class="mbtns"><button class="btn" onclick="add(${p.id});closeM()">Add to cart</button><a class="btn ghost" target="_blank" href="https://wa.me/${WA}?text=${q}">Ask MJ</a></div></div></div>`;
 m.classList.add('open')}
function closeM(){const m=document.getElementById('modal');m&&m.classList.remove('open')}
document.addEventListener('keydown',e=>e.key=='Escape'&&closeM());
function obs(){const o=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add('in')),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>o.observe(e))}
function drawer(o){['drawer','shade'].forEach(i=>document.getElementById(i).classList.toggle('open',o))}
function order(e){e.preventDefault();if(!get().length)return toast('Your cart is empty');
 const f=new FormData(e.target);
 const msg=`Hello Luxe with MJ 👑\nI'd like to place an order.\n\nORDER ${ONO}\n`+get().map(i=>{const p=find(i.id);return`• ${lab(p)} × ${i.q} — ${F(p.price*i.q)}`}).join('\n')+`\n\nTotal (excl. delivery): ${F(sub())}\n\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nDelivery: ${f.get('addr')}, ${f.get('city')}`+(f.get('note')?`\nNote: ${f.get('note')}`:'')+`\n\nPlease confirm availability, delivery fee and your account details for payment. Thank you!`;
 window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,'_blank');
 const bk=window.go?"go('shop');return false":"";
 document.querySelector('.checkout').innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:10vh 0"><h1 class="script gold" style="font-size:4rem">Almost there, queen 👑</h1><p style="margin:18px auto 28px;max-width:480px;line-height:1.8">Your receipt is ready in WhatsApp. Send it, and MJ will confirm your wig, delivery fee and payment details.</p><a class="btn" href="shop.html" onclick="${bk}">Back to shop</a></div>`;
 localStorage.removeItem('mjcart');paint()}
function sparks(){for(let i=0;i<26;i++){const s=document.createElement('i');s.className='spark';s.style.cssText=`left:${Math.random()*100}vw;bottom:-10px;animation-duration:${5+Math.random()*7}s;animation-delay:${Math.random()*5}s`;document.body.append(s)}}
document.addEventListener('DOMContentLoaded',()=>{chips();shop();paint();obs();sparks()})
