
const $ = (s)=>document.querySelector(s);
const app = document.getElementById("app");
const STORE = "pakkom_math_adventure_v1";

function blankState(name="", cls="7A"){
  return {
    name, cls, xp:0, coins:0, unlocked:1,
    stars:{}, completed:{}, badges:[],
    lastPlayed:null
  };
}
function load(){
  try { return JSON.parse(localStorage.getItem(STORE)) || null } catch(e){ return null }
}
function save(s){ localStorage.setItem(STORE, JSON.stringify(s)); }
let state = load();

function starText(n){ return "⭐".repeat(n) + "☆".repeat(Math.max(0,3-n)); }
function totalStars(){ return Object.values(state.stars||{}).reduce((a,b)=>a+b,0); }
function levelById(id){
  if(id<=8) return GAME_DATA.levels.find(x=>x.id===id);
  if(id===9) return GAME_DATA.miniBoss;
  return GAME_DATA.finalBoss;
}
function canOpen(id){
  if(id<=state.unlocked) return true;
  if(id===9) return GAME_DATA.levels.every(x=>state.completed[x.id]);
  if(id===10) return !!state.completed[9];
  return false;
}
function topbar(){
  return `
  <div class="topbar">
    <div class="brand"><div class="brand-mark">∑</div><span>PakKom Math Adventure</span></div>
    <div class="stats">
      <span class="pill">⭐ ${totalStars()}</span>
      <span class="pill">⚡ ${state.xp} XP</span>
      <span class="pill">🪙 ${state.coins}</span>
    </div>
  </div>`;
}

function renderLogin(){
  app.innerHTML = `
    <div class="login-wrap">
      <div class="login-card">
        <div class="logo-big">∑</div>
        <div class="eyebrow">PakKom Learning Game</div>
        <h1>Math Adventure</h1>
        <p>Masuki Number Forest dan selesaikan tantangan matematika untuk mengumpulkan bintang, XP, dan koin.</p>
        <div class="form-group"><label>Nama siswa</label><input id="name" placeholder="Contoh: Budi Santoso"></div>
        <div class="form-group"><label>Kelas</label>
          <select id="cls">
            ${["7A","7B","7C","7D","7E","7F","7G","7H","7I","8A","8B","8C","8D","8E","8F","8G","8H","8I","9A","9B","9C","9D","9E","9F","9G","9H","9I"].map(c=>`<option>${c}</option>`).join("")}
          </select>
        </div>
        <button class="btn btn-dark" id="start" style="width:100%;margin-top:8px">Mulai Petualangan →</button>
        <p class="small" style="margin-top:14px">Versi demo menyimpan progress di perangkat ini. Firebase dapat ditambahkan kemudian.</p>
      </div>
    </div>`;
  $("#start").onclick=()=>{
    const name=$("#name").value.trim();
    if(!name){ $("#name").focus(); return; }
    state=blankState(name,$("#cls").value); save(state); renderHome();
  }
}

function node(level, special=""){
  const open=canOpen(level.id);
  const done=state.completed[level.id];
  const cls=`node ${open?"open":"locked"} ${done?"done":""} ${special}`;
  const st=state.stars[level.id]||0;
  return `<div class="node-wrap">
    <button class="${cls}" data-level="${level.id}" ${open?"":"disabled"} title="${level.title}">
      <div><div style="font-size:28px">${level.icon}</div><div style="font-size:12px">${level.id<=8?"Level "+level.id:(level.id===9?"MINI BOSS":"FINAL")}</div></div>
    </button>
    <div class="node-stars">${done?starText(st):(open?"Siap dimainkan":"🔒")}</div>
  </div>`;
}

