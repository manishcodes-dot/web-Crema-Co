import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import './Home.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get(`${API}/products/featured`);
        setFeatured(data.slice(0, 3));
      } catch {
        setFeatured([
          { 
            _id: '7', 
            name: 'Midnight Velvet', 
            slug: 'midnight-velvet', 
            description: 'Indulgent notes of dark chocolate and toasted walnut with a smooth, heavy body.', 
            price: 18.00,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEXYeXJ9NOS_JyZDrKbAQ18T33pb2tDhkDdZEi4q-aR2jk-sTZPgbjjs7iq5l9H7BpVpvgjBiKzqu6e7Ft7IOb1LnUcuDVkarCOIfD14HQOOkNT0Qxq09AAe0eLyTmUfHjPwI-qvICoCXi_XjSNqfpixwMxq63cM3lnF_WpgzGxqbETp6fuZgJyT2qHgC6u5_uXsDJXfh_8kZHQb6044D6EsKxfU6liKlOA_WNvHfQFdUfcR8BX5DLGswiXRn4Tqdm3O4kxHd_Q3RB', 
            tastingNotes: ['DARK', 'Dark Chocolate', 'Toasted Walnut'],
            tagType: 'dark'
          },
          { 
            _id: '3', 
            name: 'Ethiopian Mist',
            slug: 'ethereal-ethiopian', 
            description: 'Vibrant floral jasmine aromas paired with a crisp lemon zest acidity and tea-like finish.', 
            price: 22.00,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIqFuDRTf4Yrs7AWGk6ZYDsSBWmwtDqdnAJ-bYYeBepufdOw38OR25Y4vV_e2YhiZhT5wKn6lu0SfsEGDntqMqFaNExPxB4J8oL2ZFb1DUw5KV-b64q_J9DDLtguz2dy_Zrsi2BEBNgbAq9xsDAOIZH3lZrFLyM2eP9EpF_VeaBajqgmGb6kKQ1ErIdbZBKqB9mjETThxQlPuGS6jynSCRPl5RrRGtTxAuyCFExQGvzwk429z-AqsI7O36Ac69Syut55N71xn39UU4', 
            tastingNotes: ['LIGHT', 'Jasmine', 'Lemon Zest'],
            tagType: 'light'
          },
          { 
            _id: '8', 
            name: 'Vesuvius Dark', 
            slug: 'vesuvius-dark', 
            description: 'A bold, smoky profile with deep molasses sweetness and a lingering volcanic finish.', 
            price: 20.00, 
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaiAyQ68p-lsUt-ZlGlJeZZzuo-2YDnpNN_EsOzG5WinJlEzsSPKpGIcXmaRdihz3NCZg564esNSdf_b8KNYTo8O2hOEWBdCtkxyCEU85jiYNNKu2VHU9ZGyaCAygdTBQ2FY-r2ulR1DOph9v3afxisI_vSk1s8f5UaZhnJlTCH9DEYWRd1LKpKbebwRQgibEwwiijt_xHkELzdnJrCSG_Eew8zcHqVbCTxpXYw4pjGlOd1YAM6eS3lggoCjhetfqK2AhyzCyBIDSf', 
            tastingNotes: ['INTENSE', 'Molasses', 'Smoke'],
            tagType: 'intense'
          },
        ]);
      }
    };
    fetchFeatured();
  }, []);

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
    <div className="overflow-x-hidden bg-background text-on-background" id="home-page">
      {/* Hero Section */}
      <section className="relative w-full h-[870px] flex items-center overflow-hidden px-margin-desktop">
        <div className="max-w-container-max mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <div className="z-10 space-y-stack-lg">
            <div className="inline-flex items-center px-stack-sm py-[2px] rounded-full bg-tertiary/10 text-tertiary border border-tertiary/20">
              <span className="font-label-md text-[10px] tracking-wider uppercase">PREMIUM SELECTION</span>
            </div>
            <h1 className="font-display-lg text-display-lg espresso-text mb-stack-sm leading-tight">
              The Art of the Roast
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
              Experience the alchemy of heat and time. Each bean is hand-selected and roasted to peak aromatic expression.
            </p>
            <div className="flex flex-wrap gap-stack-md pt-stack-md">
              <Link 
                to="/menu" 
                className="px-stack-lg py-stack-md bg-secondary text-on-secondary rounded-lg font-label-md text-label-md hover:scale-[1.02] transition-transform shadow-lg shadow-secondary/20"
              >
                Order Now
              </Link>
              <Link 
                to="/menu" 
                className="px-stack-lg py-stack-md border border-secondary text-secondary rounded-lg font-label-md text-label-md hover:bg-secondary/5 transition-colors"
              >
                Explore Menu
              </Link>
            </div>
          </div>
          <div className="relative h-[600px] w-full hidden md:block">
            <div className="absolute inset-0 rounded-2xl overflow-hidden tonal-layer shadow-sm border border-outline-variant/10">
              <img 
                className="w-full h-full object-cover" 
                alt="A cinematic, close-up shot of dark roasted coffee beans"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_ChCDJiC9JzYwhPUUd58LwCYCgrGneqe0JOcPrz4VjU2oRQ99vKy0fpxnSDk6f1RD5JYh3LBE1A4oeHjPs7iedlBeoRAhtle1MK_j5PVNvyeipn_gn4zknwvY3Wgj254UalG-Ty81Gqh085BdonagmpEuAhevA_K0Wn7hsK4PP4YklCYEe-9H55-KGS9Bo7pT3UL-HZbOK6AdXSIvz3PUj4pMOlNXk45qpZbJBzIrMBdAY3nAwh6wogkkkk5yd04BK90HX2TLfAdl"
              />
            </div>
            {/* Decorative Element: The Steamer */}
            <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-primary-container rounded-xl p-stack-md flex flex-col justify-end tonal-layer border border-outline-variant/30">
              <span className="font-label-md text-[10px] text-tertiary mb-1">NOW BREWING</span>
              <p className="font-headline-md text-body-lg text-on-surface">Vesuvius Dark</p>
              <div className="relative h-1 w-full bg-surface-container mt-stack-md overflow-hidden rounded-full">
                <div className="steamer-progress w-[60%] h-full"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Background Accent */}
        <div className="absolute -right-24 top-1/4 w-[600px] h-[600px] bg-secondary-container/30 rounded-full blur-[120px] -z-10"></div>
      </section>

      {/* Signature Roasts Section */}
      <section className="py-section-gap px-margin-desktop bg-surface-container-lowest" id="signature-roasts">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-stack-lg gap-stack-md">
            <div>
              <h2 className="font-headline-lg text-headline-lg espresso-text">Our Signature Roasts</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">Curated profiles for the discerning palate.</p>
            </div>
            <Link 
              to="/menu" 
              className="text-tertiary font-label-md text-label-md flex items-center gap-stack-sm hover:underline"
            >
              View Tasting Guide <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {featured.map((product) => {
              const isLight = product.tagType === 'light' || product.name.includes('Ethiopian');
              const isIntense = product.tagType === 'intense' || product.name.includes('Vesuvius');
              
              let tagLabel = 'Dark';
              let tagBg = 'bg-secondary-container text-on-secondary-container';
              let icon = 'dark_mode';
              let iconColor = 'text-secondary';
              
              if (isLight) {
                tagLabel = 'Light';
                tagBg = 'bg-tertiary-container text-on-tertiary-container';
                icon = 'filter_drama';
                iconColor = 'text-tertiary';
              } else if (isIntense) {
                tagLabel = 'Intense';
                tagBg = 'bg-error-container text-on-error-container';
                icon = 'local_fire_department';
                iconColor = 'text-on-error-container';
              }

              return (
                <div key={product._id} className="group flex flex-col bg-surface border border-outline-variant/20 rounded-xl overflow-hidden transition-all hover:border-tertiary/40 hover:shadow-xl hover:shadow-secondary/5">
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt={product.name}
                      src={product.image}
                    />
                  </div>
                  <div className="p-stack-md space-y-stack-md flex-grow flex flex-col justify-between">
                    <div className="space-y-stack-sm">
                      <div className="flex justify-between items-start">
                        <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
                        <span className={`text-[10px] font-bold px-stack-sm py-[2px] rounded uppercase tracking-wider ${tagBg}`}>
                          {tagLabel}
                        </span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-on-surface">{product.name}</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleAddToBag(product)}
                      className="w-full mt-stack-md py-3 font-label-md text-label-md border-t border-outline-variant/30 text-secondary group-hover:text-tertiary transition-colors flex items-center justify-center gap-2"
                    >
                      Add to Bag <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Craftsmanship / Bento Section */}
      <section className="py-section-gap px-margin-desktop overflow-hidden">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="col-span-12 md:col-span-8 bg-primary-container rounded-3xl p-stack-lg flex flex-col justify-between relative overflow-hidden min-h-[400px]">
            <div className="z-10">
              <h2 className="font-headline-lg text-headline-lg espresso-text max-w-sm">Engineered for the Perfect Pour</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-stack-md max-w-xs">
                Our roasting process uses precision thermal monitoring to ensure consistency in every batch.
              </p>
            </div>
            <div className="z-10 flex gap-stack-lg mt-stack-lg">
              <div className="flex flex-col">
                <span className="font-display-lg text-display-lg text-secondary">0.1°</span>
                <span className="font-label-md text-[10px] tracking-wider text-on-surface-variant uppercase">Temp Precision</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display-lg text-display-lg text-secondary">48h</span>
                <span className="font-label-md text-[10px] tracking-wider text-on-surface-variant uppercase">Rest Period</span>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-full hidden lg:block">
              <img 
                className="w-full h-full object-contain opacity-40 mix-blend-multiply" 
                alt="Technical illustration of a coffee bean analysis"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSdo4uPCKGXsc8Muk0Txlc3-qEfRKppsJs-9-C0Q9cPlBX4JZpWv2QyGVhgBQx1cW1yPAJcNyXnnScWok8sLG28VpS2gJtKwDB-2CC03J7CbB89Noidg3GOCXZOYQlmv_T3sTiLobSRFZrDGDgUgOnLXUYweqpnlygjQAGcjFCEWKH89W6sMGYpWTIc7aDWAKrpEDBEF5KbXSBeGe0JRJMDDih9AvQWGdURUds3B8hKB4j4vXZh8ug4Nxo0Kl8PhUty1N84MK8o2Vu"
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 bg-secondary text-white rounded-3xl p-stack-lg flex flex-col justify-center items-center text-center space-y-stack-md shadow-sm border border-outline-variant/10">
            <span className="material-symbols-outlined text-[48px]">eco</span>
            <h3 className="font-headline-md text-headline-md">100% Traceable</h3>
            <p className="font-body-md text-body-md opacity-80 leading-relaxed">
              We partner directly with farmers in 12 countries to ensure fair wages and sustainable soil.
            </p>
            <button className="mt-stack-md px-stack-lg py-2 bg-white text-secondary rounded-full font-label-md text-label-md uppercase">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-section-gap px-margin-desktop bg-surface-container-high">
        <div className="max-w-container-max mx-auto text-center space-y-stack-lg">
          <h2 className="font-display-lg text-display-lg espresso-text">Freshness, Delivered.</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Join our Roaster's Circle for exclusive access to small-batch micro-lots and early-bird notifications.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-stack-md" onSubmit={(e) => e.preventDefault()}>
            <input 
              className="flex-grow px-stack-md py-stack-md rounded-lg bg-surface border border-outline-variant/30 focus:border-tertiary focus:ring-1 focus:ring-tertiary outline-none transition-all font-body-md text-body-md" 
              placeholder="Enter your email" 
              type="email"
            />
            <button className="px-stack-lg py-stack-md bg-secondary text-on-secondary rounded-lg font-label-md text-label-md hover:bg-secondary/90 transition-colors" type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
