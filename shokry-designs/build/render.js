const {chromium}=require('playwright');const fs=require('fs');
const posts=[
 {out:'shokry-24h.png',bg:'../src/bg-24h'+(process.argv[3]||'')+'.png',head:`<div class="kicker">الساعة 3 الفجر؟</div><div class="big">إحنا <em>صاحيين</em></div><div class="pill">مفتوحين 24 ساعة</div>`},
 {out:'shokry-delivery.png',bg:'../src/bg-delivery'+(process.argv[3]||'')+'.png',head:`<div class="kicker">دواك يوصلك</div><div class="big">لحد باب <em>بيتك</em></div><div class="pill">ابعت الروشتة واتساب</div>`},
];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:1});
const tpl=fs.readFileSync(process.argv[2]||'post.html','utf8');
for(const x of posts){fs.writeFileSync('tmp.html',tpl.replace('BG',x.bg).replace('HEAD',x.head));
await p.goto('file://'+process.cwd()+'/tmp.html',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
await p.screenshot({path:'../'+x.out.replace('.png',(process.argv[3]||'')+'.png')});}
await b.close();})();