function renderHome(){
  if(!state){ renderLogin(); return; }
  const completed = Object.keys(state.completed||{}).filter(k=>state.completed[k]).length;
  const progress = Math.min(100, Math.round((completed/10)*100));
  app.innerHTML = `<div class="app-shell">
    ${topbar()}
    <section class="hero">
      <div class="eyebrow">Number Forest • Dunia 1</div>
      <h1>Halo, ${state.name}! 🌿</h1>
      <p>Hutan Angka kehilangan Kristal Pengetahuan. Taklukkan setiap tantangan, kalahkan para penjaga, dan rebut kembali kristalnya.</p>
      <button class="btn btn-gold" id="continue">▶ Lanjutkan Petualangan</button>
    </section>

    <div class="grid">
      <div class="card span-8 world-card">
        <div class="section-title" style="margin-top:0">
          <div><div class="kicker">PETA DUNIA</div><h2>🌲 Number Forest</h2></div>
          <span class="pill">${progress}% selesai</span>
        </div>
        <div class="progress"><span style="width:${progress}%"></span></div>
        <div class="map">
          ${GAME_DATA.levels.map((l,i)=>node(l)+(i<GAME_DATA.levels.length-1?'<div class="connector"></div>':'')).join("")}
          <div class="connector"></div>${node(GAME_DATA.miniBoss,"boss")}
          <div class="connector"></div>${node(GAME_DATA.finalBoss,"boss")}
        </div>
      </div>

      <div class="span-4">
        <div class="card">
          <h3>🎯 Misi Hari Ini</h3>
          <div class="quest"><div class="quest-icon">⭐</div><div><b>Kumpulkan 3 bintang</b><div class="small">Mainkan satu level dengan skor tinggi.</div></div></div>
          <div class="quest"><div class="quest-icon">⚡</div><div><b>Dapatkan 100 XP</b><div class="small">Level sulit memberikan XP lebih besar.</div></div></div>
          <div class="quest"><div class="quest-icon">🔥</div><div><b>Jawab 3 kali beruntun</b><div class="small">Latih ketelitianmu.</div></div></div>
        </div>
        <div class="card" style="margin-top:16px">
          <h3>🏅 Badge</h3>
          <div class="badge-row">
            ${state.badges.length?state.badges.map(x=>`<span class="badge">${x}</span>`).join(""):'<span class="small">Belum ada badge. Selesaikan level pertamamu!</span>'}
          </div>
        </div>
        <div class="card" style="margin-top:16px">
          <h3>👤 Profil Petualang</h3>
          <p><b>${state.name}</b><br><span class="small">Kelas ${state.cls}</span></p>
          <button class="btn btn-soft" id="reset">Ganti Siswa / Reset</button>
        </div>
      </div>
    </div>
    <div class="footer">PakKom Math Adventure • Prototype v1.0</div>
  </div>`;
  document.querySelectorAll("[data-level]").forEach(el=>el.onclick=()=>renderLevel(+el.dataset.level));
  $("#continue").onclick=()=>{
    let id=1;
    for(let i=1;i<=10;i++){ if(canOpen(i)&&!state.completed[i]){ id=i; break; } }
    renderLevel(id);
  }
  $("#reset").onclick=()=>{
    if(confirm("Reset progress demo di perangkat ini?")){ localStorage.removeItem(STORE); state=null; renderLogin(); }
  }
}

