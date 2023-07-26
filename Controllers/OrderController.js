const express = require("express");
const OrderRouter = express.Router();
const Order = require("../Models/OrderModel");
const Cart = require("../Models/CartModel");
const { isAuth } = require("../Middlewares/AuthMiddleware");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;


// /orders/create
OrderRouter.post("/create_order", isAuth, async (req, res) => {
  const { productName, productPrice, productQuantity, orderHistoryId } = req.body;

  try {
    // Create an object for the order class
    const orderObj = new Order({
      productName,
      productPrice,
      productQuantity,
      orderHistoryId,
    });

    const orderDb = await orderObj.createOrder();
    console.log(orderDb);
    return res.send({
      status: 200,
      message: "Order Created Successfully",
      data: orderDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
});

// Get Order by orderId
OrderRouter.get("/getorderbyid/:id", async (req, res) => {
  const orderId = req.params.id;

  try {
    const orderDb = await Order.getOrderById(orderId);
    return res.send({
      status: 200,
      message: "Order Found",
      data: orderDb,
    });
  } catch (error) {
    return res.send({
      status: 404,
      message: "Order not found",
      error: error,
    });
  }
});



// Place an order with products from the user's cart
OrderRouter.post("/place_order_from_cart", isAuth, async (req, res) => {
  console.log("REQUEST USER", req.user);

  const userId = req.user.userId; // Assuming you have the user ID from the authenticated user

  // Generate a new ObjectId for the order history
  const orderHistoryId = new ObjectId();
  console.log("Order History", orderHistoryId);

  try {
    // Get the cart items by user ID
    const cartItems = await Cart.getCartByUserId(userId);
    console.log("CART ITEMS", cartItems);

    if (cartItems.length === 0) {
      return res.send({
        status: 400,
        message: "Cart is empty, cannot place an order.",
      });
    }

    // Create an order object with relevant information from cart items
    const orderObj = new Order({
      userId: userId,
      orderItems: cartItems.map((cartItem) => ({
        productId: cartItem.productId,
        productQuantity: cartItem.productQuantity,
        productPrice: cartItem.productPrice,
      })),
      orderTotal: cartItems.reduce((total, cartItem) => total + cartItem.cartTotal, 0),
      orderHistoryId: orderHistoryId, // Assign the generated ObjectId to orderHistoryId field
    });

    // Save the order to the database
    const savedOrder = await orderObj.createOrder();

    // Clear the user's cart after the order is successfully placed
    await Cart.removeCartByUserId(userId);

    return res.send({
      status: 200,
      message: "Order Placed Successfully",
      data: savedOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error); // Log the error for debugging purposes

    return res.send({
      status: 500,
      message: "Database error",
      error: error.message, // Send the error message in the response
    });
  }
});


module.exports = OrderRouter;
