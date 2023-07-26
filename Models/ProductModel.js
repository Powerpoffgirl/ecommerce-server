const ProductSchema = require("../Schemas/ProductSchema");
// const ObjectId = require("mongodb").ObjectId;

class Product {
  constructor({ productTitle, productDescription, productPrice, productAvailability, productQuantity, categoryId }) {
    this.productTitle = productTitle;
    this.productDescription = productDescription;
    this.productPrice = productPrice;
    this.productAvailability = productAvailability;
    this.productQuantity = productQuantity;
    this.categoryId = categoryId;
  }
  
    createProduct() {
      return new Promise(async (resolve, reject) => {
        const product = new ProductSchema({
          productTitle: this.productTitle,
          productDescription: this.productDescription,
          productPrice: this.productPrice,
          productAvailability : this.productAvailability,
          productQuantity : this.productQuantity,
          categoryId: this.categoryId,
        });
  
        try {
          const productDb = await product.save();
          resolve(productDb);
        } catch (error) {
          reject(error);
        }
      });
    }

    static async getProductsByCategoryId(categoryId) {
      try {
        const products = await ProductSchema.find({ categoryId });
        return products;
      } catch (error) {
        throw error;
      }
    }

    static async getProductById(productId) {
      try {
        const productDb = await ProductSchema.findById(productId);
        if (!productDb) {
          throw `No product corresponding to this ${productId}`;
        }
        return productDb;
      } catch (error) {
        throw error;
      }
    }
    // You can define additional methods for retrieving, updating, or deleting products if needed
  }

  module.exports = Product;