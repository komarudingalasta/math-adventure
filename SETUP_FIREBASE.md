# SETUP FIREBASE — PakKom Math Adventure v2.2

## 1. Buat project Firebase baru
Contoh nama: `pakkom-math-adventure`.

## 2. Tambahkan Web App
Firebase Console → Project settings → Your apps → Web (`</>`).

Salin object `firebaseConfig`, lalu masukkan nilainya ke:

`js/firebase-config.js`

JANGAN menggunakan service-account JSON/private key di GitHub.

## 3. Authentication
Firebase Console → Authentication → Sign-in method → aktifkan **Email/Password**.

Siswa tetap login dengan **NIS + password**.
Aplikasi mengubah NIS menjadi email internal seperti:
`12345@student.pakkom.local`

## 4. Firestore
Firebase Console → Firestore Database → Create database.

Setelah database dibuat, buka tab **Rules**, salin seluruh isi:
`firebase/firestore.rules`

lalu **Publish**.

## 5. Membuat admin pertama
Agar tidak ada pengguna yang dapat menjadikan dirinya admin, admin pertama dibuat manual.

### A. Authentication
Firebase Console → Authentication → Users → Add user.
Isi email dan password admin.

### B. Ambil UID admin
Salin UID user yang baru dibuat.

### C. Firestore
Buat collection: `users`
Document ID: **UID admin tadi**

Fields:
- `name` (string): nama admin
- `email` (string): email admin
- `role` (string): `admin`
- `avatar` (string): `👩‍🏫`

### D. Buat progress admin
Collection: `progress`
Document ID: UID admin

Fields:
- `xp` number: 0
- `coin` number: 0
- `stars` map: {}
- `done` map: {}
- `badges` array: []

## 6. Login admin
Pada halaman Math Adventure:
- kolom "NIS siswa atau email guru": masukkan email admin
- password: password admin

Menu **Bank Soal** dan **Guru** akan muncul otomatis.

## 7. Isi bank soal awal
Login admin → Bank Soal → klik **Isi Soal Awal**.

Setelah itu soal berada di Firestore dan langsung tersedia untuk semua siswa.

## 8. GitHub Pages
Upload seluruh isi folder project ke repository `math-adventure`.
Pastikan struktur:
- index.html
- css/
- js/
- firebase/

GitHub → Settings → Pages → Deploy from branch → main / root.

## Struktur Firestore
- `users/{uid}` — profil siswa/guru
- `progress/{uid}` — XP, koin, bintang, level
- `questions/{questionId}` — bank soal pusat

## Keamanan
Rules mencegah siswa:
- melihat progress siswa lain
- mengubah bank soal
- mengubah role sendiri menjadi admin/teacher

Guru/admin dapat:
- melihat semua profil siswa
- melihat semua progress
- tambah/edit/hapus bank soal
