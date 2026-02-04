import { useRef } from "react";
import { motion } from "framer-motion";

const ManifestoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const strapText = "• DIGITAL IDENTITY • VISUAL IMPACT • ENGINEER ATTENTION • ";

  // Text reveal animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const lineVariants = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <>
      {/* X-Shaped Marquee Separator - Between Hero and Manifesto */}
      <div className="relative h-24 md:h-32 overflow-hidden bg-background">
        {/* Strap A - Rotated -3deg, moves left */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-12 md:h-14 bg-plum-shadow -rotate-[3deg] group hover:[animation-play-state:paused] active:[animation-play-state:paused]">
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

        {/* Strap B - Rotated +3deg, moves right */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-12 md:h-14 bg-plum-shadow rotate-[3deg] group hover:[animation-play-state:paused] active:[animation-play-state:paused]">
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

      {/* Manifesto Section - Bold Stacked Typography */}
      <section
        ref={sectionRef}
        className="relative min-h-screen bg-background overflow-hidden py-20 md:py-32"
      >
        <motion.div
          className="container mx-auto px-6 md:px-12 lg:px-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Stacked Text - Left Aligned */}
          <div className="flex flex-col items-start gap-2 md:gap-4">
            {/* Line 1: IN A DIGITAL OCEAN */}
            <motion.h2
              variants={lineVariants}
              className="font-body font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-none tracking-tight uppercase"
            >
              IN A DIGITAL OCEAN
            </motion.h2>

            {/* Line 2: OF INFINITE NOISE */}
            <motion.h2
              variants={lineVariants}
              className="font-body font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-none tracking-tight uppercase"
            >
              OF INFINITE NOISE
            </motion.h2>

            {/* Line 3: CLARITY IS POWER. - Extra Large, Gold */}
            <motion.h2
              variants={lineVariants}
              className="font-body font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-gold leading-none tracking-tight uppercase mt-4 md:mt-8"
            >
              CLARITY IS POWER.
            </motion.h2>

            {/* Line 4: I ENGINEER ATTENTION. - Extra Large, White */}
            <motion.h2
              variants={lineVariants}
              className="font-body font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-foreground leading-none tracking-tight uppercase"
            >
              I ENGINEER ATTENTION.
            </motion.h2>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default ManifestoSection;
