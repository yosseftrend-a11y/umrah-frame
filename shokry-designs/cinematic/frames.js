const {chromium}=require('playwright');const {spawn}=require('child_process');
const mode=process.argv[2];
(async()=>{const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1080,height:1920}});
await pg.goto('file://'+__dirname+'/public/film.html',{waitUntil:'networkidle'});await pg.evaluate(()=>document.fonts.ready);
if(mode==='stills'){for(const t of process.argv.slice(3)){await pg.evaluate(t=>render(+t),t);await pg.screenshot({path:`/tmp/claude-0/-home-user-umrah-frame/7113c780-eb0b-5cb1-a21f-f07eeff20830/scratchpad/st_${t}.jpg`,type:'jpeg',quality:70});}}
else{const fps=30,N=30*fps;const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','18','-preset','medium','video.mp4'],{stdio:['pipe','inherit','inherit']});
for(let i=0;i<N;i++){await pg.evaluate(t=>render(t),i/fps);const buf=await pg.screenshot({type:'jpeg',quality:92});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));}
ff.stdin.end();await new Promise(r=>ff.on('close',r));}
await b.close();})();
