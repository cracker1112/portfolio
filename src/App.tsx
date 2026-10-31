import { useEffect, useRef, useState, ReactNode } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const EMAIL = 'mailto:sumitjadhav2277@gmail.com';
const GITHUB = 'https://github.com/cracker1112';

/* ---------- reusable ---------- */
function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = '' }:
  { children: ReactNode; delay?: number; duration?: number; x?: number; y?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, x, y }} whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }} transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </motion.div>
  );
}

function Magnet({ children, padding = 150, strength = 3, className = '' }:
  { children: ReactNode; padding?: number; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const r = ref.current?.getBoundingClientRect(); if (!r) return;
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const near = Math.abs(cx - e.clientX) < r.width / 2 + padding && Math.abs(cy - e.clientY) < r.height / 2 + padding;
      setActive(near); setPos(near ? { x: (e.clientX - cx) / strength, y: (e.clientY - cy) / strength } : { x: 0, y: 0 });
    };
    window.addEventListener('mousemove', move); return () => window.removeEventListener('mousemove', move);
  }, [padding, strength]);
  return (
    <div ref={ref} className={className}>
      <div style={{ transform: `translate3d(${pos.x}px,${pos.y}px,0)`, willChange: 'transform',
        transition: active ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out' }}>{children}</div>
    </div>
  );
}

function Char({ c, p, range }: { c: string; p: MotionValue<number>; range: [number, number] }) {
  const o = useTransform(p, range, [0.2, 1]);
  return <span className="relative"><span className="opacity-0">{c}</span><motion.span style={{ opacity: o }} className="absolute left-0 top-0">{c}</motion.span></span>;
}
function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const chars = text.split('');
  return (
    <p ref={ref} className="text-center font-medium leading-relaxed max-w-[560px]" style={{ color: '#D7E2EA', fontSize: 'clamp(1rem,2vw,1.35rem)' }}>
      {chars.map((c, i) => <Char key={i} c={c} p={scrollYProgress} range={[i / chars.length, (i + 1) / chars.length]} />)}
    </p>
  );
}

const ContactButton = () => (
  <a href={EMAIL} className="inline-block rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base"
    style={{ background: 'linear-gradient(123deg,#18011F 7%,#B600A8 37%,#7621B0 72%,#BE4C00 100%)',
      boxShadow: '0px 4px 4px rgba(181,1,167,0.25), 4px 4px 12px #7721B1 inset', outline: '2px solid white', outlineOffset: '-3px' }}>Contact Me</a>
);
const LiveProjectButton = ({ href }: { href: string }) => (
  <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors">
    Live Project <ArrowUpRight size={18} /></a>
);

/* ---------- hero ---------- */
function Hero() {
  const links = [['About', '#about'], ['Price', '#services'], ['Projects', '#projects'], ['Contact', EMAIL]];
  return (
    <section className="relative h-screen flex flex-col px-6 md:px-10" style={{ overflowX: 'clip' }}>
      <FadeIn y={-20}><nav className="flex justify-between pt-6 md:pt-8">
        {links.map(([l, h]) => <a key={l} href={h} className="uppercase font-medium tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200" style={{ color: '#D7E2EA' }}>{l}</a>)}
      </nav></FadeIn>
      <div className="overflow-hidden"><FadeIn delay={0.15} y={40}>
        <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5">Hi, i&apos;m sumit</h1>
      </FadeIn></div>
      <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]">
        <FadeIn delay={0.6} y={30}><Magnet padding={150} strength={3}>
          {/* TODO: apni photo/3D render se replace karo */}
          <img src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png" alt="Sumit" className="w-full" />
        </Magnet></FadeIn>
      </div>
      <div className="mt-auto flex justify-between items-end pb-7 sm:pb-8 md:pb-10">
        <FadeIn delay={0.35} y={20}><p className="font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]" style={{ color: '#D7E2EA', fontSize: 'clamp(0.75rem,1.4vw,1.5rem)' }}>
          a data analyst building useful ai products and unforgettable projects</p></FadeIn>
        <FadeIn delay={0.5} y={20}><ContactButton /></FadeIn>
      </div>
    </section>
  );
}

