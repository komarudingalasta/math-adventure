// GANTI dengan Firebase Web App config dari Firebase Console > Project settings > Your apps.
export const firebaseConfig = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_PROJECT.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_PROJECT.firebasestorage.app",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};

// Domain internal untuk menyamarkan Firebase email siswa.
// Siswa tetap login menggunakan NIS + password.
export const STUDENT_AUTH_DOMAIN = "student.pakkom.local";
