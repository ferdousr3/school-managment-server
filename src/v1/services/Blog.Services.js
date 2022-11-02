const Blog = require("../model/Blog");
/**
 * get all blogs
 * get pagination
 * get query parameter
 */
exports.getBlogsService = async (filters, queries) => {
  const blogs = await Blog.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const total = await Blog.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);
  return { total, page, blogs };
};

/**
 * get blog with its id
 */
exports.getBlogByIdService = async (id) => {
  const blog = await Blog.findOne({ _id: id });
  return blog;
};

/**
 * add a new blog blog
 */
exports.createBlogService = async (data, res) => {
  const blog = await Blog.create(data);
  return blog;
};

/**
 * update blog by id  service
 */

exports.updateBlogByIdService = async (blogId, data) => {
  const result = await Blog.updateOne(
    { _id: blogId },
    { $set: data },
    {
      runValidators: true,
    }
  );
  return result;
};

/**
 * delete blog by id
 */

exports.deleteBlogByIdService = async (id) => {
  const result = await Blog.deleteOne({ _id: id });
  return result;
};
