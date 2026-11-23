import { useEffect, useState } from "react";
import { CopyButton } from "@/components/unlumen-ui/copy";
import { CursorImageTrail } from "@/components/unlumen-ui/cursor-image-trail";
import { HoverExpand } from "@/components/unlumen-ui/hover-expand";
import { MagneticButton } from "@/components/unlumen-ui/magnetic-button";
import { MotionAccordion } from "@/components/unlumen-ui/motion-faqs-accordion";
import { OrbitalImageWheel } from "@/components/unlumen-ui/orbital-image-wheel";
import { SideBySideSlide } from "@/components/unlumen-ui/side-by-side-slide";
import { TextReveal } from "@/components/unlumen-ui/text-reveal";
import { Tilt } from "@/components/unlumen-ui/tilt";
import { CODES, FAQ, INGREDIENTS, LINKS, MILESTONES, POSES, RECORD, ROUTE, img, ordinal } from "@/data";

const H2 = "font-display text-[clamp(2.25rem,5.2vw,4.75rem)] leading-[1.02]";
const link =
  "underline decoration-1 underline-offset-4 transition-[text-decoration-thickness] hover:decoration-2";
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Road() {
  return (
    <section className="bg-paper py-[clamp(72px,11vw,168px)]">
      <div className="wrap">
        <TextReveal
          text="He made himself a promise and kept it for eleven years. It took him from İzmir to the biggest stage in the sport."
          className="font-display max-w-[24ch] text-[clamp(2.1rem,5.4vw,5rem)] !leading-[1.06]"
          staggerDelay={0.04}
        />
        <ol className="mt-[clamp(48px,7vw,104px)] grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {ROUTE.map((r) => (
            <li key={r.place} className="border-t-4 border-deep pt-4">
              <h3 className="font-display display-small text-3xl">{r.place}</h3>
              <p className="mt-2 max-w-[30ch] leading-relaxed">{r.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-12 max-w-[60ch] leading-relaxed">
          Hear him tell it on{" "}
          <a className={link} href={LINKS.hulkcast} {...ext}>
            HulkCast, season 2 episode 8
          </a>
          : how he started, moving abroad, injuries, and how the sport differs between Turkey and
          Australia.
        </p>
      </div>
    </section>
  );
}

export function RoomStage() {
  return (
    <section className="on-dark bg-room py-[clamp(64px,9vw,136px)]">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <div>
          <h2 className={H2}>The room, then the stage.</h2>
          <p className="mt-6 max-w-[42ch] text-lg leading-relaxed">
            One pose, two lights. On the left, a hotel room a few days out from the Olympia. On the
            right, the same front double biceps on the Olympia stage.
          </p>
          <p className="mt-4 max-w-[42ch] text-lg leading-relaxed text-flare">
            Drag across the photo to go from one to the other.
          </p>
        </div>
        <SideBySideSlide
          beforeImage={img("room")}
          afterImage={img("stage")}
          beforeAlt="hotel room, days out"
          afterAlt="Mr. Olympia 2026 stage"
          initialPosition={50}
          dividerColor="#edf2f4"
          handleColor="#edf2f4"
          dividerShadow="none"
          handleSize={44}
          cursor="col-resize"
          className="aspect-[4/5] w-full max-w-[680px] justify-self-end"
        />
      </div>
    </section>
  );
}

function useWide() {
  const [wide, setWide] = useState(() => window.matchMedia("(min-width: 768px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setWide(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
}

export function Posing() {
  const wide = useWide();
  return (
    <section id="posing" className="on-dark bg-deep">
      <div className="wrap pt-[clamp(64px,9vw,136px)]">
        <h2 className={H2}>Posing is the sport.</h2>
        <p className="mt-5 max-w-[46ch] text-lg leading-relaxed">
          Classic Physique is judged standing still. Scroll to turn the wheel, or pick a pose by
          name.
        </p>
      </div>
      <OrbitalImageWheel
        key={wide ? "wide" : "narrow"}
        images={POSES}
        turns={1}
        blur={3}
        dim={45}
        brightnessBoost={8}
        itemWidth={wide ? 340 : 230}
        itemHeight={wide ? 453 : 307}
        wheelSize={wide ? 1800 : 1120}
        cropRatio={wide ? 0.73 : 0.58}
        scrollSensitivity={1}
        captionOffset={wide ? 7 : 12}
        scrollLength={420}
      />
    </section>
  );
}

export function Record() {
  return (
    <section id="record" className="bg-ice py-[clamp(72px,10vw,152px)]">
      <div className="wrap">
        <h2 className={H2}>The record</h2>
        <div className="mt-10">
          <HoverExpand items={MILESTONES} collapsedHeight={96} expandedHeight={440} defaultIndex={1} />
        </div>

        <div className="mt-[clamp(56px,7vw,104px)] grid gap-x-12 gap-y-14 lg:grid-cols-3">
          {RECORD.map((season) => (
            <div key={season.year}>
              <h3 className="text-xl font-semibold">{season.year} season</h3>
              <ol className="mt-4">
                {season.shows.map((s) => (
                  <li
                    key={s.name}
                    className={`grid grid-cols-[5.25rem_1fr] items-center gap-4 border-t border-deep/25 py-4 ${s.place === 1 ? "-mx-3 border-transparent bg-tan px-3" : ""}`}
                  >
                    <span className="font-display display-small text-4xl leading-none whitespace-nowrap">
                      {s.place}
                      <span className="text-xl">{ordinal(s.place)}</span>
                    </span>
                    <span>
                      <span className="block text-lg leading-snug font-semibold">{s.name}</span>
                      {s.note && <span className="block">{s.note}</span>}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <p className="mt-10">All results are IFBB Pro League, Men’s Classic Physique.</p>
      </div>
    </section>
  );
}

export function Coaching() {
  return (
    <section id="coaching" className="bg-paper">
      <div className="grid lg:grid-cols-2">
        <img
          src={img("gym")}
          alt="Murat on a dark gym floor in a Day One T-shirt, seen from behind"
          loading="lazy"
          className="h-[110vw] w-full object-cover object-[50%_20%] lg:sticky lg:top-0 lg:h-screen"
        />
        <div className="flex flex-col justify-center px-[max(20px,5vw)] py-[clamp(64px,8vw,120px)]">
          <h2 className={H2}>Coached by a man who still gets judged.</h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed">
            Coaching by MCK is premium one-to-one online coaching. You work with Murat directly, an
            active IFBB Pro who answers to a coach of his own.
          </p>
          <div className="mt-8">
            <MagneticButton href={LINKS.coaching} size="lg">
              Start coaching
            </MagneticButton>
          </div>
          <MotionAccordion items={FAQ} className="mt-12 border-t border-deep/20" />
        </div>
      </div>
    </section>
  );
}

export function Partners() {
  return (
    <section id="partners" className="on-dark bg-room py-[clamp(72px,10vw,152px)]">
      <div className="wrap">
        <div className="grid items-center gap-12 lg:grid-cols-[6fr_5fr] lg:gap-20">
          <div>
            <h2 className={H2}>He helped make what he takes.</h2>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed">
              Day One Performance has sponsored Murat for more than three years. For CARD1O, its
              heart-health supplement, he worked on the ingredient selection and the final formula.
              It is made in Day One’s Melbourne facility.
            </p>
            <h3 className="mt-8 text-lg font-semibold">Ten declared ingredients</h3>
            <p className="mt-1 max-w-[52ch] text-lg leading-relaxed text-ice">
              {INGREDIENTS.join(", ")}.
            </p>
            <div className="mt-8">
              <MagneticButton href={LINKS.card1o} size="lg">
                See CARD1O
              </MagneticButton>
            </div>
          </div>
          <Tilt rotationFactor={7} className="w-full max-w-[520px] justify-self-end">
            <img
              src={img("card1o")}
              alt="Murat holding a bottle of CARD1O toward the camera"
              loading="lazy"
              className="block aspect-[4/5] w-full object-cover"
            />
          </Tilt>
        </div>

        <div className="mt-[clamp(56px,8vw,120px)]">
          <h3 className="font-display text-[clamp(1.75rem,3vw,2.75rem)]">Discount codes</h3>
          <ul className="mt-6">
            {CODES.map((c) => (
              <li
                key={c.brand}
                className="flex items-center justify-between gap-4 border-t border-paper/25 py-4"
              >
                <a className={`min-w-0 text-lg font-medium ${link}`} href={c.href} {...ext}>
                  {c.brand}
                </a>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="font-display display-small text-2xl select-all">{c.code}</span>
                  <CopyButton
                    content={c.code}
                    aria-label={`Copy code ${c.code} for ${c.brand}`}
                    className="size-11 rounded-none"
                  />
                </span>
              </li>
            ))}
            <li className="border-y border-paper/25 py-4 text-lg">
              Gym:{" "}
              <a className={`font-medium ${link}`} href={LINKS.onegym} {...ext}>
                OneGym Port Melbourne
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

const TRAIL = ["t1", "t2", "t3", "t4", "t5", "t6", "t7"].map((n) => (
  <img key={n} src={img(n)} alt="" />
));

export function Finale() {
  return (
    <footer className="bg-tan text-deep">
      <CursorImageTrail items={TRAIL} itemSize={170} trailLength={6} spawnDistance={110} rotationRange={8}>
        <div className="wrap pointer-events-none relative z-10 flex flex-col md:min-h-[min(92vh,820px)] justify-between gap-16 pt-[clamp(72px,10vw,140px)] pb-10">
          <div>
            <p className="font-display max-w-[11ch] text-[clamp(3.25rem,11.5vw,11rem)] leading-[0.94]">
              Your turn under the lights.
            </p>
            <MagneticButton
              href={LINKS.coaching}
              size="lg"
              className="pointer-events-auto mt-10"
            >
              Start coaching
            </MagneticButton>
          </div>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <ul className="pointer-events-auto flex flex-wrap gap-x-7 gap-y-3 text-lg font-medium">
              <li><a className={link} href={LINKS.instagram} {...ext}>Instagram</a></li>
              <li><a className={link} href={LINKS.youtube} {...ext}>YouTube</a></li>
              <li><a className={link} href={LINKS.coaching} {...ext}>Linktree</a></li>
            </ul>
            <p className="max-w-[46ch] text-sm leading-relaxed md:text-right">
              Photos: Fractured Glass Images, Jeff Binns for NPC News Online, J. Dashi, and Murat’s
              own.
            </p>
          </div>
        </div>
      </CursorImageTrail>
    </footer>
  );
}
