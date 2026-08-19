
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut, setPersistence, browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  getFirestore, doc, getDoc, setDoc, collection, getDocs, addDoc, updateDoc,
  deleteDoc, query, orderBy, serverTimestamp, writeBatch
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { firebaseConfig, STUDENT_AUTH_DOMAIN } from "./firebase-config.js";

const A=document.getElementById("app");
const WORLDS={
 number:{name:"Number Forest",icon:"🌳",need:0,levels:[
  {id:"n1",name:"Gerbang Bilangan",icon:"🌿"},{id:"n2",name:"Jembatan Pola",icon:"🌉"},
  {id:"n3",name:"Gua Faktor",icon:"🪨"},{id:"n4",name:"Menara Negatif",icon:"🗼"},
  {id:"n5",name:"Stone Golem",icon:"🗿",boss:true}
 ]},
 fraction:{name:"Fraction Island",icon:"🏝️",need:8,levels:[
  {id:"f1",name:"Pantai Pecahan",icon:"🥥"},{id:"f2",name:"Pizza Fraction",icon:"🍕"},
  {id:"f3",name:"Jembatan Pecahan",icon:"🌁"},{id:"f4",name:"Pasar Diskon",icon:"🛍️"},
  {id:"f5",name:"Captain Percent",icon:"🏴‍☠️",boss:true}
 ]}
};
const DEFAULT_BANK=[{"id": "q001", "world": "number", "level": "n1", "difficulty": "easy", "question": "18 + 27 = ...", "choices": ["35", "45", "55", "46"], "answer": 1, "hint": "Pisahkan 27 menjadi 20 + 7."}, {"id": "q002", "world": "number", "level": "n1", "difficulty": "easy", "question": "64 - 29 = ...", "choices": ["35", "43", "45", "34"], "answer": 0, "hint": "Kurangi 30 lalu tambah 1."}, {"id": "q003", "world": "number", "level": "n1", "difficulty": "easy", "question": "7 × 8 = ...", "choices": ["48", "54", "56", "64"], "answer": 2, "hint": "Gunakan fakta perkalian."}, {"id": "q004", "world": "number", "level": "n2", "difficulty": "easy", "question": "2, 5, 8, 11, ...", "choices": ["12", "13", "14", "15"], "answer": 2, "hint": "Bertambah 3."}, {"id": "q005", "world": "number", "level": "n2", "difficulty": "easy", "question": "3, 6, 12, 24, ...", "choices": ["27", "36", "42", "48"], "answer": 3, "hint": "Setiap bilangan dikali 2."}, {"id": "q006", "world": "number", "level": "n3", "difficulty": "medium", "question": "FPB 18 dan 24 = ...", "choices": ["3", "6", "9", "12"], "answer": 1, "hint": "Cari faktor terbesar yang sama."}, {"id": "q007", "world": "number", "level": "n3", "difficulty": "medium", "question": "KPK 6 dan 8 = ...", "choices": ["12", "18", "24", "48"], "answer": 2, "hint": "Cari kelipatan terkecil yang sama."}, {"id": "q008", "world": "number", "level": "n4", "difficulty": "medium", "question": "-6 + 14 = ...", "choices": ["-20", "-8", "8", "20"], "answer": 2, "hint": "Bergerak ke kanan dari -6."}, {"id": "q009", "world": "number", "level": "n4", "difficulty": "medium", "question": "-36 ÷ -6 = ...", "choices": ["-6", "6", "-30", "30"], "answer": 1, "hint": "Negatif dibagi negatif = positif."}, {"id": "q010", "world": "number", "level": "n5", "difficulty": "hard", "question": "48 ÷ 6 + 7 × 3 = ...", "choices": ["29", "31", "35", "45"], "answer": 0, "hint": "Kerjakan bagi dan kali terlebih dahulu."}, {"id": "q011", "world": "number", "level": "n5", "difficulty": "hard", "question": "30% dari 150 = ...", "choices": ["35", "40", "45", "50"], "answer": 2, "hint": "10% dari 150 adalah 15."}, {"id": "q012", "world": "fraction", "level": "f1", "difficulty": "easy", "question": "1/2 sama dengan ...", "choices": ["2/3", "2/4", "3/4", "1/4"], "answer": 1, "hint": "Kalikan pembilang dan penyebut dengan 2."}, {"id": "q013", "world": "fraction", "level": "f1", "difficulty": "easy", "question": "3/4 dalam desimal = ...", "choices": ["0,25", "0,50", "0,75", "1,25"], "answer": 2, "hint": "3 ÷ 4."}, {"id": "q014", "world": "fraction", "level": "f2", "difficulty": "easy", "question": "Pizza 8 potong, dimakan 3. Sisa bagian pizza ...", "choices": ["3/8", "5/8", "5/3", "8/5"], "answer": 1, "hint": "Sisa 5 dari 8 bagian."}, {"id": "q015", "world": "fraction", "level": "f2", "difficulty": "easy", "question": "1/4 + 2/4 = ...", "choices": ["2/8", "3/4", "3/8", "1/2"], "answer": 1, "hint": "Jumlahkan pembilang karena penyebut sama."}, {"id": "q016", "world": "fraction", "level": "f3", "difficulty": "medium", "question": "1/2 + 1/3 = ...", "choices": ["2/5", "5/6", "2/6", "1"], "answer": 1, "hint": "Samakan penyebut menjadi 6."}, {"id": "q017", "world": "fraction", "level": "f3", "difficulty": "medium", "question": "3/4 ÷ 1/2 = ...", "choices": ["3/8", "2/3", "3/2", "1"], "answer": 2, "hint": "Kalikan dengan kebalikan."}, {"id": "q018", "world": "fraction", "level": "f4", "difficulty": "medium", "question": "Rp120.000 diskon 25%. Harga akhir ...", "choices": ["Rp80.000", "Rp90.000", "Rp95.000", "Rp100.000"], "answer": 1, "hint": "Diskonnya Rp30.000."}, {"id": "q019", "world": "fraction", "level": "f4", "difficulty": "medium", "question": "40% dari suatu bilangan = 32. Bilangannya ...", "choices": ["64", "72", "80", "96"], "answer": 2, "hint": "32 ÷ 0,4."}, {"id": "q020", "world": "fraction", "level": "f5", "difficulty": "hard", "question": "3/5 + 1/4 = ...", "choices": ["4/9", "17/20", "4/20", "7/10"], "answer": 1, "hint": "Gunakan penyebut 20."}, {"id": "q021", "world": "fraction", "level": "f5", "difficulty": "hard", "question": "15% dari 240 = ...", "choices": ["24", "30", "36", "40"], "answer": 2, "hint": "10%=24 dan 5%=12."}];

