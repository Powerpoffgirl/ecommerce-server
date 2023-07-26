const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  cartTotal: {
    type: Number,
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  userId:{
    type: Schema.Types.ObjectId,
    required: true,
  }
});

module.exports = mongoose.model("cart", cartSchema)