/* ---------- marquee ---------- */
const G = 'https://motionsites.ai/assets/hero-';
const gifs = ['space-voyage-preview-eECLH3Yc','codenest-preview-Cgppc2qV','vex-ventures-preview-BczMFIiw','stellar-ai-v2-preview-DjvxjG3C','asme-preview-B_nGDnTP','transform-data-preview-Cx5OU29N','vitara-preview-Cjz2QYyU','terra-preview-BFjrCr7T','skyelite-preview-DHaZIgUv','aethera-preview-DknSlcTa','designpro-preview-D8c5_een','stellar-ai-preview-D3HL6bw1','xportfolio-preview-D4A8maiC','orbit-web3-preview-BXt4OttD','nexora-preview-cx5HmUgo','evr-ventures-preview-DZxeVFEX','planet-orbit-preview-DWAP8Z1P','new-era-preview-CocuDUm9','wealth-preview-B70idl_u','luminex-preview-CxOP7ce6','celestia-preview-0yO3jXO8'].map(n => `${G}${n}.gif`);
function Marquee() {
  const ref = useRef<HTMLElement>(null); const [off, setOff] = useState(0);
  useEffect(() => {
    const f = () => { const t = ref.current?.offsetTop ?? 0; setOff((window.scrollY - t + window.innerHeight) * 0.3); };
    f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f);
  }, []);
  const row = (imgs: string[], dx: number) => (
    <div className="flex gap-3 w-max" style={{ transform: `translateX(${dx}px)`, willChange: 'transform', marginLeft: '-2000px' }}>
      {[...imgs, ...imgs, ...imgs].map((s, i) => <img key={i} src={s} loading="lazy" alt="" className="object-cover rounded-2xl shrink-0" style={{ width: 420, height: 270 }} />)}
    </div>);
  return (
    <section ref={ref} className="pt-24 sm:pt-32 md:pt-40 pb-10 flex flex-col gap-3 overflow-hidden" style={{ background: '#0C0C0C' }}>
      {row(gifs.slice(0, 11), off - 200)}{row(gifs.slice(11), -(off - 200))}
    </section>
  );
}

/* ---------- about ---------- */
const F = 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/';
function About() {
  const deco = (src: string, cls: string, delay: number, x: number) =>
    <div className={`absolute ${cls}`}><FadeIn delay={delay} x={x} y={0} duration={0.9}><img src={F + src} alt="" className="w-full" /></FadeIn></div>;
  return (
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 gap-16 sm:gap-20 md:gap-24">
      {deco('moon_icon.11395d36.png', 'w-[120px] sm:w-[160px] md:w-[210px] top-[4%] left-[1%] sm:left-[2%] md:left-[4%]', 0.1, -80)}
      {deco('p59_1.4659672e.png', 'w-[100px] sm:w-[140px] md:w-[180px] bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]', 0.25, -80)}
      {deco('lego_icon-1.703bb594.png', 'w-[120px] sm:w-[160px] md:w-[210px] top-[4%] right-[1%] sm:right-[2%] md:right-[4%]', 0.15, 80)}
      {deco('Group_134-1.2e04f3ce.png', 'w-[130px] sm:w-[170px] md:w-[220px] bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]', 0.3, 80)}
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 relative z-10">
        <FadeIn y={40}><h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center" style={{ fontSize: 'clamp(3rem,12vw,160px)' }}>About me</h2></FadeIn>
        <AnimatedText text="I'm a Data Analyst from Pune who turns messy data into dashboards and GenAI apps people actually use. I work with Python, SQL, Power BI, Tableau and LLM APIs, and I co-founded BalGuru, an EdTech startup for preschoolers. Let's build something incredible together!" />
      </div>
      <div className="relative z-10"><ContactButton /></div>
    </section>
  );
}

