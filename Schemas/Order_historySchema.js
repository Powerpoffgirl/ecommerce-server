const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order_historySchema = new Schema({
  orderAmount: {
    type: Number,
    require: true,
  },
  orderDate: {
    type: String,
    require: true,
  },
  orderStatus: {
    type: Boolean,
    require: true,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
  },
});

module.exports = mongoose.model("order_history", order_historySchema);
