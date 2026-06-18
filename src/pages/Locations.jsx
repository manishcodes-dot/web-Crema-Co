import { useEffect, useState } from 'react';

const locationsData = [
  {
    id: 'Copenhagen-V',
    title: 'Vesterbro Flagship',
    badge: 'NOW OPEN',
    badgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    address: 'Vesterbrogade 44, 1620 København V',
    hours: {
      weekdays: '07:00 — 19:00',
      weekends: '08:00 — 20:00'
    },
    top: '35%',
    left: '45%',
    markerIcon: 'coffee',
    parking: 'Secure bicycle racks are available directly in front of the entrance. For vehicles, the Westside Multi-storey parking is a 3-minute walk away (Blue Zone).',
    landmarks: [
      { name: 'Glyptoteket Art Museum', icon: 'museum' },
      { name: 'Tivoli Gardens', icon: 'park' },
      { name: 'Copenhagen Central Station', icon: 'train' }
    ]
  },
  {
    id: 'Copenhagen-K',
    title: 'The Roastery (Indre By)',
    badge: 'CLOSING SOON',
    badgeClass: 'bg-surface-container-high text-on-surface-variant',
    address: 'Store Kongensgade 12, 1264 København K',
    hours: {
      weekdays: '08:00 — 18:00',
      weekends: '10:00 — 17:00'
    },
    top: '50%',
    left: '55%',
    markerIcon: 'local_cafe',
    parking: 'No public car parking is available on-site. We recommend using the Jeudan underground parking lot at Kvæsthusbroen (5-minute walk).',
    landmarks: [
      { name: 'Amalienborg Palace', icon: 'museum' },
      { name: 'Marble Church', icon: 'church' },
      { name: 'Nyhavn Harbor', icon: 'directions_boat' }
    ]
  },
  {
    id: 'Copenhagen-N',
    title: 'Nørrebro Creative Space',
    badge: null,
    address: 'Jægersborggade 18, 2200 København N',
    hours: {
      weekdays: '07:30 — 21:00',
      weekends: '07:30 — 21:00'
    },
    top: '22%',
    left: '38%',
    markerIcon: 'eco',
    parking: 'Bicycle parking is plentiful. Street car parking is paid and extremely limited; we highly recommend public transit or walking.',
    landmarks: [
      { name: 'Assistens Cemetery (cultural park)', icon: 'park' },
      { name: 'Superkilen Park', icon: 'nature_people' },
      { name: 'Nørrebro Station', icon: 'train' }
    ]
  }
];

