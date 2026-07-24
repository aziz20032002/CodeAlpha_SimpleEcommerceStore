# CodeAlpha Simple E-commerce Store

A full-stack e-commerce web application developed as part of the **CodeAlpha Full Stack Development Internship**.

## Overview

This project is a modern e-commerce platform that allows users to browse products, view product details, manage a shopping cart, place orders, and view their order history.

The application uses a React frontend connected to a Node.js / Express backend with PostgreSQL for data storage and JWT for authentication.

## Features

- User registration
- User login with JWT authentication
- Product listing
- Product details page
- Shopping cart
- Increase and decrease product quantities
- Remove products from cart
- Automatic cart total calculation
- Order creation
- Order history
- Responsive design
- Modern e-commerce interface
- PostgreSQL database integration

## Technologies

### Frontend

- React.js
- Vite
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- JWT
- bcrypt

### Database

- PostgreSQL

### Development Tools

- Git
- GitHub
- Postman
- VS Code
- pgAdmin

## Project Structure

```text
CodeAlpha_SimpleEcommerceStore/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
│
├── .gitignore
└── README.md
```
## Screenshots

### Home Page

![Home Page](screenshots/home.png)

### Products

![Products Page](screenshots/products.png)

### Product Details

![Product Details](screenshots/product-details.png)

### Login

![Login Page](screenshots/login.png)

### Shopping Cart

![Shopping Cart](screenshots/cart.png)

### My Orders

![My Orders](screenshots/orders.png)