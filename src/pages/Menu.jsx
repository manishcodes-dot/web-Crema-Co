import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const filterCategories = [
  { key: 'all', label: 'All Items' },
  { key: 'hot-coffee', label: 'Hot Coffee' },
  { key: 'cold-coffee', label: 'Cold Coffee' },
  { key: 'pastries', label: 'Pastries' },
];

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const { addItem } = useCart();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API}/products`);
        // We've fetched data, let's normalize categories to match hot-coffee, cold-coffee, pastries
        const normalized = data.map(p => {
          let cat = 'hot-coffee';
          if (p.category === 'Pastries' || p.name.includes('Croissant') || p.name.includes('Sourdough')) {
            cat = 'pastries';
          } else if (p.category === 'Seasonal' || p.category === 'Cold Coffee' || p.name.includes('Matcha') || p.name.includes('Cold Brew')) {
            cat = 'cold-coffee';
          }
          return { ...p, categoryKey: cat };
        });
        setProducts(normalized);
      } catch {
        setProducts([
          {
            _id: '1',
            name: 'Cortado',
            slug: 'cortado',
            categoryKey: 'hot-coffee',
            price: 4.50,
            badge: 'Classic',
            description: 'Equal parts double espresso and silky steamed milk. Balanced and intense.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBidxf-HZKj_V-kG5GbtHXdnYU3toJNzVHn1pJNfOTwyoIn6h44hTsTHvAy9oideL5s1BrTMXwq28A40p342ydMEtDA-4qbeg_qMXYEv-81f6_-UFGldb_I2mgeFFGjnlrGY8EiFU_1udsR3_kV2TDZ9e_cNlURraF8oG0vQgzQKuhRknWz1hsnSzZvzEybTm_G8RgAO2n1HFdJFSt6vlF-puM9jJeszB16sovj5ZtmJSE0r-2zglO2s7CzqKX5y0Cs-86xDoUhM2Rj'
          },
          {
            _id: '2',
            name: 'Nitrogen Cold Brew',
            slug: 'nitrogen-cold-brew',
            categoryKey: 'cold-coffee',
            price: 6.00,
            badge: 'Steeped 18h',
            description: 'Velvety texture with notes of dark chocolate and toasted hazelnuts.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEpuIcKafi662oA-p0oSI2bQ2vid3GXU8rYndYrSO_e78wzPP3agxJXdyoXO0MsNPgp5Ufo9uMokLiCuAcV4mGG4FKTsgRh-lRWFG11KifyD9j8gTUdPwqZMxPQ89QHZm-EzGhytqsUfzSBB2r2bQvRFpKfzskusFYGqKy9KyReNVlQa5An1RLk_xdQCW3choy8_2eqQwh5lqQmz35nfUdZmXTznHWhpQBK-CnmhPrVtygbD1-BQLosshpXAKyhhLnNFW6SYEA96P3'
          },
          {
            _id: '3',
            name: 'Salted Honey Croissant',
            slug: 'salted-honey-croissant',
            categoryKey: 'pastries',
            price: 5.25,
            badge: 'Baked Daily',
            description: 'Laminated dough with locally sourced honey and Maldon sea salt flakes.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCszD1czMbJwo9XnvhhBwkuP_18PvI3jTOT2sIRjywgbQtOJKKb5hRqB5mVcRjM8rxS2bKtx1SWaCjEE6ldMZBDrizrbUvbBYjb9ReUSUh5FRL_r7npquPZt4UPXy0kZAOGUTZR13Ws3_vlpeoexAEHsGvN5iWc0trpO2CfHBSpkH5BhyzKQeocweYZghCqeRoi4UAnJNKbD8UWx36L2LHkesUSewrip3V5t45C7kDmip7T0uO9OjjfDdzREjS0iSAy2QJUhJKL4u_t'
          },
          {
            _id: '4',
            name: 'Ethiopian Yirgacheffe',
            slug: 'ethiopian-yirgacheffe',
            categoryKey: 'hot-coffee',
            price: 7.00,
            badge: 'V60 Pour Over',
            description: 'Tea-like body with vibrant jasmine floral notes and citrus acidity.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdRFZsk86LmnAmLNQJCqLOYNGmK-fKuDKTVWx33c9a8NgvFJdDPspRD3N09K3rQdjTSqcf_kxGPglm60gMs9lREkL_Y1Nn5BP0Vu4o1Y9I0t0qnrXT39G26it2tyMJeov8rhMbmSXS02juQLWGJE-aHI0WJHsFQAN0iWVG77J0KC9c-yFtoAdyo-o8hq0Rx_RqazIwAlum1KvbHv4_LIxSqBeyVkKDievdbtNc6Ri44lxWVs_iM58_NatGvwOpKcd0vN47IgBO3ME8'
          },
          {
            _id: '5',
            name: 'Avocado Sourdough',
            slug: 'avocado-sourdough',
            categoryKey: 'pastries',
            price: 12.00,
            badge: null,
            description: 'House-made sourdough, hass avocado, 6-minute egg, and chili threads.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Q-tjWihFz8Y6aG_5HFNH1MdfqwOGTgp3Z2e6vg4-UDauPuIojd-A1YqZ0v9JFhBSpufWAXDa1VVVKm52sboQv5zvJRBz0JxMGxlRhq3s05hSfiW5kRCuiuZjZyfTzTNKlTqsm6G3LB71P3UNcNQ4k2SOYH4YqY2hMdoJEu3XhwIzVyrOdYkd8qgTtBBFV25oDfNfZKwXWzeqrGgnBdCAohVZvIhpaHRafi6nJXM3af8M9uNzHOebuvJkdtYhEkvNx4QnFCN5oozn'
          },
          {
            _id: '6',
            name: 'Iced Ceremonial Matcha',
            slug: 'iced-ceremonial-matcha',
            categoryKey: 'cold-coffee',
            price: 6.50,
            badge: null,
            description: 'Stone-ground Uji matcha whisked with oat milk and a touch of agave.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCALfCWAIAHegNacuqWlUGAtvDD5vbQ2u_lzAHcm6ew6cYQ7MGmbe6SixJB2BYyojyUm7yQC1LBUgW-GPZnGmEZrpEilm6rYOnvwOijcdAuSJPqBv5y_UmRrSQyUDpX1BtqadU_mOEN-mOqVp2jlc-xQPgnRECOjldhmTy6hzruGZ25nV9DarpKO_xUyfOct85qhfEZ6X5UKBdenQ4urNQYzZ72MgubSaP5fjzZZFVHwtaM4Ppu-I-D8UDZPoypySbrSE-cu488YN_8'
          }
        ]);
      }
    };
    fetchProducts();
  }, []);

  const filtered = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.categoryKey === activeCategory);

  const handleAddToBag = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: 'standard',
      quantity: 1
    });
  };

  return (
    <main className="max-w-container-max mx-auto px-gutter py-xl select-none">
      {/* Page Header */}
      <section className="mb-xl text-center">
        <span className="font-label-md text-label-md text-on-primary-container tracking-widest uppercase mb-4 block">
          Artisanal Selection
        </span>
        <h1 className="font-display-lg text-display-lg text-primary mb-6">
          Our Menu
        </h1>
        <p className="max-w-2xl mx-auto text-on-surface-variant font-body-lg text-body-lg leading-relaxed">
          A meticulously curated collection of rare single-origins, classic espresso preparations, and handcrafted pastries baked fresh every morning in our roastery kitchen.
        </p>
      </section>

      {/* Category Filter */}
      <nav className="flex justify-center gap-md mb-lg border-b border-outline-variant/20 pb-4">
        {filterCategories.map(cat => {
          const isActive = activeCategory === cat.key;
          return (
            <button 
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`font-label-md text-label-md px-4 py-2 transition-all cursor-pointer ${
                isActive 
                  ? 'border-b-2 border-primary text-primary font-bold' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
              id={`filter-${cat.key}`}
            >
              {cat.label}
            </button>
          );
        })}
      </nav>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg" id="menu-grid">
        {filtered.map((product) => (
          <Link 
            to={`/product/${product.slug}`}
            key={product._id} 
            className="bg-surface-container-lowest border border-outline-variant/10 group cursor-pointer block transition-all hover:-translate-y-1 hover:shadow-lg duration-300 rounded-3xl overflow-hidden"
          >
            <div className="aspect-[4/5] overflow-hidden relative">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 sepia-[0.1] contrast-[1.05]" 
                alt={product.name} 
                src={product.image}
              />
              {product.badge && (
                <div className="absolute top-4 right-4">
                  <span className="bg-primary-container text-on-primary-container px-3 py-1 font-label-md text-caption rounded-full">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>
            <div className="p-md">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-headline-md text-headline-md text-primary">{product.name}</h3>
                <span className="font-label-md text-label-md text-secondary">${product.price.toFixed(2)}</span>
              </div>
              <p className="text-on-surface-variant font-body-md text-body-md mb-6 line-clamp-2">
                {product.description}
              </p>
              <button 
                onClick={(e) => handleAddToBag(e, product)}
                className="w-full flex items-center justify-center gap-2 border border-primary text-primary py-3 font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all cursor-pointer rounded-full"
                id={`menu-add-${product.slug}`}
              >
                <span className="material-symbols-outlined text-[20px]">add</span> Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
