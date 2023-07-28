# ecommerce-server

1. To Start the server: use npm run dev
2. Database used here is: MongoDB Atlas (I have added the database URL in the .env file)

TASK:-
Build an API set to support e-commerce operations, such as product and category listing, product
details, cart management, and order processing. Prefer firebase or any other suitable database to
manage product/category data, user cart information, and order details. The APi should also
handle token management in the system
Requirements:
1. API Endpoints:
a. Category Listing: Create an API endpoint that retrieves a list of categories.
b. Product Listing: Create an API endpoint that retrieves a list of products with
essential details such as title, price, description, and availability, based on
category Id
c. Product Details: Implement an endpoint that fetches the detailed information of a
specific product by its ID.
d. Cart Management: Develop API endpoints to allow users to add products to their
cart, view the cart, update quantities, and remove items from the cart.
e. Order Placement: Create an endpoint to handle order placement, allowing users
to place an order with products from their cart.
f. Order History: Implement an endpoint to fetch the order history for authenticated
users.
g. Order Details: Create an endpoint that retrieves the detailed information of a
specific order by its ID.
h. A set of API to register and login the users
NOTE: Ignore any payment related APIs for simplicity. We will assume that payment is not needed
for orders
2. Database Integration: Integrate MongoDB or MySql or any other DB schema to store and
manage product data, user cart information, and order details. The API should interact
with DB to perform CRUD operations on products, cart items, and orders.
3. Authentication Middleware and security: Implement authentication middleware to secure
sensitive API endpoints, such as cart management and order placement. Only
authenticated users should be allowed to access these endpoints.
4. User Authentication: Implement user authentication using JSON Web Tokens (JWT). Users
should be able to register, log in, and obtain a token to authenticate API requests.
5. Error Handling: Ensure appropriate error handling is in place, and the API returns
meaningful error messages and status codes when necessary.
6. Documentation: Create documentation for the API endpoints, including details about their
functionality, expected input, and output. A swagger doc is preferred
7. Rate limiting (optional): Add API rate limiting to prevent abuse and maintain server
stability.