let fb=null,auth=null,db=null,user=null,profile=null,progress=null,BANK=[];
const configReady=()=>firebaseConfig.apiKey && !firebaseConfig.apiKey.includes("PASTE_") && firebaseConfig.projectId && !firebaseConfig.projectId.includes("PASTE_");
const studentEmail=nis=>`${String(nis).trim().toLowerCase().replace(/[^a-z0-9._-]/g,"")}@${STUDENT_AUTH_DOMAIN}`;
const isStaff=()=>profile && ["admin","teacher"].includes(profile.role);
const stars=()=>progress?Object.values(progress.stars||{}).reduce((a,b)=>a+(Number(b)||0),0):0;
const starText=n=>"⭐".repeat(n)+"☆".repeat(Math.max(0,3-n));
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));

function showSetup(){
 A.innerHTML=`<div class="auth"><div class="card">
 <h1>🔥 Firebase belum dikonfigurasi</h1>
 <p>File aplikasinya sudah siap. Isi <b>js/firebase-config.js</b> dengan Web App config project Firebase Anda.</p>
 <div class="notice"><b>Setelah itu:</b><br>1. Enable Authentication → Email/Password.<br>2. Buat Firestore Database.<br>3. Salin isi <b>firebase/firestore.rules</b> ke Rules dan Publish.</div>
 <p class="small">Jangan menaruh service-account/private key di GitHub. Firebase Web config memang dipakai oleh aplikasi web; keamanan data ditentukan oleh Authentication + Firestore Security Rules.</p>
 </div></div>`;
}
async function init(){
 if(!configReady()) return showSetup();
 try{
  fb=initializeApp(firebaseConfig); auth=getAuth(fb); db=getFirestore(fb);
  await setPersistence(auth,browserLocalPersistence);
  onAuthStateChanged(auth, async u=>{
   user=u;
   if(!u){profile=null;progress=null;BANK=[];renderAuth();return}
   try{
    const ps=await getDoc(doc(db,"users",u.uid));
    if(!ps.exists()){await signOut(auth); return renderAuth("Profil akun tidak ditemukan.");}
    profile={id:u.uid,...ps.data()};
    const pr=await getDoc(doc(db,"progress",u.uid));
    if(!pr.exists()){
      progress={xp:0,coin:0,stars:{},done:{},badges:[],updatedAt:null};
      await setDoc(doc(db,"progress",u.uid),progress);
    } else progress=pr.data();
    await loadQuestions(); home();
   }catch(e){console.error(e); renderFatal(e);}
  });
 }catch(e){console.error(e);renderFatal(e)}
}
function renderFatal(e){A.innerHTML=`<div class=auth><div class=card><h2>Terjadi kendala Firebase</h2><div class=error>${esc(e.message||e)}</div><p class=small>Periksa firebase-config.js, Authentication, Firestore, dan Rules.</p></div></div>`}
function renderAuth(msg=""){
 A.innerHTML=`<div class=auth><div class=card>
 <h1>∑ Math Adventure</h1><p>Firebase Online • v2.2</p>${msg?`<div class=error>${esc(msg)}</div>`:""}
 <div class=auth-switch><button class="btn dark" id=loginTab>Login</button><button class="btn soft" id=regTab>Daftar Siswa</button></div>
 <div id=authForm></div></div></div>`;
 loginTab.onclick=()=>loginForm();regTab.onclick=()=>registerForm();loginForm();
}
function loginForm(){
 authForm.innerHTML=`<label>NIS siswa atau email guru</label><input id=identity placeholder="Contoh: 12345 atau guru@email.com">
 <label>Password</label><input id=pw type=password minlength=6>
 <button class="btn dark" id=doLogin style="margin-top:12px;width:100%">Masuk</button><div id=authMsg></div>`;
 doLogin.onclick=async()=>{let ident=identity.value.trim(),pass=pw.value;if(!ident||!pass)return;
  doLogin.disabled=true;authMsg.innerHTML="<p class=small>Memproses…</p>";
  try{let email=ident.includes("@")?ident:studentEmail(ident);await signInWithEmailAndPassword(auth,email,pass)}
  catch(e){authMsg.innerHTML=`<div class=error>Login gagal. Periksa NIS/email dan password.</div>`;doLogin.disabled=false}
 }
}
function registerForm(){
 authForm.innerHTML=`<div class=notice>Pendaftaran ini khusus siswa. Akun guru/admin dibuat dari Firebase Authentication lalu role ditetapkan di Firestore.</div>
 <label>NIS</label><input id=rnis><label>Nama</label><input id=rname>
 <label>Kelas</label><select id=rcls>${["7A","7B","7C","7D","7E","7F","7G","7H","7I","8A","8B","8C","8D","8E","8F","8G","8H","8I","9A","9B","9C","9D","9E","9F","9G","9H","9I"].map(x=>`<option>${x}</option>`).join("")}</select>
 <label>Password (minimal 6 karakter)</label><input id=rpw type=password minlength=6>
 <label>Avatar</label><select id=rav><option>🧑‍🚀</option><option>🧙</option><option>🥷</option><option>🦸</option><option>🧑‍🔬</option><option>🧝</option></select>
 <button class="btn green" id=doReg style="margin-top:12px;width:100%">Buat Akun Siswa</button><div id=authMsg></div>`;
 doReg.onclick=async()=>{
  const nis=rnis.value.trim(),name=rname.value.trim(),pass=rpw.value;
  if(!nis||!name||pass.length<6)return authMsg.innerHTML="<div class=error>Lengkapi data dan gunakan password minimal 6 karakter.</div>";
  doReg.disabled=true;
  try{
    const cred=await createUserWithEmailAndPassword(auth,studentEmail(nis),pass);
    await setDoc(doc(db,"users",cred.user.uid),{nis,name,cls:rcls.value,avatar:rav.value,role:"student",createdAt:serverTimestamp()});
    await setDoc(doc(db,"progress",cred.user.uid),{xp:0,coin:0,stars:{},done:{},badges:[],updatedAt:serverTimestamp()});
  }catch(e){console.error(e);authMsg.innerHTML=`<div class=error>${e.code==="auth/email-already-in-use"?"NIS sudah terdaftar.":"Pendaftaran gagal: "+esc(e.message)}</div>`;doReg.disabled=false}
 }
}
async function loadQuestions(){
 const snap=await getDocs(collection(db,"questions"));
 BANK=snap.docs.map(d=>({id:d.id,...d.data()}));
}
function top(){return `<div class=top><div class=brand>∑ PakKom Math Adventure</div><div class=stats><span class=pill>${esc(profile.avatar||"👤")}</span><span class=pill>⭐ ${stars()}</span><span class=pill>⚡ ${progress.xp||0}</span><span class=pill>🪙 ${progress.coin||0}</span></div></div>`}
function tabs(active){let arr=[["home","🗺️ Adventure"],["profile","🏅 Profil"]];if(isStaff())arr.splice(1,0,["bank","🧠 Bank Soal"],["teacher","👩‍🏫 Guru"]);return `<div class=tabs>${arr.map(([k,v])=>`<button class="btn ${active===k?"dark":"soft"}" data-tab=${k}>${v}</button>`).join("")}<button class="btn red" id=logout>Keluar</button></div>`}
function bindTabs(){document.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>({home,bank,teacher,profile}[b.dataset.tab])());document.getElementById("logout").onclick=()=>signOut(auth)}
function home(){
 A.innerHTML=`<div class=wrap>${top()}${tabs("home")}<section class=hero><small>THE LOST MATH CRYSTALS • ONLINE</small><h1>${esc(profile.avatar)} Halo, ${esc(profile.name)}!</h1><p>Progress tersimpan di Firebase, sehingga akun yang sama dapat dilanjutkan dari perangkat lain.</p></section>
 <div class=grid>${Object.entries(WORLDS).map(([k,w])=>`<div class="card c6 world"><div class=icon>${w.icon}</div><small>${stars()>=w.need?"DUNIA TERBUKA":"🔒 BUTUH "+w.need+" BINTANG"}</small><h2>${w.name}</h2><p class=small>${BANK.filter(q=>q.world===k).length} soal online</p><button data-world=${k} class="btn green" ${stars()<w.need?"disabled":""}>Jelajahi →</button></div>`).join("")}
 <div class="card c8"><h2>☁️ Firebase Sync Aktif</h2><p>Progress terakhir tersimpan pada akun <b>${esc(profile.nis||profile.email||profile.name)}</b>.</p></div>
 <div class="card c4"><h2>🧠 Bank Soal</h2><div class=kpi>${BANK.length}</div><p class=small>${isStaff()?"Anda dapat mengelolanya dari menu Bank Soal.":"Dikelola oleh guru."}</p></div></div></div>`;
 bindTabs();document.querySelectorAll("[data-world]").forEach(b=>b.onclick=()=>map(b.dataset.world))
}
function map(k){
 let w=WORLDS[k];
 A.innerHTML=`<div class=wrap>${top()}${tabs("home")}<button class="btn soft" id=back>← Semua Dunia</button><h1>${w.icon} ${w.name}</h1><div class=card><div class=map>${w.levels.map((l,i)=>{let qs=BANK.filter(q=>q.level===l.id),open=i===0||progress.done?.[w.levels[i-1].id];return `<div><button class="node ${progress.done?.[l.id]?"done":""} ${l.boss?"boss":""}" data-level=${l.id} ${!open||!qs.length?"disabled":""}><div>${l.icon}</div><small>${l.boss?"BOSS":"LEVEL "+(i+1)}</small></button><div class=stars>${!qs.length?"0 soal":progress.done?.[l.id]?starText(progress.stars?.[l.id]||0):open?"Siap":"🔒"}</div></div>${i<w.levels.length-1?"<div class=line></div>":""}`}).join("")}</div></div></div>`;
 bindTabs();back.onclick=home;document.querySelectorAll("[data-level]").forEach(b=>b.onclick=()=>play(k,b.dataset.level))
}
function play(k,id){
 const level=WORLDS[k].levels.find(x=>x.id===id),qs=BANK.filter(q=>q.level===id);
 if(!qs.length)return alert("Belum ada soal.");
 let i=0,correct=0,hp=100,bhp=level.boss?300:0,dmg=55;
 A.innerHTML=`<div class=wrap>${top()}<button class="btn soft" id=quit>← Peta</button><h1>${level.icon} ${level.name}</h1><div id=stage></div></div>`;quit.onclick=()=>map(k);
 function show(){
  if(level.boss&&bhp<=0)return finish(); if(i>=qs.length){if(level.boss)i=0;else return finish()}
  const q=qs[i];
  stage.innerHTML=`${level.boss?`<div class=grid><div class="card c6"><b>${esc(profile.avatar)} ${esc(profile.name)}</b><div class=progress><span style="width:${hp}%"></span></div><small>HP ${hp}</small></div><div class="card c6"><b>${level.icon} ${level.name}</b><div class=progress><span style="width:${Math.max(0,bhp/3)}%"></span></div><small>HP ${Math.max(0,bhp)}</small></div></div><div class=row style="margin:10px 0"><button class="btn soft" data-d=30>⚡ Quick 30</button><button class="btn gold" data-d=55>🔥 Power 55</button><button class="btn dark" data-d=80>💥 Ultimate 80</button></div>`:""}<div class=card><span class=pill>Soal ${i+1}/${qs.length}</span><div class=question>${esc(q.question)}</div><div class=choices>${q.choices.map((c,j)=>`<button class=choice data-c=${j}>${esc(c)}</button>`).join("")}</div><div id=fb></div></div>`;
  document.querySelectorAll("[data-d]").forEach(b=>b.onclick=()=>dmg=+b.dataset.d);
  document.querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>{let ok=+b.dataset.c===Number(q.answer);document.querySelectorAll("[data-c]").forEach(x=>x.disabled=true);b.classList.add(ok?"ok":"no");if(ok){correct++;if(level.boss)bhp-=dmg}else{if(level.boss)hp-=15;document.querySelectorAll("[data-c]")[Number(q.answer)]?.classList.add("ok")}fb.innerHTML=`<div class=feedback>${ok?"✅ Benar!":"💡 "+esc(q.hint||"Coba periksa kembali.")}</div><button class="btn green" id=next>Lanjut →</button>`;next.onclick=()=>{if(hp<=0)return play(k,id);i++;show()}})
 }
 async function finish(){
  const ratio=correct/qs.length;let st=ratio>=.9?3:ratio>=.75?2:ratio>=.5?1:0;if(level.boss)st=Math.max(st,2);
  const first=!progress.done?.[id]; progress.done={...(progress.done||{}),[id]:true};progress.stars={...(progress.stars||{}),[id]:Math.max(progress.stars?.[id]||0,st)};
  if(first){progress.xp=(progress.xp||0)+(level.boss?250:80);progress.coin=(progress.coin||0)+(level.boss?120:35)}
  await setDoc(doc(db,"progress",user.uid),{...progress,updatedAt:serverTimestamp()},{merge:true});
  stage.innerHTML=`<div class=card style="text-align:center"><div class=icon>${level.boss?"💎":"🏆"}</div><h1>Selesai!</h1><h2>${starText(st)}</h2><p>Benar ${correct}/${qs.length}</p><button class="btn dark" id=tomap>Kembali ke Peta</button></div>`;tomap.onclick=()=>map(k)
 } show()
}
function bank(){
 if(!isStaff())return home();
 A.innerHTML=`<div class=wrap>${top()}${tabs("bank")}<div class=space><div><h1>🧠 Bank Soal Online</h1><p class=small>${BANK.length} soal di Firestore.</p></div><div class=row><button class="btn green" id=add>+ Tambah Soal</button><button class="btn gold" id=seed>Isi Soal Awal</button></div></div><div id=form></div>
 <div class=card><div class=table-wrap><table class=tbl><thead><tr><th>Dunia</th><th>Level</th><th>Kesulitan</th><th>Soal</th><th>Jawaban</th><th>Aksi</th></tr></thead><tbody>${BANK.map(q=>`<tr><td>${esc(q.world)}</td><td>${esc(q.level)}</td><td>${esc(q.difficulty)}</td><td>${esc(q.question)}</td><td>${esc(q.choices?.[q.answer])}</td><td><div class=actions><button class="btn soft" data-edit=${q.id}>Edit</button><button class="btn red" data-del=${q.id}>Hapus</button></div></td></tr>`).join("")}</tbody></table></div></div></div>`;
 bindTabs();add.onclick=()=>qForm();
 document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>qForm(b.dataset.edit));
 document.querySelectorAll("[data-del]").forEach(b=>b.onclick=async()=>{if(confirm("Hapus soal?")){await deleteDoc(doc(db,"questions",b.dataset.del));await loadQuestions();bank()}});
 seed.onclick=async()=>{if(BANK.length&&!confirm("Bank soal sudah berisi data. Tetap tambahkan paket soal awal?"))return;seed.disabled=true;const batch=writeBatch(db);DEFAULT_BANK.forEach(q=>{let {id,...data}=q;batch.set(doc(db,"questions",id),{...data,createdAt:serverTimestamp(),updatedAt:serverTimestamp()},{merge:true})});await batch.commit();await loadQuestions();bank()}
}
function qForm(id=null){
 const q=id?BANK.find(x=>x.id===id):{world:"number",level:"n1",difficulty:"easy",question:"",choices:["","","",""],answer:0,hint:""};
 form.innerHTML=`<div class=card style="margin-bottom:13px"><h2>${id?"Edit":"Tambah"} Soal</h2><div class=grid>
 <div class=c4><label>Dunia</label><select id=fw><option value=number>Number Forest</option><option value=fraction>Fraction Island</option></select></div>
 <div class=c4><label>Level</label><select id=fl></select></div><div class=c4><label>Kesulitan</label><select id=fd><option value=easy>Mudah</option><option value=medium>Sedang</option><option value=hard>Sulit</option></select></div>
 <div class=c12><label>Pertanyaan</label><textarea id=fq>${esc(q.question)}</textarea></div>
 ${[0,1,2,3].map(i=>`<div class=c6><label>Pilihan ${i+1}</label><input id=c${i} value="${esc(q.choices?.[i]||"")}"></div>`).join("")}
 <div class=c6><label>Jawaban Benar</label><select id=fa><option value=0>Pilihan 1</option><option value=1>Pilihan 2</option><option value=2>Pilihan 3</option><option value=3>Pilihan 4</option></select></div>
 <div class=c6><label>Hint</label><input id=fh value="${esc(q.hint||"")}"></div></div><br><button class="btn green" id=saveQ>Simpan</button> <button class="btn soft" id=cancelQ>Batal</button></div>`;
 fw.value=q.world;fd.value=q.difficulty;fa.value=q.answer;
 function fillLevels(){fl.innerHTML=WORLDS[fw.value].levels.map(l=>`<option value=${l.id}>${l.name}</option>`).join("");fl.value=WORLDS[fw.value].levels.some(l=>l.id===q.level)?q.level:WORLDS[fw.value].levels[0].id}fillLevels();fw.onchange=fillLevels;cancelQ.onclick=()=>form.innerHTML="";
 saveQ.onclick=async()=>{const choices=[c0.value.trim(),c1.value.trim(),c2.value.trim(),c3.value.trim()];if(!fq.value.trim()||choices.some(x=>!x))return alert("Lengkapi soal dan semua pilihan.");const data={world:fw.value,level:fl.value,difficulty:fd.value,question:fq.value.trim(),choices,answer:+fa.value,hint:fh.value.trim(),updatedAt:serverTimestamp()};saveQ.disabled=true;if(id)await updateDoc(doc(db,"questions",id),data);else await addDoc(collection(db,"questions"),{...data,createdAt:serverTimestamp()});await loadQuestions();bank()}
}
async function teacher(){
 if(!isStaff())return home();
 const usersSnap=await getDocs(collection(db,"users"));const users=usersSnap.docs.map(d=>({id:d.id,...d.data()})).filter(x=>x.role==="student");
 const progSnap=await getDocs(collection(db,"progress"));const pm=Object.fromEntries(progSnap.docs.map(d=>[d.id,d.data()]));
 A.innerHTML=`<div class=wrap>${top()}${tabs("teacher")}<section class=hero><small>TEACHER COMMAND CENTER</small><h1>👩‍🏫 Progress Siswa</h1><p>Data dibaca langsung dari Firebase Firestore.</p></section><div class=grid>
 <div class="card c4"><small>SISWA</small><div class=kpi>${users.length}</div></div><div class="card c4"><small>BANK SOAL</small><div class=kpi>${BANK.length}</div></div><div class="card c4"><small>DUNIA</small><div class=kpi>2</div></div>
 <div class="card c12"><div class=table-wrap><table class=tbl><thead><tr><th>NIS</th><th>Nama</th><th>Kelas</th><th>XP</th><th>Koin</th><th>Bintang</th></tr></thead><tbody>${users.map(s=>{let p=pm[s.id]||{},ts=Object.values(p.stars||{}).reduce((a,b)=>a+(Number(b)||0),0);return `<tr><td>${esc(s.nis)}</td><td>${esc(s.name)}</td><td>${esc(s.cls)}</td><td>${p.xp||0}</td><td>${p.coin||0}</td><td>${ts}</td></tr>`}).join("")}</tbody></table></div></div></div></div>`;bindTabs()
}
function profile(){
 A.innerHTML=`<div class=wrap>${top()}${tabs("profile")}<div class=grid><div class="card c4" style="text-align:center"><div class=icon>${esc(profile.avatar||"👤")}</div><h2>${esc(profile.name)}</h2><p>${profile.role==="student"?"NIS "+esc(profile.nis)+" • "+esc(profile.cls):esc(profile.role)}</p></div><div class="card c8"><h2>Progress Cloud</h2><p>⭐ ${stars()} bintang</p><p>⚡ ${progress.xp||0} XP</p><p>🪙 ${progress.coin||0} koin</p><p class=small>Data tersimpan pada UID Firebase: ${esc(user.uid)}</p></div></div></div>`;bindTabs()
}
init();
