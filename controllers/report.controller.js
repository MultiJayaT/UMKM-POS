const Transaction = require('../models/transaction.model');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const db = require('../config/db.config');

exports.getDailyReport = async (req, res, next) => {
  try {
    // Mengambil tanggal dari query: YYYY-MM-DD
    const { date, format } = req.query;
    const transactions = await Transaction.findByDate(date);

    if (format === 'excel') {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Laporan Harian');
      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'User ID', key: 'user_id', width: 10 },
        { header: 'Customer ID', key: 'customer_id', width: 15 },
        { header: 'Total', key: 'total', width: 15 },
        { header: 'Tanggal', key: 'date', width: 20 }
      ];
      transactions.forEach(tx => worksheet.addRow(tx));
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=laporan_harian.xlsx');
      await workbook.xlsx.write(res);
      res.end();
    } else if (format === 'pdf') {
      const doc = new PDFDocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=laporan_harian.pdf');
      doc.pipe(res);
      doc.fontSize(18).text('Laporan Harian', { align: 'center' });
      doc.moveDown();
      transactions.forEach(tx => {
        doc.fontSize(12).text(
          `ID: ${tx.id} | User ID: ${tx.user_id} | Customer ID: ${tx.customer_id} | Total: ${tx.total} | Tanggal: ${tx.date}`
        );
        doc.moveDown(0.5);
      });
      doc.end();
    } else {
      res.json(transactions);
    }
  } catch (err) {
    next(err);
  }
};

exports.getMonthlyReport = async (req, res, next) => {
  try {
    const { month, year, format } = req.query;
    // Query langsung dari database untuk filter bulan dan tahun
    const [rows] = await db.query(
      "SELECT * FROM transactions WHERE MONTH(date) = ? AND YEAR(date) = ?",
      [month, year]
    );
    if (format === 'excel') {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Laporan Bulanan');
      worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'User ID', key: 'user_id', width: 10 },
        { header: 'Customer ID', key: 'customer_id', width: 15 },
        { header: 'Total', key: 'total', width: 15 },
        { header: 'Tanggal', key: 'date', width: 20 }
      ];
      rows.forEach(tx => worksheet.addRow(tx));
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=laporan_bulanan.xlsx');
      await workbook.xlsx.write(res);
      res.end();
    } else if (format === 'pdf') {
      const doc = new PDFDocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=laporan_bulanan.pdf');
      doc.pipe(res);
      doc.fontSize(18).text('Laporan Bulanan', { align: 'center' });
      doc.moveDown();
      rows.forEach(tx => {
        doc.fontSize(12).text(
          `ID: ${tx.id} | User ID: ${tx.user_id} | Customer ID: ${tx.customer_id} | Total: ${tx.total} | Tanggal: ${tx.date}`
        );
        doc.moveDown(0.5);
      });
      doc.end();
    } else {
      res.json(rows);
    }
  } catch (err) {
    next(err);
  }
};
