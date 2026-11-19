document.addEventListener('DOMContentLoaded',function(){
  var t=document.getElementById('navToggle'),d=document.getElementById('navDrawer'),c=document.getElementById('navClose');
  if(t&&d)t.addEventListener('click',function(){d.classList.add('open');});
  if(c&&d)c.addEventListener('click',function(){d.classList.remove('open');});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&d)d.classList.remove('open');});
  // FAQ / accordion
  document.querySelectorAll('[data-faq]').forEach(function(it){
    var q=it.querySelector('[data-faq-trig]');
    if(q)q.addEventListener('click',function(){it.classList.toggle('open');});
  });
  // bundle tiers
  document.querySelectorAll('[data-tier]').forEach(function(tr){
    tr.addEventListener('click',function(){
      document.querySelectorAll('[data-tier]').forEach(function(x){x.classList.remove('sel');});
      tr.classList.add('sel');
      var r=tr.querySelector('input[type=radio]');if(r)r.checked=true;
      var vid=tr.getAttribute('data-variant'),hid=document.getElementById('pdpVariantId');
      if(vid&&hid)hid.value=vid;
      var pr=tr.getAttribute('data-price');
      var ap=document.getElementById('atcPrice');
      if(pr&&ap)ap.textContent=pr;
      if(pr)document.querySelectorAll('.jsBuyPrice').forEach(function(bp){bp.textContent=pr;});
    });
  });
  // review carousel (always moving)
  document.querySelectorAll('.revs').forEach(function(r){
    if(r.querySelector('.revs__track'))return;
    var tr=document.createElement('div');tr.className='revs__track';
    while(r.firstChild){tr.appendChild(r.firstChild);}
    tr.innerHTML=tr.innerHTML+tr.innerHTML;
    r.appendChild(tr);
  });
  // init default (pre-selected) bundle
  (function(){var s=document.querySelector("[data-tier].sel");if(s){var v=s.getAttribute("data-variant"),p=s.getAttribute("data-price"),h=document.getElementById("pdpVariantId");if(v&&h)h.value=v;if(p){var a=document.getElementById("atcPrice");if(a)a.textContent=p;document.querySelectorAll(".jsBuyPrice").forEach(function(b){b.textContent=p;});}}})();
  // subscribe toggle -> selling plan
  var st=document.getElementById("subToggle"),sf=document.getElementById("subFreq"),sp=document.getElementById("sellingPlanInput");
  if(st&&sp){
    function syncSP(){ if(st.checked){ if(sf)sf.hidden=false; var r=document.querySelector("input[name=selling_plan_opt]:checked"); sp.value=r?r.value:""; } else { if(sf)sf.hidden=true; sp.value=""; } }
    st.addEventListener("change",syncSP);
    document.querySelectorAll("input[name=selling_plan_opt]").forEach(function(x){x.addEventListener("change",syncSP);});
  }
  // sticky ATC
  var buy=document.getElementById('buy'),bar=document.getElementById('stickyAtc');
  if(buy&&bar&&'IntersectionObserver'in window){
    new IntersectionObserver(function(e){bar.classList.toggle('show',!e[0].isIntersecting&&e[0].boundingClientRect.top<0);},{threshold:0}).observe(buy);
  }
});


// Keep the subscription schedule and displayed price in sync with the bundle.
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.getElementById("subToggle");
  var frequency = document.getElementById("subFreq");
  var planInput = document.getElementById("sellingPlanInput");
  var form = document.getElementById("pdpForm");
  if (!toggle || !frequency || !planInput || !form) return;
  var tiers = Array.from(form.querySelectorAll("[data-tier]"));
  var plans = Array.from(form.querySelectorAll("input[name=selling_plan_opt]"));
  function syncBundleSubscription(matchBundle) {
    var tier = form.querySelector("[data-tier].sel");
    var index = Math.max(0, tiers.indexOf(tier));
    if (matchBundle && plans[index]) plans[index].checked = true;
    var selected = form.querySelector("input[name=selling_plan_opt]:checked");
    var subscribed = toggle.checked && !!selected;
    frequency.hidden = !toggle.checked;
    frequency.style.display = toggle.checked ? "grid" : "none";
    planInput.value = subscribed ? selected.value : "";
    if (!tier) return;
    var base = Number(tier.getAttribute("data-price").replace(/[^0-9.]/g, ""));
    if (!Number.isFinite(base)) return;
    var cents = Math.round(base * 100);
    if (subscribed) cents = Math.round(cents * 0.85);
    var price = "$" + (cents / 100).toFixed(2);
    document.querySelectorAll(".jsBuyPrice, #atcPrice").forEach(function (element) {
      element.textContent = price;
    });
  }
  tiers.forEach(function (tier) {
    tier.addEventListener("click", function () { syncBundleSubscription(true); });
  });
  toggle.addEventListener("change", function () { syncBundleSubscription(true); });
  plans.forEach(function (plan) {
    plan.addEventListener("change", function () { syncBundleSubscription(false); });
  });
  syncBundleSubscription(true);
});
