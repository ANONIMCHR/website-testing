# Christ Official

Website satu halaman, tema galaxy (bintang + shooting star + nebula), isinya:

- Intro teks ketikan pelan-pelan (typewriter)
- Photo box kecil pojok kanan bawah, ganti gambar tiap 5 detik (pakai link Catbox)
- Leaderboard **"Panel Felix Tools"** — narik data live dari sampai 5 link raw JSON, nampilin username + role dengan warna glow beda-beda (owner merah, moderator ungu, member biru, reseller kuning) + status + waktu
- Section project-project
- Section sosial media / kontak

Semua bagian yang bisa diubah-ubah ada di **satu file**: `js/config.js`.
File lain (`index.html`, `css/style.css`, `js/app.js`, `js/galaxy.js`) gak perlu disentuh.

## Cara custom

Buka `js/config.js`, terus edit:

| Mau ubah apa | Bagian di config.js |
|---|---|
| Teks intro ketikan | `intro.lines` |
| Foto pacar (max 5, link Catbox) | `photoBox.images` |
| Link raw leaderboard (max 5) | `leaderboard.sources` |
| Warna role | `leaderboard.roleColors` |
| List project | `projects` |
| Instagram / WhatsApp / Email | `socials` |

### Format JSON yang wajib dibalikin sama tiap link raw leaderboard

Formatnya ngikutin file panel aslinya:

```json
[
  {
    "username": "christ",
    "password": "xxxx",
    "name": "Christ",
    "role": "Owner",
    "active": true,
    "expiresAt": "2027-12-31"
  },
  {
    "username": "PUTR4HXX",
    "password": "xxxx",
    "name": "PUTR4HXX",
    "role": "Moderator",
    "active": true,
    "expiresAt": "2026-10-23"
  }
]
```

- Yang ditampilin ke publik: **nama, role, status, sisa waktu**. Field `password` otomatis dibuang sebelum dirender — gak pernah nongol di halaman.
- `role` dikenali (gak case-sensitive): `Owner`, `Moderator`, `Member`, `Reseller`. Role lain tetep tampil, warnanya jatuh ke default member.
- Status dihitung otomatis dari `active` + `expiresAt`:
  - `active: false` → badge **Nonaktif**
  - `expiresAt` udah lewat → badge **Expired** (walau `active: true`)
  - selain itu → badge **Aktif**
- Sisa waktu otomatis dihitung dari `expiresAt`, contoh: "68 hari lagi", "Besok habis", "Habis hari ini", "Habis 3 hari lalu".
- Kalau salah satu link mati atau formatnya salah, link itu dilewatin otomatis — sisanya tetep tampil, jadi web-nya gak error total.
- Leaderboard auto-refresh tiap 30 detik (bisa diubah di `leaderboard.refreshMs`, isi `0` buat matiin auto-refresh).

⚠️ Raw link ini bisa diakses siapa aja lewat internet. Kalau file aslinya nyimpen `password` plain-text, itu risiko di sisi penyimpanan datanya sendiri — bukan sesuatu yang website ini kontrol, jadi pastiin akses ke raw link/repo-nya dijaga.

## Jalanin lokal

Karena ada `fetch()` ke link raw, buka langsung `index.html` lewat `file://` kadang diblokir browser. Paling gampang pakai server kecil:

```bash
npx serve .
# atau
python3 -m http.server 3000
```

## Deploy ke Vercel

**Opsi 1 — lewat CLI:**

```bash
npm i -g vercel
cd christ-official
vercel
```

Ikutin prompt-nya (pilih scope, nama project, dst). Pas ditanya *"Which directory is your code located in?"* jawab `./` soalnya ini static site, gak ada build step.

**Opsi 2 — lewat dashboard Vercel:**

1. Push folder ini ke repo GitHub baru.
2. Buka [vercel.com/new](https://vercel.com/new), import repo itu.
3. Framework preset pilih **Other** (static), biarin build command kosong, output directory `./`.
4. Klik Deploy.

Selesai — Vercel bakal kasih URL kayak `https://christ-official.vercel.app`.

## Struktur file

```
christ-official/
├── index.html
├── vercel.json
├── css/
│   └── style.css
└── js/
    ├── config.js      ← file yang lo edit
    ├── galaxy.js      ← efek bintang/galaxy (canvas)
    └── app.js         ← render logic (baca config.js)
```
