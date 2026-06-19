import { useState, useEffect } from 'react';

const guides = [
  {
    id: 'v60',
    title: 'The Perfect V60',
    category: 'V60',
    type: 'Technique',
    difficulty: 'Beginner',
    time: '4 mins',
    volume: '350ml',
    description: 'Mastering the classic cone dripper for a bright, clean cup of coffee every morning.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpvDgXCFIQ5VtNr0AIyWhfiSGq64EwPziaNOogVcmPZZadsL3YA-GNpjvUcNpT88UB8BjDoGBewEo-6lfeNwawZz3gvYsddxRy0Zn9JOn073RL1IHnZpF0CJJq2AUj3iOhJHHeKk33ZvozgnO48iaj2wt8v2WghLk9GlEhxWurP0-gI8GOfk_OvqP47p9X_grLa6CIdrNSnFtJ0lgwgc2EBEG8K3bZQo26em7EZU-b-S-8zyBjHXz2AOYUOgrxuhOGAqFjlLndDXKp',
    steps: [
      { num: '01', text: 'Precision grind: 15g of medium-fine specialty coffee beans.' },
      { num: '02', text: 'Rinse the paper filter with hot water to remove paper taste, then discard the water.' },
      { num: '03', text: 'The Bloom: Pour 45g of water at 94°C and let it sit for 30 seconds.' },
      { num: '04', text: 'The Pour: Concentrically pour the remaining water up to 250g in smooth, steady circles.' }
    ]
  },
  {
    id: 'french-press',
    title: 'French Press Immersion',
    category: 'French Press',
    type: 'Body',
    difficulty: 'Intermediate',
    time: '8 mins',
    volume: '500ml',
    description: 'The secret to a sediment-free, full-bodied press using the Hoffman method.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDykUmMdvIi7mSFvNE-VUHLRv-z6pjmkc10qbROgwqWLh8Wf2-SLu9yl3LHlysa-_T1lGERxbPyJzDEe0dzN6g0_HLM5HECFR1PCgV_sMuj3aDoYeZI_nT_RmTTX0r9J1V_0zJ-0NC_cqKcL9iz7NXczZcL4aq8xtPWvtSoVPbqrnJxn0uvLqofRj12lwLSn755tPs-rKh665s8L9BivTndYET2fdKRs6Cx6X3MZ-a7b9ezLvGA_o30X1XWDZnBmiPBBnEqfM6SEsTf',
    steps: [
      { num: '01', text: 'Grind 30g of coffee coarsely (resembling sea salt).' },
      { num: '02', text: 'Add coffee, pour 500g of water at 95°C, and let steep for 4 minutes.' },
      { num: '03', text: 'Stir the crust that forms on top, scoop off any remaining foam, and wait 4 more minutes.' },
      { num: '04', text: 'Press the plunger gently just below the surface of the liquid (do not plunge to the bottom) and pour.' }
    ]
  },
  {
    id: 'aeropress',
    title: 'Inverted Aeropress',
    category: 'Aeropress',
    type: 'Travel',
    difficulty: 'Beginner',
    time: '2 mins',
    volume: '200ml',
    description: 'A versatile, robust brew method designed for consistency and intense sweetness.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZUm3XCt3Er3P3FvLph5ZdmLXxTTa0MrR6EzRDr4WPsIxaVnlnQcKiRhDXNZXHr-LH6cresWNqiB7PJ6NHMmYZk1mtFwBfOKNJC1dYLXc0xaBMxKeMmUTbO7jlFekktLYgv9aOzNszy_iiqw2LoXCnb3iTKdw50SKEVWtGuoVeVy7I9yRpF5La8bVY_mmsmOAI-qjTkXq-b_ka_empULJHH_sIaDTL-jAMnEmWhQq_dHXet-uNmuBGBSNEHl-YeXNhCU3tXtk8NOgn',
    steps: [
      { num: '01', text: 'Assemble the Aeropress in inverted position. Grind 15g of coffee medium-fine.' },
      { num: '02', text: 'Add coffee, then pour 200g of water. Stir 5 times to ensure even wetness.' },
      { num: '03', text: 'Attach the cap with a rinsed paper filter. Let steep for 1 minute and 30 seconds.' },
      { num: '04', text: 'Flip onto a sturdy mug and plunge steadily for 30 seconds.' }
    ]
  },
  {
    id: 'chemex',
    title: 'Classic Chemex',
    category: 'Chemex',
    type: 'Clarity',
    difficulty: 'Intermediate',
    time: '6 mins',
    volume: '450ml',
    description: 'The hourglass brewer celebrated for its pure cup profile and heavy filter paper clarity.',
    image: 'https://images.unsplash.com/photo-1579888944880-d98341148720?auto=format&fit=crop&q=80&w=800',
    steps: [
      { num: '01', text: 'Grind 30g of coffee medium-coarse. Rinse the thick Chemex paper filter.' },
      { num: '02', text: 'Pour 60g of water to bloom the coffee. Wait 45 seconds.' },
      { num: '03', text: 'Pour in slow circles, keeping the water level 2cm below the top rim, up to 450g.' },
      { num: '04', text: 'Allow the water to draw down completely, remove the filter, and swirl to aerate.' }
    ]
  },
  {
    id: 'cold-brew',
    title: 'Slow Drip Cold Brew',
    category: 'Cold Brew',
    type: 'Patience',
    difficulty: 'Beginner',
    time: '12 hrs',
    volume: '700ml',
    description: 'A smooth, low-acid extraction method designed to capture deep chocolaty tones.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
    steps: [
      { num: '01', text: 'Grind 100g of coffee extra coarse. Place in a large glass jar.' },
      { num: '02', text: 'Add 700g of cold, filtered water. Stir gently to saturate all grounds.' },
      { num: '03', text: 'Seal the jar and steep in the refrigerator or room temperature for 12 to 16 hours.' },
      { num: '04', text: 'Filter through a fine mesh sieve, then a paper filter. Serve concentrated brew over ice.' }
    ]
  }
];

