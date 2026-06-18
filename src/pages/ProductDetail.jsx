import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import './ProductDetail.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const STITCH_IMAGES = {
  'obsidian': 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8Sd7y0-eUxIGd-dwtCG3RNUaJ73IEMI91uwMVOzCuD9d-hvWfxRgj3aq6bChrod4EsHQscAoY9glffpIkQKwlaXfAtibpoml9V1WG6mGPN7LOtSiANvLVpOal0V2FJXJSujr-EIH0JbGKC3aO4aCvrjj7CzUlyH7_gAAICvhq-Hfr6c1EdEifHFCrU9g7HhS2e9PbbdRrBD8oo4nuaysDfINIdLS2jE9Y7cLtnnc8cBDhzxdvugFCH0ESaw3ToBkLJY-esvYyFNi4',
  'cortado': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMB-hJ74NQ9SfrtzVBFZ419686vrdCYGI4-iGRRhHpCJLH3uzcb80X6yuJNVgKPBSz2xXsYCdKEa6GMF29jKFzbCaIQ438tpKAqyw2YbbCjKmHZa8SyaxuQ8UyKLYbogUS6yqJyeW-WMRrqCwz1nthIROHNCf0QTPPwha3XIZ-gEgMn8fdCABG12-iT2tTXY9A2uctD6-mzYTxfYHc7iNYKBf0g53sVhcMqnxoRAJjoiF4cITD4TEOcFaUt65UWeZvaQkCkYmxUbEU',
  'ethiopian': 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5KPsfeFqkDltw69v5PBc5DMD0CMeBIYy84z-WPKNqyxuSOiOjSPWs3LwFoA_zZYgtPQ2acDTf9DnWA4ken_iMsHIIkW49gc2W1oeenHa6cGXLlGeKSKFYxXQM5BakAFL1tRepSlLmyRTzJAMRYO2j8plnsmBP7XZQr53jiuRQEz2lX6NSEdRw3EkYitQPINqVnhS1cNTed7-Ku88pwelyDiBwLeEb7cUPjv2GqVFkukJHLR68SsDjPk8kHqkgJ6MJT8QygXDt1EeQ',
  'double': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtavCCE_rXaeEjxjGK9l-MS4vIt8LSmozNdPQvvgbwEo2DixEHV3vWLOTll8gN3pkDn8C4qiELVAmy3A161qmFdCW7KqtBVgUHwpwJWZc0Ru5LbAfny0xY03NCMeGXw1jq_G9wZLO8TrmnFXMpkNIdCwQMyqI4t8LaeFk_0TG2q3gt-RT0KMUM0SZ7qcTj39PQnyFx7ALB4QYk_h-fv-X2Jchquyp4xJmb-DFwboGynlCiczX8M2XFj3gKbf_52z1EB58EXCMIGIxL',
  'oat': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRz2WVSfZq-k0SgfL4Ky1iOogH_Va-rejAtINN3IFdQP0Xqe21tOZEskJ5JM0rq5VL_IQZ5s7W0rZ3BKhLV9r_AODlBcJssK2N8HKTWXP3BMRl-k3Yy5nRUzc0je4OilvueGxcqkovMC34igqxlc1iwvRKizJAHDrOqY6yqiZ_t0RXk500z4lcqBfQrB2DdQ-Aw-oQN-ICL_pn7xqsIY7Q7F4v0KyXbA0b650HXcyw3pJ3UH2WIweBW_0nNAFfCLVgo-gmoNAFE-rM',
  'cold': 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYC6HUH7jgkB5USXNDKhnp2wTY6SP5iSErW1xdQgVOZpxHkkkSvXj44y2XoG_t0R7UUvz-4xVUo1Y7kUnR6kCs2EaR_SCCskRm5Edu9olo4jNe4OkXF8l1jRteSSydv_TqCeN_rQvy-6fBvAHDnLFCfNSRLpdCxXT2XD1HkPh2MpwAeYeKxydWc6Ymh8HyylE-6xq2fNLjxcqlfueKTxPiez5nmQOh5TpCjgIZ4PfRikH7LvRk6IWL9N0eMWodCEKKu6Vcu_eRyhs1',
  'signature': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvXjtdslRdMjfzgZKw7PCGxE_T64atnqDG4vOLwvYbVTO_4qG9EjE7S3JeAfmjCuk3jmx54m6xVrCELP4mst4UB9heLt37DdK25mH1ChPQUDWnJ5I-OietFvxHPDTNXnpAMrNG8AQph5l3tVFllV5iNynrvCRlHqBa1a_H1Od9MOTaKBzwrrlKPjxpOQlA_ZRWXKYbL_30eq1eMsspcDragTwb-h3ZZtpf4Pe_zh-NNV-4zWtL4nozs9eK_Z3n8HjKEIJxBXf925JU',
  'gold': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvXjtdslRdMjfzgZKw7PCGxE_T64atnqDG4vOLwvYbVTO_4qG9EjE7S3JeAfmjCuk3jmx54m6xVrCELP4mst4UB9heLt37DdK25mH1ChPQUDWnJ5I-OietFvxHPDTNXnpAMrNG8AQph5l3tVFllV5iNynrvCRlHqBa1a_H1Od9MOTaKBzwrrlKPjxpOQlA_ZRWXKYbL_30eq1eMsspcDragTwb-h3ZZtpf4Pe_zh-NNV-4zWtL4nozs9eK_Z3n8HjKEIJxBXf925JU'
};

