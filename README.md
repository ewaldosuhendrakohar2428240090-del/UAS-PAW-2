# AgroForge - Platform Marketplace Agrikultur (Fullstack)

Proyek ini merupakan implementasi sistem marketplace agrikultur terintegrasi yang menghubungkan aplikasi Frontend (React + Vite + TypeScript) dengan RESTful API Backend yang dibangun menggunakan **Express.js**, **Node.js**, dan database **MongoDB**. 

Struktur arsitektur kode backend disesuaikan secara konsisten mengikuti standar arsitektur pada materi mata kuliah **PAW2 (`ExpressJS/restful-api-app`)**.

---

## 👨‍💻 Identitas Pengembang
- **Nama**: Ewaldo Suhendra Kohar
- **NPM**: 2428240090
- **Mata Kuliah**: Pemrograman Aplikasi Web II (PAW2)
- **Kelas**: SI5B

---

## 📁 Struktur Direktori Backend (`AgroForge-main/backend`)

Arsitektur direktori backend mengadopsi pola MVC/Modular Controller-Model-Route-Middleware:

```text
AgroForge-main/backend/
├── controllers/
│   ├── adminController.js      # Handler monitoring, statistik, komplain, & penjual
│   ├── authController.js       # Handler registrasi, login JWT, & verifikasi user (/me)
│   ├── orderController.js      # Handler pembuatan order (checkout) & riwayat pesanan
│   └── productController.js    # Handler CRUD & filter/pencarian katalog produk
├── middlewares/
│   ├── errorHandler.js         # Centralized error handler & status HTTP resolver
│   ├── hanyaRole.js            # Middleware Role-Based Access Control (RBAC)
│   ├── logger.js               # Middleware logging waktu & method HTTP request
│   └── verifyToken.js          # Middleware otentikasi JWT Bearer token
├── models/
│   ├── complaintModel.js       # Schema Mongoose untuk komplain layanan
│   ├── orderModel.js           # Schema Mongoose untuk pesanan & alamat pengiriman
│   ├── productModel.js         # Schema Mongoose untuk data produk, spesifikasi, & stok
│   └── userModel.js            # Schema Mongoose pengguna (pembeli, penjual, admin)
├── routes/
│   ├── adminRoutes.js          # Router endpoint modul admin
│   ├── authRoutes.js           # Router endpoint registrasi & login
│   ├── orderRoutes.js          # Router endpoint modul pesanan & checkout
│   └── productRoutes.js        # Router endpoint CRUD produk agrikultur
├── .env                        # Konfigurasi environment (PORT, DB_URI, JWT_SECRET, dll.)
├── .env.example                # Template konfigurasi environment
├── app.js                      # Entry point Express.js, middleware global, & koneksi DB
├── package.json                # Metadata & dependensi backend
└── seed.js                     # Script inisialisasi data awal database MongoDB
```

---

## 🛠️ Rincian Implementasi & Perubahan yang Dibuat

### 1. Sistem Autentikasi & Keamanan (JWT & Bcrypt)
- **Hashing Password**: Menggunakan `bcrypt` dengan 10 salt rounds untuk keamanan password pengguna.
- **JSON Web Token (JWT)**: Diterbitkan saat `POST /auth/login` dan `POST /auth/register` dengan masa berlaku 24 jam.
- **Middleware Proteksi**:
  - `verifyToken.js`: Memverifikasi header `Authorization: Bearer <token>`.
  - `hanyaRole.js`: Membatasi endpoint tertentu hanya untuk role pengguna yang sah (misal: role `'penjual'` atau `'admin'`).

### 2. Pengelolaan Katalog Produk Agrikultur
- **Endpoint**: `GET /products`, `GET /products/:id`, `POST /products`, `PUT /products/:id`, `DELETE /products/:id`.
- **Fitur Filtering & Query**:
  - Filter kategori (`?category=Traktor & Mesin`).
  - Pencarian teks nama, deskripsi, brand, dan tags (`?search=...`).
  - Filter rentang harga (`?minPrice=...&maxPrice=...`), rating, dan stok.
  - Sorting berdasarkan harga termurah/termahal, rating tertinggi, dan nama produk.

### 3. Modul Pesanan (Checkout & Orders)
- **Endpoint**: `GET /orders`, `POST /orders`, `PUT /orders/:id/status`.
- Menyimpan detail item pesanan, total harga, alamat pengiriman, metode pembayaran, nomor resi otomatis, dan status pemrosesan.

### 4. Modul Admin & Dasbor Penjual
- **Endpoint**: `GET /admin/stats`, `GET /admin/complaints`, `POST /admin/complaints`, `PUT /admin/complaints/:id/resolve`, `GET /admin/sellers`.
- Menyediakan data statistik server, pemantauan komplain pengguna, serta pengelolaan seller aktif.

### 5. Seeding Database Otomatis (`seed.js`)
- Disediakan script seed untuk langsung menginisialisasi akun demo dan produk default ke MongoDB:
  - **Pembeli**: `marcus@tillmanfarm.com` / `farm2024`
  - **Penjual**: `seller@agroforge.com` / `seller2024`
  - **Admin**: `admin@agroforge.com` / `admin2024`

### 6. Integrasi Frontend (`src/api.ts`)
- Dibuat modul helper API di frontend (`AgroForge-main/src/api.ts`) yang siap digunakan untuk menghubungkan antarmuka React dengan backend Express.js.

---

## 🧪 Koleksi Uji Coba Postman

File pengujian Postman telah disiapkan di folder `D:\Ewaldo\PAW2\ExpressJS\postman`:

1. **Format Koleksi JSON (Postman Import)**:
   - File: `D:\Ewaldo\PAW2\ExpressJS\postman\AgroForge_Postman_Collection.json`
   - Environment: `D:\Ewaldo\PAW2\ExpressJS\postman\AgroForge_Postman_Environment.json`
   - *Cara Menggunakan*: Buka Postman -> Klik tombol **Import** -> Pilih kedua file JSON tersebut.
2. **Format Native Postman Workspace (.yaml)**:
   - Direktori: `D:\Ewaldo\PAW2\ExpressJS\postman\collections\AgroForge\`
   - Berisi 11 file request YAML terstruktur mulai dari Auth, Products, Orders, hingga Admin Monitoring.

---

## 🚀 Panduan Menjalankan Sistem

### 1. Menjalankan Backend API
Buka terminal baru:
```powershell
cd "D:\Ewaldo\PAW2\AgroForge-main\backend"
# Jalankan seeding database (jika database masih kosong):
node seed.js

# Menjalankan server backend:
npm start
# atau dengan nodemon:
npm run dev
```
Server backend akan berjalan di **`http://localhost:5000`**.

### 2. Menjalankan Frontend
Buka terminal baru:
```powershell
cd "D:\Ewaldo\PAW2\AgroForge-main"
npm install
npm run dev
```
Aplikasi frontend akan terbuka di **`http://localhost:5173`**.