export default function BrewGuides() {
  const [selectedCategory, setSelectedCategory] = useState('All Methods');
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const categories = ['All Methods', 'V60', 'Chemex', 'Aeropress', 'French Press', 'Cold Brew'];

  const filteredGuides = selectedCategory === 'All Methods'
    ? guides
    : guides.filter(g => g.category.toLowerCase() === selectedCategory.toLowerCase());

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen">
      <main className="max-w-container-max mx-auto px-gutter py-xl">
        {/* Hero Section */}
        <header className="mb-xl text-center max-w-3xl mx-auto">
          <span className="font-label-md text-label-md text-primary tracking-[0.2em] uppercase mb-sm block">Brewing Library</span>
          <h1 className="font-display-lg text-display-lg text-primary mb-md">Master the Craft</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant italic">
            A meticulous exploration into the science and soul of brewing. Elevate your morning ritual through artisanal techniques and precision.
          </p>
        </header>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-md mb-xl">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-label-md text-label-md px-xs pb-xs transition-all duration-300 border-b-2 ${
                selectedCategory === cat
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-on-surface-variant hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Guide (Asymmetric / Editorial) */}
        {selectedCategory === 'All Methods' && (
          <section className="mb-xl grid grid-cols-1 md:grid-cols-12 gap-gutter items-center bg-surface-container-lowest p-md md:p-xl rounded-3xl border border-outline-variant/10">
            <div className="md:col-span-7 aspect-[4/3] relative overflow-hidden group rounded-3xl">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBRoyGFo5_uxIWtZZ5rZgo0wr2rGrTvw8fE3PgacoWeJV8Fc3RNSQD2tOQU5Wypk32UmIIGwzxtwdKrTjdLW6dym_xyUIJAd_c46TL0esyTwknQdWxGtow2oRU7jj84OaYkoq4pZSIW71FcI6IsfyDqJ97JpgmChyzw7uttEtwO2aq9uIXJ6015fBVL9cGgfgATdULB_5kxbbeaybvnEReBgPjDq6SIhTK4KoCZEF5rk9vdtSpmWiFSFZjDknBYzXUaqiKWsJNFqYK7')` }}
              ></div>
              <div className="absolute top-md left-md">
                <span className="bg-primary-container text-on-primary px-sm py-xs font-label-md text-label-md tracking-wider rounded-full">FEATURED GUIDE</span>
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col justify-center space-y-md md:pl-lg">
              <h2 className="font-headline-lg text-headline-lg text-primary leading-tight">Signature Pour Over</h2>
              <div className="flex gap-md border-y border-outline-variant/30 py-sm">
                <span className="font-label-md text-label-md text-secondary flex items-center">
                  <span className="material-symbols-outlined text-[18px] mr-1">signal_cellular_alt</span> Beginner
                </span>
                <span className="font-label-md text-label-md text-secondary flex items-center">
                  <span className="material-symbols-outlined text-[18px] mr-1">schedule</span> 4 mins
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Discover the nuances of our signature technique. This guide breaks down the precise water temperature, bloom time, and agitation required to unlock vibrant floral notes.
              </p>
              <div className="space-y-sm">
                <div className="flex items-start gap-sm">
                  <span className="font-headline-md text-primary opacity-30 italic">01.</span>
                  <p className="font-body-md text-body-md">Precision grind: 22g of medium-fine beans.</p>
                </div>
                <div className="flex items-start gap-sm">
                  <span className="font-headline-md text-primary opacity-30 italic">02.</span>
                  <p className="font-body-md text-body-md">The Bloom: 45g pour for 30 seconds.</p>
                </div>
                <div className="flex items-start gap-sm">
                  <span className="font-headline-md text-primary opacity-30 italic">03.</span>
                  <p className="font-body-md text-body-md">The Pulse: Three consistent 100g concentric pours.</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedGuide(guides[0])}
                className="mt-md flex items-center gap-sm font-label-md text-label-md text-primary group uppercase tracking-wider font-bold"
              >
                VIEW FULL GUIDE 
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>
            </div>
          </section>
        )}

        {/* Editorial Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
          {filteredGuides.map(guide => (
            <article 
              key={guide.id} 
              onClick={() => setSelectedGuide(guide)}
              className="brew-card-hover flex flex-col group cursor-pointer"
            >
              <div className="aspect-square mb-md overflow-hidden bg-surface-container-low border border-outline-variant/20 rounded-3xl">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url('${guide.image}')` }}
                ></div>
              </div>
              <div className="space-y-xs">
                <div className="flex justify-between items-center">
                  <span className="font-label-md text-caption text-secondary tracking-widest uppercase">{guide.type}</span>
                  <span className="font-label-md text-caption bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full">
                    {guide.difficulty}
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary group-hover:text-primary-container transition-colors">
                  {guide.title}
                </h3>
                <div className="flex items-center gap-xs text-on-surface-variant font-caption text-caption mb-sm">
                  <span className="material-symbols-outlined text-[16px]">timer</span> {guide.time} • <span className="material-symbols-outlined text-[16px]">coffee</span> {guide.volume}
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
                  {guide.description}
                </p>
              </div>
            </article>
          ))}
        </section>

        {/* Newsletter / CTA Section */}
        <section className="mt-xl py-xl px-lg bg-primary-container text-on-primary flex flex-col md:flex-row items-center justify-between gap-lg rounded-xl">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="font-headline-lg text-headline-lg text-primary-fixed mb-sm">Deepen Your Knowledge</h3>
            <p className="font-body-md text-body-md text-on-primary-container">
              Join our Journal for monthly deep-dives into bean origins, roasting chemistry, and exclusive early access to rare harvests.
            </p>
          </div>
          <div className="flex w-full md:w-auto gap-xs">
            <input 
              className="bg-white/10 border-b border-primary-fixed text-primary-fixed placeholder:text-primary-fixed/50 px-md py-sm focus:outline-none focus:bg-white/20 transition-all flex-grow min-w-[240px]" 
              placeholder="Your email" 
              type="email"
            />
            <button className="bg-primary-fixed text-on-primary-fixed px-lg py-sm font-label-md text-label-md hover:opacity-90 transition-all rounded-full">
              Join
            </button>
          </div>
        </section>
      </main>

      {/* High-Fidelity Brew Guide Modal with Countdown Timer */}
      {selectedGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-md bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-container-lowest text-on-surface w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative border border-outline-variant/30">
            {/* Close Button */}
            <button 
              onClick={() => { setSelectedGuide(null); resetTimer(); }}
              className="absolute top-md right-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer z-10 bg-surface/50 p-2 rounded-full"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            {/* Header Image */}
            <div className="h-[240px] w-full overflow-hidden relative">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${selectedGuide.image}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
              <div className="absolute bottom-md left-md">
                <span className="bg-secondary-container text-on-secondary-container px-sm py-xs font-label-md text-label-md tracking-wider rounded-full uppercase">
                  {selectedGuide.category} Guide
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-md md:p-xl space-y-md">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-primary">{selectedGuide.title}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant italic mt-2">{selectedGuide.description}</p>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-sm py-sm border-y border-outline-variant/20 text-center bg-surface-container-low/50 rounded-lg">
                <div>
                  <span className="block font-caption text-caption text-on-surface-variant uppercase tracking-wider">Difficulty</span>
                  <span className="font-label-md text-label-md text-primary">{selectedGuide.difficulty}</span>
                </div>
                <div>
                  <span className="block font-caption text-caption text-on-surface-variant uppercase tracking-wider">Brew Time</span>
                  <span className="font-label-md text-label-md text-primary">{selectedGuide.time}</span>
                </div>
                <div>
                  <span className="block font-caption text-caption text-on-surface-variant uppercase tracking-wider">Water Volume</span>
                  <span className="font-label-md text-label-md text-primary">{selectedGuide.volume}</span>
                </div>
              </div>

              {/* Interactive Brew Timer */}
              <div className="p-md bg-primary-container text-on-primary rounded-xl flex flex-col items-center justify-center space-y-sm">
                <h3 className="font-label-md text-label-md tracking-wider uppercase opacity-80">Interactive Brew Timer</h3>
                <div className="font-display-lg text-5xl font-mono tracking-wider">{formatTime(timerSeconds)}</div>
                <div className="flex gap-sm">
                  {!isTimerRunning ? (
                    <button 
                      onClick={startTimer}
                      className="bg-primary-fixed text-on-primary-fixed px-md py-xs font-label-md text-label-md rounded-full hover:opacity-90 transition-all flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[18px]">play_arrow</span> Start
                    </button>
                  ) : (
                    <button 
                      onClick={pauseTimer}
                      className="bg-surface-container-lowest text-primary px-md py-xs font-label-md text-label-md rounded-full hover:bg-surface-container-low transition-all flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[18px]">pause</span> Pause
                    </button>
                  )}
                  <button 
                    onClick={resetTimer}
                    className="bg-black/20 text-on-primary px-md py-xs font-label-md text-label-md rounded-full hover:bg-black/30 transition-all flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[18px]">restart_alt</span> Reset
                  </button>
                </div>
              </div>

              {/* Steps List */}
              <div className="space-y-sm">
                <h3 className="font-headline-md text-headline-sm text-primary">Step-by-Step Instructions</h3>
                <div className="space-y-md">
                  {selectedGuide.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-md items-start p-sm hover:bg-surface-container-low/30 rounded-lg transition-colors">
                      <span className="font-headline-lg text-primary/40 italic leading-none">{step.num}</span>
                      <p className="font-body-md text-body-md text-on-surface">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-md flex justify-end">
                <button 
                  onClick={() => { setSelectedGuide(null); resetTimer(); }}
                  className="bg-primary text-on-primary px-lg py-sm font-label-md text-label-md hover:opacity-90 transition-all rounded-full"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
