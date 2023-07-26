const OrderHistorySchema = require("../Schemas/Order_historySchema");

class OrderHistory {
  orderAmount;
  orderDate;
  orderStatus;
  userId;

  constructor({ orderAmount, orderDate, orderStatus, userId }) {
    this.orderAmount = orderAmount;
    this.orderDate = orderDate;
    this.orderStatus = orderStatus;
    this.userId = userId;
  }

  createOrderHistory() {
    return new Promise(async (resolve, reject) => {
      const orderHistory = new OrderHistorySchema({
        orderAmount: this.orderAmount,
        orderDate: this.orderDate,
        orderStatus: this.orderStatus,
        userId: this.userId,
      });

      try {
        const orderHistoryDb = await orderHistory.save();
        resolve(orderHistoryDb);
      } catch (error) {
        reject(error);
      }
    });
  }

  static getOrderHistoryByUserId(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const orderHistoryDb = await OrderHistorySchema.find({ userId: userId });
        resolve(orderHistoryDb);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Add other static methods if needed, e.g., for updating or deleting order history

}

module.exports = OrderHistory;
