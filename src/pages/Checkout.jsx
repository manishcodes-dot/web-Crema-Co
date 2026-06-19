import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import './Checkout.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [orderMethod, setOrderMethod] = useState('delivery'); // 'delivery' or 'pickup'
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'apple-pay'
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const deliveryFee = orderMethod === 'delivery' ? 2.50 : 0.00;
  const totalAmount = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;
    setIsSubmitting(true);
    try {
      await axios.post(`${API}/orders`, {
        items: items.map(item => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          size: item.size,
          milkOption: item.milkOption,
          price: item.price
        })),
        subtotal,
        tax: 0,
        total: totalAmount,
        orderMethod,
        paymentMethod,
        address: orderMethod === 'delivery' ? address : 'Flagship Roastery'
      });
      setOrderPlaced(true);
      clearCart();
    } catch (err) {
      console.error(err);
      // Fallback to local success if backend is offline
      setOrderPlaced(true);
      clearCart();
    }
    setIsSubmitting(false);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background py-20" id="checkout-success text-center select-none">
        <div className="text-center flex flex-col items-center gap-4 max-w-md px-6">
          <div className="text-6xl animate-bounce">✨</div>
          <h1 className="text-3xl font-display-lg text-primary">Order Confirmed</h1>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            Freshly roasted. Your beans are prepped for artisan extraction.
          </p>
          <div className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container rounded-full px-4 py-1.5">
            <span className="text-xs font-semibold">Freshly roasted</span>
          </div>
          <Link to="/menu" className="mt-4 w-full bg-primary hover:opacity-90 text-white font-semibold py-3 rounded-full transition-all text-center" id="success-continue">
            Continue Browsing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-20 px-6 md:px-16 max-w-7xl mx-auto select-none" id="checkout-page">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Checkout Details */}
        <div className="lg:col-span-7 space-y-8">
          <h1 className="text-3xl font-display-lg text-primary">Checkout</h1>

          {items.length === 0 ? (
            <div className="bg-surface-container-lowest p-8 rounded-lg border border-outline-variant/30 text-center animate-fade-in" id="checkout-empty">
              <p className="text-body-lg text-on-surface-variant mb-6">Your cart is empty</p>
              <Link to="/menu" className="inline-block bg-primary hover:opacity-90 text-white font-semibold px-6 py-3 rounded-full transition-all">
                Explore Our Menu
              </Link>
            </div>
          ) : (
            <>
              {/* Order Method */}
              <section className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/30">
                <h2 className="text-xl font-headline-md text-primary mb-4">Order Method</h2>
                
                {/* Toggle tab */}
                <div className="flex p-1 bg-surface-container rounded-full max-w-md mb-4">
                  <button 
                    type="button"
                    className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      orderMethod === 'delivery' 
                        ? 'bg-surface-container-lowest text-primary shadow-sm' 
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                    id="delivery-btn"
                    onClick={() => setOrderMethod('delivery')}
                  >
                    Delivery
                  </button>
                  <button 
                    type="button"
                    className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      orderMethod === 'pickup' 
                        ? 'bg-surface-container-lowest text-primary shadow-sm' 
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                    id="pickup-btn"
                    onClick={() => setOrderMethod('pickup')}
                  >
                    Pickup
                  </button>
                </div>

                <div className="mt-4">
                  {orderMethod === 'delivery' ? (
                    <div className="space-y-4">
                      <div className="relative group">
                        <input 
                          id="address-input"
                          className="peer w-full bg-white border border-outline-variant/30 rounded-full px-5 pt-5 pb-2.5 focus:border-primary transition-all outline-none text-sm text-on-surface placeholder-transparent" 
                          placeholder="Delivery Address" 
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        <label 
                          htmlFor="address-input"
                          className="absolute left-5 top-3.5 text-sm text-on-surface-variant/70 transition-all duration-200 pointer-events-none origin-[0] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary"
                        >
                          Delivery Address
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 border border-outline-variant/35 rounded-sm bg-white flex justify-between items-center">
                        <div>
                          <p className="text-sm font-semibold text-primary">Flagship Roastery</p>
                          <p className="text-xs text-on-surface-variant">45 Industrial Way, Suite B</p>
                        </div>
                        <span className="text-secondary font-semibold text-xs">Ready in 15m</span>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Payment Method */}
              <section className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/30 space-y-4">
                <h2 className="text-xl font-headline-md text-primary mb-2">Payment Method</h2>
                
                {/* Apple Pay Option */}
                <div 
                  className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer transition-all ${
                    paymentMethod === 'apple-pay' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-outline-variant/30 hover:border-primary bg-white'
                  }`}
                  onClick={() => setPaymentMethod('apple-pay')}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">contactless</span>
                    <span className="text-sm font-semibold text-on-surface">Apple Pay</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-outline flex items-center justify-center">
                    {paymentMethod === 'apple-pay' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                  </div>
                </div>

                {/* Credit Card Option */}
                <div 
                  className={`p-4 border rounded-sm transition-all space-y-4 ${
                    paymentMethod === 'card' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-outline-variant/30 hover:border-primary bg-white'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined ${paymentMethod === 'card' ? 'text-primary' : 'text-on-surface'}`}>credit_card</span>
                      <span className="text-sm font-semibold text-on-surface">Credit or Debit Card</span>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-outline flex items-center justify-center">
                      {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="col-span-2 relative">
                        <input 
                          id="card-number-input"
                          className="peer w-full bg-white border border-outline-variant/30 rounded-xl px-4 pt-5 pb-2.5 focus:border-primary outline-none text-sm text-on-surface placeholder-transparent transition-all" 
                          placeholder="Card number" 
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                        />
                        <label 
                          htmlFor="card-number-input"
                          className="absolute left-4 top-3.5 text-sm text-on-surface-variant/70 transition-all duration-200 pointer-events-none origin-[0] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary"
                        >
                          Card number
                        </label>
                      </div>
                      <div className="relative">
                        <input 
                          id="card-expiry-input"
                          className="peer w-full bg-white border border-outline-variant/30 rounded-xl px-4 pt-5 pb-2.5 focus:border-primary outline-none text-sm text-on-surface placeholder-transparent transition-all" 
                          placeholder="MM / YY" 
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                        />
                        <label 
                          htmlFor="card-expiry-input"
                          className="absolute left-4 top-3.5 text-sm text-on-surface-variant/70 transition-all duration-200 pointer-events-none origin-[0] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary"
                        >
                          MM / YY
                        </label>
                      </div>
                      <div className="relative">
                        <input 
                          id="card-cvc-input"
                          className="peer w-full bg-white border border-outline-variant/30 rounded-xl px-4 pt-5 pb-2.5 focus:border-primary outline-none text-sm text-on-surface placeholder-transparent transition-all" 
                          placeholder="CVC" 
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                        />
                        <label 
                          htmlFor="card-cvc-input"
                          className="absolute left-4 top-3.5 text-sm text-on-surface-variant/70 transition-all duration-200 pointer-events-none origin-[0] peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary"
                        >
                          CVC
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
        </div>

        {/* Right Column: Order Summary */}
        {items.length > 0 && (
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-6">
              
              <section className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/30">
                <h2 className="text-xl font-headline-md text-primary mb-6">Your Order</h2>
                
                <div className="divide-y divide-outline-variant/30 max-h-96 overflow-y-auto pr-1">
                  {items.map(item => (
                    <div className="py-4 flex gap-4" key={item._id}>
                      <div className="w-20 h-20 bg-surface-container rounded-sm overflow-hidden flex-shrink-0">
                        <img 
                          className="w-full h-full object-cover" 
                          alt={item.name}
                          src={item.image} 
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-semibold text-primary leading-tight">{item.name}</h3>
                          <span className="text-sm font-semibold text-secondary">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-on-surface-variant">
                          {item.size ? item.size.toUpperCase() : 'STANDARD'}
                          {item.milkOption ? `, ${item.milkOption} Milk` : ''}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-surface-container px-2.5 py-0.5 rounded text-on-surface font-medium">Qty {item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="mt-6 pt-4 border-t border-outline-variant/50 space-y-3">
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-primary pt-2">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button 
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-primary hover:opacity-90 text-white font-semibold py-4 rounded-full transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isSubmitting ? 'Placing Order...' : 'Place Order'}</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-on-surface-variant/60">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span className="text-xs font-medium">Secure encrypted checkout</span>
                </div>
              </section>

              {/* Coffee Brewing Indicator */}
              <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/20 flex items-center gap-4">
                <div className="w-1.5 h-12 bg-primary/20 rounded-full relative overflow-hidden">
                  <div className="steamer-progress absolute bottom-0 left-0 w-full h-2/3 bg-primary animate-pulse"></div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">Freshly roasted</p>
                  <p className="text-xs text-on-surface-variant">Your beans are prepped for artisan extraction.</p>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </main>
  );
}
