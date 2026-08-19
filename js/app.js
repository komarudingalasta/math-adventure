import { firebaseConfig } from "./firebase-config.js";

const app = document.getElementById("app");

function configReady() {
  return firebaseConfig
    && firebaseConfig.apiKey
    && !firebaseConfig.apiKey.includes("PASTE_")
    && firebaseConfig.projectId
    && !firebaseConfig.projectId.includes("PASTE_");
}

function showSetup() {
  app.innerHTML = `
    <div class="auth">
      <div class="card">
        <h1>🔥 Firebase belum dikonfigurasi</h1>
        <p>Math Adventure sudah berhasil dimuat. Sekarang isi konfigurasi Firebase pada <b>js/firebase-config.js</b>.</p>
        <div class="notice">
          <b>Langkah berikutnya:</b><br>
          1. Buat Web App di Firebase.<br>
          2. Salin firebaseConfig ke <b>js/firebase-config.js</b>.<br>
          3. Aktifkan Authentication Email/Password.<br>
          4. Buat Firestore dan pasang <b>firebase/firestore.rules</b>.
        </div>
        <p class="small">Library Firebase baru akan dimuat setelah konfigurasi project terisi. Jadi halaman ini tetap dapat tampil walaupun Firebase belum disiapkan.</p>
      </div>
    </div>`;
}

if (!configReady()) {
  showSetup();
} else {
  import("./app-firebase.js").catch((err) => {
    console.error(err);
    app.innerHTML = `
      <div class="auth">
        <div class="card">
          <h2>Firebase gagal dimuat</h2>
          <div class="error">${String(err?.message || err)}</div>
          <p class="small">Periksa koneksi, firebase-config.js, dan Console browser.</p>
        </div>
      </div>`;
  });
}
