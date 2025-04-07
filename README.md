# 🛒 Backend Aplikasi POS UMKM

Sistem Point of Sales (POS) untuk UMKM yang menjual produk **rumah tangga**, **pertanian**, dan **peternakan**. Backend ini dibangun menggunakan **Express.js** dan **MySQL** untuk mengelola produk, stok, transaksi, laporan, dan pengguna (admin & kasir).

---

## 📌 1. Perencanaan

### 🎯 Tujuan Aplikasi
- Memudahkan UMKM dalam mengelola toko dan operasional penjualan
- Mengelola data produk, stok, pembeli, dan laporan penjualan secara otomatis
- Menyediakan sistem multi-user (Admin & Kasir) dengan hak akses yang berbeda
- Menghasilkan laporan penjualan otomatis dan dapat diunduh

### ⭐ Fitur Utama Backend
- 🔐 Autentikasi & Otorisasi (JWT)
- 📦 Manajemen Produk & Kategori (CRUD)
- 📉 Update stok otomatis saat transaksi
- 👥 Manajemen Pembeli dan jatah pembelian
- 💳 Transaksi Penjualan (cetak struk)
- 📊 Laporan Penjualan (Excel & PDF)
- 👤 Manajemen Pengguna dan Hak Akses

### 🛠️ Teknologi Backend
- **Framework**: Express.js
- **Database**: MySQL
- **Autentikasi**: JWT
- **Upload Gambar**: Multer
- **Laporan**: ExcelJS & PDFKit

---

## 🧠 2. Analisis Kebutuhan

### 📌 Use Case
- **Admin**:
  - Mengelola Produk & Kategori
  - Mendaftarkan Pembeli
  - Menetapkan jatah pembelian
  - Melihat & mengekspor laporan
- **Kasir**:
  - Melayani transaksi penjualan
  - Mencetak struk

### 📊 ERD (Entity Relationship Diagram)
- **Users**: `id`, `username`, `password`, `role (admin|kasir)`
- **Products**: `id`, `name`, `category`, `price`, `stock`, `image`
- **Categories**: `id`, `name`
- **Customers**: `id`, `name`, `phone`, `purchase_limit`
- **Transactions**: `id`, `customer_id`, `user_id`, `total`, `date`
- **Transaction_Details**: `id`, `transaction_id`, `product_id`, `quantity`, `subtotal`

--- 

## 🔁 3. Alur Transaksi

1. Admin memasukkan data produk & gambar sesuai kategori
2. Pembeli mendaftarkan diri → Admin menetapkan jatah pembelian
3. Pembeli datang ke kasir
4. Kasir mencari identitas pembeli
5. Sistem menampilkan produk yang dapat dibeli sesuai jatah
6. Kasir melakukan transaksi
7. Sistem:
   - Mengurangi stok produk
   - Mengurangi jatah pembelian pembeli
   - Menyimpan transaksi
8. Kasir mencetak nota pembelian
9. Admin dapat melihat laporan transaksi:
   - Harian, Bulanan
   - Export Excel/PDF

---

## ⚙️ 4. Instalasi & Setup

### ✅ Prasyarat
- Node.js & npm
- MySQL Server

### 🚀 Langkah Instalasi

```bash
git clone https://github.com/username/pos-umkm-backend.git
cd pos-umkm-backend
npm install

```

##  Setup Awal
- Buat database MySql
- Import file dari database/db.sql ke database yang telah anda buat
- Konfigurasi file .env dan sesuaikan dengan database anda


## Instalasi Dependensi
- npm install express bcyrpt cors dotenv jsonwebtoken mysql2 exceljs multer pdfkit

## Jalankan API dengan
- node app.js

atau menginstall nodemon agar server dapat merestart otomatis jika ada perubahan

## API Endpoint

- POST auth/register = untuk registrasi pengguna (admin, kasir)
- POST auth/login = untuk login pengguna

- POST /products = Menambahkan produk (Hanya admin yang dapat akses)
- GET /products = Menampilkan produk
- PUT /products/:id = Edit produk (admin)
- GET /products/:id = Detail produk
- DELETE /products/:id = Menghapus produk

- POST /customers = Menambahkan customer (admin)
- GET /customers = Menampilkan customer

- GET /reports/daily/:tanggal = Laporan transaksi harian
- GET /reports/monthly/:bulan = Laporan transaksi bulanan

- POST /transactions = Transaksi (kasir)
- GET /transactions = Menampilkan detail transaksi

Anda dapat menguji Endpoint menggunakan POSTMAN atau Thunderclient jika menggunakan VSCODE

            SELAMAT MENCOBA


## API INI MASIH DALAM TAHAP PENGEMBANGAN