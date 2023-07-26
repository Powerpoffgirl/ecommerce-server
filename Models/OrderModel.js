const OrderSchema = require("../Schemas/OrderSchema");
const CartSchema = require("../Schemas/CartSchema");

class Order {
  productName;
  productPrice;
  productQuantity;
  orderHistoryId;

  constructor({ productName, productPrice, productQuantity, orderHistoryId }) {
    this.productName = productName;
    this.productPrice = productPrice;
    this.productQuantity = productQuantity;
    this.orderHistoryId = orderHistoryId;
  }

  createOrder() {
    return new Promise(async (resolve, reject) => {
      const order = new OrderSchema({
        productName: this.productName,
        productPrice: this.productPrice,
        productQuantity: this.productQuantity,
        orderHistoryId: this.orderHistoryId,
      });

      try {
        const orderDb = await order.save();
        resolve(orderDb);
      } catch (error) {
        reject(error);
      }
    });
  }

  static getOrderById(orderId) {
    return new Promise(async (resolve, reject) => {
      try {
        const orderDb = await OrderSchema.findById(orderId);
        if (!orderDb) {
          reject(`No order corresponding to this ${orderId}`);
        }
        resolve(orderDb);
      } catch (error) {
        reject(error);
      }
    });
  }

  
  static async getCartByUserId(sessionId) {
    try {
      // Find cart items based on the sessionId
      const cartDb = await CartSchema.find({ sessionId: sessionId });
      console.log("CART DB", cartDb);
      return cartDb;
    } catch (error) {
      throw error;
    }
  }

  // static async removeCartByUserId(userId) {
  //   try {
  //     await CartSchema.deleteMany({ userId: userId });
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  // Add other static methods if needed, e.g., for updating or deleting orders


  static getOrderById(orderId) {
    return new Promise(async (resolve, reject) => {
      try {
        const orderDb = await OrderSchema.findById(orderId);
        if (!orderDb) {
          reject(`No order corresponding to this ${orderId}`);
        }
        resolve(orderDb);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = Order;