/* ---------- services ---------- */
const services = [
  ['Data Analytics', 'Cleaning, modelling and analysing data with SQL, Python and Pandas to find insights that drive real business decisions.'],
  ['Dashboards', 'Interactive Power BI and Tableau dashboards with solid DAX that make reporting clear, fast and self-serve.'],
  ['GenAI Apps', 'LLM-powered tools using Groq and Gemini APIs, from chatbots to interview coaches, shipped as working products.'],
  ['Streamlit & FastAPI', 'Quick, clean web apps and APIs in Python that turn notebooks and models into something anyone can use.'],
  ['Web & EdTech', 'Landing pages and learning platforms, built from idea to launch, like BalGuru for preschool learning.'],
];
function Services() {
  return (
    <section id="services" className="bg-white px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]">
      <h2 className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ color: '#0C0C0C', fontSize: 'clamp(3rem,12vw,160px)' }}>Services</h2>
      <div className="max-w-5xl mx-auto">
        {services.map(([n, d], i) => (
          <FadeIn key={n} delay={i * 0.1}>
            <div className="flex gap-4 sm:gap-8 items-start py-8 sm:py-10 md:py-12" style={{ borderTop: '1px solid rgba(12,12,12,0.15)', borderBottom: i === 4 ? '1px solid rgba(12,12,12,0.15)' : undefined, color: '#0C0C0C' }}>
              <span className="font-black leading-none" style={{ fontSize: 'clamp(3rem,10vw,140px)' }}>0{i + 1}</span>
              <div className="flex flex-col gap-3">
                <h3 className="font-medium uppercase" style={{ fontSize: 'clamp(1rem,2.2vw,2.1rem)' }}>{n}</h3>
                <p className="font-light leading-relaxed max-w-2xl opacity-60" style={{ fontSize: 'clamp(0.85rem,1.6vw,1.25rem)' }}>{d}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ---------- projects ---------- */
const H = (id: string) => `https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_${id}.png&w=1280&q=85`;
// TODO: ye placeholder images hain, apne screenshots se replace karo (public/ folder me daalke)
const projects = [
  { cat: 'Co-founder', name: 'BalGuru', url: 'https://balguru.in', imgs: ['20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db','20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8','20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327'] },
  { cat: 'Personal', name: 'AI Interview Coach', url: GITHUB, imgs: ['20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f','20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1','20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea'] },
  { cat: 'Client', name: 'Data Dashboards', url: GITHUB, imgs: ['20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f','20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b','20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee'] },
];
const R = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';
function Card({ i, p, progress }: { i: number; p: typeof projects[0]; progress: MotionValue<number> }) {
  const target = 1 - (projects.length - 1 - i) * 0.03;
  const scale = useTransform(progress, [i / projects.length, 1], [1, target]);
  return (
    <div className="h-[85vh] sticky top-24 md:top-32">
      <motion.div style={{ scale, top: i * 28 }} className={`relative origin-top border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8 ${R}`}>
        <div className="absolute inset-0 -z-10" style={{ background: '#0C0C0C', borderRadius: 'inherit' }} />
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 md:mb-6" style={{ color: '#D7E2EA' }}>
          <span className="hero-heading font-black leading-none" style={{ fontSize: 'clamp(3rem,10vw,140px)' }}>0{i + 1}</span>
          <div className="flex flex-col"><span className="font-light uppercase tracking-wider opacity-70 text-sm">{p.cat}</span>
            <span className="font-medium uppercase" style={{ fontSize: 'clamp(1rem,2.2vw,2.1rem)' }}>{p.name}</span></div>
          <LiveProjectButton href={p.url} />
        </div>
        <div className="flex gap-3 md:gap-4">
          <div className="w-[40%] flex flex-col gap-3 md:gap-4">
            <img src={H(p.imgs[0])} alt="" loading="lazy" className={`w-full object-cover ${R}`} style={{ height: 'clamp(130px,16vw,230px)' }} />
            <img src={H(p.imgs[1])} alt="" loading="lazy" className={`w-full object-cover ${R}`} style={{ height: 'clamp(160px,22vw,340px)' }} />
          </div>
          <img src={H(p.imgs[2])} alt="" loading="lazy" className={`w-[60%] object-cover ${R}`} />
        </div>
      </motion.div>
    </div>
  );
}
function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <section id="projects" className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]" style={{ background: '#0C0C0C' }}>
      <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem,12vw,160px)' }}>Project</h2>
      <div ref={ref}>{projects.map((p, i) => <Card key={p.name} i={i} p={p} progress={scrollYProgress} />)}</div>
    </section>
  );
}

export default function App() {
  return <main style={{ background: '#0C0C0C', overflowX: 'clip' }}><Hero /><Marquee /><About /><Services /><Projects /></main>;
}
