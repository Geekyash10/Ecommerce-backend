# E-Commerce API

The E-Commerce API is a RESTful web service designed for managing an online shopping platform. It includes essential features such as user authentication, product management, order placement, and admin operations. This API is built with role-based access control, ensuring secure and efficient management of user and admin activities.

---

## Features

- User registration and login.
- Forgot password and reset functionality.
- Role-based access control for users and admins.
- Product listing, creation, update, and deletion.
- Order placement, tracking, and management.
- Review system for products.
- Centralized error handling and robust validation.

---

## API Reference

### Base URL
http://localhost:5000
---

### User Routes

| Method | Endpoint                | Description                                  | Access  |
|--------|-------------------------|----------------------------------------------|---------|
| POST   | `/register`             | Register a new user.                        | Public  |
| POST   | `/login`                | Log in a user.                              | Public  |
| GET    | `/logout`               | Log out the current user.                   | Private |
| POST   | `/password/forgot`      | Request a password reset email.             | Public  |
| PUT    | `/password/reset/:token`| Reset the password using the token.         | Public  |
| GET    | `/me`                   | Fetch current user details.                 | Private |
| PUT    | `/password/update`      | Update the user’s password.                 | Private |
| PUT    | `/me/update`            | Update user profile information.            | Private |
| GET    | `/admin/users`          | Fetch all users (Admin only).               | Admin   |
| GET    | `/admin/user/:id`       | Fetch a specific user (Admin only).         | Admin   |
| PUT    | `/admin/user/:id`       | Update user role (Admin only).              | Admin   |
| DELETE | `/admin/user/:id`       | Delete a user (Admin only).                 | Admin   |

---

### Product Routes

| Method | Endpoint                     | Description                                  | Access  |
|--------|------------------------------|----------------------------------------------|---------|
| GET    | `/products`                  | Fetch all products.                         | Public  |
| GET    | `/product/:id`               | Fetch details of a specific product.        | Public  |
| POST   | `/admin/product/new`         | Create a new product (Admin only).          | Admin   |
| PUT    | `/admin/product/:id`         | Update a product (Admin only).              | Admin   |
| DELETE | `/admin/product/:id`         | Delete a product (Admin only).              | Admin   |
| PUT    | `/review`                    | Add or update a review for a product.       | Private |
| GET    | `/reviews`                   | Fetch all reviews for a product.            | Public  |
| DELETE | `/reviews`                   | Delete a review for a product.              | Private |

---

### Order Routes

| Method | Endpoint             | Description                                  | Access  |
|--------|----------------------|----------------------------------------------|---------|
| POST   | `/order/new`         | Place a new order.                          | Private |
| GET    | `/order/:id`         | Fetch details of a specific order.          | Private |
| GET    | `/orders/me`         | Fetch all orders of the logged-in user.     | Private |
| GET    | `/admin/orders`      | Fetch all orders (Admin only).              | Admin   |
| PUT    | `/admin/order/:id`   | Update the status of an order (Admin only). | Admin   |
| DELETE | `/admin/order/:id`   | Delete an order (Admin only).               | Admin   |

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/Geekyash10/Ecommerce-backend.git
cd Ecommerce-backend
npm install


```
## env file
```bash
PORT=5000
DB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=5d
COOKIE_EXPIRE=5

```
## Run the Server

```bash
node app.js
