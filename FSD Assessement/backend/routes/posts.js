const express = require('express');
const PostController = require('../controllers/post-controller');
const router = express.Router();



router.post("/posts",PostController.getpost);



module.exports = router