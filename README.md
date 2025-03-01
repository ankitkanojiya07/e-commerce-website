# E-Shop: Simple E-commerce Application

A lightweight e-commerce application built with React and Node.js that allows users to browse products, add them to a cart, and place orders.


![Screenshot 2025-03-01 123552](https://github.com/user-attachments/assets/b9b723da-718e-4700-be44-2e015f8e081a)
![Screenshot 2025-03-01 123604](https://github.com/user-attachments/assets/19b8ade7-75a5-44f1-bbba-8c03a2a1deba)
![Screenshot 2025-03-01 123715](https://github.com/user-attachments/assets/df8b2259-b4ab-42f8-8dcd-010109717a08)

## Features

### Product Listing
- Responsive grid layout of product cards
- Each card displays:
  - Product image
  - Product name
  - Product description
  - Price
  - Add to Cart button

### Shopping Cart
- Add products to cart
- Update product quantities
- Remove products from cart
- Real-time cart total calculation
- Cart item counter in navigation

### Checkout Process
- User information form with validation
- Order placement with backend validation
- Order confirmation with order ID
- Success message after successful order

## Tech Stack

### Frontend
- React 
- React Router for navigation
- Axios for API requests
- CSS for styling (no external UI libraries)

### Backend
- Node.js
- Express.js
- In-memory data storage
- RESTful API endpoints

## Project Structure

```
ecommerce-app/
├── server/                 # Backend code
│   └── index.js            # Express server and API endpoints
├── src/                    # Frontend code
│   ├── components/         # React components
│   │   ├── ProductList.jsx # Product listing page
│   │   └── Cart.jsx        # Shopping cart page
│   ├── styles/             # Component-specific styles
│   │   ├── ProductList.css # Styles for product listing
│   │   └── Cart.css        # Styles for shopping cart
│   ├── App.jsx             # Main application component
│   ├── App.css             # Global application styles
│   ├── main.jsx            # Application entry point
│   └── index.css           # Base styles
├── package.json            # Project dependencies and scripts
└── vite.config.js          # Vite configuration
```

## API Endpoints

### GET `/api/products`
Returns a list of all available products.

### POST `/api/orders`
Places a new order.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "address": "123 Main St, City, Country",
  "cartItems": [
    {
      "id": 1,
      "name": "Product Name",
      "price": 99.99,
      "quantity": 2
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "orderId": "ORD-1234567890"
}
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ankitkanojiya07/e-commerce-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development servers (frontend and backend):
```bash
npm run dev:all
```

This will start:
- Frontend: Vite development server (typically on http://localhost:5173)
- Backend: Express server on http://localhost:3001

## Available Scripts

- `npm run dev` - Start the frontend development server
- `npm run server` - Start the backend server
- `npm run dev:all` - Start both frontend and backend servers concurrently
- `npm run build` - Build the frontend for production
- `npm run preview` - Preview the production build locally

## Future Enhancements

- User authentication and account management
- Product categories and filtering
- Product search functionality
- Persistent data storage with a database
- Payment processing integration
- Order history and tracking
- Admin dashboard for product management
