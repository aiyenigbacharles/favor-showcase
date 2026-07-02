import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import {
  Menu,
  X,
  ArrowUpRight,
  Download,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Music2,
  ArrowDown,
  Palette,
  Figma as FigmaIcon,
  Layers,
  Grid3x3,
  AppWindow,
  LayoutDashboard,
  Scissors,
} from "lucide-react";

import heroPortrait from "@/assets/favour.jpg";
import eyanodWeekend from "@/assets/eyanod-weekend.jpg";
import eyanodTgif from "@/assets/eyanod-tgif.jpg";
import eyanodWomen from "@/assets/eyanod-womens-day.jpg";
import eyanodFathers from "@/assets/eyanod-fathers-day.jpg";
import eyanodNewWeek from "@/assets/eyanod-newweek.jpg";
import eyanodDemocracy from "@/assets/eyanod-democracy.jpg";
import projectOpay from "@/assets/project-opay.jpg";
import projectDevuno from "@/assets/eyanod-tgif.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const EYANOD_GALLERY = [
  { src: eyanodWeekend, alt: "Eyanod Happy Weekend campaign poster" },
  { src: eyanodTgif, alt: "Eyanod TGIF campaign poster" },
  { src: eyanodWomen, alt: "Eyanod International Women's Day poster" },
  { src: eyanodFathers, alt: "Eyanod Happy Father's Day poster" },
  { src: eyanodNewWeek, alt: "Eyanod Happy New Week poster" },
  { src: eyanodDemocracy, alt: "Eyanod Democracy Day poster" },
];

const SKILLS = [
  { title: "Marketing", items: ["Digital Marketing", "Brand Awareness", "Marketing Strategy", "Campaign Planning"] },
  { title: "Content", items: ["Content Strategy", "Social Media Management", "Content Planning", "Caption Writing"] },
  { title: "Design", items: ["Canva", "Graphic Design", "Figma", "UI Design (Learning)"] },
  { title: "Productivity", items: ["Microsoft Office", "Google Workspace"] },
];

const TOOLS = [
  { name: "Canva", icon: Palette },
  { name: "Figma", icon: FigmaIcon },
  { name: "Photoshop", icon: Layers },
  { name: "Google Workspace", icon: Grid3x3 },
  { name: "Microsoft Office", icon: AppWindow },
  { name: "Meta Business Suite", icon: LayoutDashboard },
  { name: "CapCut", icon: Scissors },
];

const PROJECTS = [
  {
    title: "Renewable Energy Awareness",
    role: "Marketing Lead",
    description:
      "Educational and engaging social content that simplifies renewable energy concepts through visual storytelling for Eyanod.",
    tools: ["Canva"],
    image: eyanodNewWeek,
    link: null,
  },
  {
    title: "Opay Mobile App UI Recreation",
    role: "UI Design Practice",
    description:
      "Recreated selected Opay app screens in Figma to strengthen understanding of layout, spacing, hierarchy and consistency.",
    tools: ["Figma"],
    image: projectOpay,
    link: "#",
  },
  {
    title: "Devuno — Agency Landing Page",
    role: "UI Design Practice",
    description:
      "Clean, modern landing page UI for a concept web development agency. A study in layout, typography, spacing and color.",
    tools: ["Figma"],
    image: projectDevuno,
    link: "#",
  },
];

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}

