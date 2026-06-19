import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [revealActive, setRevealActive] = useState(false);

  useEffect(() => {
    // Trigger hero animations shortly after mount
    const timer = setTimeout(() => {
      setRevealActive(true);
    }, 100);

    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get(`${API}/products/featured`);
        setFeatured(data.slice(0, 3));
      } catch {
        setFeatured([
          { 
            _id: '1', 
            name: 'Yirgacheffe Floral', 
            slug: 'yirgacheffe-floral', 
            category: 'Ethical Ethiopia', 
            price: 24.00,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMwNH1ezn7xRkZIA92KD6DvIWGaQoqy27VzFbgdVUqzpXGBNCe9sxbw1RR3jx_wl7hFDlWA7_XLt1Hp82UeYDSi8iL7Go_mDo8JJyGO4HForu3qAQ9IqwSw0AQeC5U1_NyxakiSuOFb7L6TMslA7_7iKfMhR7xJ2SAXfcfyYWMKjHSuukcaO5GqFQ6cuxWgZ5DYfYsuum-yo7pkICQ5ZgCDn_79x50txpqXbCK8Ah9db84ZmGpkNZTbDJzMuL5qAqPhZc0hd1xzere'
          },
          { 
            _id: '2', 
            name: 'Velvet Espresso',
            slug: 'velvet-espresso', 
            category: 'Dark Roast', 
            price: 28.00,
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrXB5YSSiTkUZxmpuVgCI0c1G3PgqexdOY3mBwPdfeE4b-_liX7bdSP6EBr_bzBWgCDGb0C6YCAtJD-MfmhqUZhctBPOlOIQ8pg1i-yppUJ4cQn2jEDI6Jvx0DLphDFd7XVeQu2p8CtvjuSiVmisl26yhIBtwlhh0QIsUX2qBH2by3sv8vwtn6R4DKewC6wDwHXRewDPH3fmAzwEg_kE-ZjP1SFPVXqcgw8MPwJod_kEDk457mR1u5qkyhnh8WvEpwP1Bze0T5BYZ3'
          },
          { 
            _id: '3', 
            name: 'Sumatran Earth', 
            slug: 'sumatran-earth', 
            category: 'Single Origin', 
            price: 22.00, 
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2q3c04deMvZvUP0icNIvex_wAKC-JotalSMBMZE535WxDNcrp5ycKTVS_H9Aq6pExUUxwmPgPI9jfrQu32NEc2_zHZjyKtTJV3pUeWTh1fhKPaWrl4ADSjA3H_3ndZdSApNvIt1SBTNqvsRgxQ__nSEwGEjIBF748yncfQi4HrNlzw3eyDFMXUB3LN50Sn0fSF08OvshAxw_xvOgn4DrkkhLVPubC5ehlaEYDm1cLt1iZVLJJNE444N6yOo0z855wHlw18maQ-U4V'
          },
        ]);
      }
    };
    fetchFeatured();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-background text-on-surface select-none">
      {/* Full-Width Cinematic Hero */}
      <header className="relative w-full h-[calc(100vh-80px)] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover grayscale-[20%] brightness-75" 
            alt="A cinematic close-up of dark espresso pouring into a minimalist cup" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8n1tN7wRp-V469yezZ2T06ptOXB6p44Iw9g53FTHPseEjmKazYE4NVkf7W8aeRUdMwy5fZ7cxHX54sIUdC8SJ4l9L1R0Pn3tQbnS4wzc1j0NtCeAnVneX5XMw6jzlMy40hyGa7ZA6Cvl_p5ruFIIy7DJId3UQjhZlyVWOIqU05btfAghya94TqEWBHIum8nm6NTWLZIjLSdNfAuugLdH_Oj4JlEUNN8hRxSfjnfMm3uThE4_6TYPE9uDWZ0PUwKpa6wC1YXI8u-7L"
          />
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-gutter h-full flex flex-col justify-center items-start">
          <div className={`${revealActive ? 'active' : ''} space-y-md`}>
            <p className="font-label-md text-label-md text-primary-fixed uppercase tracking-[0.2em] reveal-text">
              <span>Authentic Origins &amp; Artisanal Craft</span>
            </p>
            <h1 className="font-display-lg text-4xl sm:text-5xl md:text-display-lg text-white max-w-3xl reveal-text">
              <span>Crafted Coffee, <br/>Served With Passion</span>
            </h1>
            <div className="pt-md reveal-text">
              <Link 
                to="/menu"
                className="bg-primary text-on-primary px-lg py-md font-label-md text-label-md transition-all hover:scale-105 inline-block rounded-full"
              >
                EXPLORE THE COLLECTION
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Products Section */}
      <section className="max-w-container-max mx-auto px-gutter py-xl">
        <div className="flex justify-between items-end mb-lg">
          <div className="max-w-xl">
            <h2 className="font-headline-lg text-headline-lg text-primary italic mb-sm">Seasonal Curations</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Our master roasters select only the most exceptional beans from ethical estates worldwide.
            </p>
          </div>
          <Link 
            to="/menu" 
            className="font-label-md text-label-md text-primary border-b border-primary uppercase tracking-wider pb-1"
          >
            Shop All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {featured.map((product, idx) => (
            <Link 
              to={`/product/${product.slug}`} 
              key={product._id} 
              className={`md:col-span-4 group cursor-pointer block ${idx === 1 ? 'md:mt-lg' : ''}`}
            >
              <div className="aspect-[4/5] bg-surface-container overflow-hidden mb-md border border-outline-variant/10">
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={product.name} 
                  src={product.image}
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-label-md text-caption text-secondary uppercase tracking-widest">
                    {product.category || 'Single Origin'}
                  </span>
                  <h3 className="font-headline-md text-headline-md text-primary mt-xs">{product.name}</h3>
                </div>
                <p className="font-body-md text-body-md font-bold">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Split-Layout 'About Us' Preview */}
      <section className="bg-surface-container-low py-xl overflow-hidden">
        <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 items-center gap-xl">
          <div className="relative">
            <div className="aspect-[5/6] overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                alt="Documentary-style portrait of a master coffee roaster" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC4kzv3-dcPZXv4OOFhWTxoSn2GGXI6p5PKkMsdawCsbxpzwiqAs_SZS_dv2ihuU9KGhYHzw0NUbgPu3-foKtCTu0l0q0J6RrASITrXtzc3jBrIyh6YAGT7M7cgsxqgMnjDix6psMUQ6W-SbrujiwVLG6sClUsZES_F9iSTdVvAOz_B2_Um5kAdwjXmtvdhB1v1rkQHjtiStZbNUE94VO2AzCfg1dli3WE_DfqksOT8ho1bzBVbN1ySg9WguHELFgh1-Q8mcr8-wMS"
              />
            </div>
            <div className="absolute -bottom-md -right-md bg-white p-lg max-w-xs hidden md:block border border-outline-variant/20">
              <p className="font-headline-md text-primary italic">"Coffee is not just a drink, it's a slow-living ritual."</p>
              <p className="font-caption text-caption text-on-surface-variant mt-sm">— Elias Thorne, Founder</p>
            </div>
          </div>
          <div className="md:pl-lg">
            <span className="font-label-md text-label-md text-primary uppercase tracking-[0.2em] mb-md block">Our Philosophy</span>
            <h2 className="font-display-lg text-headline-lg md:text-display-lg text-primary mb-md leading-tight">The Art of the Slow Pour</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg">
              Founded in 2014, Crema &amp; Co. was born from a desire to bring the quiet precision of artisanal roasting to the modern espresso bar. We believe in direct trade, sustainable sourcing, and the patience required to develop each bean's unique profile.
            </p>
            <div className="flex flex-col gap-sm">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary font-fill">check_circle</span>
                <p className="font-label-md text-label-md">Directly sourced from micro-lots</p>
              </div>
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary font-fill">check_circle</span>
                <p className="font-label-md text-label-md">Small-batch roasted daily</p>
              </div>
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary font-fill">check_circle</span>
                <p className="font-label-md text-label-md">Compostable, plastic-free packaging</p>
              </div>
            </div>
            <Link 
              to="/about"
              className="mt-xl border border-primary text-primary px-lg py-md font-label-md text-label-md hover:bg-primary hover:text-white transition-all inline-block rounded-full"
            >
              READ OUR STORY
            </Link>
          </div>
        </div>
      </section>

      {/* Masonry Atmosphere Gallery */}
      <section className="max-w-container-max mx-auto px-gutter py-xl">
        <div className="text-center mb-xl">
          <h2 className="font-display-lg text-headline-lg text-primary">The Atmosphere</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto">
            Visit our boutique coffee bars and experience the warmth of a curated brew in a minimalist sanctuary.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-gutter h-[800px]">
          <div className="md:col-span-8 md:row-span-1 bg-surface-container overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              alt="Scandinavian boutique cafe atmosphere" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnT2f7po9ac4Smg_qKiw_0DZVFQomVTK-X1jVV7XNVkXBL5AbOwkZIX5-SzimyPgH2W8IeW1NipaTbe5V4gJ6m152_Z-D-RmP4F99BMCxRiIZqWQ2-4q1vc0-oVp5WoIeKm-XTfHsv7YxuzKPV3-Z9m4g76MlAtjaZmdctcFGh1XAn8xf1CylMPE6sLeAuZYi1fxL6Q5Q2d7orlZnTIZR6F_UFr_aoERXHV4WIvAs1LPB2R72YqeLDXf7GFTahABor_1TMGV8hbPwx"
            />
          </div>
          <div className="md:col-span-4 md:row-span-2 bg-surface-container overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              alt="Pouring latte art in a ceramic cup" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrH0KRrSta1GgybsUNEjz8dlHfiRp8-JXytfMvT5TcGNcDPZuOQm0BLQAa9F709sP2Y7sdvD1VHm--txLVDEWiSGNcrKBdQtqlpT5RIhdWUSy1HwfE3RWYKAmVnSzd0brw90fSxNiHGWjTtSF1RYgkcdM4FclZPzlJW5BdJ9OPriF1LqrGc4idUDPU8-I9Imb_WQm5eM7pTQvfOd10X1sczn2hQUiZ6xS_su7k_KQjhsSX4s_lTveXaXTcVwsVmFzc0MljAMBqQx1D"
            />
          </div>
          <div className="md:col-span-4 md:row-span-1 bg-surface-container overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              alt="Artisanal coffee brewing equipment" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuARKHy6RBYSrPhjSCsxQl2IvoxPIAKV-ZIpULNqDWSh5JVaI3j0WOxd64yaAJU3D0AB4wX5MJTubXAa_znO8VCCpaNyf4fhDnX-Bqv_TuvlEE3RWYxymtu2ZEKmyUZl7dHmaeiv3l9XwwNPaV4_LDSK9yII9zthfOGFPG4za6O4waqrsaZ0kZjRJEujxpBmH0k-J4_eR-TbLBrMhqI4geTAcfWTChVaCSFZ7bWIKoXtMdDirNemQw3E29hnheL9utUoZ3Jq8PDWC6Rp"
            />
          </div>
          <div className="md:col-span-4 md:row-span-1 bg-surface-container overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              alt="Cozy corner of a coffee shop arm chair" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5iUSgsVC5DGp_H3Rh291z8WqKUcIq_eP90B5ank_W0guNmSF95FbVbLU4gFpghFTKfA2KGo2Q0eUYFrWmlQVWUf_knK01okTZK-gHUCIFu-qhY-PK34Iw7XmqeDnSTo67ldxujW36pct7ZYXVX0uWpOmyulFG71UJKUYkc2Ox8qzlzgLNYOi6gdgzixXltjS91o8kWSFRVyEPi8M84nz9VSmKfEjBeq8GTzknryi_r10w_EOOOp_sOVb1H1yh31giws7xcVLGagHN"
            />
          </div>
        </div>
      </section>

      {/* Subscription / Newsletter */}
      <section className="max-w-container-max mx-auto px-gutter py-xl mb-xl border-y border-outline-variant/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
          <div>
            <h3 className="font-display-lg text-headline-lg text-primary mb-sm">The Journal</h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Join our circle for exclusive access to small-batch releases, brewing techniques from our roasters, and local event invitations.
            </p>
          </div>
          <div className="flex flex-col gap-md">
            <div className="relative">
              <input 
                className="w-full bg-transparent border-b border-primary py-md font-body-md focus:outline-none focus:border-tertiary transition-colors placeholder:text-on-surface-variant/50 text-on-surface" 
                placeholder="Email Address" 
                type="email"
              />
              <button className="absolute right-0 bottom-md material-symbols-outlined text-primary hover:opacity-80 transition-all">
                arrow_forward
              </button>
            </div>
            <p className="font-caption text-caption text-on-surface-variant">
              By subscribing, you agree to our Privacy Policy and consent to receive marketing emails.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
