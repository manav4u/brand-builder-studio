import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Highlighter } from "@/components/ui/highlighter";
interface ManifestoRowProps {
  headline: React.ReactNode;
  subtext: React.ReactNode;
  desktopImage: string;
  mobileImage: string;
  imageFirst?: boolean;
  index: number;
}

const ManifestoRow = ({ 
  headline, 
  subtext, 
  desktopImage, 
  mobileImage, 
  imageFirst = false,
  index 
}: ManifestoRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect - image moves slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const imageSrc = isMobile ? mobileImage : desktopImage;

  const textContent = (
    <motion.div 
      className="flex flex-col justify-center px-8 md:px-20 py-12 md:py-0"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <h2 className="font-display font-bold uppercase text-foreground text-[2.5rem] md:text-[4.5rem] leading-[1.1] mb-6">
        {headline}
      </h2>
      <p className="font-body text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl">
        {subtext}
      </p>
    </motion.div>
  );

  const imageContent = (
    <div className="relative w-full h-[60vh] md:h-full overflow-hidden">
      <motion.div 
        className="absolute inset-0 w-full h-[120%]"
        style={{ y: imageY }}
      >
        <img
          src={imageSrc}
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Subtle gradient overlay for depth */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: imageFirst 
              ? "linear-gradient(to left, transparent 70%, hsl(var(--background)) 100%)"
              : "linear-gradient(to right, transparent 70%, hsl(var(--background)) 100%)"
          }}
        />
      </motion.div>
    </div>
  );

  return (
    <div 
      ref={rowRef}
      className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background"
    >
      {/* Mobile: Image always on top */}
      {isMobile ? (
        <>
          {imageContent}
          {textContent}
        </>
      ) : (
        /* Desktop: Zig-zag pattern */
        imageFirst ? (
          <>
            {imageContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {imageContent}
          </>
        )
      )}
    </div>
  );
};

const ManifestoSection = () => {
  const strapText = "• DIGITAL IDENTITY • VISUAL IMPACT • ENGINEER ATTENTION • ";

  const rows = [
    {
      headline: (
        <>
          THE INTERNET IS{" "}
          <Highlighter action="highlight" color="#3E1A47" isView strokeWidth={2} animationDuration={600}>
            DEAF.
          </Highlighter>
        </>
      ),
      subtext: (
        <>
          In an ocean of{" "}
          <Highlighter action="underline" color="#FFD233" isView strokeWidth={3} animationDuration={600} delay={400}>
            infinite noise
          </Highlighter>
          ,{" "}
          <Highlighter action="highlight" color="#3E1A47" isView strokeWidth={2} animationDuration={600} delay={600}>
            visibility is a myth.
          </Highlighter>{" "}
          You are shouting into a void that does not care.
        </>
      ),
      desktopImage: "/crowd-desktop.jpg",
      mobileImage: "/crowd-mobile.jpeg",
      imageFirst: false,
    },
    {
      headline: (
        <>
          <Highlighter action="underline" color="#FFD233" isView strokeWidth={3} animationDuration={600}>
            CLARITY
          </Highlighter>{" "}
          IS THE{" "}
          <Highlighter action="highlight" color="#3E1A47" isView strokeWidth={2} animationDuration={600} delay={200}>
            ONLY LANGUAGE.
          </Highlighter>
        </>
      ),
      subtext: (
        <>
          We{" "}
          <Highlighter action="highlight" color="#3E1A47" isView strokeWidth={2} animationDuration={600} delay={400}>
            strip away the chaos.
          </Highlighter>{" "}
          We distill your{" "}
          <Highlighter action="underline" color="#FFD233" isView strokeWidth={3} animationDuration={600} delay={600}>
            signal
          </Highlighter>{" "}
          until it cuts through the static like a knife, turning confusion into an{" "}
          <Highlighter action="highlight" color="#FFD233" isView strokeWidth={2} animationDuration={600} delay={800}>
            undeniable force.
          </Highlighter>
        </>
      ),
      desktopImage: "/clarity-desktop.jpg",
      mobileImage: "/clarity-mobile.jpeg",
      imageFirst: true,
    },
    {
      headline: (
        <>
          I ENGINEER{" "}
          <span style={{ color: "#FFD233", fontStyle: "italic", fontSize: "1.3em" }}>
            OBSESSION.
          </span>
        </>
      ),
      subtext: (
        <>
          I don't just{" "}
          <Highlighter action="underline" color="#3E1A47" isView strokeWidth={2} animationDuration={600} delay={400}>
            build websites.
          </Highlighter>{" "}
          I build{" "}
          <Highlighter action="highlight" color="#FFD233" isView strokeWidth={2} animationDuration={600} delay={600}>
            domains of influence
          </Highlighter>{" "}
          that{" "}
          <Highlighter action="underline" color="#FFD233" isView strokeWidth={3} animationDuration={600} delay={800}>
            demand attention
          </Highlighter>{" "}
          and command the room.
        </>
      ),
      desktopImage: "/shrine-deaktop.jpeg",
      mobileImage: "/shrine-mobile.jpeg",
      imageFirst: false,
    },
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

      {/* Editorial Zig-Zag Rows */}
      <section className="bg-background">
        {rows.map((row, index) => (
          <ManifestoRow
            key={index}
            index={index}
            headline={row.headline}
            subtext={row.subtext}
            desktopImage={row.desktopImage}
            mobileImage={row.mobileImage}
            imageFirst={row.imageFirst}
          />
        ))}
      </section>
    </>
  );
};

export default ManifestoSection;
