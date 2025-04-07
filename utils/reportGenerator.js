const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');

/**
 * Fungsi untuk membuat workbook Excel dari data dan konfigurasi kolom.
 * @param {Array} data - Array of object, berisi data laporan.
 * @param {Array} columns - Array konfigurasi kolom, contoh:
 *   [{ header: 'ID', key: 'id', width: 10 }, { header: 'Total', key: 'total', width: 15 }]
 * @param {string} title - Judul worksheet (opsional).
 * @returns {ExcelJS.Workbook} workbook yang siap ditulis/dikirimkan.
 */
exports.generateExcelReport = async (data, columns, title = 'Report') => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(title);

  // Mendaftarkan konfigurasi kolom
  worksheet.columns = columns;

  // Menambahkan tiap baris data
  data.forEach((row) => {
    worksheet.addRow(row);
  });

  // Anda dapat menambahkan styling atau header tambahan jika diperlukan
  // Misalnya:
  // worksheet.getRow(1).font = { bold: true };

  return workbook;
};

/**
 * Fungsi untuk membuat dokumen PDF dari sekumpulan data.
 * @param {Array} data - Array of object yang berisi data laporan.
 * @param {string} title - Judul laporan untuk ditampilkan di bagian atas halaman.
 * @returns {PDFDocument} instance PDF dokumen yang siap di-stream/dikirim.
 */
exports.generatePDFReport = (data, title = 'Report') => {
  const doc = new PDFDocument({ margin: 30, size: 'A4' });
  
  // Menulis header judul laporan
  doc.fontSize(18).text(title, { align: 'center' });
  doc.moveDown();

  // Iterasi data dan tampilkan setiap entry sebagai baris teks
  data.forEach((item, index) => {
    // Membuat string untuk tiap entry dengan penggabungan key-value
    let line = Object.entries(item)
      .map(([key, value]) => `${key}: ${value}`)
      .join(' | ');
    doc.fontSize(12).text(line, { align: 'left' });
    // Memberi jarak antar baris
    if (index < data.length - 1) doc.moveDown(0.5);
  });

  // Pastikan doc.end() dipanggil di controller setelah piping (jika ingin mengirim langsung ke response)
  return doc;
};
