import { SideBySideSlide } from "@/components/unlumen-ui/side-by-side-slide";
import { JOURNEYS } from "@/data";

export function Transformations() {
  return (
    <section id="transformations" className="on-dark bg-deep py-[clamp(72px,10vw,152px)]">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="font-display max-w-[14ch] text-[clamp(min(2.25rem,10.2vw),5.2vw,4.75rem)] leading-[1.02]">
            Three transformations, all his own.
          </h2>
          <p className="max-w-[40ch] text-lg leading-relaxed">
            Your coach, in the same pose at two points of the journey.{" "}
            <span className="text-flare">Drag across each photo to compare.</span>
          </p>
        </div>

        <div className="mt-[clamp(40px,5vw,72px)] grid gap-x-5 gap-y-16 md:grid-cols-3 lg:gap-x-8">
          {JOURNEYS.map((j) => (
            <article key={j.title}>
              <SideBySideSlide
                beforeImage={j.before.image}
                afterImage={j.after.image}
                beforeAlt={j.before.label}
                afterAlt={j.after.label}
                initialPosition={j.split}
                dividerColor="#edf2f4"
                handleColor="#edf2f4"
                dividerShadow="none"
                handleSize={40}
                cursor="col-resize"
                className="aspect-[4/5] w-full"
              />
              <div className="mt-3 flex justify-between gap-3 text-sm font-medium">
                <span>{j.before.label}</span>
                <span className="text-right text-flare">{j.after.label}</span>
              </div>
              <h3 className="font-display display-small mt-6 text-3xl leading-tight md:text-2xl lg:text-3xl">{j.title}</h3>
              <p className="mt-2 max-w-[36ch] leading-relaxed">{j.text}</p>
            </article>
          ))}
        </div>

        <p className="mt-14 max-w-[60ch] text-sm leading-relaxed text-ice">
          All photos show Murat. Lighting, stage tan and posing account for part of the difference.
        </p>
      </div>
    </section>
  );
}
