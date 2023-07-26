const express = require("express");
const OrderHistoryRouter = express.Router();
const OrderHistory = require("../Models/Order_historyModel");
const { isAuth } = require("../Middlewares/AuthMiddleware");
const order_history = require("../Schemas/Order_historySchema");
// const Order_historySchema = require("../Schemas/Order_historySchema");


// /order_history/create
OrderHistoryRouter.post("/create_order_history", isAuth, async (req, res) => {
  const { orderAmount, orderDate, orderStatus, userId } = req.body;

  try {
    // Create an object for the order history class
    const orderHistoryObj = new OrderHistory({
      orderAmount,
      orderDate,
      orderStatus,
      userId,
    });

    const orderHistoryDb = await orderHistoryObj.createOrderHistory();
    console.log(orderHistoryDb);
    return res.send({
      status: 200,
      message: "Order History Created Successfully",
      data: orderHistoryDb,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
});

// /order_history by userId /:userId
OrderHistoryRouter.get("/getorderhistory/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const orderHistoryDb = await OrderHistory.getOrderHistoryByUserId(userId);
    return res.send({
      status: 200,
      message: "Order History Found",
      data: orderHistoryDb,
    });
  } catch (error) {
    return res.send({
      status: 404,
      message: "Order history not found",
      error: error,
    });
  }
});

OrderHistoryRouter.get("/order_history", isAuth, async (req, res) => {
  const userId = req.user.userId; // Assuming you have the user ID from the authenticated user

  try {
    // Find orders by userId to get the order history
    const orderHistory = await order_history.find({ userId: userId });

    return res.send({
      status: 200,
      message: "Order History Found",
      data: orderHistory,
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Database error",
      error: error,
    });
  }
});

module.exports = OrderHistoryRouter;
