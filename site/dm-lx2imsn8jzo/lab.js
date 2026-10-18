/* chrismai.ai concept lab components: SPC/EWMA chart, live latency probe, ROI model. No dependencies. */
(function(){
var P='/dm-lx2imsn8jzo/';
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return [].slice.call((r||document).querySelectorAll(s))}
function fmt(n,d){return n.toLocaleString('en-US',{minimumFractionDigits:d||0,maximumFractionDigits:d||0})}
function idle(f){(window.requestIdleCallback||function(c){setTimeout(c,200)})(f)}
var NS='http://www.w3.org/2000/svg';
function el(t,a,p){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}

/* ---------- SPC / EWMA on UCI SECOM signal #60 ---------- */
function spc(box){
  fetch(P+'data/secom-s60.json').then(function(r){return r.json()}).then(function(d){
    var v=d.v,pts=[],i;for(i=0;i<v.length;i++)if(v[i]!==null)pts.push([i,v[i]]);
    var p1=pts.filter(function(p){return p[0]<500}),mu=0;p1.forEach(function(p){mu+=p[1]});mu/=p1.length;
    var mr=0;for(i=1;i<p1.length;i++)mr+=Math.abs(p1[i][1]-p1[i-1][1]);mr/=(p1.length-1);var sg=mr/1.128;
    var lam=0.2,L=3,lim=L*sg*Math.sqrt(lam/(2-lam)),z=mu,zs=[],al=0,first=null,ial=0,n2=0;
    pts.forEach(function(p){z=lam*p[1]+(1-lam)*z;zs.push([p[0],z]);if(p[0]>=500){n2++;if(Math.abs(z-mu)>lim){al++;if(first===null)first=p[0]+1}if(Math.abs(p[1]-mu)>3*sg)ial++}});
    var K={mu:fmt(mu,2),sigma:fmt(sg,2),lim:'±'+fmt(lim,2),ewma:fmt(al)+' / '+fmt(n2),ichart:fmt(ial)+' / '+fmt(n2),first:'lot '+fmt(first),lots:fmt(v.length),valid:fmt(pts.length)};
    $$('[data-k]',box).forEach(function(e){if(K[e.dataset.k])e.textContent=K[e.dataset.k]});
    var host=$('.lab-svg',box);if(!host)return;
    var W=640,H=230,ml=44,mr2=10,mt=14,mb=30,lo=mu-lim*3.2,hi=mu+lim*3.2;
    zs.forEach(function(q){if(q[1]<lo)lo=q[1];if(q[1]>hi)hi=q[1]});
    var X=function(i){return ml+(i/(v.length-1))*(W-ml-mr2)},Y=function(y){return mt+(hi-y)/(hi-lo)*(H-mt-mb)};
    var s=el('svg',{viewBox:'0 0 '+W+' '+H,role:'img','aria-label':'EWMA control chart of UCI SECOM signal 60 over '+v.length+' lots: centre line '+K.mu+', limits '+K.lim+', '+K.ewma+' phase II points beyond the limits, first at '+K.first+'.'});
    el('rect',{x:X(0),y:mt,width:X(499)-X(0),height:H-mt-mb,class:'p1'},s);
    [[mu+lim,'UCL'],[mu,'CL'],[mu-lim,'LCL']].forEach(function(l){el('line',{x1:ml,x2:W-mr2,y1:Y(l[0]),y2:Y(l[0]),class:l[1]==='CL'?'cl':'lim'},s);var t=el('text',{x:ml-6,y:Y(l[0])+3,class:'ax','text-anchor':'end'},s);t.textContent=l[1]});
    var dn='',da='';zs.forEach(function(q,k){var c=(k?'L':'M')+X(q[0]).toFixed(1)+' '+Y(q[1]).toFixed(1);dn+=c});
    el('path',{d:dn,class:'ln'},s);
    zs.forEach(function(q){if(q[0]>=500&&Math.abs(q[1]-mu)>lim)da+='M'+X(q[0]).toFixed(1)+' '+Y(q[1]).toFixed(1)+'h.01'});
    el('path',{d:da,class:'al'},s);
    var fx=X(first-1),fy=Y(zs.filter(function(q){return q[0]===first-1})[0][1]);
    el('circle',{cx:fx,cy:fy,r:4.5,class:'fm'},s);
    var ft=el('text',{x:fx+8,y:mt+10,class:'an'},s);ft.textContent='first EWMA alarm · '+K.first;
    el('line',{x1:fx,x2:fx,y1:mt+13,y2:fy-5,class:'ld'},s);
    // dimension lines
    var dy=H-12;[[0,499,'phase I · 500 lots · limits estimated'],[500,v.length-1,'phase II · '+fmt(v.length-500)+' lots · monitored']].forEach(function(r){
      var a=X(r[0])+2,b=X(r[1])-2;el('path',{d:'M'+a+' '+(dy-4)+'v8M'+b+' '+(dy-4)+'v8M'+a+' '+dy+'H'+b,class:'dim'},s);
      var t=el('text',{x:(a+b)/2,y:dy-5,class:'ax','text-anchor':'middle'},s);t.textContent=r[2]});
    host.innerHTML='';host.appendChild(s);box.classList.add('ok');
  }).catch(function(){box.classList.add('err')});
}

/* ---------- live latency of this Worker's JSON-RPC demo endpoint ---------- */
function lat(e){
  var n=5,t=[],body='{"jsonrpc":"2.0","id":1,"method":"tools/list"}';
  (function go(){if(t.length>=n){t.sort(function(a,b){return a-b});e.textContent=fmt(t[(n-1)/2])+' ms';e.title='median of '+n+' sequential POST tools/list requests from your browser, measured just now';return}
    var s=performance.now();fetch(P+'agent/rpc',{method:'POST',headers:{'content-type':'application/json'},body:body,cache:'no-store'}).then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(){t.push(performance.now()-s);go()}).catch(function(){e.textContent='unavailable'})})();
}

/* ---------- ROI model (modeled assumptions, editable) ---------- */
var F=[
 ['n','Inspectors',10,1,'Modeled assumption'],
 ['apw','Audits per inspector per week',15,1,'Modeled assumption'],
 ['min','Minutes per paper audit',20,1,'Modeled assumption'],
 ['share','Share of audit time removed by digital capture (%)',25,1,'Modeled assumption: re-keying and filing; replace with pilot data'],
 ['rate','Loaded labor cost ($/h)',33.36,0.01,'BLS: $23.35 median hourly wage, inspectors/testers (SOC 51-9061, May 2025) ÷ 0.700 wage share of compensation (ECEC, private industry, Q2 2026)'],
 ['fields','Recorded fields per audit',25,1,'Modeled assumption'],
 ['err','Transcription error rate per field (%)',0.29,0.01,'Pooled single-entry error rate, 0.29% of fields (systematic review, clinical research data)'],
 ['cost','Cost per transcription error ($, rework or investigation)',25,1,'Modeled assumption, no public source; set your own'],
 ['seat','Seat price ($/user/month)',39,1,'DataMyte public pricing: Professional $39, Self-Managed $19 per user/month, billed annually'],
 ['wk','Working weeks per year',48,1,'Modeled assumption']
];
var SRC={rate:'https://www.bls.gov/oes/current/oes519061.htm',err:'https://pmc.ncbi.nlm.nih.gov/articles/PMC13078370/',seat:'https://datamyte.com/pricing/'};
var uid=0;
function roi(box){
  var id='roi'+(++uid),h='<form class="roi-f" novalidate>';
  F.forEach(function(f){var s=SRC[f[0]];h+='<label class="roi-i"><span class="roi-l">'+f[1]+'</span><input type="number" inputmode="decimal" min="0" step="'+f[3]+'" name="'+f[0]+'" value="'+f[2]+'"><span class="roi-s">'+(s?'<a href="'+s+'">'+f[4]+'</a>':f[4])+'</span></label>'});
  h+='</form><div class="roi-o" aria-live="polite"><div><span class="lab-k">Hours saved / yr</span><b data-o="h">–</b></div><div><span class="lab-k">Modeled savings / yr</span><b data-o="usd">–</b></div><div><span class="lab-k">Seat cost / yr</span><b data-o="seats">–</b></div><div><span class="lab-k">Payback on a year of seats</span><b data-o="pb">–</b></div></div>'+
   '<details class="roi-x"><summary>Show the formula</summary><pre>audits/yr   = inspectors × audits/week × weeks\nhours saved = audits/yr × minutes × share ÷ 60\nlabor $     = hours saved × loaded $/h\nerrors      = audits/yr × fields × error rate\nerror $     = errors × cost per error\nsavings     = labor $ + error $\nseats $/yr  = inspectors × seat price × 12\npayback (months) = seats $/yr ÷ (savings ÷ 12)</pre><p>Assumes digital capture at the point of inspection removes the separate re-keying step and its errors. Outputs are a model for discussion, not DataMyte results or any client\u2019s results. Not used as a default: Sandia (<a href="https://www.osti.gov/biblio/1055636">See 2012</a>) notes 20\u201330% error rates are frequently quoted for human visual inspection; that is a defect miss rate, not a data-entry rate.</p></details>';
  box.innerHTML=h;var f=$('form',box);
  function calc(){var MX={n:1e5,apw:1e4,min:1440,share:100,rate:1e4,fields:1e4,err:100,cost:1e7,seat:1e4,wk:53};var g=function(k){var x=parseFloat(f.elements[k].value);x=isFinite(x)&&x>=0?x:0;return Math.min(x,MX[k]||1e6)};
    var a=g('n')*g('apw')*g('wk'),hrs=a*g('min')*g('share')/100/60,lab=hrs*g('rate'),errs=a*g('fields')*g('err')/100,er=errs*g('cost'),sv=lab+er,se=g('n')*g('seat')*12,pb=sv>0?se/(sv/12):Infinity;
    var F=function(v,p){return isFinite(v)?(p||'')+fmt(v):'n/a'};$('[data-o=h]',box).textContent=F(hrs);$('[data-o=usd]',box).textContent=F(sv,'$');$('[data-o=seats]',box).textContent=F(se,'$');$('[data-o=pb]',box).textContent=isFinite(pb)?fmt(pb,1)+' mo':'n/a';}
  f.addEventListener('input',calc);f.addEventListener('submit',function(e){e.preventDefault()});calc();
}
function init(){$$('[data-roi]').forEach(roi);idle(function(){$$('[data-spc]').forEach(spc);var l=$('[data-lat]');if(l)setTimeout(function(){lat(l)},800)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
