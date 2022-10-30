const Blog = require("../model/Blog");

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

// add new blogs
exports.createProductService = async (data, res) => {
  const blog = await Blog.create(data);
  console.log(res);
  return blog;
};
