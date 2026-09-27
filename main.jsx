import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Download,
  Github,
  Menu,
  MoveHorizontal,
  Sparkles,
  X,
  Youtube,
  Zap
} from "lucide-react";
import { images, links } from "./config";
import "./styles.css";

const features = [
  {
    number: "01",
    title: "CINEMATIC LIGHTING",
    text: "Динамическое освещение и атмосферные эффекты.",
    icon: Sparkles,
    tag: "LIGHT"
  },
  {
    number: "02",
    title: "ULTRA DETAILS",
    text: "Высокодетализированные визуальные эффекты.",
    icon: Zap,
    tag: "DETAIL"
  },
  {
    number: "03",
    title: "IMMERSIVE ATMOSPHERE",
    text: "Туман, частицы, глубина и кинематографичная атмосфера.",
    icon: MoveHorizontal,
    tag: "ATMOSPHERE"
  },
  {
    number: "04",
    title: "PERFORMANCE",
    text: "Оптимизация для комфортной игры.",
    icon: ArrowUpRight,
    tag: "FPS"
  }
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function CursorFX() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 90, damping: 22 });
  const sy = useSpring(y, { stiffness: 90, damping: 22 });

  useEffect(() => {
    const move = e => {
      x.set(e.clientX);
      y.set(e.clientY);
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return <motion.div className="cursor-orb" style={{ x: sx, y: sy }} />;
}

function Particles() {
  const dots = Array.from({ length: 32 }, (_, i) => i);
  return (
    <div className="particles" aria-hidden="true">
      {dots.map(i => (
        <span
          key={i}
          style={{
            "--i": i,
            "--x": `${(i * 37) % 100}%`,
            "--y": `${(i * 61) % 100}%`,
            "--d": `${3 + (i % 5)}s`,
            "--s": `${1 + (i % 3)}px`
          }}
        />
      ))}
    </div>
  );
}

function TiltCard({ children }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 220, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 220, damping: 20 });

  const onMove = e => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rx.set((0.5 - py) * 8);
    ry.set((px - 0.5) * 8);
  };

  return (
    <motion.div
      ref={ref}
      className="tilt-wrap"
      style={{ rotateX, rotateY }}
      onPointerMove={onMove}
      onPointerLeave={() => { rx.set(0); ry.set(0); }}
    >
      {children}
    </motion.div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const nav = [
    ["FEATURES", "#features"],
    ["SHOWCASE", "#showcase"],
    ["GALLERY", "#gallery"],
    ["DOWNLOAD", "#download"]
  ];

  return (
    <header className="nav">
      <a className="brand" href="#" aria-label="FRIZUR Visuals home">
        <span className="brand-mark">F</span>
        <span>FRIZUR <i>VISUALS</i></span>
      </a>

      <nav className={`nav-links ${open ? "open" : ""}`}>
        {nav.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a className="nav-cta" href={links.download}>GET FRIZUR <ArrowUpRight size={15} /></a>
      </nav>

      <button className="menu-btn" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function Hero() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const fn = () => setScroll(Math.min(window.scrollY, 700));
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <section className="hero">
      <div
        className="hero-image"
        style={{ transform: `translate3d(0, ${scroll * 0.08}px, 0) scale(1.04)` }}
      />
      <div className="hero-vignette" />
      <Particles />

      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="eyebrow"
        >
          <span className="live-dot" /> VISUAL ENGINE / 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <span>FRIZUR</span>
          <em>VISUALS</em>
        </motion.h1>

        <motion.p
          className="hero-kicker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          NEXT-GEN VISUAL EXPERIENCE FOR MINECRAFT
        </motion.p>

        <motion.p
          className="hero-copy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          Преврати Minecraft в совершенно новый визуальный опыт.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <a href={links.download} className="button button-primary">
            DOWNLOAD <Download size={17} />
          </a>
          <a href="#features" className="button button-ghost">
            EXPLORE FEATURES <ArrowDownRight size={17} />
          </a>
        </motion.div>

        <div className="hero-meta">
          <span>01 / 04</span>
          <div className="meta-line"><span /></div>
          <span>VISUALS • ATMOSPHERE • EXPERIENCE</span>
        </div>
      </div>

      <a href="#features" className="scroll-cue">
        <span>SCROLL TO EXPLORE</span>
        <ChevronDown size={17} />
      </a>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="section features-section">
      <div className="section-head" data-reveal>
        <div>
          <p className="section-label">02 — VISUAL ENGINE</p>
          <h2>BUILT TO MAKE<br /><span>MINECRAFT FEEL NEW.</span></h2>
        </div>
        <p className="section-intro">
          Свет, воздух, глубина и детали работают вместе, чтобы каждый кадр ощущался кинематографично.
        </p>
      </div>

      <div className="feature-grid">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div className="feature-reveal" data-reveal key={f.title} style={{ "--delay": `${i * 80}ms` }}>
              <TiltCard>
                <article className="feature-card">
                  <div className="feature-top">
                    <span>{f.number}</span>
                    <span className="feature-tag">{f.tag}</span>
                  </div>
                  <Icon className="feature-icon" size={27} strokeWidth={1.4} />
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                  <div className="card-arrow"><ArrowUpRight size={17} /></div>
                </article>
              </TiltCard>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Comparison() {
  const ref = useRef(null);
  const [pos, setPos] = useState(52);
  const drag = e => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const value = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, value)));
  };

  return (
    <section id="showcase" className="section showcase-section">
      <div className="section-head showcase-head" data-reveal>
        <div>
          <p className="section-label">03 — SHOWCASE</p>
          <h2>SEE THE<br /><span>DIFFERENCE.</span></h2>
        </div>
        <div className="comparison-hint"><MoveHorizontal size={16} /> DRAG TO COMPARE</div>
      </div>

      <div
        className="comparison"
        ref={ref}
        onPointerMove={e => e.buttons === 1 && drag(e)}
        onPointerDown={drag}
        onTouchMove={drag}
        data-reveal
      >
        <img src={images.comparison} alt="Minecraft visual comparison" />
        <div className="comparison-after" style={{ width: `${pos}%` }}>
          <div className="after-image" style={{ backgroundImage: `url(${images.comparison})` }} />
          <div className="after-color" />
        </div>
        <div className="comparison-label vanilla">VANILLA</div>
        <div className="comparison-label frizur">FRIZUR VISUALS</div>
        <div className="comparison-hud">
          <span>LIGHTING: ENHANCED</span>
          <span>ATMOSPHERE: ULTRA</span>
          <span>DETAIL: MAX</span>
        </div>
        <div className="comparison-handle" style={{ left: `${pos}%` }}>
          <div><MoveHorizontal size={16} /></div>
        </div>
        <div className="scanline" />
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="section gallery-section">
      <div className="section-head" data-reveal>
        <div>
          <p className="section-label">04 — GALLERY</p>
          <h2>EVERY FRAME<br /><span>HAS DEPTH.</span></h2>
        </div>
        <p className="section-intro">Собрано вокруг атмосферы — от холодных гор до глубоких лесов.</p>
      </div>

      <div className="gallery-grid">
        {images.gallery.map((item, i) => (
          <div className={`gallery-item ${item.className}`} data-reveal key={item.title} style={{ "--delay": `${i * 70}ms` }}>
            <div className="gallery-media">
              <img src={item.url} alt={item.title} loading="lazy" />
              <div className="gallery-overlay" />
              <div className="gallery-caption">
                <span>SCENE / 0{i + 1}</span>
                <h3>{item.title}</h3>
                <ArrowUpRight size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DownloadSection() {
  return (
    <section id="download" className="download-section">
      <div className="download-glow" />
      <div className="download-grid" />
      <div className="download-content" data-reveal>
        <p className="section-label">05 — FINAL BUILD</p>
        <h2>READY TO SEE<br /><span>MINECRAFT DIFFERENTLY?</span></h2>
        <p>Experience Minecraft through a new visual dimension.</p>
        <a href={links.download} className="button button-primary button-large">
          DOWNLOAD FRIZUR VISUALS <Download size={18} />
        </a>

        <div className="specs">
          <span><b>MINECRAFT</b> JAVA EDITION</span>
          <span><b>PERFORMANCE</b> OPTIMIZED</span>
          <span><b>PRICE</b> FREE</span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <a className="footer-brand" href="#">FRIZUR <i>VISUALS</i></a>
        <p>VISUALS • ATMOSPHERE • EXPERIENCE</p>
      </div>
      <div className="footer-links">
        <a href={links.discord}>Discord <ArrowUpRight size={14} /></a>
        <a href={links.youtube}>YouTube <Youtube size={14} /></a>
        <a href={links.github}>GitHub <Github size={14} /></a>
        <a href={links.download}>Download <Download size={14} /></a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 FRIZUR VISUALS</span>
        <span>MADE FOR THE NEXT FRAME.</span>
      </div>
    </footer>
  );
}

function App() {
  useReveal();

  return (
    <div className="site">
      <CursorFX />
      <Nav />
      <main>
        <Hero />
        <Features />
        <Comparison />
        <Gallery />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
