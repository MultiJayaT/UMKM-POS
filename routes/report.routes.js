const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

router.get('/daily', verifyToken, isAdmin, reportController.getDailyReport);
router.get('/monthly', verifyToken, isAdmin, reportController.getMonthlyReport);

module.exports = router;
