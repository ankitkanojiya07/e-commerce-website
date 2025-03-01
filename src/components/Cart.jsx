import { useState } from 'react'
import axios from 'axios'
import '../styles/Cart.css'

function Cart({ cart, updateQuantity, clearCart }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: ''
  })
  const [errors, setErrors] = useState({})
  const [orderStatus, setOrderStatus] = useState({
    loading: false,
    success: false,
    error: null
  })

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  )

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      })
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle order placement
  const handlePlaceOrder = async () => {
    // Don't proceed if cart is empty
    if (cart.length === 0) {
      setOrderStatus({
        loading: false,
        success: false,
        error: 'Your cart is empty'
      })
      return
    }

    // Validate form
    if (!validateForm()) {
      return
    }

    // Prepare order data
    const orderData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      cartItems: cart
    }

    try {
      setOrderStatus({
        loading: true,
        success: false,
        error: null
      })

      // Send order to backend
      const response = await axios.post('http://localhost:3001/api/orders', orderData)
      
      if (response.data.success) {
        setOrderStatus({
          loading: false,
          success: true,
          error: null,
          orderId: response.data.orderId
        })
        
        // Clear cart and form after successful order
        clearCart()
        setFormData({
          firstName: '',
          lastName: '',
          address: ''
        })
      }
    } catch (error) {
      setOrderStatus({
        loading: false,
        success: false,
        error: error.response?.data?.message || 'Failed to place order. Please try again.'
      })
      console.error('Error placing order:', error)
    }
  }

  // If order was successful, show success message
  if (orderStatus.success) {
    return (
      <div className="order-success">
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your order, {formData.firstName}!</p>
        <p>Your order ID is: <strong>{orderStatus.orderId}</strong></p>
        <button 
          className="continue-shopping-btn"
          onClick={() => {
            setOrderStatus({
              loading: false,
              success: false,
              error: null
            })
          }}
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-quantity">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="cart-total">
              <h3>Total: ${totalPrice.toFixed(2)}</h3>
            </div>
          </div>
          
          <div className="checkout-form">
            <h2>Checkout Information</h2>
            
            {orderStatus.error && (
              <div className="error-message">{orderStatus.error}</div>
            )}
            
            <div className="form-group">
              <label htmlFor="firstName">First Name*</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name*</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Address*</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>
            
            <button 
              className="place-order-btn"
              onClick={handlePlaceOrder}
              disabled={orderStatus.loading}
            >
              {orderStatus.loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart