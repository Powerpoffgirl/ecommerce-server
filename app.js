const express = require("express");
const app = express();
require("dotenv").config();
const clc = require("cli-color");
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const session = require("express-session");
const mongoDbSession = require("connect-mongodb-session")(session);
const db = require("./db");
const AuthRouter = require("./Controllers/AuthController");
const ProductRouter = require("./Controllers/ProductController");
const CategoryRouter = require("./Controllers/CategoryController");
const {isAuth} = require("./Middlewares/AuthMiddleware");
const OrderRouter = require("./Controllers/OrderController");
const CartRouter = require("./Controllers/CartController");
const OrderHistoryRouter = require("./Controllers/Order_historyController");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const store = new mongoDbSession({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SECRECT_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.get("/", (req, res) => {
  return res.send({
    status: 200,
    message: "Welcome to my ecommerce app",
  });
});

app.use(AuthRouter);
app.use("/auth", AuthRouter);
app.use("/auth", isAuth, ProductRouter);
app.use("/auth", isAuth, CategoryRouter)
app.use("/auth", isAuth, OrderRouter)
app.use("/auth", isAuth, CartRouter)
app.use("/auth", isAuth, OrderHistoryRouter)

// Server is listening
app.listen(PORT, () => {
  console.log(clc.yellow.underline(`Server is running on port ${PORT}`));
});
