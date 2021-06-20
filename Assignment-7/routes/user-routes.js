const express = require('express');
const userController = require('../controllers/user-controller');
const router = express.Router();

const checkAuth = require('../middlewares/check-auth');

router.post("/signup",  userController.userSignup);
router.post("/login", userController.userLogin);

router.use(checkAuth);

router.get("/getuser",userController.getUser);
router.post("/postblog",userController.postBlog);
router.get("/getblog",userController.getBlog);

module.exports = router;