const express = require("express");
const CartRouter = express.Router();
const mongoose = require("mongoose");
const Cart = require("../Models/CartModel");
const { isAuth } = require("../Middlewares/AuthMiddleware");

CartRouter.post("/create_cart", isAuth, async (req, res) => {
    const { productId, productQuantity, productPrice, cartTotal, sessionId, userId } = req.body;
  
    try {
      // Create an object for the cart class
      const cartObj = new Cart({
        productId,
        productQuantity,
        productPrice,
        cartTotal,
        sessionId,
        userId,
      });
  
      const cartDb = await cartObj.createCart();
      console.log(cartDb);
      return res.send({
        status: 200,
        message: "Cart Item Created Successfully",
        data: cartDb,
      });
    } catch (error) {
      return res.send({
        status: 500,
        message: "Database error",
        error: error,
      });
    }
  });

// get cart details/:sessionId
CartRouter.get("/get_cart/:sessionId", async (req, res) => {
  const sessionId = req.params.sessionId;

  try {
    const cartDb = await Cart.getCartBySessionId(sessionId);
    return res.send({
      status: 200,
      message: "Cart Items Found",
      data: cartDb,
    });
  } catch (error) {
    return res.send({
      status: 404,
      message: "Cart items not found",
      error: error,
    });
  }
});

// /cart/update/:cartItemId
CartRouter.put("/update_cart_quantity/:cartItemId", isAuth, async (req, res) => {
  const cartItemId = req.params.cartItemId;
  const { newQuantity } = req.body;

  try {
    const updatedCartItem = await Cart.updateCartItemQuantity(cartItemId, newQuantity);
    return res.send({
      status: 200,
      message: "Cart Item Quantity Updated Successfully",
      data: updatedCartItem,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
});

// /cart/delete/:cartItemId
CartRouter.delete("/delete_cart/:cartId", isAuth, async (req, res) => {
    const cartId = req.params.cartId;
  
    try {
      const deletedCart = await Cart.deleteCartById(cartId);
      if (!deletedCart) {
        return res.status(404).json({
          status: 404,
          message: "Cart not found",
        });
      }
  
      return res.status(200).json({
        status: 200,
        message: "Cart deleted successfully",
        data: deletedCart,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Database error",
        error: error.message,
      });
    }
  });

module.exports = CartRouter;
