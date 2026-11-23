import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { AnimateDigits } from "@/components/unlumen-ui/animate-digits";
import { MotionSubtitle } from "@/components/unlumen-ui/motion-subtitle";
import ScrollRevealImage from "@/components/unlumen-ui/scroll-reveal-image";
import { img } from "@/data";

const DAYS = 13;
/** Calendar date for a day offset from the Pittsburgh Pro, 17 May 2026. */
const dateFor = (d: number) => `${17 + d} May 2026`;

export function Thirteen() {
  const ref = useRef<HTMLDivElement>(null);
  const [day, setDay] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Hold on day 0 and on day 13 so both results can be read.
    const t = Math.min(1, Math.max(0, (v - 0.15) / 0.6));
    setDay(Math.round(t * DAYS));
  });

  const won = day === DAYS;

  return (
    <section id="thirteen">
      <div ref={ref} className="relative h-[300vh]">
        <motion.div
          animate={{ backgroundColor: won ? "#cf7233" : "#0b1f2a", color: won ? "#0b1f2a" : "#edf2f4" }}
          initial={false}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden py-[clamp(24px,5vh,56px)]"
        >
          <div className="wrap flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <h2 className="font-display max-w-[14ch] text-[clamp(2rem,4.6vw,4.25rem)] leading-[1.02]">
              Eleventh to first, in thirteen days.
            </h2>
            <p className="max-w-[34ch] text-lg leading-relaxed">
              After Pittsburgh he considered pulling out of the next show. He went to Reno anyway.
              It was his twelfth pro contest, and he won it.
            </p>
          </div>

          <div className="wrap flex items-end justify-between gap-6">
            <div className="sr-only" aria-live="polite">
              {won ? "Legion Sports Fest Pro, first place" : "Pittsburgh Pro, eleventh place"}
            </div>
            <div aria-hidden className="font-display -ml-[0.04em] leading-[0.8]">
              <AnimateDigits
                value={won ? "01" : "11"}
                gap={0}
                direction="up"
                enterY={120}
                enterBlur={24}
                enterDamping={18}
                className="text-[clamp(13rem,min(38vw,56vh),34rem)] leading-[0.8]"
              />
            </div>
            <div aria-hidden className="hidden pb-4 text-right md:block">
              <MotionSubtitle
                text={won ? "Legion Sports Fest Pro" : day === 0 ? "Pittsburgh Pro" : "Back to work"}
                className="font-display text-[clamp(1.5rem,3vw,2.75rem)] leading-tight"
              />
              <div className="text-lg tabular-nums">{dateFor(day)}</div>
            </div>
          </div>

          <div className="wrap" aria-hidden>
            <div className="mb-3 flex justify-between text-base font-medium md:hidden">
              <span>{won ? "Legion Sports Fest Pro" : day === 0 ? "Pittsburgh Pro" : "Back to work"}</span>
              <span className="tabular-nums">{dateFor(day)}</span>
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: DAYS + 1 }, (_, i) => (
                <div
                  key={i}
                  className={`h-3 flex-1 transition-opacity duration-300 ${i <= day ? "opacity-100" : "opacity-20"}`}
                  style={{ background: "currentColor" }}
                />
              ))}
            </div>
            <div className="mt-3 flex justify-between text-sm font-medium">
              <span>17 May, Pittsburgh</span>
              <span>30 May, Reno</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-tan pb-[3vw]">
        <ScrollRevealImage
          src={img("legion-win")}
          alt="Murat holding the Legion Sports Fest trophy overhead after winning Men's Classic Physique"
          height="min(86vh, 70vw)"
          fromWidth="46vw"
          toWidth="93vw"
          toRadius="0px"
          innerWidth="95vw"
          fromScale={1.35}
          imageClassName="object-[50%_22%]"
        />
      </div>
    </section>
  );
}
