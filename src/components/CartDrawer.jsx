import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [orderStatus, setOrderStatus] = useState(null);

  if (!isOpen) return null;

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsCheckingOut(true);
    setOrderStatus(null);

    try {
      // Create orders for each item in cart
      for (const item of cart) {
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer_name: checkoutData.name,
            customer_email: checkoutData.email,
            shipping_address: checkoutData.address,
            product_id: item.id,
            total_price: item.price * item.quantity,
          }),
        });
      }

      setOrderStatus('success');
      clearCart();
      setTimeout(() => {
        onClose();
        setOrderStatus(null);
        setCheckoutData({ name: '', email: '', address: '' });
      }, 3000);
    } catch (err) {
      setOrderStatus('error');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="btn-icon" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div className="cart-content">
          {orderStatus === 'success' ? (
            <div className="cart-empty" style={{ color: 'var(--success)' }}>
              <h3>Order Placed Successfully!</h3>
              <p>Thank you for your purchase.</p>
            </div>
          ) : cart.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag size={48} />
              <p>Your cart is empty.</p>
              <button className="btn-outline mt-4" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      {item.images && JSON.parse(item.images || '[]')[0] ? (
                        <img src={JSON.parse(item.images)[0].src} alt={item.name} />
                      ) : (
                        <div className="cart-item-placeholder" />
                      )}
                    </div>
                    <div className="cart-item-details">
                      <div className="cart-item-brand">{item.brand}</div>
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-price">EGP {item.price?.toLocaleString()}</div>
                      <div className="cart-item-actions">
                        <div className="quantity-control">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          className="cart-item-remove"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <span>Subtotal</span>
                  <span>EGP {cartTotal.toLocaleString()}</span>
                </div>
                <p className="cart-taxes">Taxes and shipping calculated at checkout.</p>

                <form onSubmit={handleCheckout} className="checkout-form">
                  <input
                    type="text"
                    className="form-input mb-2"
                    placeholder="Full Name"
                    required
                    value={checkoutData.name}
                    onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                  />
                  <input
                    type="email"
                    className="form-input mb-2"
                    placeholder="Email Address"
                    required
                    value={checkoutData.email}
                    onChange={(e) => setCheckoutData({ ...checkoutData, email: e.target.value })}
                  />
                  <textarea
                    className="form-input mb-4"
                    placeholder="Shipping Address"
                    required
                    style={{ minHeight: '80px', resize: 'vertical' }}
                    value={checkoutData.address}
                    onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                  />
                  <button
                    type="submit"
                    className="btn-primary w-100"
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? 'Processing...' : 'Place Order'} <ArrowRight size={16} />
                  </button>
                  {orderStatus === 'error' && (
                    <p style={{ color: 'var(--danger)', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
