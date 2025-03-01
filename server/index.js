import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory product data
const products = [
  {
    id: 1,
    name: 'Smartphone X',
    description: 'Latest smartphone with advanced features and high-resolution camera.',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2042&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Laptop Pro',
    description: 'Powerful laptop for professionals with high performance and long battery life.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Wireless Headphones',
    description: 'Premium noise-canceling headphones with crystal clear sound quality.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Smart Watch',
    description: 'Track your fitness and stay connected with this stylish smart watch.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Wireless Earbuds',
    description: 'Compact and comfortable earbuds with amazing sound quality.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1978&auto=format&fit=crop'
  },
  {
    id: 6,
    name: 'Digital Camera',
    description: 'Capture your memories with this high-resolution digital camera.',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop'
  }
];

// API endpoint to fetch products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// API endpoint to place an order
app.post('/api/orders', (req, res) => {
  const { firstName, lastName, address, cartItems } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !address) {
    return res.status(400).json({ 
      success: false, 
      message: 'First name, last name, and address are required' 
    });
  }

  // Validate cart items
  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ 
      success: false, 
      message: 'Cart cannot be empty' 
    });
  }

  // Process the order (in a real app, this would save to a database)
  console.log('Order placed:');
  console.log('Customer:', firstName, lastName);
  console.log('Address:', address);
  console.log('Items:', cartItems);
  
  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  console.log('Total:', total.toFixed(2));

  // Return success response
  res.json({ 
    success: true, 
    message: 'Order placed successfully',
    orderId: `ORD-${Date.now()}`
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});