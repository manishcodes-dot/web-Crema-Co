import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
