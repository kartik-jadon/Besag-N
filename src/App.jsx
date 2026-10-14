import React, { useState, useEffect, useRef } from 'react';

/* ---------- Data ---------- */
const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about', children: ['Vision & Profile', 'Objectives', 'Organization Setup', 'Governing Council', 'Internal Complaints Committee', 'Act & Rules'] },
  { label: 'Satellite Communication', href: '#services', children: ['Infrastructure', 'Operational Channels', 'Channel Details'] },
  { label: 'Functional Units', href: '#services', children: ['Centre for Geo-informatics Applications', 'Centre for Informatics and Training', 'Academy of Geo-informatics for Sustainable Development'] },
  { label: 'Innovations', href: '#impact' },
  { label: 'Projects', href: '#impact' },
  { label: 'E-citizen', href: '#gov', children: ['Right to Information Act', 'Useful Websites', 'Media Library'] },
  { label: 'Training', href: '#notices', children: ['Training / Workshops', 'FAQ'] },
  { label: 'Notices', href: '#notices' },
  { label: 'Contact', href: '#contact' },
];

const SLIDES = [
  { tag: 'Satellite Communication', title: 'Classrooms that reach every district.', text: 'Satellite broadcasting for distant interactive training, education and extension, from one studio to thousands of learners.', stat: 'Interactive training via satellite' },
  { tag: 'Geo-informatics', title: 'One digital map for every department.', text: 'Common geo-spatial databases for sector and thematic applications, built once and reused across ministries and states.', stat: 'Multi-purpose digital databases' },
  { tag: 'Geo-spatial technology', title: 'Decisions grounded in geography.', text: 'Decision support systems and web and desktop applications, developed in-house and offered at low cost to government users.', stat: 'In-house developed software' },
];

const SERVICES = [
  { icon: 'satellite', title: 'Satellite Communication', text: 'Satellite broadcasting network for distant interactive training, education and extension.', big: true },
  { icon: 'layers', title: 'Remote Sensing Applications', text: 'Inventory mapping, developmental planning and monitoring of natural and man-made resources.' },
  { icon: 'globe', title: 'Geo-informatics System', text: 'Multi-purpose common digital databases for sector and thematic applications.' },
  { icon: 'mountain', title: 'Photogrammetry', text: 'Digital elevation models, terrain characteristics and resource planning.' },
  { icon: 'alert', title: 'Disaster Management', text: 'Geo-spatial information that helps government assess and mitigate damage during disasters.', big: true },
  { icon: 'code', title: 'Software Development', text: 'Low-cost decision support systems and geo-informatics applications, desktop and web.' },
  { icon: 'share', title: 'Technology Transfer', text: 'Transferring technology to a large number of end users.' },
  { icon: 'compass', title: 'GNSS and Land Survey', text: 'Location-based services, geo-referencing, engineering applications and research.' },
  { icon: 'book', title: 'Education, Research and Training', text: 'Training and research facilities through the Academy for Geo-informatics.' },
];

const STATS = [
  { n: 550, label: 'Projects in total' },
  { n: 516, label: 'Projects implemented' },
  { n: 29, label: 'Central ministries and agencies' },
  { n: 19, label: 'States and Union Territories' },
];

const VOICES = [
  { quote: 'GIS based decision support systems can usher in an era of developmental planning and good governance.', name: 'Shri Ashwini Vaishnaw', role: 'Minister, MeitY (as listed on the original site)' },
  { quote: 'Empowerment of the nation through space and geo-spatial technologies, applied in line with governance principles for the welfare of society.', name: 'Shri Rajeev Chandrasekhar', role: 'Minister of State, MeitY (as listed on the original site)' },
  { quote: 'Develop and institutionalise space and geo-spatial applications and solutions built with in-house software.', name: 'Shri Ajay Prakash Sawhney', role: 'Secretary, MeitY (as listed on the original site)' },
];

