import { useRef, useState } from "react";
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

  // Reveal thresholds for 200vh track
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

      {/* Pinned Scroll Manifesto Section - 200vh for one-scroll-one-line */}
      <section
        ref={containerRef}
        className="relative bg-background z-10"
        style={{ height: "200vh" }}
      >
        {/* Sticky Content Container - Locked to viewport, vertically centered */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden w-full px-4 md:px-8">
          {/* Stacked Text - Bento typographic grid, centered */}
          <div 
            className="flex flex-col items-center gap-0 w-full max-w-[95vw]" 
            style={{ lineHeight: "0.85" }}
          >
            {/* Line 1: "THE INTERNET" (small) + "IS DEAF." (huge) */}
            <BentoLine
              isRevealed={maxProgress >= revealThresholds[0]}
              scrollProgress={scrollYProgress}
              revealAt={revealThresholds[0]}
              isActive={maxProgress >= revealThresholds[0] && maxProgress < revealThresholds[1]}
            >
              <div className="flex items-baseline justify-center gap-2 md:gap-4 flex-wrap">
                <span 
                  className="font-body font-medium uppercase text-muted-foreground/70"
                  style={{ fontSize: "clamp(1rem, 3vw, 2.5rem)" }}
                >
                  THE INTERNET
                </span>
                <span 
                  className="font-display font-bold uppercase text-foreground"
                  style={{ fontSize: "clamp(2.5rem, 13vw, 12rem)", letterSpacing: "-0.02em" }}
                >
                  IS DEAF.
                </span>
              </div>
            </BentoLine>

            {/* Line 2: "CLARITY" (massive, nearly full width) */}
            <BentoLine
              isRevealed={maxProgress >= revealThresholds[1]}
              scrollProgress={scrollYProgress}
              revealAt={revealThresholds[1]}
              isActive={maxProgress >= revealThresholds[1] && maxProgress < revealThresholds[2]}
            >
              <span 
                className="font-display font-bold uppercase text-foreground block text-center"
                style={{ 
                  fontSize: "clamp(3rem, 18vw, 16rem)", 
                  letterSpacing: "-0.03em",
                  lineHeight: "0.8"
                }}
              >
                CLARITY
              </span>
            </BentoLine>

            {/* Line 3: "IS THE ONLY" (small) + "LANGUAGE" (large) */}
            <BentoLine
              isRevealed={maxProgress >= revealThresholds[2]}
              scrollProgress={scrollYProgress}
              revealAt={revealThresholds[2]}
              isActive={maxProgress >= revealThresholds[2] && maxProgress < revealThresholds[3]}
            >
              <div className="flex items-baseline justify-center gap-2 md:gap-4 flex-wrap">
                <span 
                  className="font-body font-medium uppercase text-muted-foreground/70"
                  style={{ fontSize: "clamp(0.875rem, 3vw, 2.5rem)" }}
                >
                  IS THE ONLY
                </span>
                <span 
                  className="font-display font-bold uppercase text-foreground"
                  style={{ fontSize: "clamp(2rem, 10vw, 9rem)", letterSpacing: "-0.02em" }}
                >
                  LANGUAGE.
                </span>
              </div>
            </BentoLine>

            {/* Line 4: "I ENGINEER" (small) + "OBSESSION" (huge, gold, italic) */}
            <BentoLine
              isRevealed={maxProgress >= revealThresholds[3]}
              scrollProgress={scrollYProgress}
              revealAt={revealThresholds[3]}
              isActive={maxProgress >= revealThresholds[3]}
            >
              <div className="flex items-baseline justify-center gap-2 md:gap-4 flex-wrap">
                <span 
                  className="font-body font-medium uppercase text-muted-foreground/70"
                  style={{ fontSize: "clamp(0.875rem, 3vw, 2.5rem)" }}
                >
                  I ENGINEER
                </span>
                <span 
                  className="font-display font-bold italic uppercase text-gold"
                  style={{ fontSize: "clamp(2.5rem, 14vw, 13rem)", letterSpacing: "-0.02em" }}
                >
                  OBSESSION.
                </span>
              </div>
            </BentoLine>
          </div>
        </div>
      </section>
    </>
  );
};

// Bento Line Component with mask reveal
interface BentoLineProps {
  children: React.ReactNode;
  isRevealed: boolean;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  revealAt: number;
  isActive: boolean;
}

const BentoLine = ({ children, isRevealed, scrollProgress, revealAt, isActive }: BentoLineProps) => {
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
      className="overflow-hidden w-full"
      style={{ 
        visibility: isRevealed ? "visible" : "hidden",
      }}
    >
      <motion.div
        className="origin-center"
        style={{
          y: isRevealed ? 0 : y,
          opacity: isActive ? 1 : 0.4,
          scale: isActive ? 1 : 0.98,
          transition: "opacity 0.6s ease, scale 0.6s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ManifestoSection;
