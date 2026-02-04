import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const ManifestoSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const strapText = "• DIGITAL IDENTITY • VISUAL IMPACT • ENGINEER ATTENTION • ";

  // Track scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Each line reveals and stays - accumulation effect
  // Line appears at threshold, then dims when next line becomes active
  const line1Progress = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const line2Progress = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const line3Progress = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const line4Progress = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);

  // Active state - dims to 0.3 when next line appears
  const line1Active = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 1, 0]);
  const line2Active = useTransform(scrollYProgress, [0.2, 0.4, 0.5], [0, 1, 0]);
  const line3Active = useTransform(scrollYProgress, [0.45, 0.65, 0.75], [0, 1, 0]);
  const line4Active = useTransform(scrollYProgress, [0.7, 0.9, 1], [0, 1, 1]);

  const beats = [
    { text: "THE INTERNET IS DEAF.", color: "text-muted-foreground" },
    { text: "CLARITY IS THE ONLY LANGUAGE.", color: "text-foreground" },
    { text: "I DON'T JUST DESIGN.", color: "text-muted-foreground" },
    { text: "I ENGINEER OBSESSION.", color: "text-gold" },
  ];

  const lineTransforms = [
    { progress: line1Progress, active: line1Active },
    { progress: line2Progress, active: line2Active },
    { progress: line3Progress, active: line3Active },
    { progress: line4Progress, active: line4Active },
  ];

  return (
    <>
      {/* X-Shaped Marquee Separator - Natural scroll behavior */}
      <div className="relative h-28 md:h-36 overflow-hidden bg-background">
        {/* Strap A - Rotated -6deg, moves left */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[200vw] h-12 md:h-14 bg-plum-shadow -rotate-[6deg] -translate-y-[calc(50%+15px)] group"
        >
          <div className="flex whitespace-nowrap animate-marquee-left hover:[animation-play-state:paused] active:[animation-play-state:paused]">
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className="font-display italic text-lg md:text-xl text-gold/80 mx-2"
              >
                {strapText}
              </span>
            ))}
          </div>
        </div>

        {/* Strap B - Rotated +6deg, moves right */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[200vw] h-12 md:h-14 bg-plum-shadow rotate-[6deg] translate-y-[calc(-50%+15px)] group"
        >
          <div className="flex whitespace-nowrap animate-marquee-right hover:[animation-play-state:paused] active:[animation-play-state:paused]">
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className="font-display italic text-lg md:text-xl text-foreground/70 mx-2"
              >
                {strapText}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pinned Scroll Manifesto Section - Reduced to 200vh for snappier feel */}
      <section
        ref={containerRef}
        className="relative bg-background"
        style={{ height: "200vh" }}
      >
        {/* Sticky Content Container - Reduced padding */}
        <div className="sticky top-0 h-screen flex items-center overflow-hidden py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            {/* Stacked Text - Left Aligned, Tight Spacing */}
            <div className="flex flex-col items-start gap-2 md:gap-3 lg:gap-4">
              {beats.map((beat, index) => (
                <AccumulatingLine
                  key={index}
                  text={beat.text}
                  colorClass={beat.color}
                  progress={lineTransforms[index].progress}
                  active={lineTransforms[index].active}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Separate component for cleaner transform logic
interface AccumulatingLineProps {
  text: string;
  colorClass: string;
  progress: MotionValue<number>;
  active: MotionValue<number>;
}

const AccumulatingLine = ({ text, colorClass, progress, active }: AccumulatingLineProps) => {
  // Opacity: 0 -> 1 as it appears, then dims to 0.3 when inactive
  const opacity = useTransform(
    [progress, active] as MotionValue<number>[],
    ([p, a]: number[]) => {
      if (p < 0.1) return 0; // Not yet visible
      return a > 0.5 ? 1 : 0.3; // Active = full, inactive = dimmed
    }
  );

  // Scale: starts at 0.9, becomes 1 when active, shrinks to 0.95 when inactive
  const scale = useTransform(
    [progress, active] as MotionValue<number>[],
    ([p, a]: number[]) => {
      if (p < 0.1) return 0.9;
      return a > 0.5 ? 1 : 0.95;
    }
  );

  // Y position: slides up from 40px as it reveals
  const y = useTransform(progress, [0, 1], [40, 0]);

  // Blur: starts blurry, becomes sharp
  const blur = useTransform(progress, [0, 0.5, 1], [8, 2, 0]);

  return (
    <motion.h2
      className={`font-body font-black text-[10vw] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tight uppercase ${colorClass} origin-left`}
      style={{
        opacity,
        scale,
        y,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
    >
      {text}
    </motion.h2>
  );
};

export default ManifestoSection;
