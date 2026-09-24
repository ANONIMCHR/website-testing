/* ============================================================
   CONFIG.JS — SEMUA YANG BISA LO CUSTOM ADA DI SINI
   ------------------------------------------------------------
   Ubah isi objek CONFIG di bawah ini sesuka lo. Gak perlu
   sentuh file lain (index.html, style.css, app.js) sama
   sekali buat ganti teks, foto, link, atau project.
   ============================================================ */

const CONFIG = {

  /* ---------- BRAND ---------- */
  brand: {
    name: "Christ Official",
    tagline: "Developer",
    faviconEmoji: "🌌"
  },

  /* ---------- INTRO (efek ketikan pelan-pelan) ---------- */
  intro: {
    lines: [
      "Halo, gua Christ.",
      "Gua bikin & jual software — desktop app & web tools.",
      "Fokus di dari tools buat gereja sampe gaming.",
      "Scroll ke bawah buat liat project & status panel gua."
    ],
    typingSpeedMs: 45,      // kecepatan ngetik per karakter
    pauseBetweenLinesMs: 900,
    loop: true              // ulang dari awal setelah selesai
  },

  /* ---------- PHOTO BOX (max 5 foto, pake link Catbox) ---------- */
  photoBox: {
    title: "❤",
    images: [
      // Tempel link Catbox lo di sini, urutan bebas, maksimal 5.
      // Contoh: "https://files.catbox.moe/abcd12.jpg",
      "https://files.catbox.moe/REPLACE-1.jpg",
      "https://files.catbox.moe/REPLACE-2.jpg"
    ],
    intervalMs: 5000
  },

  /* ---------- LEADERBOARD "PANEL FELIX TOOLS" ----------
     Tempel sampe 5 link RAW (raw.githubusercontent.com,
     pastebin raw, dsb) di array "sources". Tiap link WAJIB
     balikin JSON array dengan format kayak file panel lo:

     [
       {
         "username": "christ",
         "password": "xxxx",       // di-skip otomatis, GAK pernah ditampilin di web
         "name": "Christ",
         "role": "Owner",          // Owner | Moderator | Member | Reseller (bebas huruf besar/kecil)
         "active": true,           // false = badge "Nonaktif"
         "expiresAt": "2027-12-31" // dipake buat hitung "sisa waktu" otomatis
       }
     ]

     Yang ditampilin ke pengunjung cuma: name/username, role,
     status (Aktif / Nonaktif / Expired — otomatis dari
     "active" + "expiresAt"), dan sisa waktu (mis. "68 hari
     lagi", "Habis hari ini", "Habis 3 hari lalu"). Field
     "password" selalu dibuang sebelum dirender.

     ⚠️ Karena raw file ini kebaca publik lewat internet,
     idealnya isi "password" di file aslinya jangan plain-text
     kalau raw link-nya bisa diakses siapa aja — web ini cuma
     nampilin, bukan yang nyimpen datanya.

     Kalau satu link gagal diambil (mati/format salah), link
     itu dilewatin aja, sisanya tetep tampil.
  ------------------------------------------------------------ */
  leaderboard: {
    title: "Panel Felix Tools",
    subtitle: "Live status & role",
    sources: [
      "https://raw.githubusercontent.com/ANONIMCHR/database/refs/heads/main/users.json",
      "https://raw.githubusercontent.com/USERNAME/REPO/main/data2.json",
      "https://raw.githubusercontent.com/USERNAME/REPO/main/data3.json",
      "https://raw.githubusercontent.com/USERNAME/REPO/main/data4.json",
      "https://raw.githubusercontent.com/USERNAME/REPO/main/data5.json"
    ],
    refreshMs: 30000, // auto-refresh tiap 30 detik, set 0 buat matiin
    roleColors: {
      owner:      "#ff2b3d",
      moderator:  "#b26bff",
      member:     "#3ba7ff",
      reseller:   "#ffd60a"
    },
    roleLabels: {
      owner: "Owner",
      moderator: "Moderator",
      member: "Member",
      reseller: "Reseller"
    }
  },

  /* ---------- PROJECTS ---------- */
  projects: [
    {
      name: "Gereja Presenter",
      description: "Desktop app presentasi ibadah (Electron.js) — alternatif EasyWorship yang lebih simpel. Ada manajemen lirik & playlist, Alkitab TB 66 kitab lengkap, custom font, background video/gambar, animasi teks, dual-screen live output + preview.",
      tag: "Desktop · Electron.js",
      link: "#"
    },
    {
      name: "AntiCheat Guard v1.0",
      description: "Desktop app (Electron.js) buat game Blood Strike — scan proses Windows lewat tasklist & WMIC, UI bertema galaxy, PIN unlock, force-close proses mencurigakan, sama notifikasi Windows.",
      tag: "Desktop · Electron.js",
      link: "#"
    },
    {
      name: "ApiApi",
      description: "Project Node.js yang integrasiin WhatsApp (Baileys), Telegram Bot, dan SSH jadi satu panel kontrol.",
      tag: "Backend · Node.js",
      link: "#"
    },
    {
      name: "Web Panel Management",
      description: "Panel manajemen berbasis satu file HTML — login, sinkronisasi GitHub, dan sistem role bertingkat (admin/owner/reseller) dengan tema merah-putih.",
      tag: "Web Tool",
      link: "#"
    }
  ],

  /* ---------- SOCIAL / KONTAK ---------- */
  socials: {
    instagram: "https://instagram.com/christandyk_",
    whatsapp: "https://wa.me/6285811454916",
    email: "christandykakauhe4@gmail.com"
  }
};
