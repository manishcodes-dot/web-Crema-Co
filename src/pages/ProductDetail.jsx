import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import './ProductDetail.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const MOCK_PRODUCTS = {
  'cortado': {
    name: 'Cortado',
    price: 4.50,
    category: 'Hot Coffee',
    description: 'Equal parts double espresso and silky steamed milk. Balanced and intense.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBidxf-HZKj_V-kG5GbtHXdnYU3toJNzVHn1pJNfOTwyoIn6h44hTsTHvAy9oideL5s1BrTMXwq28A40p342ydMEtDA-4qbeg_qMXYEv-81f6_-UFGldb_I2mgeFFGjnlrGY8EiFU_1udsR3_kV2TDZ9e_cNlURraF8oG0vQgzQKuhRknWz1hsnSzZvzEybTm_G8RgAO2n1HFdJFSt6vlF-puM9jJeszB16sovj5ZtmJSE0r-2zglO2s7CzqKX5y0Cs-86xDoUhM2Rj'
  },
  'nitrogen-cold-brew': {
    name: 'Nitrogen Cold Brew',
    price: 6.00,
    category: 'Cold Coffee',
    description: 'Velvety texture with notes of dark chocolate and toasted hazelnuts.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEpuIcKafi662oA-p0oSI2bQ2vid3GXU8rYndYrSO_e78wzPP3agxJXdyoXO0MsNPgp5Ufo9uMokLiCuAcV4mGG4FKTsgRh-lRWFG11KifyD9j8gTUdPwqZMxPQ89QHZm-EzGhytqsUfzSBB2r2bQvRFpKfzskusFYGqKy9KyReNVlQa5An1RLk_xdQCW3choy8_2eqQwh5lqQmz35nfUdZmXTznHWhpQBK-CnmhPrVtygbD1-BQLosshpXAKyhhLnNFW6SYEA96P3'
  },
  'salted-honey-croissant': {
    name: 'Salted Honey Croissant',
    price: 5.25,
    category: 'Pastries',
    description: 'Laminated dough with locally sourced honey and Maldon sea salt flakes.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCszD1czMbJwo9XnvhhBwkuP_18PvI3jTOT2sIRjywgbQtOJKKb5hRqB5mVcRjM8rxS2bKtx1SWaCjEE6ldMZBDrizrbUvbBYjb9ReUSUh5FRL_r7npquPZt4UPXy0kZAOGUTZR13Ws3_vlpeoexAEHsGvN5iWc0trpO2CfHBSpkH5BhyzKQeocweYZghCqeRoi4UAnJNKbD8UWx36L2LHkesUSewrip3V5t45C7kDmip7T0uO9OjjfDdzREjS0iSAy2QJUhJKL4u_t'
  },
  'ethiopian-yirgacheffe': {
    name: 'Ethiopian Yirgacheffe',
    price: 7.00,
    category: 'Hot Coffee',
    description: 'Tea-like body with vibrant jasmine floral notes and citrus acidity.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdRFZsk86LmnAmLNQJCqLOYNGmK-fKuDKTVWx33c9a8NgvFJdDPspRD3N09K3rQdjTSqcf_kxGPglm60gMs9lREkL_Y1Nn5BP0Vu4o1Y9I0t0qnrXT39G26it2tyMJeov8rhMbmSXS02juQLWGJE-aHI0WJHsFQAN0iWVG77J0KC9c-yFtoAdyo-o8hq0Rx_RqazIwAlum1KvbHv4_LIxSqBeyVkKDievdbtNc6Ri44lxWVs_iM58_NatGvwOpKcd0vN47IgBO3ME8'
  },
  'avocado-sourdough': {
    name: 'Avocado Sourdough',
    price: 12.00,
    category: 'Pastries',
    description: 'House-made sourdough, hass avocado, 6-minute egg, and chili threads.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Q-tjWihFz8Y6aG_5HFNH1MdfqwOGTgp3Z2e6vg4-UDauPuIojd-A1YqZ0v9JFhBSpufWAXDa1VVVKm52sboQv5zvJRBz0JxMGxlRhq3s05hSfiW5kRCuiuZjZyfTzTNKlTqsm6G3LB71P3UNcNQ4k2SOYH4YqY2hMdoJEu3XhwIzVyrOdYkd8qgTtBBFV25oDfNfZKwXWzeqrGgnBdCAohVZvIhpaHRafi6nJXM3af8M9uNzHOebuvJkdtYhEkvNx4QnFCN5oozn'
  },
  'iced-ceremonial-matcha': {
    name: 'Iced Ceremonial Matcha',
    price: 6.50,
    category: 'Cold Coffee',
    description: 'Stone-ground Uji matcha whisked with oat milk and a touch of agave.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCALfCWAIAHegNacuqWlUGAtvDD5vbQ2u_lzAHcm6ew6cYQ7MGmbe6SixJB2BYyojyUm7yQC1LBUgW-GPZnGmEZrpEilm6rYOnvwOijcdAuSJPqBv5y_UmRrSQyUDpX1BtqadU_mOEN-mOqVp2jlc-xQPgnRECOjldhmTy6hzruGZ25nV9DarpKO_xUyfOct85qhfEZ6X5UKBdenQ4urNQYzZ72MgubSaP5fjzZZFVHwtaM4Ppu-I-D8UDZPoypySbrSE-cu488YN_8'
  },
  'yirgacheffe-floral': {
    name: 'Yirgacheffe Floral',
    price: 24.00,
    category: 'Ethical Ethiopia',
    description: 'Vibrant floral jasmine aromas paired with a crisp lemon zest acidity and tea-like finish.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMwNH1ezn7xRkZIA92KD6DvIWGaQoqy27VzFbgdVUqzpXGBNCe9sxbw1RR3jx_wl7hFDlWA7_XLt1Hp82UeYDSi8iL7Go_mDo8JJyGO4HForu3qAQ9IqwSw0AQeC5U1_NyxakiSuOFb7L6TMslA7_7iKfMhR7xJ2SAXfcfyYWMKjHSuukcaO5GqFQ6cuxWgZ5DYfYsuum-yo7pkICQ5ZgCDn_79x50txpqXbCK8Ah9db84ZmGpkNZTbDJzMuL5qAqPhZc0hd1xzere'
  },
  'velvet-espresso': {
    name: 'Velvet Espresso',
    price: 28.00,
    category: 'Dark Roast',
    description: 'Indulgent notes of dark chocolate and toasted walnut with a smooth, heavy body.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrXB5YSSiTkUZxmpuVgCI0c1G3PgqexdOY3mBwPdfeE4b-_liX7bdSP6EBr_bzBWgCDGb0C6YCAtJD-MfmhqUZhctBPOlOIQ8pg1i-yppUJ4cQn2jEDI6Jvx0DLphDFd7XVeQu2p8CtvjuSiVmisl26yhIBtwlhh0QIsUX2qBH2by3sv8vwtn6R4DKewC6wDwHXRewDPH3fmAzwEg_kE-ZjP1SFPVXqcgw8MPwJod_kEDk457mR1u5qkyhnh8WvEpwP1Bze0T5BYZ3'
  },
  'sumatran-earth': {
    name: 'Sumatran Earth',
    price: 22.00,
    category: 'Single Origin',
    description: 'A bold, smoky profile with deep molasses sweetness and a lingering volcanic finish.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2q3c04deMvZvUP0icNIvex_wAKC-JotalSMBMZE535WxDNcrp5ycKTVS_H9Aq6pExUUxwmPgPI9jfrQu32NEc2_zHZjyKtTJV3pUeWTh1fhKPaWrl4ADSjA3H_3ndZdSApNvIt1SBTNqvsRgxQ__nSEwGEjIBF748yncfQi4HrNlzw3eyDFMXUB3LN50Sn0fSF08OvshAxw_xvOgn4DrkkhLVPubC5ehlaEYDm1cLt1iZVLJJNE444N6yOo0z855wHlw18maQ-U4V'
  }
};

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [milk, setMilk] = useState('Whole');
  const [sweetnessVal, setSweetnessVal] = useState(50); // 0, 25, 50, 75, 100
  const [extraEspresso, setExtraEspresso] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${API}/products/${slug}`);
        setProduct(data);
      } catch {
        // Fallback for demo purposes
        const fallback = MOCK_PRODUCTS[slug] || MOCK_PRODUCTS['cortado'];
        setProduct({
          _id: slug,
          ...fallback
        });
      }
    };
    fetchProduct();
  }, [slug]);

  const getSweetnessText = (val) => {
    if (val === '0' || val === 0) return 'Unsweetened (0%)';
    if (val === '25' || val === 25) return 'Light (25%)';
    if (val === '50' || val === 50) return 'Standard (50%)';
    if (val === '75' || val === 75) return 'Sweet (75%)';
    return 'Extra Sweet (100%)';
  };

  const handleAdd = () => {
    if (!product) return;
    const finalPrice = product.price + (extraEspresso ? 1.50 : 0);
    addItem({
      _id: product._id,
      name: product.name,
      price: finalPrice,
      image: product.image,
      size: 'standard',
      quantity: 1
    }, {
      milkOption: milk,
      sweetness: getSweetnessText(sweetnessVal),
      extraEspresso: extraEspresso
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" id="product-loading">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const finalPrice = product.price + (extraEspresso ? 1.50 : 0);

  return (
    <div className="pt-20 min-h-screen bg-background text-on-background selection:bg-primary-fixed selection:text-primary" id="product-detail-page">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
        {/* Left: Hero Image Section */}
        <section className="w-full md:w-1/2 relative bg-surface-container-low flex items-center justify-center p-stack-lg">
          <div className="w-full h-full rounded-xl overflow-hidden shadow-sm border border-outline-variant/10 group aspect-square md:aspect-auto md:min-h-[500px]">
            <img 
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" 
              alt={product.name}
              src={product.image}
            />
          </div>
        </section>

        {/* Right: Product Detail Section */}
        <section className="w-full md:w-1/2 px-margin-desktop py-section-gap flex flex-col justify-center">
          <nav className="flex gap-2 mb-stack-md text-on-surface-variant/60">
            <span className="text-caption font-caption uppercase tracking-widest">Menu</span>
            <span className="text-caption font-caption">/</span>
            <span className="text-caption font-caption uppercase tracking-widest">{product.category || 'Coffee'}</span>
          </nav>
          
          <h1 className="font-display-lg text-display-lg text-primary mb-stack-sm leading-tight">
            {product.name}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg max-w-md">
            {product.description}
          </p>

          <div className="space-y-stack-lg">
            {/* Milk Selection */}
            <div>
              <label className="font-label-md text-label-md text-primary block mb-stack-sm uppercase tracking-wider">MILK CHOICE</label>
              <div className="flex flex-wrap gap-stack-sm">
                {['Whole', 'Oat', 'Almond'].map((option) => {
                  const isSelected = milk === option;
                  return (
                    <button
                      key={option}
                      onClick={() => setMilk(option)}
                      className={`px-stack-md py-stack-sm border rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-primary bg-primary text-white' 
                          : 'border-outline-variant hover:border-primary text-on-surface-variant'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sweetness Slider */}
            <div>
              <div className="flex justify-between items-center mb-stack-sm">
                <label className="font-label-md text-label-md text-primary uppercase tracking-wider">SWEETNESS LEVEL</label>
                <span className="text-caption font-caption text-primary font-bold" id="sweetness-val">
                  {getSweetnessText(sweetnessVal)}
                </span>
              </div>
              <input 
                className="w-full h-1.5 bg-surface-container-highest rounded-full appearance-none cursor-pointer custom-range" 
                max="100" 
                min="0" 
                step="25" 
                type="range" 
                value={sweetnessVal}
                onChange={(e) => setSweetnessVal(parseInt(e.target.value))}
              />
              <div className="flex justify-between mt-2 text-[10px] uppercase tracking-tighter text-on-surface-variant/40 font-bold">
                <span>None</span>
                <span>Standard</span>
                <span>Extra</span>
              </div>
            </div>

            {/* Add-ons */}
            <div className="bg-surface-container-low p-stack-md rounded-xl border border-outline-variant/20">
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-stack-md">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                    <span className="material-symbols-outlined">coffee</span>
                  </div>
                  <div>
                    <span className="font-label-md text-label-md block text-on-surface">Extra Espresso Shot</span>
                    <span className="text-caption font-caption text-on-surface-variant">+ $1.50</span>
                  </div>
                </div>
                <input 
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 cursor-pointer" 
                  type="checkbox"
                  checked={extraEspresso}
                  onChange={(e) => setExtraEspresso(e.target.checked)}
                />
              </label>
            </div>

            {/* Order Action */}
            <div className="pt-stack-lg border-t border-outline-variant/30 mt-stack-lg flex items-center justify-between">
              <div>
                <span className="text-caption font-caption text-on-surface-variant block">Price</span>
                <span className="font-display-lg text-headline-lg text-secondary">${finalPrice.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleAdd}
                className="bg-primary hover:opacity-90 active:scale-95 text-on-primary px-12 py-4 rounded-full font-label-md text-label-md transition-all shadow-md flex items-center gap-2 group cursor-pointer"
                id="add-to-cart-btn"
              >
                {added ? 'Added to Order' : 'Add to Order'}
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
