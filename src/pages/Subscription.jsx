import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const plans = [
  {
    id: 'classic',
    name: 'The Classic',
    tag: 'The Essential',
    price: 28,
    details: '1x 250g Signature Blend',
    popular: false,
    features: [
      'Whole bean freshness',
      'Signature house profile',
      'Standard shipping included'
    ]
  },
  {
    id: 'curated',
    name: 'The Curated',
    tag: 'The Explorer',
    price: 45,
    details: '2x 250g Rotating Single Origin',
    popular: true,
    features: [
      'New regions every month',
      'Priority brewing guides',
      'Free expedited shipping',
      'Early access to drops'
    ]
  },
  {
    id: 'connoisseur',
    name: 'The Connoisseur',
    tag: 'The Elite',
    price: 80,
    details: '3x 250g Micro-Lot Reserve',
    popular: false,
    features: [
      'Exclusive Micro-lot access',
      'Custom roast profiling',
      'Complimentary tasting glass',
      'Direct-to-roaster support'
    ]
  }
];

export default function Subscription() {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [wizardStep, setWizardStep] = useState(1);
  
  // Customization Wizard States
  const [grind, setGrind] = useState('Whole Bean');
  const [frequency, setFrequency] = useState('Every 2 Weeks');
  const [quantity, setQuantity] = useState('1 Bag (250g)');

  const handleSubscribeClick = (plan) => {
    setSelectedPlan(plan);
    setWizardStep(1);
  };

  const handleConfirmSubscription = () => {
    // Construct cart item
    const subscriptionItem = {
      _id: `sub-${selectedPlan.id}-${Date.now()}`,
      name: `${selectedPlan.name} Subscription`,
      price: selectedPlan.price,
      slug: `subscription-${selectedPlan.id}`,
      image: selectedPlan.id === 'classic' 
        ? 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=300'
        : 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=300',
      description: `${selectedPlan.details} (${grind}, delivered ${frequency.toLowerCase()})`,
      isSubscription: true,
      customDetails: { grind, frequency, quantity }
    };
    
    addItem(subscriptionItem);
    setSelectedPlan(null);
    navigate('/checkout');
  };

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat transform scale-105" 
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA6jzfosbW-5Vr5TPbp4C4sITFYzqhWVWbdHTQcegqHdnDABfKxH8QW3Rp1CaOJqLLu4ZyY1DX6f3TltMEFAbkVDPu1EiIKSWVUne9zS5eJS9TvxACwbUSMGm6NokkdjjkFDeRTq4DO6sLhptk7S3iZomr9Gaiwa3L-vJRSa94Ubn0MRgRgI06GXW2uN64tFPe_5occs3J6_BEGEgZIbJJ-m9NzWGqG5ojtQLMWDu96x_6_JReKdbngcAexaQLA2Qt-GSlRJ6NKs6IP')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>
        </div>
        <div className="relative z-10 text-center px-gutter max-w-3xl">
          <span className="font-label-md text-label-md text-primary-fixed tracking-[0.2em] uppercase mb-sm block">Artisanal Subscriptions</span>
          <h1 className="font-display-lg text-display-lg text-white mb-md leading-tight">Elevate Your <br/>Morning Ritual</h1>
          <p className="font-body-lg text-body-lg text-primary-fixed/80 mb-lg max-w-xl mx-auto">
            Experience the pinnacle of specialty coffee culture delivered from our roastery to your doorstep. Meticulously curated, sustainably sourced.
          </p>
          <a 
            className="inline-flex items-center justify-center bg-surface text-primary px-xl py-md rounded-full font-label-md text-label-md hover:bg-primary-fixed transition-colors duration-300 shadow-md" 
            href="#plans"
          >
            Explore Plans
            <span className="material-symbols-outlined ml-base">arrow_downward</span>
          </a>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-xl bg-background px-gutter" id="plans">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-xl">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-xs">Select Your Experience</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Flexible monthly plans designed for the discerning palate.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {plans.map(plan => (
              <div 
                key={plan.id}
                className={`bg-surface-container-lowest p-md flex flex-col rounded-lg card-hover-effect border relative ${
                  plan.popular ? 'border-2 border-primary' : 'border-outline-variant/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-md py-1 rounded-full font-label-md text-label-md uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className={`mb-md ${plan.popular ? 'pt-base' : ''}`}>
                  <span className="font-label-md text-label-md text-secondary tracking-widest uppercase">{plan.tag}</span>
                  <h3 className="font-headline-md text-headline-md text-primary mt-xs">{plan.name}</h3>
                </div>
                <div className="mb-md">
                  <div className="flex items-baseline">
                    <span className="font-headline-lg text-headline-lg text-primary">${plan.price}</span>
                    <span className="font-body-md text-on-surface-variant ml-xs">/ month</span>
                  </div>
                  <p className="font-body-md text-on-surface-variant mt-sm">{plan.details}</p>
                </div>
                <ul className="flex-grow space-y-sm mb-lg">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-sm">
                      <span className="material-symbols-outlined text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <span className="font-body-md text-on-surface">{feat}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleSubscribeClick(plan)}
                  className={`w-full py-md font-label-md text-label-md uppercase tracking-widest transition-all duration-300 rounded-full ${
                    plan.popular
                      ? 'bg-primary text-on-primary hover:opacity-90'
                      : 'border border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  Subscribe
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="text-center mb-xl">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-xs">Compare the Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-outline-variant/30">
                  <th className="py-md text-left font-headline-md text-primary">Features</th>
                  <th className="py-md text-center font-label-md text-label-md text-on-surface-variant uppercase">Classic</th>
                  <th className="py-md text-center font-label-md text-label-md text-primary uppercase">Curated</th>
                  <th className="py-md text-center font-label-md text-label-md text-on-surface-variant uppercase">Connoisseur</th>
                </tr>
              </thead>
              <tbody className="font-body-md">
                <tr className="border-b border-outline-variant/10">
                  <td className="py-md font-medium text-primary">Whole Bean Freshness</td>
                  <td className="py-md text-center text-on-surface-variant">Roast-to-Order</td>
                  <td className="py-md text-center text-on-surface font-semibold">Roast-to-Order</td>
                  <td className="py-md text-center text-on-surface-variant">Roast-to-Order</td>
                </tr>
                <tr className="border-b border-outline-variant/10">
                  <td className="py-md font-medium text-primary">Monthly Curations</td>
                  <td className="py-md text-center text-on-surface-variant">—</td>
                  <td className="py-md text-center">
                    <span className="material-symbols-outlined text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </td>
                  <td className="py-md text-center">
                    <span className="material-symbols-outlined text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </td>
                </tr>
                <tr className="border-b border-outline-variant/10">
                  <td className="py-md font-medium text-primary">Exclusive Micro-lots</td>
                  <td className="py-md text-center text-on-surface-variant">—</td>
                  <td className="py-md text-center text-on-surface-variant">—</td>
                  <td className="py-md text-center">
                    <span className="material-symbols-outlined text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </td>
                </tr>
                <tr className="border-b border-outline-variant/10">
                  <td className="py-md font-medium text-primary">Shipping</td>
                  <td className="py-md text-center text-on-surface-variant">Standard</td>
                  <td className="py-md text-center text-on-surface font-semibold">Expedited</td>
                  <td className="py-md text-center text-on-surface-variant">Priority Overnight</td>
                </tr>
                <tr className="border-b border-outline-variant/10">
                  <td className="py-md font-medium text-primary">Pause Anytime</td>
                  <td className="py-md text-center">
                    <span className="material-symbols-outlined text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </td>
                  <td className="py-md text-center">
                    <span className="material-symbols-outlined text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </td>
                  <td className="py-md text-center">
                    <span className="material-symbols-outlined text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="py-xl bg-background px-gutter">
        <div className="max-w-container-max mx-auto grid grid-cols-12 gap-md">
          {/* Large Card */}
          <div className="col-span-12 md:col-span-8 bg-surface-container h-[400px] rounded-lg overflow-hidden relative group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDV0FK7iSgWdbdqEn5jlv_n5QhZmROd9jOMhXJYkucrmKC2OFxyoHY-yYXDg1P8K56KIm4ngD4XEEDiqiXWczPILDkGc0l3k37qxNZOQzIwwzCds8XYsnBgX6FZUri5-XKQGOTpJ06yrnf51hcOBJuD-45AZkFLNcI9iPDmDPjxfKPj80KewmsDkU8Kyt5gTbpbFhtrMnuzbFvCp5BZr3QnNkGkLg4nmnlHtAwAh9mTy67bPRQWOWhJsNFeHi0xw3Eq4K6fd2nIrvt')` }}
            ></div>
            <div className="absolute inset-0 bg-primary/20"></div>
            <div className="absolute bottom-md left-md text-white z-10">
              <h4 className="font-headline-md text-headline-md mb-xs">Perfect Your Pour Over</h4>
              <p className="font-body-md text-body-md opacity-90 max-w-sm">Every subscription includes our master brew guides for every origin.</p>
            </div>
          </div>

          {/* Small Accent Card */}
          <div className="col-span-12 md:col-span-4 bg-primary text-on-primary p-md rounded-lg flex flex-col justify-center items-center text-center">
            <span className="material-symbols-outlined text-5xl mb-sm" style={{ fontVariationSettings: "'wght' 200" }}>
              loyalty
            </span>
            <h4 className="font-headline-md text-headline-md mb-xs">Coffee Club</h4>
            <p className="font-body-md text-body-md opacity-80">
              Subscribers save 15% on all individual equipment and merchandise.
            </p>
          </div>
        </div>
      </section>

      {/* Subscription Customization Modal Wizard */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-md bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-container-lowest text-on-surface w-full max-w-md p-md md:p-lg rounded-3xl shadow-2xl relative border border-outline-variant/30">
            <button 
              onClick={() => setSelectedPlan(null)}
              className="absolute top-md right-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer bg-surface/50 p-2 rounded-full"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            <h3 className="font-headline-md text-headline-md text-primary mb-xs">Customize Subscription</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">
              Step {wizardStep} of 3 — <span className="font-bold text-secondary">{selectedPlan.name}</span>
            </p>

            {/* Wizard Step Progress Bar */}
            <div className="flex gap-sm mb-lg">
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${wizardStep >= 1 ? 'bg-primary' : 'bg-outline-variant/20'}`} />
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${wizardStep >= 2 ? 'bg-primary' : 'bg-outline-variant/20'}`} />
              <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${wizardStep >= 3 ? 'bg-primary' : 'bg-outline-variant/20'}`} />
            </div>

            <div className="space-y-md min-h-[160px] flex flex-col justify-between">
              {/* Step 1: Grind Choice */}
              {wizardStep === 1 && (
                <div className="space-y-sm">
                  <label className="block font-label-md text-caption text-secondary uppercase tracking-wider">1. Grind Preference</label>
                  <div className="grid grid-cols-2 gap-sm">
                    {['Whole Bean', 'Filter/Drip', 'French Press', 'Espresso'].map(option => (
                      <button
                        key={option}
                        onClick={() => setGrind(option)}
                        className={`px-sm py-xs font-label-md text-caption rounded-full border text-center transition-all ${
                          grind === option
                            ? 'border-primary bg-primary-container/10 text-primary font-bold shadow-sm'
                            : 'border-outline-variant/30 hover:border-primary text-on-surface-variant'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Frequency Choice */}
              {wizardStep === 2 && (
                <div className="space-y-sm">
                  <label className="block font-label-md text-caption text-secondary uppercase tracking-wider">2. Delivery Frequency</label>
                  <div className="grid grid-cols-3 gap-sm">
                    {['Weekly', 'Every 2 Weeks', 'Monthly'].map(option => (
                      <button
                        key={option}
                        onClick={() => setFrequency(option)}
                        className={`px-sm py-xs font-label-md text-caption rounded-full border text-center transition-all ${
                          frequency === option
                            ? 'border-primary bg-primary-container/10 text-primary font-bold shadow-sm'
                            : 'border-outline-variant/30 hover:border-primary text-on-surface-variant'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Quantity Choice */}
              {wizardStep === 3 && (
                <div className="space-y-sm">
                  <label className="block font-label-md text-caption text-secondary uppercase tracking-wider">3. Quantity</label>
                  <div className="grid grid-cols-3 gap-sm">
                    {['1 Bag (250g)', '2 Bags (500g)', '3 Bags (750g)'].map(option => (
                      <button
                        key={option}
                        onClick={() => setQuantity(option)}
                        className={`px-xs py-xs font-label-md text-[11px] rounded-full border text-center transition-all ${
                          quantity === option
                            ? 'border-primary bg-primary-container/10 text-primary font-bold shadow-sm'
                            : 'border-outline-variant/30 hover:border-primary text-on-surface-variant'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex justify-between items-center pt-md gap-sm mt-auto">
                {wizardStep > 1 ? (
                  <button 
                    onClick={() => setWizardStep(prev => prev - 1)}
                    className="flex-1 border border-outline-variant/60 text-on-surface-variant py-sm rounded-full font-label-md text-label-md hover:bg-surface transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                ) : (
                  <div className="flex-1" />
                )}

                {wizardStep < 3 ? (
                  <button 
                    onClick={() => setWizardStep(prev => prev + 1)}
                    className="flex-1 bg-primary text-on-primary py-sm rounded-full font-label-md text-label-md hover:opacity-90 transition-all cursor-pointer flex justify-center items-center gap-xs"
                  >
                    Next Step
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                ) : (
                  <button 
                    onClick={handleConfirmSubscription}
                    className="flex-1 bg-primary text-on-primary py-sm rounded-full font-label-md text-label-md hover:opacity-90 transition-all cursor-pointer flex justify-center items-center gap-xs"
                  >
                    Subscribe Now
                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
