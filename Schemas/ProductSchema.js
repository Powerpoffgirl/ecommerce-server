const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productTitle: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productAvailability: {
    type: Boolean,
    default: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "categories", // Reference to the categories collection
    required: true,
  },
});

module.exports = mongoose.model("products", productSchema);
