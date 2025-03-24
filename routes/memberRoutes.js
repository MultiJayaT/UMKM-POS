const express =  require("express");
const router = express.Router();
const { registerMember, getMemberByNIK } =  require("../controllers/memberController");

router.post("/register", registerMember);
router.get("/:nik", getMemberByNIK);

module.exports = router;