const express = require('express');
const adminController = require('../controllers/admin-controller');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');



router.post("/signup",  adminController.adminSignup);
router.post("/login", adminController.adminLogin);


module.exports = router;