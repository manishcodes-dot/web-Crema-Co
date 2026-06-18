import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import './Menu.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const categories = [
  { key: 'Espresso', label: 'Espresso', icon: 'coffee_maker' },
  { key: 'Pour Over', label: 'Pour Over', icon: 'water_drop' },
  { key: 'Seasonal', label: 'Seasonal', icon: 'eco' },
  { key: 'Pastries', label: 'Pastries', icon: 'bakery_dining' },
];

export default function Menu() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Espresso');
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API}/products`);
        setProducts(data);
      } catch {
        setProducts([
          {
            _id: '1',
            name: 'The Obsidian Roast',
            slug: 'the-obsidian-roast',
            category: 'Pour Over',
            price: 18.00,
            description: 'A deep, complex profile with lingering notes of dark cocoa and forest floor. Meticulously slow-roasted for the boldest flavor.',
            tastingNotes: ['Dark Chocolate', 'Smoky'],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8Sd7y0-eUxIGd-dwtCG3RNUaJ73IEMI91uwMVOzCuD9d-hvWfxRgj3aq6bChrod4EsHQscAoY9glffpIkQKwlaXfAtibpoml9V1WG6mGPN7LOtSiANvLVpOal0V2FJXJSujr-EIH0JbGKC3aO4aCvrjj7CzUlyH7_gAAICvhq-Hfr6c1EdEifHFCrU9g7HhS2e9PbbdRrBD8oo4nuaysDfINIdLS2jE9Y7cLtnnc8cBDhzxdvugFCH0ESaw3ToBkLJY-esvYyFNi4'
          },
          {
            _id: '2',
            name: 'Velvet Cortado',
            slug: 'velvet-cortado',
            category: 'Espresso',
            price: 5.50,
            description: 'Perfectly balanced espresso cut with silky micro-foam. A texture that lives up to its name.',
            tastingNotes: ['Smooth', 'Caramel'],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMB-hJ74NQ9SfrtzVBFZ419686vrdCYGI4-iGRRhHpCJLH3uzcb80X6yuJNVgKPBSz2xXsYCdKEa6GMF29jKFzbCaIQ438tpKAqyw2YbbCjKmHZa8SyaxuQ8UyKLYbogUS6yqJyeW-WMRrqCwz1nthIROHNCf0QTPPwha3XIZ-gEgMn8fdCABG12-iT2tTXY9A2uctD6-mzYTxfYHc7iNYKBf0g53sVhcMqnxoRAJjoiF4cITD4TEOcFaUt65UWeZvaQkCkYmxUbEU'
          },
          {
            _id: '3',
            name: 'Ethereal Ethiopian',
            slug: 'ethereal-ethiopian',
            category: 'Pour Over',
            price: 22.00,
            description: 'High-altitude beans offering a tea-like clarity with vibrant jasmine and citrus aromatics.',
            tastingNotes: ['Floral', 'Lemon'],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5KPsfeFqkDltw69v5PBc5DMD0CMeBIYy84z-WPKNqyxuSOiOjSPWs3LwFoA_zZYgtPQ2acDTf9DnWA4ken_iMsHIIkW49gc2W1oeenHa6cGXLlGeKSKFYxXQM5BakAFL1tRepSlLmyRTzJAMRYO2j8plnsmBP7XZQr53jiuRQEz2lX6NSEdRw3EkYitQPINqVnhS1cNTed7-Ku88pwelyDiBwLeEb7cUPjv2GqVFkukJHLR68SsDjPk8kHqkgJ6MJT8QygXDt1EeQ'
          },
          {
            _id: '4',
            name: 'Double Espresso',
            slug: 'double-espresso',
            category: 'Espresso',
            price: 4.00,
            description: 'The heart of our craft. Two shots of our signature house blend with a thick, honeyed crema.',
            tastingNotes: ['Nutty', 'Intense'],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtavCCE_rXaeEjxjGK9l-MS4vIt8LSmozNdPQvvgbwEo2DixEHV3vWLOTll8gN3pkDn8C4qiELVAmy3A161qmFdCW7KqtBVgUHwpwJWZc0Ru5LbAfny0xY03NCMeGXw1jq_G9wZLO8TrmnFXMpkNIdCwQMyqI4t8LaeFk_0TG2q3gt-RT0KMUM0SZ7qcTj39PQnyFx7ALB4QYk_h-fv-X2Jchquyp4xJmb-DFwboGynlCiczX8M2XFj3gKbf_52z1EB58EXCMIGIxL'
          },
          {
            _id: '5',
            name: 'Oat Milk Latte',
            slug: 'oat-milk-latte',
            category: 'Espresso',
            price: 6.25,
            description: 'Creamy, gluten-free oat milk paired with our rich espresso. Naturally sweet and satisfying.',
            tastingNotes: ['Creamy', 'Plant-Based'],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRz2WVSfZq-k0SgfL4Ky1iOogH_Va-rejAtINN3IFdQP0Xqe21tOZEskJ5JM0rq5VL_IQZ5s7W0rZ3BKhLV9r_AODlBcJssK2N8HKTWXP3BMRl-k3Yy5nRUzc0je4OilvueGxcqkovMC34igqxlc1iwvRKizJAHDrOqY6yqiZ_t0RXk500z4lcqBfQrB2DdQ-Aw-oQN-ICL_pn7xqsIY7Q7F4v0KyXbA0b650HXcyw3pJ3UH2WIweBW_0nNAFfCLVgo-gmoNAFE-rM'
          },
          {
            _id: '6',
            name: 'Cold Brew Concierge',
            slug: 'cold-brew-concierge',
            category: 'Seasonal',
            price: 16.00,
            description: 'Steeped for 18 hours in filtered cold water. Low acidity with a natural chocolate finish.',
            tastingNotes: ['Refreshing', 'Low Acid'],
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYC6HUH7jgkB5USXNDKhnp2wTY6SP5iSErW1xdQgVOZpxHkkkSvXj44y2XoG_t0R7UUvz-4xVUo1Y7kUnR6kCs2EaR_SCCskRm5Edu9olo4jNe4OkXF8l1jRteSSydv_TqCeN_rQvy-6fBvAHDnLFCfNSRLpdCxXT2XD1HkPh2MpwAeYeKxydWc6Ymh8HyylE-6xq2fNLjxcqlfueKTxPiez5nmQOh5TpCjgIZ4PfRikH7LvRk6IWL9N0eMWodCEKKu6Vcu_eRyhs1'
          }
        ]);
      }
    };
    fetchProducts();
  }, []);

  // Map backend categories/properties to align with UI expectations
  const normalizedProducts = products.map(p => {
    let cat = p.category;
    if (!cat) {
      cat = 'Espresso';
    }
    // Normalize to exact keys
    if (p.name.includes('Ethiopian') || p.name.includes('Obsidian')) {
      cat = 'Pour Over';
    } else if (p.name.includes('Cold Brew')) {
      cat = 'Seasonal';
    } else if (cat.toLowerCase().includes('espresso') || p.name.includes('Cortado') || p.name.includes('Latte')) {
      cat = 'Espresso';
    }
    
    let img = p.image;
    if (p.name.includes('Obsidian')) {
      img = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8Sd7y0-eUxIGd-dwtCG3RNUaJ73IEMI91uwMVOzCuD9d-hvWfxRgj3aq6bChrod4EsHQscAoY9glffpIkQKwlaXfAtibpoml9V1WG6mGPN7LOtSiANvLVpOal0V2FJXJSujr-EIH0JbGKC3aO4aCvrjj7CzUlyH7_gAAICvhq-Hfr6c1EdEifHFCrU9g7HhS2e9PbbdRrBD8oo4nuaysDfINIdLS2jE9Y7cLtnnc8cBDhzxdvugFCH0ESaw3ToBkLJY-esvYyFNi4';
    } else if (p.name.includes('Cortado')) {
      img = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMB-hJ74NQ9SfrtzVBFZ419686vrdCYGI4-iGRRhHpCJLH3uzcb80X6yuJNVgKPBSz2xXsYCdKEa6GMF29jKFzbCaIQ438tpKAqyw2YbbCjKmHZa8SyaxuQ8UyKLYbogUS6yqJyeW-WMRrqCwz1nthIROHNCf0QTPPwha3XIZ-gEgMn8fdCABG12-iT2tTXY9A2uctD6-mzYTxfYHc7iNYKBf0g53sVhcMqnxoRAJjoiF4cITD4TEOcFaUt65UWeZvaQkCkYmxUbEU';
    } else if (p.name.includes('Ethiopian')) {
      img = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5KPsfeFqkDltw69v5PBc5DMD0CMeBIYy84z-WPKNqyxuSOiOjSPWs3LwFoA_zZYgtPQ2acDTf9DnWA4ken_iMsHIIkW49gc2W1oeenHa6cGXLlGeKSKFYxXQM5BakAFL1tRepSlLmyRTzJAMRYO2j8plnsmBP7XZQr53jiuRQEz2lX6NSEdRw3EkYitQPINqVnhS1cNTed7-Ku88pwelyDiBwLeEb7cUPjv2GqVFkukJHLR68SsDjPk8kHqkgJ6MJT8QygXDt1EeQ';
    } else if (p.name.includes('Double')) {
      img = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtavCCE_rXaeEjxjGK9l-MS4vIt8LSmozNdPQvvgbwEo2DixEHV3vWLOTll8gN3pkDn8C4qiELVAmy3A161qmFdCW7KqtBVgUHwpwJWZc0Ru5LbAfny0xY03NCMeGXw1jq_G9wZLO8TrmnFXMpkNIdCwQMyqI4t8LaeFk_0TG2q3gt-RT0KMUM0SZ7qcTj39PQnyFx7ALB4QYk_h-fv-X2Jchquyp4xJmb-DFwboGynlCiczX8M2XFj3gKbf_52z1EB58EXCMIGIxL';
    } else if (p.name.includes('Oat Milk') || p.name.includes('Latte')) {
      img = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRz2WVSfZq-k0SgfL4Ky1iOogH_Va-rejAtINN3IFdQP0Xqe21tOZEskJ5JM0rq5VL_IQZ5s7W0rZ3BKhLV9r_AODlBcJssK2N8HKTWXP3BMRl-k3Yy5nRUzc0je4OilvueGxcqkovMC34igqxlc1iwvRKizJAHDrOqY6yqiZ_t0RXk500z4lcqBfQrB2DdQ-Aw-oQN-ICL_pn7xqsIY7Q7F4v0KyXbA0b650HXcyw3pJ3UH2WIweBW_0nNAFfCLVgo-gmoNAFE-rM';
    } else if (p.name.includes('Cold Brew') || p.name.includes('Concierge')) {
      img = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYC6HUH7jgkB5USXNDKhnp2wTY6SP5iSErW1xdQgVOZpxHkkkSvXj44y2XoG_t0R7UUvz-4xVUo1Y7kUnR6kCs2EaR_SCCskRm5Edu9olo4jNe4OkXF8l1jRteSSydv_TqCeN_rQvy-6fBvAHDnLFCfNSRLpdCxXT2XD1HkPh2MpwAeYeKxydWc6Ymh8HyylE-6xq2fNLjxcqlfueKTxPiez5nmQOh5TpCjgIZ4PfRikH7LvRk6IWL9N0eMWodCEKKu6Vcu_eRyhs1';
    }

    return {
      ...p,
      category: cat,
      image: img || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMB-hJ74NQ9SfrtzVBFZ419686vrdCYGI4-iGRRhHpCJLH3uzcb80X6yuJNVgKPBSz2xXsYCdKEa6GMF29jKFzbCaIQ438tpKAqyw2YbbCjKmHZa8SyaxuQ8UyKLYbogUS6yqJyeW-WMRrqCwz1nthIROHNCf0QTPPwha3XIZ-gEgMn8fdCABG12-iT2tTXY9A2uctD6-mzYTxfYHc7iNYKBf0g53sVhcMqnxoRAJjoiF4cITD4TEOcFaUt65UWeZvaQkCkYmxUbEU'
    };
  });

  const filtered = normalizedProducts.filter(p => p.category === activeCategory);

  const handleAddToBag = (product) => {
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
    <div className="pt-20 min-h-screen bg-background text-on-background" id="menu-page">
      {/* Hero Section with atmospheric text */}
      <section className="px-margin-desktop py-stack-lg max-w-container-max mx-auto mt-stack-lg">
        <div className="max-w-2xl">
          <h1 className="font-display-lg text-display-lg espresso-text mb-stack-sm">The Artisanal Menu</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant/80">
            From soil to soul. Explore our curated selection of roasts and handcrafted beverages designed for the discerning palate.
          </p>
        </div>
      </section>

      {/* Menu Layout: Sidebar + Grid */}
      <section className="px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row gap-gutter pb-section-gap">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="sticky top-28 flex flex-row md:flex-col gap-stack-md overflow-x-auto pb-4 md:pb-0 custom-scrollbar">
            {categories.map((cat, idx) => {
              const isActive = activeCategory === cat.key;
              return (
                <div key={cat.key} className="w-full flex flex-col">
                  {idx === 3 && (
                    <div className="hidden md:block h-[1px] bg-outline-variant/30 my-stack-sm w-full"></div>
                  )}
                  <button
                    onClick={() => setActiveCategory(cat.key)}
                    className={`flex items-center gap-stack-md px-stack-md py-stack-md rounded-lg transition-all duration-300 text-left whitespace-nowrap group w-full ${
                      isActive 
                        ? 'bg-secondary text-on-secondary font-semibold' 
                        : 'text-on-surface-variant hover:bg-surface-variant/30'
                    }`}
                    id={`filter-${cat.key.toLowerCase().replace(' ', '-')}`}
                  >
                    <span className={`material-symbols-outlined ${!isActive ? 'group-hover:scale-110 transition-transform' : ''}`} data-icon={cat.icon}>
                      {cat.icon}
                    </span>
                    <span className="font-label-md text-label-md">{cat.label}</span>
                  </button>
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main Menu Grid */}
        <div className="flex-grow">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-on-surface-variant">
              No items in this category yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {filtered.map((product) => {
                const isBeverage = product.category === 'Espresso';
                return (
                  <div key={product._id} className="bg-surface-container-lowest rounded-xl p-stack-sm border border-surface-variant/20 hover:border-secondary/20 transition-all duration-500 group flex flex-col h-full">
                    <div className="aspect-[4/5] overflow-hidden rounded-lg mb-stack-md relative">
                      <img 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        alt={product.name}
                        src={product.image}
                      />
                      <div className="absolute top-stack-sm right-stack-sm bg-surface/90 backdrop-blur-sm px-stack-sm py-1 rounded-full">
                        <span className="font-label-md text-label-md text-secondary">${product.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="px-stack-sm pb-stack-md flex flex-col flex-grow">
                      <h3 className="font-headline-md text-headline-md espresso-text mb-1">{product.name}</h3>
                      <p className="font-body-md text-on-surface-variant/80 text-sm mb-stack-md flex-grow leading-relaxed">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-stack-md">
                        {product.tastingNotes?.map((note) => (
                          <span key={note} className="px-3 py-1 bg-tertiary/10 text-tertiary rounded-full text-[10px] font-bold tracking-wider uppercase">
                            {note}
                          </span>
                        ))}
                      </div>
                      
                      {isBeverage ? (
                        <Link 
                          to={`/product/${product.slug}`} 
                          className="w-full text-center py-stack-md bg-inverse-surface text-on-primary rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors duration-300 block"
                          id={`menu-order-${product.slug}`}
                        >
                          Order Now
                        </Link>
                      ) : (
                        <button 
                          onClick={() => handleAddToBag(product)}
                          className="w-full py-stack-md bg-inverse-surface text-on-primary rounded-lg font-label-md text-label-md hover:bg-secondary transition-colors duration-300"
                          id={`menu-add-${product.slug}`}
                        >
                          Add to Bag
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter / Subscription Hook (Bento style) */}
      <section className="px-margin-desktop py-section-gap max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-8 bg-secondary-container/30 rounded-3xl p-stack-lg flex flex-col justify-center border border-outline-variant/20">
            <h2 className="font-headline-lg text-headline-lg espresso-text mb-stack-md">Join the Roastery Club</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg max-w-xl">
              Get exclusive access to small-batch seasonal releases and brewing workshops with our master roasters.
            </p>
            <div className="flex flex-col sm:flex-row gap-stack-md max-w-lg">
              <input 
                className="flex-grow bg-surface border-2 border-outline-variant/30 rounded-lg px-stack-md py-stack-md focus:outline-none focus:border-tertiary transition-all" 
                placeholder="Your email address" 
                type="email"
              />
              <button className="bg-secondary text-on-secondary px-stack-lg py-stack-md rounded-lg font-label-md text-label-md hover:bg-on-surface transition-all">
                Subscribe
              </button>
            </div>
          </div>
          <div className="md:col-span-4 aspect-square md:aspect-auto rounded-3xl overflow-hidden relative">
            <img 
              className="w-full h-full object-cover" 
              alt="A vintage roasting machine in action"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4f1GtOp3w6dCdyvXiHakbTmKabnpa4RgIrW4NXw6virUGywrk62aAxuVinbkF33WKg8iYQ2BgmX0ThtndGD2tdaQbzK5y5C99F52HoHsdSsmxEGcKzSFGdfrqLbmCkgehk2rxz55G2CH2JGhxPtJJrwHkdoEix9mwiB0do3DDAI5gvSvvGwBjwq58HvZKd06aaY1L8iiznkkLeQlv5HIq5Y84wXVmdxy54r7MX5Gwzm78GSxciwZQLsGGkWsmkNHOnMUhWw3yyA1k"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
