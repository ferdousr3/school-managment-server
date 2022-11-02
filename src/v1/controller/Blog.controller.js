const {
  getBlogsService,
  getBlogByIdService,
  updateBlogByIdService,
  createBlogService,
  deleteBlogByIdService,
} = require("../services/Blog.Services");

/**
 * 1.get all blogs
 * 2. get blog with query parameter
 * 3. pagination
 */

exports.getBlog = async (req, res) => {
  try {
    let filters = { ...req.query };

    //sort , page , limit -> exclude
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    //gt ,lt ,gte .lte
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query; // "3" "10"
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const blogs = await getBlogsService(filters, queries);

    res.status(200).json({
      status: "success",
      data: blogs,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the Blogs",
      error: error.message,
    });
  }
};
/**
 * 1.get Single  blog by Id
 */

exports.getBlogById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await getBlogByIdService(id);

    //* if blog not found with requested id

    if (!blog) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find a blog ",
      });
    }

    res.status(200).json({
      status: "success",
      data: blog,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error: "Couldn't get the blog",
    });
  }
};

/**
 * add new blog
 * got to service folder for `createProductService` function
 */
exports.createBlog = async (req, res) => {
  try {
    const blog = await createBlogService(req.body);
    const id = blog._id;
    res.status(200).json({
      status: "success",
      message: "Add blog successfully",
      id: id,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Blog is not inserted ",
      error: error.message,
    });
  }
};

/**
 * update blog by id
 */

exports.updateBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await updateBlogByIdService(id, req.body);

    //* if blog not not updated
    if (!result.modifiedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't update the Blog with this id",
        result,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully updated the Blog",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the Blog",
      error: error.message,
    });
  }
};

/**
 * delete blog by id
 */

exports.deleteBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteBlogByIdService(id);
    //* if don't delete any blog
    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't delete the Blog",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully deleted the Blog",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't delete the Blog",
      error: error.message,
    });
  }
};
