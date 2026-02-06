import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ArchitectSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // For the internal sticky content that Vault slides over
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Parallax for the architect image
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // Marquee text structure: "WHO AM I?" with I in gold italic
  const marqueeContent = [...Array(16)].map((_, i) => (
    <span key={i} className="flex items-center whitespace-nowrap mx-4 md:mx-6">
      <span className="font-display text-base md:text-lg text-foreground tracking-widest">
        WHO AM{" "}
      </span>
      <span className="font-display italic text-base md:text-lg text-gold mx-1">
        I
      </span>
      <span className="font-display text-base md:text-lg text-foreground tracking-widest">
        ?
      </span>
      <span className="text-gold/60 mx-4">✦</span>
    </span>
  ));

  return (
    <div className="relative z-20 -mt-[65vh] md:-mt-[85vh]">
      <motion.section
        ref={sectionRef}
        className="bg-vault-bg shadow-[0_-20px_50px_rgba(0,0,0,0.5)] min-h-screen"
      >
        {/* WHO AM I? Marquee Strip */}
        <div className="relative h-12 md:h-14 overflow-hidden bg-plum-shadow">
          <div className="absolute inset-0 flex items-center">
            <div className="flex animate-marquee-left">
              {marqueeContent}
              {marqueeContent}
            </div>
          </div>
        </div>

        {/* Architect Image Block */}
        <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
          {/* Image with parallax */}
          <motion.div
            className="absolute inset-0 w-full h-[115%]"
            style={{ y: imageY }}
          >
            <img
              src="/architect.webp"
              alt="The Architect"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          {/* Dark gradient overlay from bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(
                to top,
                hsl(var(--vault-bg)) 0%,
                hsl(var(--vault-bg) / 0.85) 25%,
                hsl(var(--vault-bg) / 0.4) 50%,
                transparent 100%
              )`,
            }}
          />

          {/* Text Overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-5 md:px-16 pb-10 md:pb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-display font-bold text-foreground text-4xl md:text-6xl lg:text-7xl mb-3 md:mb-4"
            >
              I'm{" "}
              <span className="text-gold italic">Manav</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="font-body text-muted-foreground text-lg md:text-xl lg:text-2xl tracking-wide"
            >
              Student <span className="text-gold/60 mx-2">|</span> 20{" "}
              <span className="text-gold/60 mx-2">|</span> Pune, India
            </motion.p>
          </div>
        </div>

        {/* Details Placeholder - Future Expansion */}
        <div className="px-5 md:px-16 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed">
              More details coming soon...
            </p>
          </motion.div>
        </div>

        {/* Sticky wrapper + Runway for Vault to slide over */}
        <div className="relative" ref={contentRef}>
          <div className="sticky top-0 z-10 bg-vault-bg">
            {/* This empty sticky div maintains the pinning behavior */}
            <div className="h-1" />
          </div>
          {/* Scroll runway: keeps section pinned while Vault rises over it */}
          <div aria-hidden className="h-[65vh] md:h-[85vh]" />
        </div>
      </motion.section>
    </div>
  );
};

export default ArchitectSection;
