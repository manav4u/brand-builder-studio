import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ManifestoSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const strapText = "• DIGITAL IDENTITY • VISUAL IMPACT • ENGINEER ATTENTION • ";

  // Track scroll progress within this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform scroll progress to individual line visibility
  // Line 1: 0-25%, Line 2: 25-50%, Line 3: 50-75%, Line 4: 75-100%
  const line1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.35], [0, 1, 1, 0]);
  const line1Blur = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.35], [10, 0, 0, 10]);
  
  const line2Opacity = useTransform(scrollYProgress, [0.2, 0.35, 0.5, 0.6], [0, 1, 1, 0]);
  const line2Blur = useTransform(scrollYProgress, [0.2, 0.35, 0.5, 0.6], [10, 0, 0, 10]);
  
  const line3Opacity = useTransform(scrollYProgress, [0.45, 0.6, 0.75, 0.85], [0, 1, 1, 0]);
  const line3Blur = useTransform(scrollYProgress, [0.45, 0.6, 0.75, 0.85], [10, 0, 0, 10]);
  
  const line4Opacity = useTransform(scrollYProgress, [0.7, 0.85, 1], [0, 1, 1]);
  const line4Blur = useTransform(scrollYProgress, [0.7, 0.85, 1], [10, 0, 0]);

  const beats = [
    { text: "THE INTERNET IS DEAF.", color: "text-muted-foreground" },
    { text: "CLARITY IS THE ONLY LANGUAGE.", color: "text-foreground" },
    { text: "I DON'T JUST DESIGN.", color: "text-muted-foreground" },
    { text: "I ENGINEER OBSESSION.", color: "text-gold" },
  ];

  const lineTransforms = [
    { opacity: line1Opacity, blur: line1Blur },
    { opacity: line2Opacity, blur: line2Blur },
    { opacity: line3Opacity, blur: line3Blur },
    { opacity: line4Opacity, blur: line4Blur },
  ];

  return (
    <>
      {/* X-Shaped Marquee Separator - Separated with Gap */}
      <div className="relative h-28 md:h-36 overflow-hidden bg-background">
        {/* Strap A - Rotated -6deg, moves left, translated UP */}
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

        {/* Strap B - Rotated +6deg, moves right, translated DOWN */}
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

      {/* Pinned Scroll Manifesto Section - 300vh tall */}
      <section
        ref={containerRef}
        className="relative bg-background"
        style={{ height: "300vh" }}
      >
        {/* Sticky Content Container */}
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            {/* Stacked Text - Left Aligned */}
            <div className="flex flex-col items-start gap-4 md:gap-6">
              {beats.map((beat, index) => (
                <motion.h2
                  key={index}
                  className={`font-body font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight uppercase ${beat.color}`}
                  style={{
                    opacity: lineTransforms[index].opacity,
                    filter: useTransform(
                      lineTransforms[index].blur,
                      (value) => `blur(${value}px)`
                    ),
                  }}
                >
                  {beat.text}
                </motion.h2>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManifestoSection;
