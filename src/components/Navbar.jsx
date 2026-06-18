import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed w-full top-0 left-0 z-50 border-b border-outline-variant/30 transition-all duration-300 ${
        scrolled 
          ? 'shadow-sm bg-surface/95 backdrop-blur-md' 
          : 'bg-surface-bright dark:bg-surface-container'
      }`}
    >
      <nav className="flex justify-between items-center px-margin-desktop py-unit max-w-container-max mx-auto h-20">
        <Link 
          to="/" 
          className="text-headline-md font-headline-md font-bold text-secondary dark:text-secondary-fixed cursor-pointer tracking-tight" 
          id="nav-logo"
        >
          Crema & Co
        </Link>
        
        <div className="hidden md:flex gap-stack-lg items-center">
          <Link 
            to="/menu" 
            className={`font-label-md text-label-md py-1 cursor-pointer transition-all duration-200 ${
              location.pathname === '/menu' 
                ? 'text-secondary dark:text-secondary-fixed font-bold border-b-2 border-secondary' 
                : 'text-on-surface-variant dark:text-on-surface-variant hover:text-tertiary dark:hover:text-tertiary-fixed transition-colors duration-300'
            }`}
            id="nav-menu"
          >
            Menu
          </Link>
          <a 
            href="#" 
            className="text-on-surface-variant dark:text-on-surface-variant font-label-md text-label-md hover:text-tertiary dark:hover:text-tertiary-fixed transition-colors duration-300 cursor-pointer"
            id="nav-about"
          >
            About
          </a>
          <a 
            href="#locations" 
            className="text-on-surface-variant dark:text-on-surface-variant font-label-md text-label-md hover:text-tertiary dark:hover:text-tertiary-fixed transition-colors duration-300 cursor-pointer" 
            id="nav-locations"
          >
            Locations
          </a>
        </div>

        <div className="flex items-center gap-stack-md">
          <Link 
            to="/checkout" 
            className="relative p-2 cursor-pointer transition-all duration-200 text-primary dark:text-primary-fixed-dim hover:text-tertiary flex items-center justify-center" 
            id="nav-cart"
          >
            <span className="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-tertiary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>
          <button 
            className="md:hidden p-2 text-primary flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            id="nav-burger"
          >
            <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface-bright dark:bg-surface-container border-b border-outline-variant/30 py-4 px-margin-mobile flex flex-col gap-stack-md">
          <Link 
            to="/menu" 
            className="font-label-md text-label-md text-on-surface-variant hover:text-tertiary py-2"
          >
            Menu
          </Link>
          <a 
            href="#" 
            className="font-label-md text-label-md text-on-surface-variant hover:text-tertiary py-2"
          >
            About
          </a>
          <a 
            href="#locations" 
            className="font-label-md text-label-md text-on-surface-variant hover:text-tertiary py-2"
          >
            Locations
          </a>
        </div>
      )}
    </header>
  );
}
