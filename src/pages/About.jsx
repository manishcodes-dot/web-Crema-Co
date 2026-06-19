import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="select-none">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center scale-105" 
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxj5esx-uwP4RPJ9-r_RSaYlp9QFTrF6U6ducE_NQHlVD1oVZjGznJLRDSINJ0Mqe8Gz8lapXUPLIviZKDTtFcFYkkRoIcsBOcUKSzGauO-m2rzCIwrfVuhvDygrFEaOXuqEaBuL5CPACThVabIc7j7xAzUTDcOoerel_wsk8Bfal9ScJqEFLEN0yh6TxSoHPR30AlhUnsSm6NramftTmQlm3wDsQXgh7PMjCWHp163SgrS1uVpiFQBMl0kXMocJb9kjj1DeWzynLW')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/10" />
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-gutter w-full text-surface-bright">
          <div className="max-w-3xl">
            <span className="font-label-md text-label-md uppercase tracking-[0.2em] mb-md block opacity-85">
              Established 2014
            </span>
            <h1 className="font-display-lg text-display-lg mb-lg italic font-normal text-white">
              The alchemy of the perfect bean.
            </h1>
            <p className="font-body-lg text-body-lg leading-relaxed max-w-xl text-white/95">
              We believe coffee is more than a morning ritual. It is a precise intersection of horticulture, chemistry, and soul.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Split Layout */}
      <section className="py-xl max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
          <div className="order-2 md:order-1">
            <div 
              className="w-full aspect-[4/5] bg-cover bg-center bg-surface-container-low border border-outline-variant/10 rounded-lg" 
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXdi7tR4udFNapkeVhL5spHlDbWqApXoLDE5P0Gjid5Eow-cI57uHlLS1LUVo36kbE5MYeMTHM538Lhb0S6VUEswBkS62dax4MWpz4SQtN28FSF2bvDMTREZFNVa9OtLSfJWZ1WrWBsLX9PBhU1vdCwYn21TybAbK07IegjmDrG9nJasQoaQ3DXs4fCQwBRCCIANhxsZicrgNxZcijLcsJ26kwj4HV_lKrZkonpXOxk0669_Mymp13auxl7Q-nZLiHqRq03wxjKh_b')`
              }}
            />
          </div>
          <div className="order-1 md:order-2 space-y-md">
            <span className="font-label-md text-label-md text-secondary uppercase tracking-widest block">Our Story</span>
            <h2 className="font-display-lg text-headline-lg text-primary italic font-normal">From a single origin to a community of connoisseurs.</h2>
            <div className="space-y-sm text-on-surface-variant font-body-md leading-relaxed">
              <p>
                Crema &amp; Co. began in a small garage in Copenhagen with nothing but a second-hand roaster and a profound obsession for the Ethiopian Yirgacheffe bean. Our founder, Elias Thorne, spent three years traveling the coffee belt before ever selling a single bag.
              </p>
              <p>
                Today, we remain an independent roastery dedicated to the same principles: transparency in sourcing, meticulous roasting profiles, and the relentless pursuit of the "god shot" of espresso. We treat every harvest as a unique vintage, respecting the terroir and the hands that harvested it.
              </p>
            </div>
            <div className="pt-md">
              <div className="h-[1px] bg-primary/20 w-24 mb-md"></div>
              <p className="font-body-md italic text-primary">"Precision is the only path to beauty."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roasting Philosophy (Bento-style Grid) */}
      <section className="bg-surface-container-low py-xl">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="text-center mb-xl">
            <h2 className="font-display-lg text-headline-lg text-primary mb-sm italic font-normal">Roasting Philosophy</h2>
            <p className="font-label-md text-label-md uppercase tracking-widest text-secondary">The Technical Art of the Curve</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-md">
            {/* Large Feature Card */}
            <div className="md:col-span-7 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-lg flex flex-col justify-between group overflow-hidden relative min-h-[280px]">
              <div className="relative z-10">
                <span className="material-symbols-outlined text-primary mb-sm text-[32px]">thermostat</span>
                <h4 className="font-headline-md text-headline-md text-primary mb-md">Loring Smart Roast Technology</h4>
                <p className="font-body-md text-on-surface-variant max-w-md">
                  We utilize convection roasting which allows for unprecedented clarity and sweetness. By eliminating scorched beans, we reveal the delicate floral and citrus notes often lost in traditional drum roasters.
                </p>
              </div>
              <div className="absolute bottom-0 right-0 w-1/3 h-full opacity-5 group-hover:opacity-10 transition-opacity flex items-end justify-end p-4">
                <span className="material-symbols-outlined text-[120px]">timeline</span>
              </div>
            </div>

            {/* Small Card 1 */}
            <div className="md:col-span-5 bg-primary-container text-on-primary-container rounded-xl p-lg min-h-[280px]">
              <span className="material-symbols-outlined mb-sm text-[32px]">biotech</span>
              <h4 className="font-headline-md text-headline-md mb-md text-primary-fixed">Sensory Analysis</h4>
              <p className="font-body-md opacity-85 leading-relaxed">
                Every batch undergoes a 5-point cupping protocol. We measure solubility, density, and moisture content to ensure the profile you taste at home matches our Master Roaster’s intent.
              </p>
            </div>

            {/* Small Card 2 */}
            <div className="md:col-span-4 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-lg min-h-[280px]">
              <span className="material-symbols-outlined text-tertiary mb-sm text-[32px]">eco</span>
              <h4 className="font-headline-md text-headline-md text-primary mb-md">Direct Trade</h4>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                We pay 45% above Fair Trade prices, working directly with estates in Huila and Nyeri to ensure sustainable futures for the farmers.
              </p>
            </div>

            {/* Small Card 3 */}
            <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-lg flex flex-col sm:flex-row items-center gap-lg min-h-[280px]">
              <div 
                className="w-32 h-32 flex-shrink-0 bg-cover bg-center rounded-full border border-outline-variant/10" 
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEEFaGu0YgWWt_AX0x7XoUK_FVNBOQzfwx4eKjFG0MSxycOKxGIizS2m3YVHbUzcR6RBQ8s3RXewUPmvh2nN8Mr0q3UC6iMnu2f5ou-yMecIr7DFOclOxBTQTyprcjn0WZ-619rbZXbFqJkju9cKOqdEF9uxYI9LZCKmDP0fKJbFAi6qaasI5pFjlCRGhntdlxbQErkkbKbwUDurOHdB_vDDvdoM9cw6ms-xoscYG2bUZY9pKoh7lJSUB0rhbg6N99C2nu0nDeTn_R')`
                }}
              />
              <div>
                <h4 className="font-headline-md text-headline-md text-primary mb-sm">Seasonal Rotation</h4>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Our menu changes with the harvests. We never stock beans older than four months post-harvest to guarantee peak vibrancy and complex acidity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team (Asymmetric Layout) */}
      <section className="py-xl max-w-container-max mx-auto px-gutter">
        <div className="flex flex-col md:flex-row justify-between items-end mb-xl border-b border-outline-variant/30 pb-md">
          <h2 className="font-display-lg text-headline-lg text-primary italic font-normal">The Curators</h2>
          <p className="font-body-md text-on-surface-variant max-w-sm text-left md:text-right mt-2 md:mt-0">
            The hands behind the craft. A collective of roasters, tasters, and educators.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
          {/* Curator 1 */}
          <div className="space-y-md group">
            <div className="overflow-hidden aspect-[3/4] bg-surface-container-low rounded-lg border border-outline-variant/10">
              <img 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                alt="Sanae Hashimoto - Master Roaster" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfp7mLhB7bHVFgNssTXiVorF9QFEpEAFLdsm9Zsyh0YysR1IB5xXj22W8aeacoFL_7QvfRdRwCqG9FGzArA1wyxy9gdZA99IYcQ4W5Pymp-_CGNP7EqnIN1f_gPWXzUOnIztEX2gCJDY1fz_3zWQ5-Cn1xzFmQGT9rzOI5Qupe_6WSWBYvM_CO5MOzdvBnSmtHeSfw2VGTW4Kbuy3S9ByvLwT5pXZ-zYm3Dk7xLq_qYPantVwWtJCApjodJg745kAwNfJBRbVHdoBz"
              />
            </div>
            <div>
              <p className="font-label-md text-label-md text-secondary uppercase tracking-widest">Master Roaster</p>
              <h4 className="font-headline-md text-headline-md text-primary">Sanae Hashimoto</h4>
              <p className="font-body-md text-on-surface-variant mt-sm">Specializing in light-roast development and thermal dynamics.</p>
            </div>
          </div>

          {/* Curator 2 */}
          <div className="space-y-md group md:mt-12">
            <div className="overflow-hidden aspect-[3/4] bg-surface-container-low rounded-lg border border-outline-variant/10">
              <img 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                alt="Elias Thorne - Head of Sourcing" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQkpADywkx3ZEbywq_FrwevWmFmD6M3yrhgD1-LgWH1blfafLABfZaKOg7AfudggKYRphfTLG_MWR45-tro62LP3FoH2AlsNYNVdwVQkJBzNChM1iTeVHHbfk1B7RCa5mwoZdv8NMu_anpJfCJ6KU0_x45L-dRdFIv-8I90uEqs5sH45QCo11WWLtic7HkqOc5uwkr_u14TBd9UUzX8AChPvATiApULK7uqLOAMJFL3KiFx02BEauD4pmd1NaP63lma9XjMoNhRykz"
              />
            </div>
            <div>
              <p className="font-label-md text-label-md text-secondary uppercase tracking-widest">Head of Sourcing</p>
              <h4 className="font-headline-md text-headline-md text-primary">Elias Thorne</h4>
              <p className="font-body-md text-on-surface-variant mt-sm">A decade spent on the road, building relationships with small-lot producers.</p>
            </div>
          </div>

          {/* Curator 3 */}
          <div className="space-y-md group">
            <div className="overflow-hidden aspect-[3/4] bg-surface-container-low rounded-lg border border-outline-variant/10">
              <img 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                alt="Julian Vance - Director of Education" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHF3YwFb7rZI3uOrMCYjOHyyJS5_Riai2XnrSPN23ZWxZYr5ynlsjlM7ZlWrNHDnVO_fayrdjWi-wEUaXMwySLIJNMHEbJ-TFsu99nnxd2HHEiGyRvClICPkuakzHahY8Mlq-bjxrJtGhVIJbitPMKkxgG2zgPcbnUzIbAVPiAKbdPCGSKrfaLH5N8yBWU2mkjYPgoDNlc0pFG8_0yYP3O77Omn8KfaD3kqdeZYbo26V1u4T2z7Wlx-u5nEjcMl3PjiSjET51hSNGS"
              />
            </div>
            <div>
              <p className="font-label-md text-label-md text-secondary uppercase tracking-widest">Director of Education</p>
              <h4 className="font-headline-md text-headline-md text-primary">Julian Vance</h4>
              <p className="font-body-md text-on-surface-variant mt-sm">Bridging the gap between the roastery and your home kitchen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-xl bg-primary text-on-primary text-center">
        <div className="max-w-2xl mx-auto px-gutter">
          <h2 className="font-display-lg text-headline-lg mb-md text-white font-normal italic">Experience the Roast.</h2>
          <p className="font-body-lg text-body-lg mb-lg opacity-80 text-white">Join our subscription club and receive fresh, seasonal lots delivered to your door every fortnight.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-md">
            <Link 
              to="/menu"
              className="bg-white text-primary px-xl py-md font-label-md hover:bg-opacity-95 transition-all text-center rounded-full"
            >
              Start Subscription
            </Link>
            <Link 
              to="/locations"
              className="border border-white text-white px-xl py-md font-label-md hover:bg-white hover:text-primary transition-all text-center rounded-full"
            >
              Visit The Roastery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
