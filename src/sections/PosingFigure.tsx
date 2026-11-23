import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { img } from "@/data";

/** Four cutouts from the same stage, registered to one canvas by head and body scale. */
export const HERO_POSES = [1, 2, 3, 4].map((n) => ({
  src: img(`hero-${n}`),
  small: img(`hero-${n}-sm`),
  // The trophy poses are wider than a phone at full size, so they step back a little.
  fit: n >= 3 ? "max-sm:origin-bottom max-sm:translate-x-[1%] max-sm:scale-[0.88]" : "",
}));

const ALT = "Murat Can Karahasanlar posing on stage with the Legion Sports Fest winner's medal";

/** Loads the remaining poses after the first paint; resolves once every pose can be cut to. */
export function usePosesReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let live = true;
    const small = window.matchMedia("(max-width: 767px)").matches;
    Promise.all(
      HERO_POSES.map((p) => {
        const im = new Image();
        im.src = small ? p.small : p.src;
        return im.decode().catch(() => undefined);
      }),
    ).then(() => live && setReady(true));
    return () => {
      live = false;
    };
  }, []);
  return ready;
}

export function PosingFigure({ index, beat, still }: { index: number; beat: number; still: boolean }) {
  return (
    <div className="relative aspect-[2400/1860] h-full">
      {/* Camera flash: one burst behind him on every pose change */}
      <AnimatePresence>
        {beat > 0 && !still && (
          <motion.div
            key={beat}
            aria-hidden
            className="absolute -inset-x-[20%] -top-[10%] bottom-0"
            style={{
              background:
                "radial-gradient(closest-side at 50% 48%, #fff 0%, rgb(255 255 255 / 0.75) 35%, transparent 100%)",
            }}
            initial={{ opacity: 0.95, scale: 0.9 }}
            animate={{ opacity: 0, scale: 1.12 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <div className={still ? "absolute inset-0" : "hero-breathe absolute inset-0"}>
        {HERO_POSES.map((p, i) => {
          const on = i === index;
          return (
            <motion.picture
              key={p.src}
              className="absolute inset-0 block origin-bottom"
              initial={false}
              animate={
                on
                  ? still || beat === 0
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 1, scale: [1.05, 1], filter: ["brightness(1.7)", "brightness(1)"] }
                  : { opacity: 0, scale: 1 }
              }
              transition={{
                opacity: { duration: on ? 0.04 : 0.14 },
                scale: { type: "tween", duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                filter: { duration: 0.7, ease: "easeOut" },
              }}
            >
              <source media="(max-width: 767px)" srcSet={p.small} />
              <img
                src={p.src}
                alt={i === 0 ? ALT : ""}
                width={1920}
                height={1488}
                fetchPriority={i === 0 ? "high" : "low"}
                className={`block h-full w-full max-w-none ${p.fit}`}
              />
            </motion.picture>
          );
        })}

        {/* Stage light travelling over the muscle, masked to the current pose */}
        {!still && (
          <div
            key={`shine-${beat}`}
            aria-hidden
            className={`hero-shine absolute inset-0 ${HERO_POSES[index].fit}`}
            style={{
              maskImage: `url(${HERO_POSES[index].small})`,
              WebkitMaskImage: `url(${HERO_POSES[index].small})`,
            }}
          />
        )}
      </div>
    </div>
  );
}
