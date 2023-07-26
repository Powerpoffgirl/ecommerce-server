const express = require("express");
const CategoryRouter = express.Router();
const Category = require("../Models/CategoryModel");
const { isAuth } = require("../Middlewares/AuthMiddleware");

// /categories/create
CategoryRouter.post("/create_category", isAuth, async (req, res) => {
  try {
    const { categoryName } = req.body; // Assuming the categoryName is sent in the request body
    if (!categoryName) {
      return res.status(400).json({ message: "categoryName is required" });
    }

    // Create a new category object with the provided categoryName
    const newCategory = new Category({ categoryName });

    // Call the createCategory method to save the category to the database
    const categoryDb = await newCategory.createCategory();

    return res.status(200).json({
      message: "Category created successfully",
      data: categoryDb,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({ message: "Database error", error });
  }
});

// Get all categories
CategoryRouter.get("/list_categories", isAuth, async (req, res) => {
  try {
    const allCategories = await Category.getAllCategories();
    return res.send({
      status: 200,
      message: "All Categories Found",
      data: allCategories,
    });
  } catch (error) {
    console.error(error); // Log the error details
    return res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
});

// /categories/:id
CategoryRouter.get("/:id", async (req, res) => {
  const categoryId = req.params.id;

  try {
    const categoryDb = await Category.getCategoryById(categoryId);
    return res.send({
      status: 200,
      message: "Category Found",
      data: categoryDb,
    });
  } catch (error) {
    console.error(error); // Log the error details
    return res.send({
      status: 404,
      message: "Category not found",
      error: error,
    });
  }
});

module.exports = CategoryRouter;

