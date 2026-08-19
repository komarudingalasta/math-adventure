# Perbaikan v2.2.1

Masalah v2.2:
`app.js` mengimpor Firebase CDN sebelum memeriksa apakah `firebase-config.js` sudah diisi.
Jika import CDN gagal atau belum siap, halaman berhenti pada “Memuat Math Adventure…”.

Perbaikan:
- `js/app.js` sekarang hanya menjadi bootstrap lokal.
- Jika Firebase belum dikonfigurasi, halaman setup langsung tampil.
- Firebase SDK baru dimuat lewat `js/app-firebase.js` setelah config valid.
- Jika SDK gagal dimuat, pesan error tampil di halaman, bukan blank/loading permanen.