function renderLevel(id){
  const level=levelById(id);
  if(!canOpen(id)){ renderHome(); return; }
  let idx=0, correct=0, answered=false, streak=0, bestStreak=0;
  let playerHP=100, bossHP=level.boss?level.maxHP:0;
  const questions=[...level.questions];

  const shell=()=>{
    app.innerHTML=`<div class="app-shell">${topbar()}<div class="level-screen">
      <div class="level-head">
        <div><div class="kicker">${level.difficulty} • ${level.boss?"Pertarungan":"Tantangan"}</div><h1 style="margin:.25rem 0">${level.icon} ${level.title}</h1></div>
        <button class="btn btn-soft" id="back">← Peta</button>
      </div>
      <div id="stage"></div>
    </div></div>`;
    $("#back").onclick=renderHome;
    showQuestion();
  }

  function showQuestion(){
    answered=false;
    if(idx>=questions.length){
      if(level.boss && bossHP>0){ idx=0; questions.sort(()=>Math.random()-.5); }
      else return finish();
    }
    const q=questions[idx];
    const hpMarkup=level.boss?`
      <div class="battle">
        <div class="fighter"><div class="fighter-icon">🧑‍🚀</div><b>${state.name}</b><div class="hp"><span style="width:${playerHP}%"></span></div><div class="small">HP ${playerHP}/100</div></div>
        <div class="fighter"><div class="fighter-icon">${level.icon}</div><b>${level.title.replace(/.*— /,"")}</b><div class="hp"><span style="width:${Math.max(0,bossHP/level.maxHP*100)}%"></span></div><div class="small">HP ${Math.max(0,bossHP)}/${level.maxHP}</div></div>
      </div>`:"";
    $("#stage").innerHTML=`
      ${hpMarkup}
      <div class="card question-card">
        <div class="section-title" style="margin-top:0">
          <span class="pill">Soal ${idx+1}/${questions.length}</span>
          <span class="pill">🔥 Streak ${streak}</span>
        </div>
        <div class="progress"><span style="width:${(idx/questions.length)*100}%"></span></div>
        <div class="question">${q.q}</div>
        <div class="choices">${q.choices.map((c,i)=>`<button class="choice" data-choice="${i}">${c}</button>`).join("")}</div>
        <div id="feedback"></div>
      </div>`;
    document.querySelectorAll("[data-choice]").forEach(btn=>btn.onclick=()=>answer(+btn.dataset.choice,btn,q));
  }

  function answer(choice,btn,q){
    if(answered) return;
    answered=true;
    const buttons=[...document.querySelectorAll("[data-choice]")];
    buttons.forEach(b=>b.disabled=true);
    if(choice===q.a){
      correct++; streak++; bestStreak=Math.max(bestStreak,streak);
      btn.classList.add("correct");
      if(level.boss) bossHP-=80;
      $("#feedback").innerHTML=`<div class="feedback">✅ <b>Benar!</b> ${level.boss?"Serangan mengenai musuh.":"Jalur petualangan terbuka."}</div>`;
    }else{
      streak=0; btn.classList.add("wrong"); buttons[q.a].classList.add("correct");
      if(level.boss) playerHP-=20;
      $("#feedback").innerHTML=`<div class="feedback">💡 <b>Belum tepat.</b> ${q.h}</div>`;
    }
    const next=document.createElement("button");
    next.className="btn btn-primary"; next.style.marginTop="14px";
    next.textContent=(level.boss && bossHP<=0)?"Selesaikan Pertarungan →":"Lanjut →";
    $("#feedback").appendChild(next);
    next.onclick=()=>{
      if(level.boss && playerHP<=0){
        alert("HP habis. Coba lagi pertarungannya!");
        return renderLevel(id);
      }
      idx++; showQuestion();
    }
  }

  function finish(){
    const ratio=correct/questions.length;
    let stars= ratio>=.9?3:ratio>=.75?2:ratio>=.5?1:0;
    if(level.boss && bossHP<=0) stars=Math.max(stars,2);
    const oldStars=state.stars[id]||0;
    const first=!state.completed[id];
    state.stars[id]=Math.max(oldStars,stars);
    if(stars>0 || level.boss){
      state.completed[id]=true;
      if(first){ state.xp+=level.xp; state.coins+=level.coins; }
      if(id<=8) state.unlocked=Math.max(state.unlocked,id+1);
      if(id===1 && !state.badges.includes("🌱 Penjelajah Pemula")) state.badges.push("🌱 Penjelajah Pemula");
      if(bestStreak>=3 && !state.badges.includes("🔥 Streak x3")) state.badges.push("🔥 Streak x3");
      if(id===9 && !state.badges.includes("🗿 Golem Breaker")) state.badges.push("🗿 Golem Breaker");
      if(id===10 && !state.badges.includes("💎 Penjaga Kristal")) state.badges.push("💎 Penjaga Kristal");
    }
    state.lastPlayed=Date.now(); save(state);
    $("#stage").innerHTML=`
      <div class="card result">
        <div class="trophy">${id===10?"💎":(stars>=2?"🏆":"🧭")}</div>
        <div class="eyebrow">${id===10?"Kristal ditemukan!":"Level selesai"}</div>
        <h1>${stars? "Hebat, "+state.name+"!":"Coba sekali lagi"}</h1>
        <div class="stars-big">${starText(stars)}</div>
        <p>Kamu menjawab <b>${correct} dari ${questions.length}</b> soal dengan benar.</p>
        ${first&&stars?`<p><span class="pill">+${level.xp} XP</span> <span class="pill">+${level.coins} 🪙</span></p>`:""}
        <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:22px">
          <button class="btn btn-soft" id="again">↻ Mainkan Lagi</button>
          <button class="btn btn-dark" id="map">Kembali ke Peta</button>
        </div>
      </div>`;
    $("#again").onclick=()=>renderLevel(id);
    $("#map").onclick=renderHome;
  }
  shell();
}

if(state) renderHome(); else renderLogin();
