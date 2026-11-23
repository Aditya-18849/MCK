import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Highlight } from "@/components/unlumen-ui/primitives/effects/velocity-highlight";
import { MagneticButton } from "@/components/unlumen-ui/magnetic-button";
import { LINKS } from "@/data";
import { HERO_POSES, PosingFigure, usePosesReady } from "@/sections/PosingFigure";

const NAV = [
  { label: "Thirteen days", href: "#thirteen" },
  { label: "Posing", href: "#posing" },
  { label: "Record", href: "#record" },
  { label: "Partners", href: "#partners" },
];

export function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="wrap flex items-center justify-between py-5">
        <a href="#top" className="font-display text-2xl" aria-label="MCK, back to top">
          MCK
        </a>
        <nav aria-label="Main" className="hidden md:block">
          <Highlight mode="parent" hover click={false} containerClassName="flex" className="bg-deep/10">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                data-value={n.href}
                className="relative z-10 block px-4 py-2 text-[0.95rem] font-medium"
              >
                {n.label}
              </a>
            ))}
          </Highlight>
        </nav>
        <a
          href="#coaching"
          className="text-[0.95rem] font-semibold underline decoration-2 underline-offset-4 hover:decoration-tan"
        >
          Coaching
        </a>
      </div>
    </header>
  );
}

/** How long each pose is held, in ms. */
const HOLD = 3200;

/** Each letter swells from a light to a black weight; a new `beat` replays the flex. */
function FlexWord({ text, beat, step }: { text: string; beat: number; step: number }) {
  return (
    <>
      {Array.from(text).map((ch, i) =>
        ch === " " ? (
          <span key={i}>{" "}</span>
        ) : (
          <span key={i} className="inline-block">
            <span
              key={beat}
              className={beat === 0 ? "flex-in inline-block" : "flex-beat inline-block"}
              style={{ animationDelay: `${i * step}ms` }}
            >
              {ch}
            </span>
          </span>
        ),
      )}
    </>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion() ?? false;
  const inView = useInView(ref, { amount: 0.25 });
  const ready = usePosesReady();
  const [paused, setPaused] = useState(false);
  const [beat, setBeat] = useState(0);
  const index = beat % HERO_POSES.length;
  const still = reduced || paused;

  useEffect(() => {
    if (!ready || still || !inView) return;
    const id = setInterval(() => {
      if (!document.hidden) setBeat((b) => b + 1);
    }, HOLD);
    return () => clearInterval(id);
  }, [ready, still, inView]);

  // Cursor depth: the first name sits behind him, the surname in front.
  const mx = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 70, damping: 18, mass: 0.6 });
  const backX = useTransform(px, (v) => v * 26);
  const figX = useTransform(px, (v) => v * -16);
  const frontX = useTransform(px, (v) => v * -34);

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== "mouse") return;
    mx.set((e.clientX / window.innerWidth - 0.5) * 2);
  };

  // Scroll depth: he grows toward you and the names pull apart.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const backY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "38%"]);
  const figScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.16]);
  const frontY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "-45%"]);

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={onMove}
      onPointerLeave={() => mx.set(0)}
      className="relative isolate flex flex-col overflow-hidden bg-ice lg:block lg:h-[max(640px,min(100svh,58vw))]"
    >
      <h1 className="sr-only">Murat Can Karahasanlar, IFBB Pro Classic Physique</h1>

      <div className="relative h-[128vw] max-h-[820px] overflow-x-clip sm:h-[105vw] sm:max-h-none lg:absolute lg:inset-0 lg:h-auto">
        <motion.div
          aria-hidden
          style={{ x: backX, y: backY }}
          className="font-display absolute inset-x-0 top-[15vw] text-center text-[24vw] leading-none whitespace-nowrap text-deep uppercase sm:top-[8vw] lg:top-[2.6vw] lg:text-[23.5vw]"
        >
          <FlexWord text="Murat" beat={beat} step={70} />
        </motion.div>

        <div className="hero-fade absolute inset-0">
          <motion.div
            style={{ x: figX, scale: figScale, transformOrigin: "50% 100%" }}
            className="absolute inset-x-0 bottom-0 flex h-[88%] justify-center lg:h-[98%]"
          >
            <motion.div
              className="h-full shrink-0"
              initial={reduced ? false : { y: "14%", scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <PosingFigure index={index} beat={beat} still={still} />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          aria-hidden
          style={{ x: frontX, y: frontY }}
          className="font-display absolute inset-x-0 bottom-[-0.06em] text-center text-[7.75vw] leading-none whitespace-nowrap text-deep uppercase"
        >
          <FlexWord text="Can Karahasanlar" beat={0} step={35} />
        </motion.div>
      </div>

      <div className="wrap relative z-20 flex flex-col gap-10 py-10 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-[29.5vw] lg:flex-row lg:items-start lg:justify-between lg:py-0">
        <div className="hero-copy pointer-events-auto max-w-[17rem]">
          <p className="text-xl leading-snug font-medium">
            IFBB Pro, Men’s Classic Physique. One-to-one online coach in Melbourne.
          </p>
          <MagneticButton href={LINKS.coaching} size="lg" className="mt-6">
            Start coaching
          </MagneticButton>
        </div>
        <div className="hero-copy pointer-events-auto max-w-[15rem] lg:text-right">
          <a href={LINKS.olympia} target="_blank" rel="noopener noreferrer" className="group block">
            <span className="font-display block text-6xl leading-none">15th</span>
            <span className="mt-2 block text-lg leading-snug font-medium underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-current">
              2026 Mr. Olympia, Las Vegas
            </span>
          </a>
          {!reduced && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="mt-5 inline-flex cursor-pointer items-center gap-2 py-2 text-base font-semibold underline decoration-transparent underline-offset-4 hover:decoration-current"
            >
              {paused ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
              {paused ? "Play posing" : "Pause posing"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