const getStitchImage = (name) => {
  if (!name) return STITCH_IMAGES.signature;
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(STITCH_IMAGES)) {
    if (lower.includes(key)) return val;
  }
  return STITCH_IMAGES.signature;
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
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${API}/products/${slug}`);
        setProduct(data);
      } catch {
        // Fallback for demo purposes
        if (slug === 'signature-gold-latte' || slug === 'velvet-cortado' || slug === 'ethereal-ethiopian' || slug === 'the-obsidian-roast' || slug === 'double-espresso' || slug === 'oat-milk-latte' || slug === 'cold-brew-concierge') {
          const mockName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          setProduct({
            _id: slug,
            name: mockName,
            slug: slug,
            description: mockName.includes('Gold') 
              ? 'Our house-specialty double espresso infused with honey, Madagascar vanilla, and topped with a delicate shimmer of edible 24k gold.'
              : 'Handcrafted signature recipe using the finest single-origin beans.',
            price: mockName.includes('Gold') ? 6.75 : mockName.includes('Cortado') ? 5.50 : mockName.includes('Obsidian') ? 18.00 : mockName.includes('Ethiopian') ? 22.00 : mockName.includes('Double') ? 4.00 : mockName.includes('Oat') ? 6.25 : 16.00,
            category: mockName.includes('Obsidian') || mockName.includes('Ethiopian') ? 'Pour Over' : mockName.includes('Cold Brew') ? 'Seasonal' : 'Signature Series'
          });
        } else {
          // Default fallback
          setProduct({
            _id: 'default',
            name: 'Signature Gold Latte',
            slug: 'signature-gold-latte',
            description: 'Our house-specialty double espresso infused with honey, Madagascar vanilla, and topped with a delicate shimmer of edible 24k gold.',
            price: 6.75,
            category: 'Signature Series'
          });
        }
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
      image: getStitchImage(product.name),
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-caramel"></div>
      </div>
    );
  }

  const finalPrice = product.price + (extraEspresso ? 1.50 : 0);
  const productImage = getStitchImage(product.name);

  return (
    <div className="pt-20 min-h-screen bg-background text-on-background selection:bg-caramel/20" id="product-detail-page">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
        {/* Left: Hero Image Section */}
        <section className="w-full md:w-1/2 relative bg-surface-container-low flex items-center justify-center p-stack-lg">
          <div className="w-full h-full rounded-xl overflow-hidden shadow-sm border border-outline-variant/10 group aspect-square md:aspect-auto md:min-h-[500px]">
            <img 
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" 
              alt={product.name}
              src={productImage}
            />
          </div>
          {/* Decorative Steamer element for brand flair */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-caramel/10 rounded-full overflow-hidden hidden lg:block">
            <div className="steamer-progress w-full h-1/2"></div>
          </div>
        </section>

        {/* Right: Product Detail Section */}
        <section className="w-full md:w-1/2 px-margin-desktop py-section-gap flex flex-col justify-center">
          <nav className="flex gap-2 mb-stack-md text-on-surface-variant/60">
            <span className="text-caption font-caption uppercase tracking-widest">Menu</span>
            <span className="text-caption font-caption">/</span>
            <span className="text-caption font-caption uppercase tracking-widest">{product.category || 'Coffee'}</span>
          </nav>
          
          <h1 className="font-display-lg text-display-lg text-on-surface mb-stack-sm leading-tight">
            {product.name}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg max-w-md">
            {product.description}
          </p>

          <div className="space-y-stack-lg">
            {/* Milk Selection */}
            <div>
              <label className="font-label-md text-label-md text-on-surface block mb-stack-sm">MILK CHOICE</label>
              <div className="flex flex-wrap gap-stack-sm">
                {['Whole', 'Oat', 'Almond'].map((option) => {
                  const isSelected = milk === option;
                  return (
                    <button
                      key={option}
                      onClick={() => setMilk(option)}
                      className={`px-stack-md py-stack-sm border rounded-lg font-label-md text-label-md transition-all ${
                        isSelected 
                          ? 'border-caramel bg-caramel text-white' 
                          : 'border-outline-variant hover:border-caramel text-on-surface-variant'
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
                <label className="font-label-md text-label-md text-on-surface">SWEETNESS LEVEL</label>
                <span className="text-caption font-caption text-caramel font-bold" id="sweetness-val">
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
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-caramel shadow-sm">
                    <span className="material-symbols-outlined">coffee</span>
                  </div>
                  <div>
                    <span className="font-label-md text-label-md block text-on-surface">Extra Espresso Shot</span>
                    <span className="text-caption font-caption text-on-surface-variant">+ $1.50</span>
                  </div>
                </div>
                <input 
                  className="w-5 h-5 rounded border-outline-variant text-caramel focus:ring-caramel/20 cursor-pointer" 
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
                className="bg-caramel hover:brightness-110 active:scale-95 text-white px-12 py-4 rounded-full font-label-md text-label-md transition-all shadow-md flex items-center gap-2 group"
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