export default function Locations() {
  const [selectedLocation, setSelectedLocation] = useState(locationsData[0]);
  const [panelOpen, setPanelOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelect = (loc) => {
    setSelectedLocation(loc);
    setPanelOpen(true);
  };

  const filteredLocations = locationsData.filter(loc => 
    loc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="select-none min-h-screen bg-background text-on-background py-xl max-w-container-max mx-auto px-gutter">
      {/* Header */}
      <div className="mb-xl">
        <span className="font-label-md text-label-md text-on-primary-container tracking-widest uppercase mb-4 block">Our Spaces</span>
        <h1 className="font-display-lg text-display-lg text-primary mb-sm italic font-normal">Our Cafés</h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
          From the historic cobblestones of the Old Quarter to the glass and steel of the Innovation District, discover our curated spaces for coffee and conversation.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg relative items-start">
        {/* Left: Location List */}
        <div className="lg:col-span-5 h-[700px] overflow-y-auto pr-sm custom-scrollbar space-y-md">
          {/* Search */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 p-md sticky top-0 z-10 rounded-lg">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-sm text-on-surface-variant/60">search</span>
              <input 
                className="w-full pl-lg pr-md py-sm bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 font-body-md transition-colors outline-none text-on-surface" 
                placeholder="Find a neighborhood..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Location Cards */}
          <div className="space-y-md" id="location-list">
            {filteredLocations.map(loc => {
              const isActive = selectedLocation?.id === loc.id;
              return (
                <article 
                  key={loc.id}
                  onClick={() => handleSelect(loc)}
                  className={`group p-md border rounded-lg cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? 'bg-surface-container border-primary shadow-sm' 
                      : 'bg-surface-container-lowest border-outline-variant/30 hover:bg-surface-container'
                  }`}
                >
                  <div className="flex justify-between items-start mb-sm">
                    <h3 className="font-headline-md text-primary font-bold">{loc.title}</h3>
                    {loc.badge && (
                      <span className={`font-label-md text-[10px] tracking-wider font-bold px-2 py-0.5 rounded-full ${loc.badgeClass}`}>
                        {loc.badge}
                      </span>
                    )}
                  </div>
                  <p className="font-body-md text-on-surface-variant mb-md">{loc.address}</p>
                  <div className="grid grid-cols-2 gap-sm mb-md text-caption font-label-md">
                    <div>
                      <span className="text-on-surface-variant/60 uppercase tracking-wider block text-[10px] mb-xs">Weekdays</span>
                      <span className="text-on-surface font-semibold">{loc.hours.weekdays}</span>
                    </div>
                    {loc.hours.weekends && (
                      <div>
                        <span className="text-on-surface-variant/60 uppercase tracking-wider block text-[10px] mb-xs">Weekends</span>
                        <span className="text-on-surface font-semibold">{loc.hours.weekends}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-sm border-t border-outline-variant/20 pt-md">
                    <a 
                      href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border border-primary text-primary py-2 rounded-sm font-label-md text-label-md hover:bg-primary hover:text-white transition-all text-center cursor-pointer block uppercase tracking-wider"
                      onClick={(e) => e.stopPropagation()}
                    >
                      GET DIRECTIONS
                    </a>
                    <button 
                      className="px-md border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-all rounded-sm cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(loc.address);
                        alert('Address copied to clipboard!');
                      }}
                    >
                      <span className="material-symbols-outlined flex items-center justify-center">share</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Right: Interactive Map Section */}
        <div className="lg:col-span-7 sticky top-lg h-[700px] border border-outline-variant/30 bg-surface-container overflow-hidden group rounded-lg">
          {/* Mock Map Image */}
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover grayscale-[0.3] sepia-[0.1] opacity-95 transition-transform duration-700 group-hover:scale-102" 
              alt="Muted vector map of Copenhagen featuring cream and espresso tones" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpx89WJBI3UxV9xRtLBQSqHyyV1Pl_iD88Yv7x7E4LwZfAXtBDo6PwweuPmWLi-Q0QaEfAIs4c27sdKQLyxUUqxhurG1g5oBpjWQNR0Lw4j_LF-Z2GN12AB7gAR112uolekqvpkrcjkmLFezspS_FseL4OYYNQ6bdJmttITMSD22zH10nej6pPDb5wKBMEoI_e8Yh3kVCP92qaoGUWuggCjpPKKLcy49cLnbvu6wXoJ8pD5HZK1uSGB57PrahPQcaKPEYoJL1Pcxlk"
            />
            {/* Interactive Markers */}
            {locationsData.map(loc => {
              const isActive = selectedLocation?.id === loc.id;
              return (
                <div 
                  key={loc.id}
                  style={{ top: loc.top, left: loc.left }}
                  className="absolute group/marker cursor-pointer z-10" 
                  onClick={() => handleSelect(loc)}
                >
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-surface transition-all duration-300 ${
                      isActive 
                        ? 'bg-primary text-white scale-110 animate-pulse' 
                        : 'bg-secondary text-on-secondary hover:bg-primary hover:text-white'
                    }`}>
                      <span className="material-symbols-outlined text-[20px]">{loc.markerIcon}</span>
                    </div>
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-on-surface text-surface py-1 px-2 text-[10px] font-bold rounded shadow-xl whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity">
                      {loc.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Overlay Zoom Controls */}
          <div className="absolute top-md right-md flex flex-col gap-xs z-20">
            <button className="w-10 h-10 bg-surface border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container transition-colors shadow-sm cursor-pointer rounded-sm"><span class="material-symbols-outlined">add</span></button>
            <button className="w-10 h-10 bg-surface border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container transition-colors shadow-sm cursor-pointer rounded-sm"><span class="material-symbols-outlined">remove</span></button>
            <button className="w-10 h-10 bg-surface border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container transition-colors shadow-sm mt-sm cursor-pointer rounded-sm"><span class="material-symbols-outlined">my_location</span></button>
          </div>

          {/* Contextual Detail Panel */}
          {selectedLocation && (
            <div className={`absolute bottom-0 inset-x-0 bg-surface/95 backdrop-blur-md border-t border-outline-variant/30 p-lg transform transition-transform duration-500 ease-in-out z-30 ${
              panelOpen ? 'translate-y-0' : 'translate-y-full'
            }`}>
              <button 
                className="absolute top-md right-md text-on-surface-variant/60 hover:text-primary transition-colors cursor-pointer" 
                onClick={() => setPanelOpen(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div>
                  <h4 className="font-label-md text-label-md text-primary uppercase tracking-[0.2em] mb-sm">Parking Information</h4>
                  <p className="font-body-md text-on-surface-variant leading-relaxed">
                    {selectedLocation.parking}
                  </p>
                </div>
                <div>
                  <h4 className="font-label-md text-label-md text-primary uppercase tracking-[0.2em] mb-sm">Nearby Landmarks</h4>
                  <ul className="font-body-md text-on-surface space-y-xs">
                    {selectedLocation.landmarks.map((landmark, idx) => (
                      <li key={idx} className="flex items-center gap-xs">
                        <span className="material-symbols-outlined text-body-md text-secondary">{landmark.icon}</span>
                        <span>{landmark.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Brand Values / Amenities Section */}
      <section className="mt-xl py-xl border-t border-outline-variant/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-lg">
          <div className="text-center md:text-left">
            <span className="material-symbols-outlined text-display-lg text-primary mb-md text-[40px]">wifi</span>
            <h4 className="font-headline-md text-primary mb-sm">High-Speed Fiber</h4>
            <p className="text-on-surface-variant text-body-md leading-relaxed">
              Complimentary 1Gbps connectivity for all our guests, ensuring your productivity is as smooth as our roast.
            </p>
          </div>
          <div className="text-center md:text-left">
            <span className="material-symbols-outlined text-display-lg text-primary mb-md text-[40px]">bolt</span>
            <h4 className="font-headline-md text-primary mb-sm">Power Stations</h4>
            <p className="text-on-surface-variant text-body-md leading-relaxed">
              Integrated USB-C and standard power outlets at every communal table and window seat.
            </p>
          </div>
          <div className="text-center md:text-left">
            <span className="material-symbols-outlined text-display-lg text-primary mb-md text-[40px]">pets</span>
            <h4 className="font-headline-md text-primary mb-sm">Pet Friendly</h4>
            <p className="text-on-surface-variant text-body-md leading-relaxed">
              Well-behaved companions are always welcome in our outdoor seating and designated lounge areas.
            </p>
          </div>
          <div className="text-center md:text-left">
            <span className="material-symbols-outlined text-display-lg text-primary mb-md text-[40px]">meeting_room</span>
            <h4 className="font-headline-md text-primary mb-sm">Private Alcoves</h4>
            <p className="text-on-surface-variant text-body-md leading-relaxed">
              Semi-private seating available for focused work or intimate conversations, bookable via our app.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