const TEAM = {
  Leadership: [
    ['Shri T. P. Singh', 'Principal Advisor and Executive Vice Chairman, Governing Council'],
    ['Dr. Vinay Thakur', 'Director General'],
    ['Ms Tulika Pandey', 'Chief Vigilance Officer'],
  ],
  'Geo-spatial': [
    ['Ajay Patel', 'Director, Geo-Spatial Applications'],
    ['Vijay Singh', 'Additional Director'],
    ['Khalid Mehmood', 'Additional Director'],
  ],
  Software: [
    ['Miren Karamta', 'Director, Defence Applications'],
    ['Dr. Krunal Patel', 'Additional Director'],
    ['Dr. Manoj Pandya', 'Additional Director'],
    ['Dr. Abdul Jhummarwala', 'Additional Director'],
    ['Punit Lalwani', 'Additional Director and CISO'],
  ],
  Satcom: [
    ['Rajesh Patel', 'Director, SATCOM Applications'],
    ['Riken Darji', 'Additional Director'],
  ],
  'Delhi Office': [
    ['Neelu Chaudhary', 'Senior Manager'],
    ['Akshat Jain', 'Manager, IT'],
    ['Gunjan Kanwar', 'Manager, IT'],
    ['Siddharth Dhawan', 'Manager, Legal and Administration'],
    ['Harender Singh', 'Project Manager'],
    ['Gaurav Awasthi', 'Project Manager'],
    ['Kumar Sarthak', 'Project Manager'],
  ],
  Administration: [
    ['S. K. Hudda, I.A.S. (Retd.)', 'Director, Administration'],
    ['Kiritsinh Raol', 'Purchase Officer'],
    ['Dr. Sanjay Rajpal', 'Director, Standardisation'],
  ],
};

const NOTICES = [
  ['12 Oct 2026', 'Sample notice: Project Engineer (Geo-informatics), contract basis', '28 Oct 2026'],
  ['05 Oct 2026', 'Sample notice: Workshop on satellite-based remote sensing', '20 Oct 2026'],
  ['29 Sep 2026', 'Sample notice: Empanelment of training partners', '15 Oct 2026'],
];

const STORIES = [
  { title: 'Amarnath Yatra gets a pilgrim app', text: 'The Shrine Board introduced a mobile application to help Yatris plan and undertake the pilgrimage.', src: 'Business Standard', href: 'https://www.business-standard.com/article/pti-stories/amarnath-shrine-board-launches-mobile-app-to-help-yatris-119062501247_1.html' },
  { title: 'Delhi Police moves daily diaries online', text: 'The Commissioner urged digital submission of daily diaries during the COVID-19 outbreak to save paper.', src: 'The New Indian Express', href: 'https://www.newindianexpress.com/cities/delhi/2020/may/15/delhi-police-chief-stresses-on-sending-daily-diaries-online-amid-covid-19-outbreak-2143786.html' },
  { title: 'One portal for offshore NOCs', text: 'A web portal now handles No Objection Certificates for power projects and survey activities in Indian territorial waters and the EEZ.', src: 'Ministry of Defence statement', href: '#' },
];

const GOV = ['The President of India', 'Rajya Sabha', 'Lok Sabha', 'Cabinet Secretariat', 'Gandhi Portal', 'Just Climate Action', 'GOI Web Directory', 'National Portal of India', 'Press Information Bureau', 'MyGov'];
const PARTNERS = ['DPIIT', 'MAFW', 'MeitY', 'MoHFW', 'MoE', 'MoHUA', 'MoC', 'Coal', 'MoD', 'DoNER', 'MoHA', 'MoM', 'MoP', 'MoR', 'MoRTH', 'MoSPI', 'MoT', 'Jal Shakti', 'MoPGP', 'MoPR', 'MoSJE'];

/* ---------- Primitives ---------- */
const ICONS = {
  satellite: 'M13 7 9 3 5 7l4 4M17 11l4 4-4 4-4-4M8 12l4 4M16 8l3-3M9 21a6 6 0 0 0-6-6',
  layers: 'M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5',
  globe: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20',
  mountain: 'm8 3 4 8 5-5 5 15H2L8 3Z',
  alert: 'M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0ZM12 9v4M12 17h.01',
  code: 'm16 18 6-6-6-6M8 6l-6 6 6 6',
  share: 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13',
  compass: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM16.2 7.8l-2.1 6.3-6.3 2.1 2.1-6.3 6.3-2.1Z',
  book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15Z',
  menu: 'M3 6h18M3 12h18M3 18h18',
  x: 'M18 6 6 18M6 6l12 12',
  chevron: 'm6 9 6 6 6-6',
  arrow: 'M5 12h14M12 5l7 7',
  search: 'M21 21l-4.3-4.3M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z',
  pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0ZM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  up: 'm18 15-6-6-6 6',
  left: 'm15 18-6-6 6-6',
  right: 'm9 18 6-6-6-6',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z',
  ext: 'M7 17 17 7M7 7h10v10',
};
function Icon({ name, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} style={{ transitionDelay: delay + 'ms' }} className={`reveal ${on ? 'in' : ''} ${className}`}>{children}</div>;
}

