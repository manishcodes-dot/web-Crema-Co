import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (itemCount > 0) {
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  return (
    <nav className="w-full top-0 sticky z-50 bg-surface/85 backdrop-blur-md border-b border-outline-variant/30 duration-300 ease-in-out">
      <div className="max-w-container-max mx-auto px-gutter flex justify-between items-center h-20">
        {/* Brand Identity */}
        <div className="flex-1 flex justify-start">
          <Link 
            to="/" 
            className="font-display-lg text-headline-md text-primary tracking-tight cursor-pointer"
            id="nav-logo"
          >
            Crema &amp; Co.
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex justify-center items-center gap-md lg:gap-lg">
          <Link 
            to="/" 
            className={`font-label-md text-label-md pb-1 cursor-pointer transition-colors relative group ${
              location.pathname === '/'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            id="nav-home"
          >
            Home
            <span className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${
              location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>
          <Link 
            to="/about" 
            className={`font-label-md text-label-md pb-1 cursor-pointer transition-colors relative group ${
              location.pathname === '/about'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            id="nav-about"
          >
            Our Story
            <span className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${
              location.pathname === '/about' ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>
          <Link 
            to="/locations" 
            className={`font-label-md text-label-md pb-1 cursor-pointer transition-colors relative group ${
              location.pathname === '/locations'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            id="nav-locations"
          >
            The Roastery
            <span className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${
              location.pathname === '/locations' ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>
          <Link 
            to="/menu" 
            className={`font-label-md text-label-md pb-1 cursor-pointer transition-colors relative group ${
              location.pathname === '/menu'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            id="nav-menu"
          >
            Menu
            <span className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${
              location.pathname === '/menu' ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>
          <Link 
            to="/brew-guides" 
            className={`font-label-md text-label-md pb-1 cursor-pointer transition-colors relative group ${
              location.pathname === '/brew-guides'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            id="nav-brew-guides"
          >
            Brew Guides
            <span className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${
              location.pathname === '/brew-guides' ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>
          <Link 
            to="/subscription" 
            className={`font-label-md text-label-md pb-1 cursor-pointer transition-colors relative group ${
              location.pathname === '/subscription'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            id="nav-subscription"
          >
            Subscription
            <span className={`absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ${
              location.pathname === '/subscription' ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>
        </div>

        {/* Action */}
        <div className="flex-1 flex justify-end items-center gap-sm">
          <Link 
            to="/checkout" 
            className={`relative p-2 cursor-pointer transition-all duration-200 text-primary hover:opacity-85 flex items-center justify-center ${
              isBouncing ? 'cart-bounce-active' : ''
            }`} 
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
            className="bg-primary text-on-primary px-md py-sm font-label-md text-label-md hover:opacity-80 transition-all uppercase tracking-widest hidden sm:inline-block rounded-full"
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
            to="/" 
            className={`font-label-md text-label-md py-1 transition-colors ${
              location.pathname === '/'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`font-label-md text-label-md py-1 transition-colors ${
              location.pathname === '/about'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Our Story
          </Link>
          <Link 
            to="/locations" 
            className={`font-label-md text-label-md py-1 transition-colors ${
              location.pathname === '/locations'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            The Roastery
          </Link>
          <Link 
            to="/menu" 
            className={`font-label-md text-label-md py-1 transition-colors ${
              location.pathname === '/menu'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Menu
          </Link>
          <Link 
            to="/brew-guides" 
            className={`font-label-md text-label-md py-1 transition-colors ${
              location.pathname === '/brew-guides'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Brew Guides
          </Link>
          <Link 
            to="/subscription" 
            className={`font-label-md text-label-md py-1 transition-colors ${
              location.pathname === '/subscription'
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Subscription
          </Link>
          <Link 
            to="/menu"
            className="bg-primary text-on-primary px-md py-sm font-label-md text-label-md hover:opacity-80 transition-all uppercase tracking-widest text-center mt-2 rounded-full"
          >
            Order Now
          </Link>
        </div>
      )}
    </nav>
  );
}
