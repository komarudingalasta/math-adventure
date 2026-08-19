
window.GAME_DATA = {
  levels: [
    {
      id:1,title:"Gerbang Bilangan",icon:"🌿",difficulty:"Mudah",xp:60,coins:20,
      questions:[
        {q:"18 + 27 = ...",choices:["35","45","55","46"],a:1,h:"Pisahkan 27 menjadi 20 + 7."},
        {q:"64 - 29 = ...",choices:["35","43","45","34"],a:0,h:"Kurangi 30 dulu, lalu tambah 1."},
        {q:"7 × 8 = ...",choices:["48","54","56","64"],a:2,h:"Ingat kelompok 7 sebanyak 8 kali."},
        {q:"96 ÷ 12 = ...",choices:["6","7","8","9"],a:2,h:"12 × berapa = 96?"}
      ]
    },
    {
      id:2,title:"Jembatan Pola",icon:"🌉",difficulty:"Mudah",xp:70,coins:25,
      questions:[
        {q:"2, 5, 8, 11, ...",choices:["12","13","14","15"],a:2,h:"Setiap bilangan bertambah dengan jumlah yang sama."},
        {q:"40, 35, 30, 25, ...",choices:["15","20","22","24"],a:1,h:"Perhatikan selisih antarterm."},
        {q:"3, 6, 12, 24, ...",choices:["27","36","42","48"],a:3,h:"Setiap bilangan menjadi dua kali lipat."},
        {q:"1, 4, 9, 16, ...",choices:["20","24","25","32"],a:2,h:"Ini adalah pola bilangan kuadrat."}
      ]
    },
    {
      id:3,title:"Gua Faktor",icon:"🪨",difficulty:"Sedang",xp:80,coins:30,
      questions:[
        {q:"Manakah faktor dari 36?",choices:["5","7","9","11"],a:2,h:"36 harus habis dibagi angka tersebut."},
        {q:"FPB dari 18 dan 24 adalah ...",choices:["3","6","9","12"],a:1,h:"Cari faktor terbesar yang dimiliki keduanya."},
        {q:"KPK dari 6 dan 8 adalah ...",choices:["12","18","24","48"],a:2,h:"Cari kelipatan terkecil yang sama."},
        {q:"Bilangan prima di bawah ini adalah ...",choices:["21","27","29","33"],a:2,h:"Bilangan prima hanya punya dua faktor."}
      ]
    },
    {
      id:4,title:"Sungai Operasi",icon:"🏞️",difficulty:"Sedang",xp:90,coins:35,
      questions:[
        {q:"8 + 4 × 3 = ...",choices:["20","36","24","16"],a:0,h:"Kerjakan perkalian terlebih dahulu."},
        {q:"(18 - 6) ÷ 3 = ...",choices:["3","4","5","6"],a:1,h:"Kerjakan yang di dalam kurung."},
        {q:"7 × (5 + 3) = ...",choices:["40","48","56","64"],a:2,h:"Selesaikan isi kurung lebih dulu."},
        {q:"100 - 6 × 9 = ...",choices:["36","44","46","54"],a:2,h:"Perkalian didahulukan."}
      ]
    },
    {
      id:5,title:"Menara Negatif",icon:"🗼",difficulty:"Sedang",xp:100,coins:40,
      questions:[
        {q:"-6 + 14 = ...",choices:["-20","-8","8","20"],a:2,h:"Bergerak 14 langkah ke kanan dari -6."},
        {q:"7 - 12 = ...",choices:["-5","5","19","-19"],a:0,h:"Kurangi lebih besar dari bilangan awal."},
        {q:"-4 × 6 = ...",choices:["-24","24","-10","10"],a:0,h:"Negatif dikali positif menghasilkan negatif."},
        {q:"-36 ÷ -6 = ...",choices:["-6","6","-30","30"],a:1,h:"Negatif dibagi negatif menghasilkan positif."}
      ]
    },
    {
      id:6,title:"Kampung Pecahan",icon:"🏘️",difficulty:"Sedang",xp:110,coins:45,
      questions:[
        {q:"1/2 + 1/4 = ...",choices:["2/6","2/4","3/4","1/6"],a:2,h:"Samakan penyebut terlebih dahulu."},
        {q:"3/5 dari 20 adalah ...",choices:["8","10","12","15"],a:2,h:"20 ÷ 5 lalu × 3."},
        {q:"0,75 sama dengan ...",choices:["1/4","1/2","3/4","4/5"],a:2,h:"75/100 dapat disederhanakan."},
        {q:"25% dari 80 adalah ...",choices:["10","20","25","40"],a:1,h:"25% sama dengan seperempat."}
      ]
    },
    {
      id:7,title:"Pasar Persen",icon:"🛒",difficulty:"Sulit",xp:130,coins:55,
      questions:[
        {q:"Harga Rp120.000 didiskon 25%. Harga akhirnya ...",choices:["Rp80.000","Rp90.000","Rp95.000","Rp100.000"],a:1,h:"Hitung dulu 25% dari 120.000."},
        {q:"Nilai naik dari 60 menjadi 75. Kenaikannya ...",choices:["15%","20%","25%","30%"],a:2,h:"Kenaikan 15 dibanding nilai awal 60."},
        {q:"40% dari suatu bilangan adalah 32. Bilangan itu ...",choices:["64","72","80","96"],a:2,h:"32 ÷ 0,4."},
        {q:"Setelah diskon 20%, harga menjadi Rp160.000. Harga awal ...",choices:["Rp180.000","Rp190.000","Rp200.000","Rp220.000"],a:2,h:"Rp160.000 adalah 80% dari harga awal."}
      ]
    },
    {
      id:8,title:"Benteng Logika",icon:"🏰",difficulty:"Sulit",xp:150,coins:70,
      questions:[
        {q:"Jika semua A adalah B dan semua B adalah C, maka ...",choices:["Semua C adalah A","Semua A adalah C","Tidak ada A yang C","A dan C tidak berhubungan"],a:1,h:"Ikuti hubungan dari A → B → C."},
        {q:"Aku bilangan genap, lebih dari 20, kurang dari 30, dan kelipatan 6. Aku adalah ...",choices:["22","24","26","28"],a:1,h:"Cek kelipatan 6 di antara 20 dan 30."},
        {q:"Ada 3 kotak. Setiap kotak berisi 4 kantong. Setiap kantong berisi 5 kelereng. Total ...",choices:["12","20","45","60"],a:3,h:"Kalikan jumlah pada setiap tingkat."},
        {q:"Jika hari ini Kamis, 19 hari lagi adalah ...",choices:["Senin","Selasa","Rabu","Kamis"],a:1,h:"19 bersisa 5 jika dibagi 7."}
      ]
    }
  ],
  miniBoss:{
    id:9,title:"Mini Boss — Stone Golem",icon:"🗿",difficulty:"Boss",xp:220,coins:100,
    boss:true,maxHP:220,
    questions:[
      {q:"48 ÷ 6 + 7 × 3 = ...",choices:["29","31","35","45"],a:0,h:"Kerjakan bagi dan kali sebelum tambah."},
      {q:"FPB 24 dan 36 adalah ...",choices:["6","8","12","18"],a:2,h:"Cari faktor terbesar yang sama."},
      {q:"-8 + 3 × 5 = ...",choices:["-25","7","15","23"],a:1,h:"Kerjakan perkalian terlebih dahulu."},
      {q:"30% dari 150 = ...",choices:["35","40","45","50"],a:2,h:"10% dari 150 adalah 15."}
    ]
  },
  finalBoss:{
    id:10,title:"Final Boss — Forest Dragon",icon:"🐉",difficulty:"Final Boss",xp:400,coins:220,
    boss:true,maxHP:320,
    questions:[
      {q:"(36 ÷ 6) × (14 - 9) = ...",choices:["25","30","35","40"],a:1,h:"Selesaikan dua bagian dalam kurung."},
      {q:"3/4 dari 120 = ...",choices:["80","90","100","110"],a:1,h:"120 ÷ 4 × 3."},
      {q:"Harga Rp250.000 naik 12%. Harga baru ...",choices:["Rp270.000","Rp275.000","Rp280.000","Rp290.000"],a:2,h:"12% dari 250.000 adalah 30.000."},
      {q:"KPK 12 dan 18 adalah ...",choices:["24","30","36","48"],a:2,h:"Cari kelipatan terkecil yang sama."},
      {q:"-7 × (-4) + 6 = ...",choices:["22","28","34","-34"],a:2,h:"Negatif × negatif = positif."}
    ]
  }
}
