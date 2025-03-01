import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import './App.css'

function App() {
  const [cart, setCart] = useState([])
  const [cartCount, setCartCount] = useState(0)

  // Update cart count whenever cart changes
  useEffect(() => {
    const count = cart.reduce((total, item) => total + item.quantity, 0)
    setCartCount(count)
  }, [cart])

  // Add product to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if product already exists in cart
      const existingItem = prevCart.find(item => item.id === product.id)
      
      if (existingItem) {
        // Increase quantity if product already in cart
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      } else {
        // Add new product to cart with quantity 1
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  // Update product quantity in cart
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      // Remove product if quantity is 0 or less
      setCart(prevCart => prevCart.filter(item => item.id !== productId))
    } else {
      // Update quantity
      setCart(prevCart => 
        prevCart.map(item => 
          item.id === productId ? { ...item, quantity } : item
        )
      )
    }
  }

  // Clear cart after successful order
  const clearCart = () => {
    setCart([])
  }

  return (
    <div className="app-container">
      <header>
        <div className="logo">
          <Link to="/">E-Shop</Link>
        </div>
        <nav>
          <Link to="/" className="nav-link">Products</Link>
          <Link to="/cart" className="nav-link cart-link">
            Cart
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ProductList addToCart={addToCart} />} />
          <Route 
            path="/cart" 
            element={
              <Cart 
                cart={cart} 
                updateQuantity={updateQuantity} 
                clearCart={clearCart} 
              />
            } 
          />
        </Routes>
      </main>

      <footer>
        <p>&copy; 2025 E-Shop. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App