const CategorySchema = require("../Schemas/CategorySchema");

class Category {
  constructor({ categoryName }) {
    this.categoryName = categoryName;
  }

  async createCategory() {
    try {
      // Create a new category document with the provided categoryName
      const category = new CategorySchema({
        categoryName: this.categoryName,
      });

      // Save the category document to the database
      const categoryDb = await category.save();

      return categoryDb;
    } catch (error) {
      throw error;
    }
  }

  static async getCategoryById(categoryId) {
    try {
      const categoryDb = await CategorySchema.findById(categoryId);
      if (!categoryDb) {
        throw `No category corresponding to this ${categoryId}`;
      }
      return categoryDb;
    } catch (error) {
      throw error;
    }
  }

  static async getAllCategories() {
    try {
      const allCategories = await CategorySchema.find({});
      return allCategories;
    } catch (error) {
      throw error;
    }
  }

  // Add other static methods if needed, e.g., for updating or deleting categories
}

module.exports = Category;