function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "bg-background/85 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 md:py-5">
          <a href="#top" className="font-display text-xl tracking-tight uppercase">
            Odion<span className="text-primary">.</span>
          </a>
          <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="group relative text-sm uppercase tracking-widest text-foreground/80 transition-colors hover:text-foreground"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden rounded-full border border-foreground/30 px-5 py-2 text-xs uppercase tracking-widest transition-colors hover:border-primary hover:text-primary md:inline-block"
          >
            Let's Talk
          </a>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-background md:hidden"
          >
            <div className="flex flex-1 flex-col justify-center gap-6 px-8">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                  className="font-display text-5xl uppercase tracking-tight text-foreground hover:text-primary"
                >
                  {n.label}
                </motion.a>
              ))}
            </div>
            <div className="border-t border-border px-8 py-6 text-sm text-muted-foreground">
              Abuja, Nigeria — odionohitanagbonta@gmail.com
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <section ref={ref} id="top" className="relative min-h-screen w-full overflow-hidden">
      {/* Background image with parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroPortrait}
          alt="Portrait of Odion Ohitanagbonta Favour"
          className="h-full w-full object-cover object-[70%_center] md:object-[80%_center]"
          width={1280}
          height={1600}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20 md:via-background/70 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-20 md:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          <span className="h-px w-10 bg-primary" />
          Portfolio — 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl uppercase text-balance sm:text-7xl md:text-8xl lg:text-[9.5rem]"
        >
          Odion
          <br />
          <span className="text-primary">Ohitanagbonta</span>
          <br />
          Favour
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-8 max-w-2xl text-sm uppercase tracking-widest text-foreground/80 sm:text-base"
        >
          Marketing Manager <span className="text-primary">/</span> Content Strategist{" "}
          <span className="text-primary">/</span> Graphic Designer{" "}
          <span className="text-primary">/</span> UI/UX Designer (Learning)
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          A Marketing graduate and creative professional helping brands communicate through
          strategic marketing, content and visual design — with experience across renewable
          energy, social media, graphic design and UI practice.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-3 bg-primary px-7 py-4 text-sm uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90"
          >
            View My Work
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
          <a
            href="/assets/Odion-Ohitanagbonta-Resume.pdf"
            download="Odion-Ohitanagbonta-Resume.pdf"
            className="group inline-flex items-center gap-3 border border-foreground/30 px-7 py-4 text-sm uppercase tracking-widest transition-all hover:border-foreground"
          >
            <Download className="h-4 w-4" /> Download Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-8 left-6 hidden items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground md:flex md:left-10"
        >
          <ArrowDown className="h-4 w-4 animate-bounce" />
          Scroll
        </motion.div>
      </motion.div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: React.ReactNode }) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <p className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
        <span className="h-px w-10 bg-primary" />
        {eyebrow}
      </p>
      <h2 className="font-display text-5xl uppercase text-balance sm:text-6xl md:text-7xl">
        {title}
      </h2>
    </Reveal>
  );
}

function About() {
  return (
    <section id="about" className="relative border-t border-border px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="About Me"
          title={
            <>
              Strategy meets <span className="text-primary">visual craft.</span>
            </>
          }
        />
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="text-lg leading-relaxed text-foreground/85 md:text-xl">
              I graduated with a Bachelor's in Marketing from Rivers State University, and today
              I'm the Marketing Lead at <span className="text-primary">Eyanod</span>, a renewable
              energy startup. I combine creativity with strategy — campaign planning, educational
              content, graphic design and social media management for clean energy awareness.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              I'm fluent in Canva and currently deepening my UI design practice through personal
              Figma projects. My work sits at the intersection of clear messaging, brand systems,
              and visuals that make complex ideas feel simple.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Based in", value: "Abuja, Nigeria" },
                { label: "Currently", value: "Marketing Lead" },
                { label: "Company", value: "Eyanod Global" },
                { label: "Focus", value: "Clean Energy" },
              ].map((s) => (
                <div key={s.label} className="border border-border bg-card p-5">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </p>
                  <p className="mt-2 font-display text-lg uppercase">{s.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative border-t border-border px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Capabilities"
          title={
            <>
              What I <span className="text-primary">do.</span>
            </>
          }
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.08}>
              <div className="group h-full border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary">
                <p className="mb-1 text-xs uppercase tracking-widest text-primary">
                  0{i + 1}
                </p>
                <h3 className="font-display text-3xl uppercase">{group.title}</h3>
                <ul className="mt-6 space-y-3">
                  {group.items.map((item, j) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + j * 0.06 }}
                      className="flex items-center gap-3 text-sm text-foreground/80"
                    >
                      <span className="h-px w-4 bg-primary" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
    >
      <button
        aria-label="Close"
        className="absolute right-6 top-6 rounded-full border border-foreground/30 p-2 text-foreground hover:border-primary hover:text-primary"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </button>
      <motion.img
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        src={src}
        alt={alt}
        className="max-h-[85vh] max-w-[90vw] object-contain"
      />
    </motion.div>
  );
}

function Experience() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section id="experience" className="relative border-t border-border px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              Marketing Lead <span className="text-primary">— Eyanod.</span>
            </>
          }
        />

        <div className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <div className="sticky top-28 border-l-2 border-primary pl-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                March 2024 — Present
              </p>
              <h3 className="mt-3 font-display text-3xl uppercase">Eyanod Global Services</h3>
              <p className="mt-3 text-sm uppercase tracking-widest text-primary">
                Marketing Lead
              </p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-7" delay={0.1}>
            <ul className="space-y-4 text-base leading-relaxed text-foreground/80 md:text-lg">
              {[
                "Develop marketing strategies to increase brand awareness in the renewable energy space.",
                "Create educational renewable-energy content that simplifies technical concepts.",
                "Design campaign graphics using Canva and Photoshop.",
                "Manage social media content planning, scheduling and publishing.",
                "Support public sustainability campaigns and community engagement.",
                "Collaborate cross-functionally to translate complex ideas into accessible visuals.",
              ].map((r, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="flex gap-4"
                >
                  <span className="mt-2 h-px w-6 shrink-0 bg-primary" />
                  <span>{r}</span>
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span className="mr-3 inline-block h-px w-10 bg-primary align-middle" />
            Selected Eyanod Graphics
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {EYANOD_GALLERY.map((img, i) => (
              <motion.button
                key={img.src}
                type="button"
                onClick={() => setLightbox(img)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                className="group relative aspect-[4/5] overflow-hidden border border-border bg-card"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  width={1120}
                  height={1400}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute bottom-3 left-3 right-3 text-left text-[11px] uppercase tracking-widest text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View
                </span>
              </motion.button>
            ))}
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {lightbox && <Lightbox {...lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="relative border-t border-border px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Featured Work"
          title={
            <>
              Selected <span className="text-primary">projects.</span>
            </>
          }
        />

        <div className="space-y-6 md:space-y-10">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="group relative grid gap-6 border border-border bg-card p-5 transition-all duration-500 hover:border-primary md:grid-cols-12 md:gap-10 md:p-8">
                <div className="relative overflow-hidden md:col-span-7">
                  <div className="aspect-[4/3] overflow-hidden bg-background md:aspect-[16/10]">
                    <img
                      src={p.image}
                      alt={`${p.title} preview`}
                      loading="lazy"
                      width={1280}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-6 md:col-span-5">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-primary">
                      0{i + 1} — {p.role}
                    </p>
                    <h3 className="mt-4 font-display text-3xl uppercase md:text-4xl">
                      {p.title}
                    </h3>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.tools.map((t) => (
                        <span
                          key={t}
                          className="border border-border px-3 py-1 text-[11px] uppercase tracking-widest text-foreground/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  {p.link && (
                    <a
                      href={p.link}
                      className="inline-flex items-center gap-2 self-start border-b border-foreground/40 pb-1 text-sm uppercase tracking-widest transition-colors hover:border-primary hover:text-primary"
                    >
                      Figma Link <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Social() {
  const socials = [
    { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/1Fuh9nzTac/?mibextid=wwXIfr" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/eyanod_global_service_limited" },
    { icon: Music2, label: "TikTok", href: "https://www.tiktok.com/@eyanod_global_service" },
  ];
  return (
    <section id="social" className="relative border-t border-border px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Social Media Management"
          title={
            <>
              Growing <span className="text-primary">Eyanod</span> online.
            </>
          }
        />
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <p className="text-lg leading-relaxed text-foreground/85">
              As Marketing Lead I run content planning, graphic design, educational content
              creation and brand awareness campaigns across Eyanod's social channels — building a
              consistent voice for clean energy in Nigeria.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Content Planning", "Graphic Design", "Educational Content", "Brand Campaigns", "Community"].map(
                (t) => (
                  <span
                    key={t}
                    className="border border-border px-4 py-2 text-xs uppercase tracking-widest text-foreground/75"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow Eyanod on ${s.label}`}
                  className="group flex items-center justify-between border border-border bg-card p-6 transition-all hover:border-primary"
                >
                  <span className="flex items-center gap-4">
                    <s.icon className="h-6 w-6 text-primary" />
                    <span className="font-display text-2xl uppercase">{s.label}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Tools() {
  return (
    <section id="tools" className="relative border-t border-border px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Toolkit"
          title={
            <>
              Tools of the <span className="text-primary">trade.</span>
            </>
          }
        />
        <div className="grid grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-3 lg:grid-cols-4">
          {TOOLS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="group flex aspect-[3/2] flex-col items-center justify-center gap-3 bg-card p-6 transition-colors hover:bg-secondary"
            >
              <t.icon className="h-7 w-7 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 sm:h-8 sm:w-8" />
              <span className="text-center font-display text-lg uppercase text-foreground sm:text-xl">
                {t.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Hi Odion,%0D%0A%0D%0A${encodeURIComponent(form.message)}%0D%0A%0D%0A— ${encodeURIComponent(
      form.name,
    )} (${encodeURIComponent(form.email)})`;
    window.location.href = `mailto:odionohitanagbonta@gmail.com?subject=${encodeURIComponent(
      "Portfolio inquiry from " + (form.name || "your website"),
    )}&body=${body}`;
  };

  return (
    <section id="contact" className="relative border-t border-border px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Let's build <span className="text-primary">something.</span>
            </>
          }
        />

        <div className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="text-lg leading-relaxed text-foreground/85">
              Open to marketing, content and design collaborations. Reach out and let's talk.
            </p>
            <ul className="mt-10 space-y-5">
              <li className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Location</p>
                  <p className="mt-1 text-lg">Abuja, Nigeria</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Email</p>
                  <a
                    href="mailto:odionohitanagbonta@gmail.com"
                    className="mt-1 block text-lg hover:text-primary"
                  >
                    odionohitanagbonta@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Phone className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Phone / WhatsApp</p>
                  <a href="tel:+2349037186913" className="mt-1 block text-lg hover:text-primary">
                    +234 903 718 6913
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="https://wa.me/2349037186913"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Chat on WhatsApp <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="/assets/Odion-Ohitanagbonta-Resume.pdf"
                download="Odion-Ohitanagbonta-Resume.pdf"
                className="inline-flex items-center gap-2 border border-foreground/30 px-6 py-3 text-xs uppercase tracking-widest transition-colors hover:border-foreground"
              >
                <Download className="h-4 w-4" /> Download Resume
              </a>
            </div>
          </Reveal>

          <Reveal className="md:col-span-7" delay={0.1}>
            <form onSubmit={onSubmit} className="border border-border bg-card p-6 md:p-10">
              <div className="grid gap-5">
                <label className="block">
                  <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    Name
                  </span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-2 w-full border-b border-border bg-transparent py-3 text-lg outline-none transition-colors focus:border-primary"
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-2 w-full border-b border-border bg-transparent py-3 text-lg outline-none transition-colors focus:border-primary"
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    Message
                  </span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="mt-2 w-full resize-none border-b border-border bg-transparent py-3 text-lg outline-none transition-colors focus:border-primary"
                  />
                </label>
                <button
                  type="submit"
                  className="group mt-4 inline-flex items-center justify-center gap-3 self-start bg-primary px-7 py-4 text-sm uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90"
                >
                  Send Message
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 text-xs uppercase tracking-widest text-muted-foreground md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Odion Ohitanagbonta Favour</p>
        <p>Abuja — Nigeria</p>
      </div>
    </footer>
  );
}

function Index() {
  useLenis();
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Work />
        <Social />
        <Tools />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}