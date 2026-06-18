import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav className="w-full top-0 sticky z-50 bg-surface border-b border-outline-variant/30 duration-300 ease-in-out">
      <div className="max-w-container-max mx-auto px-gutter flex justify-between items-center h-20">
        {/* Brand Identity */}
        <Link 
          to="/" 
          className="font-display-lg text-headline-md text-primary tracking-tight cursor-pointer"
          id="nav-logo"
        >
          Crema &amp; Co.
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-lg">
          <Link 
            to="/about" 
            className={`font-label-md text-label-md pb-1 cursor-pointer transition-colors ${
              location.pathname === '/about'
                ? 'text-primary font-bold border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            id="nav-about"
          >
            Our Story
          </Link>
          <Link 
            to="/locations" 
            className={`font-label-md text-label-md pb-1 cursor-pointer transition-colors ${
              location.pathname === '/locations'
                ? 'text-primary font-bold border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            id="nav-locations"
          >
            The Roastery
          </Link>
          <Link 
            to="/menu" 
            className={`font-label-md text-label-md pb-1 cursor-pointer transition-colors ${
              location.pathname === '/menu'
                ? 'text-primary font-bold border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            id="nav-menu"
          >
            Menu
          </Link>
          <a 
            href="#" 
            className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md cursor-pointer"
          >
            Brew Guides
          </a>
          <a 
            href="#" 
            className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md cursor-pointer"
          >
            Subscription
          </a>
        </div>

        {/* Action */}
        <div className="flex items-center gap-sm">
          <Link 
            to="/checkout" 
            className="relative p-2 cursor-pointer transition-all duration-200 text-primary hover:opacity-85 flex items-center justify-center" 
            id="nav-cart"
          >
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-on-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>
          
          <Link 
            to="/menu"
            className="bg-primary text-on-primary px-md py-sm font-label-md text-label-md hover:opacity-80 transition-all uppercase tracking-widest hidden sm:inline-block"
          >
            Order Now
          </Link>

          <button 
            className="md:hidden p-2 text-primary flex items-center justify-center cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            id="nav-burger"
          >
            <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface border-b border-outline-variant/30 py-4 px-margin-mobile flex flex-col gap-4">
          <Link 
            to="/about" 
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary py-1"
          >
            Our Story
          </Link>
          <Link 
            to="/locations" 
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary py-1"
          >
            The Roastery
          </Link>
          <Link 
            to="/menu" 
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary py-1"
          >
            Menu
          </Link>
          <a 
            href="#" 
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary py-1"
          >
            Brew Guides
          </a>
          <a 
            href="#" 
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary py-1"
          >
            Subscription
          </a>
          <Link 
            to="/menu"
            className="bg-primary text-on-primary px-md py-sm font-label-md text-label-md hover:opacity-80 transition-all uppercase tracking-widest text-center mt-2"
          >
            Order Now
          </Link>
        </div>
      )}
    </nav>
  );
}
