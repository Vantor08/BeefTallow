(function(){
  var VARI={solo:45832052572336,duo:45834774184112,trio:45834774216880};
  var CMP={}; CMP[VARI.solo]=4900; CMP[VARI.duo]=9800; CMP[VARI.trio]=14700;
  var HERO="https://cdn.shopify.com/s/files/1/0716/5411/3456/files/c6b959837_product-hero.png?v=1795057318";
  var JAR="https://cdn.shopify.com/s/files/1/0716/5411/3456/files/3fc99126b_product-open.png?v=1795057318";
  var MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  function money(c){return "$"+(c/100).toFixed(2);}
  function etaStr(){var a=new Date(Date.now()+7*864e5),b=new Date(Date.now()+9*864e5);
    if(a.getMonth()===b.getMonth())return MON[a.getMonth()]+" "+a.getDate()+"–"+b.getDate();
    return MON[a.getMonth()]+" "+a.getDate()+"–"+MON[b.getMonth()]+" "+b.getDate();}
  function getCart(){return fetch("/cart.js",{headers:{"Accept":"application/json"}}).then(function(r){return r.json();});}
  function addVariant(id,q,sp){var b={id:id,quantity:q};if(sp)b.selling_plan=sp;
    return fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(b)});}
  function changeLine(key,q){return fetch("/cart/change.js",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({id:key,quantity:q})});}

  var ov,dr,tick;
  function build(){
    var s=document.createElement("style");
    s.textContent='.vcart-ov{position:fixed;inset:0;background:rgba(10,6,3,.55);opacity:0;visibility:hidden;transition:.25s;z-index:200}.vcart-ov.open{opacity:1;visibility:visible}.vcart{position:fixed;top:0;right:0;height:100%;width:min(430px,94vw);background:#1b120b;color:#f3e9d7;transform:translateX(100%);transition:transform .3s cubic-bezier(.4,0,.2,1);z-index:201;display:flex;flex-direction:column;font-family:Inter,system-ui,sans-serif}.vcart.open{transform:translateX(0)}.vcart__in{display:flex;flex-direction:column;height:100%;overflow-y:auto;padding:22px 20px 20px}.vcart__hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}.vcart__hd h3{font-family:Fraunces,Georgia,serif;font-size:1.5rem;color:#fff;margin:0}.vcart__x{background:none;border:1px solid rgba(255,255,255,.25);color:#f3e9d7;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:1rem}.vcart__ship{margin-bottom:16px}.vcart__ship b{color:#d6a45a;font-size:.9rem;display:flex;align-items:center;gap:6px}.vcart__bar{height:6px;border-radius:99px;background:rgba(255,255,255,.12);margin:8px 0 5px;overflow:hidden}.vcart__bar span{display:block;height:100%;background:linear-gradient(90deg,#c08f45,#e0b069);border-radius:99px;transition:width .3s}.vcart__ship small{color:#b9ab96;font-size:.76rem}.vcart__card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:14px;margin-bottom:14px;display:flex;gap:12px}.vcart__card img{width:72px;height:72px;border-radius:10px;object-fit:cover;flex:0 0 72px}.vcart__ci{flex:1}.vcart__ci h4{font-family:Fraunces,Georgia,serif;font-size:1.05rem;color:#fff;margin:0}.vcart__ci .vt{color:#b9ab96;font-size:.82rem;margin:1px 0 6px}.vcart__pr{display:flex;align-items:center;gap:8px;margin-bottom:10px}.vcart__pr b{color:#fff;font-size:1rem}.vcart__pr s{color:#8a7c68;font-size:.84rem}.vcart__qty{display:inline-flex;align-items:center;gap:14px}.vcart__qty button{width:26px;height:26px;border-radius:50%;border:none;background:rgba(255,255,255,.12);color:#f3e9d7;cursor:pointer;font-size:1rem;line-height:1}.vcart__rm{margin-left:auto;background:none;border:none;color:#8a7c68;cursor:pointer}.vcart__div{text-align:center;color:#d6a45a;font-size:.7rem;font-weight:700;letter-spacing:.12em;margin:4px 0 10px;display:flex;align-items:center;gap:8px;justify-content:center}.vcart__timer{display:flex;justify-content:center;gap:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px;text-align:center;color:#e8dcc8;font-size:.78rem;font-weight:600;margin-bottom:12px}.vcart__timer b{color:#fff}.vcart__up{border:1px solid #6a4e2a;border-radius:12px;padding:12px;display:flex;gap:10px;align-items:center;margin-bottom:16px}.vcart__up img{width:52px;height:52px;border-radius:8px;object-fit:cover}.vcart__up .vt2{flex:1}.vcart__up .vt2 b{color:#fff;font-size:.92rem;display:flex;align-items:center;gap:5px}.vcart__up .vt2 span{color:#b9ab96;font-size:.76rem}.vcart__up .bf{display:inline-block;background:#20140d;border:1px solid #6a4e2a;color:#e8dcc8;font-size:.56rem;font-weight:700;padding:2px 7px;border-radius:5px;margin-top:4px}.vcart__up .vpr{text-align:right}.vcart__up .vpr b{color:#d6a45a;display:block}.vcart__up .vpr s{color:#8a7c68;font-size:.76rem}.vcart__up .vpr button{margin-top:4px;background:none;border:none;color:#d6a45a;font-weight:700;font-size:.72rem;cursor:pointer;letter-spacing:.06em}.vcart__foot{margin-top:auto}.vcart__sub{display:flex;justify-content:space-between;align-items:center;font-size:.95rem;margin-bottom:12px}.vcart__sub b{font-size:1.5rem;color:#fff}.vcart__save{background:rgba(192,143,69,.14);border:1px solid rgba(192,143,69,.3);border-radius:10px;padding:9px;text-align:center;color:#e0b069;font-size:.82rem;font-weight:600;margin-bottom:10px}.vcart__eta{text-align:center;color:#b9ab96;font-size:.78rem;margin-bottom:12px}.vcart__eta b{color:#f3e9d7}.vcart__co{display:block;width:100%;background:linear-gradient(180deg,#c08f45,#a9772f);color:#fff;border:none;border-radius:99px;padding:16px;font-size:1.05rem;font-weight:700;cursor:pointer;text-align:center}.vcart__res{text-align:center;color:#b9ab96;font-size:.78rem;border:1px solid rgba(255,255,255,.1);border-radius:99px;padding:9px;margin-top:8px}.vcart__res b{color:#e0b069}.vcart__secure{text-align:center;color:#8a7c68;font-size:.72rem;margin-top:10px}.vcart__empty{text-align:center;color:#b9ab96;padding:50px 0}';
    document.head.appendChild(s);
    ov=document.createElement("div");ov.className="vcart-ov";
    dr=document.createElement("aside");dr.className="vcart";dr.innerHTML='<div class="vcart__in" id="vcartIn"></div>';
    document.body.appendChild(ov);document.body.appendChild(dr);
    ov.addEventListener("click",closeCart);
    dr.addEventListener("click",function(e){
      var t=e.target.closest("[data-act]");if(!t)return;
      var act=t.getAttribute("data-act");
      if(act==="close")return closeCart();
      if(act==="checkout"){window.location.href="/checkout";return;}
      if(act==="inc"||act==="dec"){var k=t.getAttribute("data-key"),q=+t.getAttribute("data-q");changeLine(k,Math.max(0,act==="inc"?q+1:q-1)).then(getCart).then(render);return;}
      if(act==="rm"){changeLine(t.getAttribute("data-key"),0).then(getCart).then(render);return;}
      if(act==="upgrade"){doUpgrade();return;}
    });
  }
  function timerMs(){var e=+localStorage.getItem("vlCartTimer");var n=Date.now();if(!e||e<n){e=n+600000;localStorage.setItem("vlCartTimer",e);}return e-n;}
  function fmt(ms){var s=Math.max(0,Math.floor(ms/1000));var m=Math.floor(s/60),ss=s%60;return (m<10?"0":"")+m+":"+(ss<10?"0":"")+ss;}
  function startTick(){stopTick();tick=setInterval(function(){var t=fmt(timerMs());document.querySelectorAll(".vclock").forEach(function(x){x.textContent=t;});},1000);}
  function stopTick(){if(tick){clearInterval(tick);tick=null;}}

  function render(cart){
    var el=document.getElementById("vcartIn");if(!el)return;
    if(!cart||cart.item_count===0){
      el.innerHTML='<div class="vcart__hd"><h3>Your Cart</h3><button class="vcart__x" data-act="close">✕</button></div><div class="vcart__empty">Your cart is empty.</div>';
      return;
    }
    var sub=cart.total_price, hasTrio=false, cmpTotal=0;
    cart.items.forEach(function(it){ if(it.id===VARI.trio)hasTrio=true; var c=CMP[it.id]?CMP[it.id]*it.quantity:it.original_line_price; cmpTotal+=c; });
    var save=cmpTotal-sub;
    var need=4500-sub, pct=Math.min(100,Math.round(sub/4500*100));
    var ship=need<=0?'<b>🚚 You’ve unlocked free shipping!</b>':'<b>🚚 You’re '+money(need)+' away from free shipping</b>';
    var items=cart.items.map(function(it){
      var img=it.image||HERO;
      var cmp=CMP[it.id]?'<s>'+money(CMP[it.id]*it.quantity)+'</s>':'';
      return '<div class="vcart__card"><img src="'+img+'" alt=""><div class="vcart__ci"><h4>'+it.product_title+'</h4><div class="vt">'+(it.variant_title||"")+'</div><div class="vcart__pr"><b>'+money(it.final_line_price)+'</b>'+cmp+'</div><div class="vcart__qty"><button data-act="dec" data-key="'+it.key+'" data-q="'+it.quantity+'">−</button><span>'+it.quantity+'</span><button data-act="inc" data-key="'+it.key+'" data-q="'+it.quantity+'">+</button><button class="vcart__rm" data-act="rm" data-key="'+it.key+'">🗑</button></div></div></div>';
    }).join("");
    var upsell=hasTrio?'':'<div class="vcart__div">★ UPGRADE &amp; SAVE EVEN MORE</div><div class="vcart__timer">⏱ BLACK FRIDAY OFFER EXPIRES IN <b class="vclock">'+fmt(timerMs())+'</b></div><div class="vcart__up"><img src="'+JAR+'" alt=""><div class="vt2"><b>✨ The Trio</b><span>3 jars · Save $87</span><br><span class="bf">BLACK FRIDAY · 50% OFF</span></div><div class="vpr"><b>$59.99</b><s>$147.00</s><br><button data-act="upgrade">UPGRADE</button></div></div>';
    var saveRow=save>0?'<div class="vcart__save">🎉 You’re saving '+money(save)+' on this order!</div>':'';
    el.innerHTML=
      '<div class="vcart__hd"><h3>Your Cart</h3><button class="vcart__x" data-act="close">✕</button></div>'+
      '<div class="vcart__ship">'+ship+'<div class="vcart__bar"><span style="width:'+pct+'%"></span></div><small>Free shipping on orders over $45</small></div>'+
      items+upsell+
      '<div class="vcart__foot"><div class="vcart__sub"><span>Subtotal</span><b>'+money(sub)+'</b></div>'+saveRow+
      '<div class="vcart__eta">🚚 Order today, arrives by <b>'+etaStr()+'</b></div>'+
      '<button class="vcart__co" data-act="checkout">Checkout — '+money(sub)+'</button>'+
      '<div class="vcart__res">Reserved for <b class="vclock">'+fmt(timerMs())+'</b> — secure today’s offer.</div>'+
      '<div class="vcart__secure">🔒 Secure · 60-Day Guarantee · Free Shipping Over $45</div></div>';
    startTick();
  }
  function doUpgrade(){
    addVariant(VARI.trio,1).then(getCart).then(function(c){
      var ps=[];c.items.forEach(function(it){if(it.id===VARI.solo||it.id===VARI.duo)ps.push(changeLine(it.key,0));});
      return Promise.all(ps);
    }).then(getCart).then(render);
  }
  function openCart(){getCart().then(function(c){render(c);ov.classList.add("open");dr.classList.add("open");document.body.style.overflow="hidden";});}
  function closeCart(){ov.classList.remove("open");dr.classList.remove("open");document.body.style.overflow="";stopTick();}

  document.addEventListener("DOMContentLoaded",function(){
    build();
    document.addEventListener("submit",function(e){
      var f=e.target;if(f&&f.getAttribute&&(f.getAttribute("action")||"").indexOf("/cart/add")>-1){
        e.preventDefault();
        fetch("/cart/add.js",{method:"POST",body:new FormData(f),headers:{"X-Requested-With":"XMLHttpRequest"}}).then(function(){openCart();}).catch(function(){f.submit();});
      }
    },true);
    document.addEventListener("click",function(e){
      var a=e.target.closest("a");if(!a)return;var h=a.getAttribute("href")||"";
      if(h==="/cart"||h==="#cart"||/\/cart$/.test(h)){e.preventDefault();openCart();}
    });
  });
})();
