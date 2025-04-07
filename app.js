const express = require('express');
const app = express();
const cors = require("cors")
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const transactionRoutes = require('./routes/transaction.routes');
const customerRoutes = require('./routes/customer.routes');
const reportRoutes = require('./routes/report.routes');

const { errorHandler } = require('./middlewares/error.middleware');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Menyajikan file statis untuk folder upload (gambar produk)
app.use('/uploads', express.static('uploads'));

// Routing API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/reports', reportRoutes);

// Middleware Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});
