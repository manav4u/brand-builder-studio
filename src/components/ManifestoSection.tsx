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

  // "Permanent Ink" - once revealed, stays revealed (clamp at 1)
  const line1Revealed = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const line2Revealed = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const line3Revealed = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const line4Revealed = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);

  // Active state for dimming - tracks which line is currently "active"
  const line1Active = useTransform(scrollYProgress, [0, 0.12, 0.2], [0, 1, 0]);
  const line2Active = useTransform(scrollYProgress, [0.15, 0.35, 0.45], [0, 1, 0]);
  const line3Active = useTransform(scrollYProgress, [0.4, 0.6, 0.7], [0, 1, 0]);
  const line4Active = useTransform(scrollYProgress, [0.65, 0.85, 1], [0, 1, 1]);

  const beats = [
    { text: "THE INTERNET IS DEAF.", color: "text-muted-foreground" },
    { text: "CLARITY IS THE ONLY LANGUAGE.", color: "text-foreground" },
    { text: "I DON'T JUST DESIGN.", color: "text-muted-foreground" },
    { text: "I ENGINEER OBSESSION.", color: "text-gold" },
  ];

  const lineTransforms = [
    { revealed: line1Revealed, active: line1Active },
    { revealed: line2Revealed, active: line2Active },
    { revealed: line3Revealed, active: line3Active },
    { revealed: line4Revealed, active: line4Active },
  ];

  return (
    <>
      {/* X-Shaped Marquee Separator */}
      <div className="relative h-24 md:h-28 overflow-hidden bg-background">
        {/* Strap A - Rotated -6deg, moves left */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[200vw] h-10 md:h-12 bg-plum-shadow -rotate-[6deg] -translate-y-[calc(50%+12px)]"
        >
          <div className="flex whitespace-nowrap animate-marquee-left hover:[animation-play-state:paused] active:[animation-play-state:paused]">
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className="font-display italic text-base md:text-lg text-gold/80 mx-2"
              >
                {strapText}
              </span>
            ))}
          </div>
        </div>

        {/* Strap B - Rotated +6deg, moves right */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[200vw] h-10 md:h-12 bg-plum-shadow rotate-[6deg] translate-y-[calc(-50%+12px)]"
        >
          <div className="flex whitespace-nowrap animate-marquee-right hover:[animation-play-state:paused] active:[animation-play-state:paused]">
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className="font-display italic text-base md:text-lg text-foreground/70 mx-2"
              >
                {strapText}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pinned Scroll Manifesto Section */}
      <section
        ref={containerRef}
        className="relative bg-background"
        style={{ height: "180vh" }}
      >
        {/* Sticky Content Container - Centered vertically */}
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            {/* Stacked Text - Left Aligned, Tight Spacing */}
            <div className="flex flex-col items-start gap-0.5 md:gap-1 lg:gap-1.5">
              {beats.map((beat, index) => (
                <AccumulatingLine
                  key={index}
                  text={beat.text}
                  colorClass={beat.color}
                  revealed={lineTransforms[index].revealed}
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
  revealed: MotionValue<number>;
  active: MotionValue<number>;
}

const AccumulatingLine = ({ text, colorClass, revealed, active }: AccumulatingLineProps) => {
  // "Permanent Ink" - once revealed (>0.1), always visible
  // Opacity: 0 until revealed, then 1 when active, 0.3 when inactive
  const opacity = useTransform(
    [revealed, active] as MotionValue<number>[],
    ([r, a]: number[]) => {
      if (r < 0.1) return 0; // Not yet revealed
      // Smooth interpolation between active (1) and inactive (0.35)
      return 0.35 + (a * 0.65);
    }
  );

  // Scale: 1 when active, 0.97 when inactive (subtler)
  const scale = useTransform(
    [revealed, active] as MotionValue<number>[],
    ([r, a]: number[]) => {
      if (r < 0.1) return 0.98;
      return 0.97 + (a * 0.03);
    }
  );

  // Y position: slides up from 20px as it reveals (crisp entry)
  const y = useTransform(revealed, [0, 1], [20, 0]);

  return (
    <motion.h2
      className={`font-body font-black text-[9vw] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] tracking-tight uppercase ${colorClass} origin-left`}
      style={{
        opacity,
        scale,
        y,
        // Smooth transitions for the dimming effect
        transition: "color 0.8s ease, filter 0.8s ease",
      }}
    >
      {text}
    </motion.h2>
  );
};

export default ManifestoSection;
