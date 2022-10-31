const {
  createProductService,
  getBlogsService,
} = require("../services/Blog.Services");

/**
 * 1.get all blogs
 * 2. get single blogs
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
      console.log(fields);
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
 * add new blog
 * got to service folder for `createProductService` function
 */
exports.createBlog = async (req, res) => {
  try {
    const blog = await createProductService(req.body);
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
