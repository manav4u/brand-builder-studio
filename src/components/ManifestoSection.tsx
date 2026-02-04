import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const ManifestoSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const strapText = "• DIGITAL IDENTITY • VISUAL IMPACT • ENGINEER ATTENTION • ";
  
  // Track maximum scroll progress for one-way latch
  const [maxProgress, setMaxProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Update max progress (one-way latch)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > maxProgress) {
      setMaxProgress(latest);
    }
  });

  const beats = [
    { text: "THE INTERNET IS DEAF.", color: "text-muted-foreground" },
    { text: "CLARITY IS THE ONLY LANGUAGE.", color: "text-foreground" },
    { text: "I DON'T JUST DESIGN.", color: "text-muted-foreground" },
    { text: "I ENGINEER OBSESSION.", color: "text-gold" },
  ];

  // Faster reveal thresholds for 250vh track
  const revealThresholds = [0.15, 0.35, 0.55, 0.75];

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

      {/* Pinned Scroll Manifesto Section - 250vh for faster scroll */}
      <section
        ref={containerRef}
        className="relative bg-background"
        style={{ height: "250vh" }}
      >
        {/* Sticky Content Container - Locked to viewport, vertically centered */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            {/* Stacked Text - Massive typography, left aligned */}
            <div className="flex flex-col items-start gap-0" style={{ lineHeight: 1.0 }}>
              {beats.map((beat, index) => (
                <MaskRevealLine
                  key={index}
                  text={beat.text}
                  colorClass={beat.color}
                  isRevealed={maxProgress >= revealThresholds[index]}
                  scrollProgress={scrollYProgress}
                  revealAt={revealThresholds[index]}
                  isActive={
                    maxProgress >= revealThresholds[index] && 
                    (index === beats.length - 1 || maxProgress < revealThresholds[index + 1])
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Mask Reveal Line Component
interface MaskRevealLineProps {
  text: string;
  colorClass: string;
  isRevealed: boolean;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  revealAt: number;
  isActive: boolean;
}

const MaskRevealLine = ({ text, colorClass, isRevealed, scrollProgress, revealAt, isActive }: MaskRevealLineProps) => {
  // Calculate reveal progress within the reveal window
  const revealProgress = useTransform(
    scrollProgress,
    [revealAt - 0.1, revealAt],
    [0, 1]
  );

  // Y translation for mask reveal (100% to 0%)
  const y = useTransform(revealProgress, [0, 1], ["100%", "0%"]);

  return (
    <div 
      className="overflow-hidden"
      style={{ 
        visibility: isRevealed ? "visible" : "hidden",
      }}
    >
      <motion.h2
        className={`font-body font-black tracking-tight uppercase ${colorClass} origin-left`}
        style={{
          fontSize: "clamp(2rem, 12vh, 10rem)",
          y: isRevealed ? 0 : y,
          opacity: isActive ? 1 : 0.35,
          scale: isActive ? 1 : 0.97,
          lineHeight: 1.0,
          transition: "opacity 0.6s ease, scale 0.6s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {text}
      </motion.h2>
    </div>
  );
};

export default ManifestoSection;
