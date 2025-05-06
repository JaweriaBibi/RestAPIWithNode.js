const Product = require("../models/products");


const getAllProducts = async (req, res) => {
    const {company, name ,sort, select } = req.query;
    const queryObject = {};

    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = {$regex: name, $options: "i"};
    }
    let result = Product.find(queryObject);

    if (sort) {
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    } else {
        result = result.sort("-price"); // default sort
    }

    if (select) {
        const selectList = select.split(",").join(" ");
        result = result.select(selectList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const products = await result;
    res.status(200).json({ products, nbHits: products.length });
};


const getAllProductsTesting = async (req, res) => {
    try {
      const products = await Product.find(req.query).select("name price");
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = { getAllProducts, getAllProductsTesting };