function Counter({ to }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), d = 1700;
      const tick = (t) => {
        const p = Math.min((t - t0) / d, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}+</span>;
}

function Logo({ light }) {
  return (
    <a href="#home" className="flex items-center gap-3" aria-label="BISAG-N home">
      <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden="true">
        <circle cx="20" cy="20" r="9" fill="#2DD4C4" />
        <ellipse cx="20" cy="20" rx="18" ry="7" fill="none" stroke="#FFB020" strokeWidth="2" transform="rotate(-24 20 20)" />
        <circle cx="35" cy="12.5" r="2.6" fill="#FFB020" />
      </svg>
      <span className="leading-tight">
        <span className={`font-display block text-xl font-bold ${light ? 'text-white' : 'text-main'}`}>BISAG-N</span>
        <span className={`hidden text-[11px] sm:block ${light ? 'text-slate-300' : 'text-soft'}`}>Space Applications and Geo-informatics</span>
      </span>
    </a>
  );
}

/* ---------- Header ---------- */
function Topbar({ fs, setFs, theme, toggleTheme }) {
  return (
    <div className="border-b border-white/10 bg-[#070D20] text-xs text-slate-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <p className="truncate">An official website of BISAG-N <span className="text-slate-500">(redesign demo)</span></p>
        <div className="flex items-center gap-1.5" role="group" aria-label="Text size and theme">
          {[['A-', -1], ['A', 0], ['A+', 1]].map(([l, d]) => (
            <button key={l} onClick={() => setFs(d === 0 ? 16 : Math.min(20, Math.max(13, fs + d * 2)))} className="rounded-md px-2 py-1 font-semibold transition hover:bg-white/10" aria-label={`Text size ${l}`}>{l}</button>
          ))}
          <button onClick={toggleTheme} className="ml-1 rounded-md p-1.5 transition hover:bg-white/10" aria-label="Toggle light and dark theme">
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);
  const close = () => { setOpen(false); setSub(null); };

  return (
    <header style={{ top: 'env(safe-area-inset-top, 0px)' }} className={`sticky z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A1226]/90 shadow-lg shadow-black/20 backdrop-blur-md' : 'bg-[#0A1226]'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Logo light />
        <nav className="hidden xl:block" aria-label="Primary">
          <ul className="flex items-center gap-0.5">
            {NAV.map((item) => (
              <li key={item.label} className="group relative">
                <a href={item.href} className="flex items-center gap-1 rounded-lg px-3 py-2 text-[14px] font-medium text-slate-200 transition hover:bg-white/10 hover:text-white">
                  {item.label}
                  {item.children && <Icon name="chevron" className="h-3.5 w-3.5 transition group-hover:rotate-180" />}
                </a>
                {item.children && (
                  <ul className="invisible absolute left-0 top-full z-10 w-72 translate-y-2 rounded-2xl border border-white/10 bg-[#0F1B45] p-2 opacity-0 shadow-2xl transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((c) => (
                      <li key={c}><a href={item.href} className="block rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-[#2DD4C4]">{c}</a></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <button className="rounded-lg p-2 text-slate-200 transition hover:bg-white/10" aria-label="Search"><Icon name="search" /></button>
          <button onClick={() => setOpen(true)} className="rounded-lg p-2 text-slate-200 transition hover:bg-white/10 xl:hidden" aria-label="Open menu" aria-expanded={open}><Icon name="menu" className="h-6 w-6" /></button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-[60] xl:hidden ${open ? '' : 'pointer-events-none'}`}>
        <div onClick={close} className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} />
        <aside className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-[#0A1226] text-white shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`} aria-hidden={!open}>
          <div className="flex items-center justify-between border-b border-white/10 p-4">
            <Logo light />
            <button onClick={close} className="rounded-lg p-2 hover:bg-white/10" aria-label="Close menu"><Icon name="x" className="h-6 w-6" /></button>
          </div>
          <ul className="flex-1 overflow-y-auto p-3">
            {NAV.map((item) => (
              <li key={item.label} className="border-b border-white/5">
                {item.children ? (
                  <>
                    <button onClick={() => setSub(sub === item.label ? null : item.label)} className="flex w-full items-center justify-between px-3 py-3.5 text-left font-medium" aria-expanded={sub === item.label}>
                      {item.label}
                      <Icon name="chevron" className={`h-4 w-4 transition ${sub === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    <ul className={`grid overflow-hidden transition-all duration-300 ${sub === item.label ? 'max-h-96 pb-2' : 'max-h-0'}`}>
                      {item.children.map((c) => <li key={c}><a onClick={close} href={item.href} className="block rounded-lg px-5 py-2.5 text-sm text-slate-300 hover:bg-white/10">{c}</a></li>)}
                    </ul>
                  </>
                ) : (
                  <a onClick={close} href={item.href} className="block px-3 py-3.5 font-medium">{item.label}</a>
                )}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function GroundTrack({ animate }) {
  const path = 'M-10 270 C 70 110, 170 110, 250 270 S 410 430, 490 270 S 570 130, 620 190';
  return (
    <svg viewBox="0 0 600 420" className="h-auto w-full" role="img" aria-label="Animated satellite ground track passing over the Gandhinagar station">
      <defs>
        <linearGradient id="trk" x1="0" x2="1"><stop offset="0" stopColor="#2DD4C4" stopOpacity="0" /><stop offset=".5" stopColor="#2DD4C4" /><stop offset="1" stopColor="#FFB020" /></linearGradient>
        <radialGradient id="foot"><stop offset="0" stopColor="#2DD4C4" stopOpacity=".5" /><stop offset="1" stopColor="#2DD4C4" stopOpacity="0" /></radialGradient>
      </defs>
      <g stroke="rgba(255,255,255,.09)" strokeWidth="1">
        {[60, 120, 180, 240, 300, 360].map((y) => <line key={y} x1="0" x2="600" y1={y} y2={y} />)}
        {[75, 150, 225, 300, 375, 450, 525].map((x) => <line key={x} y1="0" y2="420" x1={x} x2={x} />)}
      </g>
      <path d={path} fill="none" stroke="url(#trk)" strokeWidth="2.5" strokeDasharray="2 7" strokeLinecap="round" />
      <path id="trackPath" d={path} fill="none" stroke="none" />
      <g>
        <circle r="46" fill="url(#foot)" />
        <circle r="6" fill="#FFB020" />
        <circle r="11" fill="none" stroke="#FFB020" strokeOpacity=".6" />
        {animate && <animateMotion dur="16s" repeatCount="indefinite" rotate="0"><mpath href="#trackPath" /></animateMotion>}
        {!animate && <animateTransform attributeName="transform" type="translate" values="250 270" dur="1s" fill="freeze" />}
      </g>
      <g transform="translate(330 205)">
        <circle r="4" className="pulse" fill="none" stroke="#2DD4C4" strokeWidth="2" />
        <circle r="5" fill="#2DD4C4" />
        <text x="12" y="-10" fill="#E8ECFF" fontSize="14" fontFamily="Figtree, sans-serif" fontWeight="600">Gandhinagar station</text>
        <text x="12" y="8" fill="#9FB0E8" fontSize="11" fontFamily="Figtree, sans-serif">23.2°N 72.6°E</text>
      </g>
      <text x="14" y="408" fill="#7F8FC9" fontSize="11" fontFamily="Figtree, sans-serif">Illustrative ground track</text>
    </svg>
  );
}

function Hero() {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  useEffect(() => {
    if (hold || reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 7000);
    return () => clearInterval(t);
  }, [hold, reduce]);
  const s = SLIDES[i];
  return (
    <section id="home" className="hero-bg relative overflow-hidden text-white" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div key={i} className="min-h-[340px]">
          <p className="slide-in inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-[#7FE9DE]">
            <span className="h-2 w-2 rounded-full bg-[#2DD4C4]" />{s.tag}
          </p>
          <h1 className="slide-in-2 mt-5 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">{s.title}</h1>
          <p className="slide-in-3 mt-5 max-w-xl text-lg leading-relaxed text-slate-300">{s.text}</p>
          <div className="slide-in-3 mt-8 flex flex-wrap gap-3">
            <a href="#services" className="btn-brand inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-teal-400/20" style={{ background: '#2DD4C4', color: '#04121A' }}>Explore our work <Icon name="arrow" className="h-4 w-4" /></a>
            <a href="#contact" className="inline-flex items-center rounded-xl border border-white/25 px-5 py-3 font-semibold transition hover:bg-white/10">Contact BISAG-N</a>
          </div>
        </div>
        <div className="drift rounded-3xl border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/30 backdrop-blur sm:p-5">
          <GroundTrack animate={!reduce} />
          <p className="px-2 pb-1 pt-3 text-sm text-slate-300">{s.stat}</p>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3">
        <button onClick={() => setI((i + SLIDES.length - 1) % SLIDES.length)} className="rounded-full border border-white/20 p-2 transition hover:bg-white/10" aria-label="Previous slide"><Icon name="left" className="h-4 w-4" /></button>
        <div className="flex gap-2">
          {SLIDES.map((_, k) => <button key={k} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`} className={`h-2 rounded-full transition-all duration-300 ${k === i ? 'w-8 bg-[#2DD4C4]' : 'w-2 bg-white/30 hover:bg-white/60'}`} />)}
        </div>
        <button onClick={() => setI((i + 1) % SLIDES.length)} className="rounded-full border border-white/20 p-2 transition hover:bg-white/10" aria-label="Next slide"><Icon name="right" className="h-4 w-4" /></button>
      </div>
    </section>
  );
}

/* ---------- Sections ---------- */
function SectionHead({ title, text }) {
  return (
    <div className="mb-10 max-w-2xl">
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      {text && <p className="text-soft mt-3 text-lg leading-relaxed">{text}</p>}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="bg-page2 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <h2 className="text-3xl font-bold sm:text-4xl">Bhaskaracharya National Institute for Space Applications and Geo-informatics</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Satellite Communication', 'Geo-informatics', 'Geo-spatial technology'].map((d) => (
              <span key={d} className="bd-line text-soft rounded-full border px-3.5 py-1.5 text-sm transition hover:border-[#2DD4C4] hover:text-[#2DD4C4]">{d}</span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-soft text-lg leading-relaxed">BISAG-N is an autonomous scientific society registered under the Societies Registration Act, 1860, under MeitY, Government of India. It develops technology, carries out research and development, supports national and international cooperation, builds capacity, and helps transfer technology and grow entrepreneurship in geo-spatial technology.</p>
          <p className="text-soft mt-4 text-lg leading-relaxed">Its work rests on three domains: satellite communication, geo-informatics and geo-spatial technology.</p>
          <a href="#services" className="text-brand mt-6 inline-flex items-center gap-2 font-semibold transition hover:gap-3">Read the profile <Icon name="arrow" className="h-4 w-4" /></a>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-page py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal><SectionHead title="What we do" text="Nine service areas, from satellite broadcasting to training the next generation of geo-spatial professionals." /></Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, k) => (
            <Reveal key={s.title} delay={(k % 4) * 70} className={s.big ? 'lg:col-span-2' : ''}>
              <article className={`bg-card bd-line group h-full rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 hover:border-[#2DD4C4]/60 hover:shadow-xl hover:shadow-teal-500/10 ${s.big ? 'sm:p-8' : ''}`}>
                <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2DD4C4]/15 text-[#0E9F95] transition group-hover:bg-[#2DD4C4] group-hover:text-[#04121A]"><Icon name={s.icon} className="h-6 w-6" /></span>
                <h3 className={`font-bold ${s.big ? 'text-2xl' : 'text-lg'}`}>{s.title}</h3>
                <p className="text-soft mt-2 leading-relaxed">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Impact() {
  return (
    <section id="impact" className="hero-bg relative overflow-hidden py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal><h2 className="max-w-xl text-3xl font-bold sm:text-4xl">Our achievements</h2></Reveal>
        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {STATS.map((s, k) => (
            <Reveal key={s.label} delay={k * 90}>
              <div className="border-l-2 border-[#FFB020] pl-5">
                <dt className="font-display text-5xl font-extrabold text-white sm:text-6xl"><Counter to={s.n} /></dt>
                <dd className="mt-2 text-slate-300">{s.label}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Voices() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % VOICES.length), 8000);
    return () => clearInterval(t);
  }, []);
  const v = VOICES[i];
  return (
    <section className="bg-page2 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr]">
        <Reveal>
          <h2 className="text-3xl font-bold sm:text-4xl">Guiding vision</h2>
          <div className="mt-6 flex gap-2">
            {VOICES.map((x, k) => <button key={x.name} onClick={() => setI(k)} aria-label={`Show quote ${k + 1}`} className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? 'w-12 bg-[#2DD4C4]' : 'w-6 bg-slate-400/40'}`} />)}
          </div>
        </Reveal>
        <figure key={i} className="slide-in bg-card bd-line rounded-3xl border p-8 sm:p-10">
          <blockquote className="font-display text-2xl font-semibold leading-snug sm:text-3xl">{v.quote}</blockquote>
          <figcaption className="mt-6"><span className="font-semibold">{v.name}</span><span className="text-soft block text-sm">{v.role}</span></figcaption>
        </figure>
      </div>
    </section>
  );
}

function Notices() {
  return (
    <section id="notices" className="bg-page py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal><SectionHead title="Notice board" text="Demo entries shown here. Connect this table to your notices feed." /></Reveal>
        <Reveal>
          <div className="bg-card bd-line overflow-x-auto rounded-2xl border">
            <table className="w-full min-w-[640px] text-left">
              <thead className="text-soft bd-line border-b text-sm">
                <tr><th className="px-5 py-4 font-semibold">Published</th><th className="px-5 py-4 font-semibold">Subject</th><th className="px-5 py-4 font-semibold">Last date</th><th className="px-5 py-4 font-semibold"><span className="sr-only">Apply</span></th></tr>
              </thead>
              <tbody>
                {NOTICES.map((n) => (
                  <tr key={n[1]} className="bd-line border-b transition last:border-0 hover:bg-[#2DD4C4]/10">
                    <td className="whitespace-nowrap px-5 py-4 text-soft">{n[0]}</td>
                    <td className="px-5 py-4 font-medium">{n[1]}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-soft">{n[2]}</td>
                    <td className="px-5 py-4"><a href="#notices" className="text-brand inline-flex items-center gap-1 font-semibold">Apply <Icon name="ext" className="h-4 w-4" /></a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Team() {
  const keys = Object.keys(TEAM);
  const [tab, setTab] = useState(keys[0]);
  return (
    <section id="team" className="bg-page2 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal><SectionHead title="Meet our team" /></Reveal>
        <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist">
          {keys.map((k) => (
            <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${tab === k ? 'border-transparent bg-[#2DD4C4] text-[#04121A]' : 'bd-line text-soft hover:border-[#2DD4C4]'}`}>{k}</button>
          ))}
        </div>
        <div key={tab} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM[tab].map(([name, role], k) => (
            <div key={name} style={{ animationDelay: k * 60 + 'ms' }} className="slide-in bg-card bd-line flex items-center gap-4 rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:border-[#2DD4C4]/60">
              <span className="font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2DD4C4] to-[#FFB020] text-lg font-bold text-[#04121A]">{name.replace(/^(Shri|Dr\.|Ms|S\. K\.)\s+/, '').charAt(0)}</span>
              <div><h3 className="font-semibold leading-snug">{name}</h3><p className="text-soft text-sm">{role}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stories() {
  return (
    <section className="bg-page py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal><SectionHead title="Applications in the news" text="Public services and government workflows that BISAG-N applications have supported." /></Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {STORIES.map((s, k) => (
            <Reveal key={s.title} delay={k * 90}>
              <a href={s.href} target="_blank" rel="noreferrer" className="bg-card bd-line group flex h-full flex-col rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="text-soft mt-3 flex-1 leading-relaxed">{s.text}</p>
                <span className="text-brand mt-5 inline-flex items-center gap-1 text-sm font-semibold">{s.src}<Icon name="ext" className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gov() {
  const loop = [...PARTNERS, ...PARTNERS];
  return (
    <section id="gov" className="bg-page2 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal><SectionHead title="Our government" /></Reveal>
        <div className="flex flex-wrap gap-3">
          {GOV.map((g) => <a key={g} href="#gov" className="bd-line bg-card rounded-xl border px-4 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 hover:border-[#2DD4C4] hover:text-[#0E9F95]">{g}</a>)}
        </div>
        <h3 className="mb-4 mt-14 text-xl font-bold">Government stakeholders</h3>
      </div>
      <div className="overflow-hidden">
        <div className="marquee gap-3 px-3">
          {loop.map((p, k) => <span key={p + k} className="bd-line bg-card text-soft mr-3 whitespace-nowrap rounded-full border px-5 py-2.5 font-semibold">{p}</span>)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const offices = [
    ['Gandhinagar', "Near CH '0' Circle, Indulal Yagnik Marg, Gandhinagar-Ahmedabad Highway, Gandhinagar 382 007, Gujarat", 'https://goo.gl/maps/F8dtTFMbY8AgbZHi7'],
    ['New Delhi, Electronics Niketan', 'Ground Floor, Electronics Niketan, MeitY, New Delhi 110003', 'https://maps.app.goo.gl/RDGzsE8zBXNhodA6A'],
    ['New Delhi, Safdarjung', 'Ground Floor, CRA Building, Air India Complex, Safdarjung Airport, Delhi 110003', 'https://maps.app.goo.gl/87aXHLkHSvpR7N8CA'],
  ];
  return (
    <section id="contact" className="bg-page py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal><SectionHead title="Find us" /></Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {offices.map(([t, a, h], k) => (
            <Reveal key={t} delay={k * 90}>
              <a href={h} target="_blank" rel="noreferrer" className="bg-card bd-line group flex h-full gap-4 rounded-2xl border p-6 transition hover:-translate-y-1 hover:border-[#2DD4C4]/60">
                <span className="mt-1 text-[#0E9F95]"><Icon name="pin" className="h-6 w-6" /></span>
                <span><span className="block text-lg font-bold">{t}</span><span className="text-soft mt-1 block leading-relaxed">{a}</span></span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#070D20] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr]">
        <div><Logo light /><p className="mt-4 max-w-sm text-sm leading-relaxed">Designed, developed, content managed and hosted by BISAG-N. This page is a visual redesign demo.</p></div>
        <div><h4 className="mb-3 font-semibold text-white">Explore</h4><ul className="space-y-2 text-sm">{['About Us', 'Services', 'Team', 'Notices'].map((l, k) => <li key={l}><a className="transition hover:text-[#2DD4C4]" href={['#about', '#services', '#team', '#notices'][k]}>{l}</a></li>)}</ul></div>
        <div><h4 className="mb-3 font-semibold text-white">Reach us</h4><p className="text-sm leading-relaxed">Gandhinagar, Gujarat<br />New Delhi</p><p className="mt-4 text-sm">Total visitors: <span className="font-semibold text-white">5,314,194</span></p></div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">Website updation is in progress.</div>
    </footer>
  );
}

function ToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <a href="#home" aria-label="Back to top" className={`fixed bottom-5 right-5 z-40 rounded-full bg-[#2DD4C4] p-3 text-[#04121A] shadow-lg transition duration-300 hover:-translate-y-1 ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`} style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}><Icon name="up" /></a>
  );
}

/* ---------- App ---------- */
function App() {
  const [fs, setFs] = useState(16);
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    let saved = null;
    try { saved = localStorage.getItem('bisag-theme'); } catch (e) {}
    const t = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = t;
    setTheme(t);
  }, []);
  useEffect(() => { document.documentElement.style.fontSize = fs + 'px'; }, [fs]);
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try { localStorage.setItem('bisag-theme', next); } catch (e) {}
  };
  return (
    <>
      <Topbar fs={fs} setFs={setFs} theme={theme} toggleTheme={toggleTheme} />
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Impact />
        <Voices />
        <Notices />
        <Team />
        <Stories />
        <Gov />
        <Contact />
      </main>
      <Footer />
      <ToTop />
    </>
  );
}


export default App;
