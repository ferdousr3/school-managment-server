const express = require("express");
const router = express.Router();
const blogController = require("../controller/Blog.controller");

/**
 * get and create blog route
 */
router.route("/").get(blogController.getBlog).post(blogController.createBlog);
/**
 * get single blog
 * update single blog
 * delete single blog
 */
router
  .route("/:id")
  .get(blogController.getBlogById)
  .patch(blogController.updateBlogById)
  .delete(blogController.deleteBlogById);

module.exports = router;
