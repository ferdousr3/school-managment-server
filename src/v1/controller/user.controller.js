// const {
//   createTourService,
//   updateTourByIdService,
//   getToursService,
// } = require("../services/tour.services");
// const Tour = require("../models/tour");

//* get all tours
exports.getUsers = async (req, res, next) => {
  try {
    // let filters = { ...req.query };

    // //sort , page , limit
    // const excludeFields = ["sort", "page", "limit"];
    // excludeFields.forEach((field) => delete filters[field]);

    // //gt ,lt ,gte ,lte
    // let filtersString = JSON.stringify(filters);
    // filtersString = filtersString.replace(
    //   /\b(gt|gte|lt|lte)\b/g,
    //   (match) => `$${match}`
    // );

    // filters = JSON.parse(filtersString);

    // const queries = {};

    // if (req.query.sort) {
    //   // shorter name
    //   const sortBy = req.query.sort.split(",").join(" ");
    //   queries.sortBy = sortBy;
    //   console.log(sortBy);
    // }

    // if (req.query.fields) {
    //   const fields = req.query.fields.split(",").join(" ");
    //   queries.fields = fields;
    //   console.log(fields);
    // }

    // if (req.query.page) {
    //   // if page limit then default value 1 limit 10
    //   const { page = 1, limit = 10 } = req.query;
    //   const skip = (page - 1) * parseInt(limit);
    //   queries.skip = skip;
    //   queries.limit = parseInt(limit);
    // }

    // const tours = await getToursService(filters, queries);
    // res.status(200).json({
    //   status: "success",
    //   data: tours,
    // });
    console.log('first')
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "can't get the tour",
      error: error.message,
    });
  }
};


