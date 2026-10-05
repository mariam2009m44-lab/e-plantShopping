import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      total += parseFloat(item.cost.substring(1)) * item.quantity;
    });
    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    navigate('/plants');
  };

  const handleCheckoutShopping = () => {
    alert('🚧 Checkout functionality coming soon!');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    return (parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2);
  };

  return (
    <div className="page-wrapper">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="logo" />
          <div>
            <h3>Paradise Nursery</h3>
            <i>Where Green Meets Serenity</i>
          </div>
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">🏠 Home</Link>
          <Link to="/plants" className="nav-link">🌿 Plants</Link>
          <Link to="/cart" className="cart-icon-link active">
            🛒 <span className="cart-count">{totalCartCount}</span>
          </Link>
        </div>
      </nav>

      <div className="cart-container">
        <h1 className="cart-page-title">🛒 Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart-box">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any plants yet.</p>
            <Link to="/plants" className="browse-plants-btn">
              🌿 Browse Plants
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-summary-box">
              <div className="summary-item">
                <span className="summary-label">Total Plants</span>
                <span className="summary-value">{totalCartCount}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Total Amount</span>
                <span className="summary-value amount">${calculateTotalAmount()}</span>
              </div>
            </div>

            <div className="cart-items-list">
              {cart.map(item => (
                <div className="cart-item" key={item.name}>
                  <img className="cart-item-image" src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <button
                        className="cart-item-delete"
                        onClick={() => handleRemove(item)}
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="cart-item-cost">Unit price: {item.cost}</div>
                    <div className="cart-item-quantity">
                      <button className="qty-btn" onClick={() => handleDecrement(item)}>−</button>
                      <span className="qty-value">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => handleIncrement(item)}>+</button>
                    </div>
                    <div className="cart-item-total">
                      Subtotal: <strong>${calculateTotalCost(item)}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <button className="continue-btn" onClick={handleContinueShopping}>
                ← Continue Shopping
              </button>
              <button className="checkout-btn" onClick={handleCheckoutShopping}>
                Checkout →
              </button>
            </div>
          </>
        )}
      </div>

      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>🌿 Paradise Nursery</h3>
            <p>Where Green Meets Serenity</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/plants">Plants</Link>
            <Link to="/cart">Cart</Link>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>📧 mariam2009m44@gmail.com</p>
            <p>📞 01507938088</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Paradise Nursery. Made with 💚 for plant lovers.</p>
        </div>
      </footer>
    </div>
  );
};

export default CartItem;