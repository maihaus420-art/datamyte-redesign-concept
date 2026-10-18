(function(){
var KB=[
{k:['price','pricing','cost','plan','how much','\\$'],a:'Digital Clipboard plans start at $19 per user/month (Self-Managed) and $39 per user/month (Professional), billed annually. Enterprise is priced by DataMyte sales. <a href="https://datamyte.com/pricing/">See pricing</a>'},
{k:['trial','free','try','sign up','signup'],a:'You can try any plan free for 14 days, no obligation. <a href="https://datamyte.com/digital-clipboard-sign-up/">Start a free trial</a>'},
{k:['demo','sales','talk','contact','call','quote'],a:'A DataMyte rep can walk you through it. <a href="https://datamyte.com/contact-us/">Request a demo</a>, call 1-800-455-4359, or email info@datamyte.com.'},
{k:['ai','convert','compose','prompt','paper','form'],a:'CONVERT-ai turns uploaded paper forms, images or Office documents into workflows. Compose-ai builds a workflow from a plain-language prompt.'},
{k:['security','iso','27001','secure','compliance'],a:'The information security management system behind Digital Clipboard is certified to ISO/IEC 27001:2022 (announced July 2026). <a href="https://datamyte.com/press/datamyte-achieves-iso-iec-270012022-certification-for-its-digital-clipboard-platform/">Read the announcement</a>'},
{k:['apqp','fmea','ppap','qps','oem','automotive'],a:'QPS PRO covers digital APQP, PFMEA and DFMEA, and includes a Digital Clipboard license. <a href="https://datamyte.com/qps-pro/">Learn about QPS PRO</a>'},
{k:['spc','datametrics','statistic'],a:'DataMetrics is DataMyte\u2019s SPC software, with control limits and trend analysis. <a href="https://datamyte.com/datamyte-datametrics/">Learn about DataMetrics</a>'},
{k:['torque','wrench','lightstar','gauge','collector','revolution','hardware'],a:'DataMyte hardware includes LightStar torque wrenches (including an EV wrench), Revolution data collectors (with a free Digital Clipboard license on every device) and dimensional gauges. <a href="https://datamyte.com/lightstar/">LightStar</a> · <a href="https://datamyte.com/revolution/">Revolution</a>'},
{k:['integrat','api','erp','mes','power bi','tableau','export','excel'],a:'Digital Clipboard exports to Excel with images, connects to Power BI and Tableau, and can call REST APIs from workflows to send data to your own systems. <a href="https://datamyte.com/digital-clipboard-expert/">Reporting details</a>'},
{k:['template','checklist','inspection','audit','lpa','gemba','use case'],a:'There are 10,000+ templates for inspections, quality audits, layered process audits, error proofing, safety, work instructions, Gemba walks and more. DataMyte will also digitize one of your forms for you.'},
{k:['customer','who uses','brands','clients'],a:'DataMyte says it serves over 1,000 manufacturers, including Ford, Boston Scientific, Northrop Grumman, Stellantis, Boeing, Tesla, GM, PepsiCo and Foxconn.'},
{k:['where','office','located','address','support','help'],a:'DataMyte is headquartered at 2800 Campus Dr, Suite 60, Plymouth, MN, with offices in India, Brazil and Germany. Tech support: TechSupport@datamyte.com. <a href="https://datamyte.com/contact-us/">All contacts</a>'}
];
var chips=['Pricing','Free trial','What does the AI do?','Is it secure?','Request a demo'];
var btn=document.getElementById('chatbtn'),box=document.getElementById('chat'),log=document.getElementById('log'),f=document.getElementById('chatf'),q=document.getElementById('q'),x=document.getElementById('chatx'),cw=document.getElementById('chips');
function add(t,who,html){var p=document.createElement('p');p.className='m '+who;if(html)p.innerHTML=t;else p.textContent=t;log.appendChild(p);log.scrollTop=log.scrollHeight;}
function answer(s){var l=s.toLowerCase(),best=null,score=0;KB.forEach(function(e){var n=0;e.k.forEach(function(k){if(new RegExp(k).test(l))n++;});if(n>score){score=n;best=e;}});
 return best?best.a:'I can only answer from DataMyte\u2019s public pages in this demo. Try asking about pricing, the free trial, AI features or security, or <a href="https://datamyte.com/contact-us/">talk to a DataMyte rep</a>.';}
function ask(s){if(!s.trim())return;add(s,'u');setTimeout(function(){add(answer(s),'b',true);},250);}
var started=false;
function open(){box.classList.add('open');btn.setAttribute('aria-expanded','true');if(!started){started=true;add('Hi! Ask me about Digital Clipboard: pricing, the 14-day trial, AI features or security.','b');chips.forEach(function(c){var b=document.createElement('button');b.type='button';b.textContent=c;b.onclick=function(){ask(c);};cw.appendChild(b);});}q.focus();}
function close(){box.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.focus();}
btn.onclick=function(){box.classList.contains('open')?close():open();};x.onclick=close;
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&box.classList.contains('open'))close();});
f.onsubmit=function(e){e.preventDefault();var s=q.value;q.value='';ask(s);};
})();
