const P=[
{id:1,n:'Bone Straight 28" HD Lace',c:'Straight',p:185000,t:'Bestseller'},
{id:2,n:'Silk Press Frontal 24"',c:'Straight',p:142000},
{id:3,n:'Deep Wave 26" Glueless',c:'Curly',p:168000,t:'New'},
{id:4,n:'Water Wave 22" Closure Wig',c:'Curly',p:125000},
{id:5,n:'Honey Blonde 613 Frontal 26"',c:'Colored',p:210000,t:'Luxe'},
{id:6,n:'Burgundy Bob 12" Lace',c:'Bobs',p:78000},
{id:7,n:'Pixie Curl Bob 10"',c:'Bobs',p:65000},
{id:8,n:'Lace Melting Care Kit',c:'Care',p:28000}];
const F=n=>'₦'+n.toLocaleString('en-NG');
const get=()=>JSON.parse(localStorage.getItem('mjcart')||'[]');
const save=c=>{localStorage.setItem('mjcart',JSON.stringify(c));paint()};
const toast=m=>{let t=document.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.append(t)}t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)};
function add(id){const c=get(),i=c.find(x=>x.id==id);i?i.q++:c.push({id,q:1});save(c);toast('Added to your bag ✦')}
function chg(id,d){let c=get();const i=c.find(x=>x.id==id);i.q+=d;c=c.filter(x=>x.q>0);save(c)}
const sub=()=>get().reduce((s,i)=>s+P.find(p=>p.id==i.id).p*i.q,0);
function paint(){
 const n=get().reduce((s,i)=>s+i.q,0);document.querySelectorAll('.cc').forEach(e=>e.textContent=n);
 const it=document.getElementById('items');
 if(it){it.innerHTML=get().map(i=>{const p=P.find(x=>x.id==i.id);return`<div class="line"><div>${p.n}<br><small>${F(p.p)}</small></div><div class="qty"><button onclick="chg(${p.id},-1)">−</button> ${i.q} <button onclick="chg(${p.id},1)">+</button></div></div>`}).join('')||'<p style="opacity:.6;padding:20px 0">Your bag is empty, queen. 👑</p>';
 document.getElementById('sub').textContent=F(sub())}
 const so=document.getElementById('osum');
 if(so){const fee=+document.getElementById('ship').value;so.innerHTML=get().map(i=>{const p=P.find(x=>x.id==i.id);return`<div class="line"><span>${p.n} × ${i.q}</span><span>${F(p.p*i.q)}</span></div>`}).join('')+`<div class="line"><span>Delivery</span><span>${F(fee)}</span></div><div class="total"><span>Total</span><b class="gold">${F(sub()+fee)}</b></div>`}
}
function shop(f='All'){const g=document.getElementById('grid');if(!g)return;
 g.innerHTML=P.filter(p=>f=='All'||p.c==f).map(p=>`<div class="card reveal"><div class="pimg" style="background:url(assets/p${p.id}.jpg),linear-gradient(160deg,#5a2f12,#1c0d04)"><span>👑</span>${p.t?`<div class="tag">${p.t}</div>`:''}</div><div class="pbody"><small>${p.c.toUpperCase()}</small><h3>${p.n}</h3><div class="prow"><span class="price">${F(p.p)}</span><button class="add" onclick="add(${p.id})">+</button></div></div></div>`).join('');obs()}
function obs(){const o=new IntersectionObserver(e=>e.forEach(x=>x.isIntersecting&&x.target.classList.add('in')),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>o.observe(e))}
function drawer(o){['drawer','shade'].forEach(i=>document.getElementById(i).classList.toggle('open',o))}
function chip(b,f){document.querySelectorAll('.chip').forEach(c=>c.classList.remove('on'));b.classList.add('on');shop(f)}
const WA='2340000000000'; // TODO: replace with MJ's WhatsApp number (234 + number without 0)
function order(e){e.preventDefault();const f=new FormData(e.target),fee=+f.get('ship'),tot=sub()+fee;
 if(!get().length)return toast('Your bag is empty');
 const done=()=>{localStorage.removeItem('mjcart');document.querySelector('.checkout').innerHTML='<div style="grid-column:1/-1;text-align:center;padding:12vh 0"><h1 class="script gold" style="font-size:4rem">Thank you, queen 👑</h1><p style="margin:18px 0 28px">Your order is confirmed. MJ will reach out shortly.</p><a class="btn" href="shop.html">Continue shopping</a></div>'};
 const msg=`Hello Luxe with MJ 👑%0AOrder for ${f.get('name')}%0A`+get().map(i=>{const p=P.find(x=>x.id==i.id);return`• ${p.n} x${i.q}`}).join('%0A')+`%0ADelivery: ${f.get('addr')}, ${f.get('city')} (${F(fee)})%0ATotal: ${F(tot)}%0APhone: ${f.get('phone')}`;
 const m=f.get('pay');
 if(m=='paystack'&&window.PaystackPop){PaystackPop.setup({key:'pk_test_REPLACE_ME',email:f.get('email'),amount:tot*100,currency:'NGN',callback:()=>done(),onClose:()=>toast('Payment cancelled')}).openIframe()}
 else{window.open(`https://wa.me/${WA}?text=${msg}`,'_blank');done()}}
function sparks(){for(let i=0;i<26;i++){const s=document.createElement('i');s.className='spark';s.style.cssText=`left:${Math.random()*100}vw;bottom:-10px;animation-duration:${5+Math.random()*7}s;animation-delay:${Math.random()*5}s`;document.body.append(s)}}
document.addEventListener('DOMContentLoaded',()=>{shop();paint();obs();sparks();
 const s=document.getElementById('ship');if(s)s.onchange=paint})
