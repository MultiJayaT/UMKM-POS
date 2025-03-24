const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // Pastikan importnya benar
const authenticateUser = require("../middlewares/authMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
//router.get("/profile", authenticateUser, userController.getProfile);

module.exports = router;
