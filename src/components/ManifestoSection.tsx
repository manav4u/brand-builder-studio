import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ManifestoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Strap 1 moves left as user scrolls down
  const strap1X = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);
  // Strap 2 moves right as user scrolls down
  const strap2X = useTransform(scrollYProgress, [0, 1], ["-10%", "30%"]);

  const strapText = "• DIGITAL IDENTITY • VISUAL IMPACT ";

  // Text reveal animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: 80,
      opacity: 0,
      clipPath: "inset(100% 0% 0% 0%)",
    },
    visible: {
      y: 0,
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-background overflow-hidden py-32 md:py-40"
    >
      {/* Crossed Straps Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Strap 1 - Plum Shadow, rotates -5deg, moves left */}
        <motion.div
          style={{ x: strap1X }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[200vw] py-6 md:py-8 bg-plum-shadow/80 -rotate-[5deg]"
        >
          <div className="flex whitespace-nowrap">
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="font-display italic text-3xl md:text-5xl lg:text-6xl text-white/30 mx-4"
              >
                {strapText}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Strap 2 - Gold, rotates +5deg, moves right */}
        <motion.div
          style={{ x: strap2X }}
          className="absolute top-[55%] left-1/2 -translate-x-1/2 w-[200vw] py-6 md:py-8 bg-gold/90 rotate-[5deg]"
        >
          <div className="flex whitespace-nowrap">
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="font-display italic text-3xl md:text-5xl lg:text-6xl text-background mx-4"
              >
                {strapText}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Kinetic Typography Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 min-h-[80vh] flex flex-col justify-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Masonry-style text layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-8 items-center">
          {/* Top-left small phrase */}
          <motion.div
            variants={wordVariants}
            className="col-span-12 md:col-span-5 lg:col-span-4"
          >
            <p className="font-body text-sm md:text-base lg:text-lg text-lavender/70 leading-relaxed">
              In a digital ocean<br />of infinite noise...
            </p>
          </motion.div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-7 lg:col-span-8" />

          {/* CLARITY IS POWER - Massive centered */}
          <motion.div
            variants={wordVariants}
            className="col-span-12 text-center my-8 md:my-12"
          >
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] xl:text-[10rem] text-foreground leading-none tracking-tight">
              CLARITY IS
              <br />
              <span className="block">POWER</span>
            </h2>
          </motion.div>

          {/* "I engineer" - Medium Sans-Serif */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <motion.p
              variants={wordVariants}
              className="font-body text-xl md:text-2xl lg:text-3xl text-lavender text-right md:text-left"
            >
              I engineer
            </motion.p>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* ATTENTION - Massive, Gold, Display font */}
          <motion.div
            variants={wordVariants}
            className="col-span-12 md:col-span-6 lg:col-span-5"
          >
            <h3 className="font-display italic text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[8rem] text-gold leading-none tracking-tight text-left md:text-right">
              ATTENTION
            </h3>
          </motion.div>

          {/* Final tagline */}
          <motion.div
            variants={wordVariants}
            className="col-span-12 text-center mt-12 md:mt-16"
          >
            <p className="font-body text-base md:text-lg lg:text-xl text-lavender/60 italic">
              Your brand wasn't made to whisper.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ManifestoSection;
