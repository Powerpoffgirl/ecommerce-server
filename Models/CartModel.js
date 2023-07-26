const CartSchema = require("../Schemas/CartSchema");

class Cart {
  constructor({ productId, productQuantity, productPrice, cartTotal, sessionId, userId }) {
    this.productId = productId;
    this.productQuantity = productQuantity;
    this.productPrice = productPrice;
    this.cartTotal = cartTotal;
    this.sessionId = sessionId;
    this.userId = userId;
  }

  async createCart() {
    try {
      const cart = new CartSchema({
        productId: this.productId,
        productQuantity: this.productQuantity,
        productPrice: this.productPrice,
        cartTotal: this.cartTotal,
        sessionId: this.sessionId,
        userId:this.userId // Store the sessionId as a string
      });

      const cartDb = await cart.save();
      return cartDb;
    } catch (error) {
      throw error;
    }
  }

  static async getCartByUserId(userId) {
    try {
      console.log("USER ID FROM CART MODEL", userId)
      const cartDb = await CartSchema.find({ userId: userId });
      console.log("CART DB FROM CART MODEL", cartDb)
      return cartDb;
    } catch (error) {
      throw error;
    }
  }

  static async removeCartByUserId(userId) {
    try {
      const deletedCart = await CartSchema.deleteMany({ userId: userId });
      return deletedCart;
    } catch (error) {
      throw error;
    }
  }

  static async getCartBySessionId(sessionId) {
    try {
      const cartDb = await CartSchema.find({ sessionId: sessionId });
      return cartDb;
    } catch (error) {
      throw error;
    }
  }

  static async updateCartItemQuantity(cartItemId, newQuantity) {
    try {
      const cartItem = await CartSchema.findById(cartItemId);
      if (!cartItem) {
        throw `No cart item corresponding to this ${cartItemId}`;
      }

      cartItem.productQuantity = newQuantity;
      const updatedCartItem = await cartItem.save();
      return updatedCartItem;
    } catch (error) {
      throw error;
    }
  }

  static async deleteCartById(cartId) {
    try {
      const deletedCart = await CartSchema.findByIdAndDelete(cartId);
      return deletedCart;
    } catch (error) {
      throw error;
    }
  }

  // Add other static methods if needed, e.g., for updating or deleting cart items
}

module.exports = Cart;

