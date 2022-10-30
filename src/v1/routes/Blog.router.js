const express = require("express");
const router = express.Router();
const blogController = require("../controller/Blog.controller");

router.route("/").get(blogController.getBlog).post(blogController.createBlog);

module.exports = router;
