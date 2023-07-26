const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  productName: {
    type: String,
  },
  productPrice: {
    type: Number,
    require: true,
  },
  productQuantity:{
    type: Number,
  },
  orderHistoryId:{
    type: Schema.Types.ObjectId,
    require: true,
  }
});

module.exports = mongoose.model("orders", orderSchema);