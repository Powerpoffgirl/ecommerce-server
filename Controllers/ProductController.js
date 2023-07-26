const express = require("express");
const ProductRouter = express.Router();
const Product = require("../Models/ProductModel");
const { isAuth } = require("../Middlewares/AuthMiddleware");
const ProductSchema = require("../Schemas/ProductSchema");

//  /products/create
ProductRouter.post("/create_product", isAuth, async (req, res) => {
  console.log(req.body);
  const {
    productTitle,
    productDescription,
    productPrice,
    productAvailability,
    productQuantity,
    categoryId,
  } = req.body;

  try {
    // Add validation if needed, uncomment the code below
    // await validateProductData({
    //   productTitle,
    //   productDescription,
    //   productPrice,
    //   productAvailability,
    //   productQuantity,
    //   categoryId,
    // });

    // Create an object for the product class
    const productObj = new Product({
      productTitle,
      productDescription,
      productPrice,
      productAvailability,
      productQuantity,
      categoryId,
      createdBy: req.session.user.userId, // Assuming you store the userId in the user session.
    });

    const productDb = await productObj.createProduct();
    console.log(productDb);
    return res.send({
      status: 200,
      message: "Product Created Successfully",
      data: productDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
});



// list of all products based on categoryId
// Route to retrieve a list of products by category Id
ProductRouter.get("/products_by_categoryId/:categoryId", async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    // Use the getProductsByCategoryId function to fetch products by category Id
    const products = await Product.getProductsByCategoryId(categoryId);

    if (!products || products.length === 0) {
      return res.send({
        status: 404,
        message: "No products found for this category.",
      });
    }

    return res.send({
      status: 200,
      message: "Products Found",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.send({
      status: 500,
      message: "Database error",
      error: error.message,
    });
  }
});



// Route to get a single product by its productId
ProductRouter.get("/product_by_productId/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    const productDb = await Product.getProductById(productId);
    return res.send({
      status: 200,
      message: "Product Found",
      data: productDb,
    });
  } catch (error) {
    return res.send({
      status: 404,
      message: "Product not found",
      error: error,
    });
  }
});


module.exports = ProductRouter;
