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
}: ManifestoRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 85%", "end 30%"],
  });

  // Stronger but smooth scroll-based reveal
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const yHeadline = useTransform(scrollYProgress, [0, 0.15], [24, 0]);
  const yBody = useTransform(scrollYProgress, [0, 0.15], [32, 0]);

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const imageSrc = isMobile ? mobileImage : desktopImage;

  const textContent = (
    <motion.div
      className="flex flex-col justify-start px-5 md:px-16 pt-2 md:pt-0"
      style={{ opacity }}
    >
      <motion.h2
        className="font-display font-bold uppercase text-foreground text-[2.1rem] md:text-[4.2rem] leading-[1.05] mb-2"
        style={{ y: yHeadline }}
      >
        {headline}
      </motion.h2>
      <motion.p
        className="font-body text-muted-foreground text-base md:text-lg leading-snug max-w-xl"
        style={{ y: yBody }}
      >
        {subtext}
      </motion.p>
    </motion.div>
  );

  const imageContent = (
    <div className="relative w-full h-[36vh] md:h-full overflow-hidden">
      <motion.div
        className="absolute inset-0 w-full h-[106%]"
        style={{ y: imageY, opacity }}
      >
        <img src={imageSrc} alt="" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: imageFirst
              ? "linear-gradient(to left, transparent 62%, hsl(var(--background)) 100%)"
              : "linear-gradient(to right, transparent 62%, hsl(var(--background)) 100%)",
          }}
        />
      </motion.div>
    </div>
  );

  return (
    <div
      ref={rowRef}
      className="min-h-[70vh] grid grid-cols-1 md:grid-cols-2 bg-background snap-start"
    >
      {isMobile ? (
        <>
          {imageContent}
          {textContent}
        </>
      ) : imageFirst ? (
        <>
          {imageContent}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {imageContent}
        </>
      )}
    </div>
  );
};

const ManifestoSection = () => {
  const strapText = "✦ DIGITAL IDENTITY ✦ VISUAL IMPACT ✦ ENGINEER ATTENTION ";
  const rows = [
    {
      headline: (
        <>
          THE INTERNET IS{" "}
          <Highlighter action="highlight" color="#3E1A47" strokeWidth={2} animationDuration={200} isView>
            DEAF.
          </Highlighter>
        </>
      ),
      subtext: (
        <>
          In an ocean of infinite noise,{" "}
          <Highlighter action="underline" color="#FFD233" strokeWidth={3} animationDuration={200} isView>
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
          <Highlighter action="underline" color="#FFD233" strokeWidth={3} animationDuration={200} isView>
            CLARITY
          </Highlighter>{" "}
          IS THE ONLY LANGUAGE.
        </>
      ),
      subtext: (
        <>
          I cut through the chaos. I shape your signal until it stands alone, turning confusion into an{" "}
          <Highlighter action="underline" color="#FFD233" strokeWidth={3} animationDuration={200} isView>
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
          <span className="text-[#FFD233] italic font-serif">
            OBSESSION.
          </span>
        </>
      ),
      subtext: (
        <>
          I don't just build websites. I build{" "}
          <Highlighter action="underline" color="#FFD233" strokeWidth={3} animationDuration={200} isView>
            domains of influence.
          </Highlighter>{" "}
          that demand attention and command the room.
        </>
      ),
      desktopImage: "/shrine-deaktop.jpeg",
      mobileImage: "/shrine-mobile.jpeg",
      imageFirst: false,
    },
  ];

  return (
    <>
      {/* X-Strap Separator */}
      <div className="relative h-20 md:h-24 overflow-hidden bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-9 md:h-10 bg-plum-shadow -rotate-[6deg]">
          <div className="flex items-center whitespace-nowrap animate-marquee-left">
            {[...Array(12)].map((_, i) => (
              <span key={i} className="font-display italic text-sm md:text-base text-gold/80 mx-2">
                {strapText}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-9 md:h-10 bg-plum-shadow rotate-[6deg]">
          <div className="flex items-center whitespace-nowrap animate-marquee-right">
            {[...Array(12)].map((_, i) => (
              <span key={i} className="font-display italic text-sm md:text-base text-foreground/70 mx-2">
                {strapText}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Manifesto */}
      <section className="bg-background snap-y snap-mandatory">
        {rows.map((row, i) => (
          <ManifestoRow key={i} index={i} {...row} />
        ))}
      </section>
    </>
  );
};

export default ManifestoSection;
