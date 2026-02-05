import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Project {
  id: string;
  title: string;
  category: string;
  span: "large" | "wide" | "small";
}

const projects: Project[] = [
  { id: "001", title: "PROJECT ALPHA", category: "Web Architecture", span: "large" },
  { id: "002", title: "PROJECT BETA", category: "Brand Identity", span: "wide" },
  { id: "003", title: "PROJECT GAMMA", category: "Digital Product", span: "small" },
  { id: "004", title: "PROJECT DELTA", category: "Experience Design", span: "small" },
];

interface VaultTileProps {
  project: Project;
  index: number;
}

const VaultTile = ({ project, index }: VaultTileProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const tileRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { once: true, margin: "-100px" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tileRef.current) return;
    const rect = tileRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getSpanClasses = () => {
    switch (project.span) {
      case "large":
        return "md:col-span-2 md:row-span-2";
      case "wide":
        return "md:col-span-2 md:row-span-1";
      case "small":
      default:
        return "md:col-span-1 md:row-span-1";
    }
  };

  return (
    <motion.div
      ref={inViewRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className={`${getSpanClasses()} aspect-square md:aspect-auto`}
    >
      <div
        ref={tileRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full h-full min-h-[280px] md:min-h-0 overflow-hidden rounded-lg cursor-pointer group"
        style={{
          border: "1px solid hsl(var(--background))",
          boxShadow: isHovered
            ? "0 0 20px rgba(255, 210, 51, 0.4), 0 0 40px rgba(255, 210, 51, 0.2)"
            : "none",
          transition: "box-shadow 300ms ease-out",
        }}
      >
        {/* Dark gradient placeholder background */}
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{
            background: "linear-gradient(135deg, hsl(285 45% 8%) 0%, hsl(285 55% 5%) 100%)",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />

        {/* Frosted glass overlay */}
        <div
          className="absolute inset-0 transition-all duration-300 ease-out"
          style={{
            backdropFilter: isHovered ? "blur(4px)" : "blur(8px)",
            WebkitBackdropFilter: isHovered ? "blur(4px)" : "blur(8px)",
            backgroundColor: "hsla(285, 55%, 9%, 0.3)",
          }}
        />

        {/* Mouse-follow glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 210, 51, 0.15), transparent)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full p-5 md:p-6 flex flex-col justify-between">
          {/* Category - Top Right */}
          <div className="flex justify-end">
            <span className="text-xs text-muted-foreground font-body tracking-wide">
              {project.category}
            </span>
          </div>

          {/* Title & Serial - Bottom */}
          <div className="flex justify-between items-end">
            <h3 className="font-body font-semibold text-foreground uppercase tracking-[0.1em] text-sm md:text-base">
              {project.title}
            </h3>
            <span className="text-xs font-body text-primary">
              {project.id}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const VaultSection = () => {
  return (
    <div className="relative z-20">
      <section
        className="py-16 md:py-24 px-5 md:px-16 rounded-t-[60px] md:rounded-t-[80px] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] min-h-screen"
        style={{ backgroundColor: "hsl(var(--vault-bg))" }}
      >
        {/* Section Header */}
        <div className="max-w-7xl mx-auto mb-10 md:mb-14 pt-8">
          <h2 className="font-display font-bold text-foreground text-3xl md:text-5xl uppercase tracking-wide">
            The Vault
          </h2>
          <p className="text-muted-foreground font-body mt-2 text-sm md:text-base">
            Selected works & experiments
          </p>
        </div>

        {/* Bento Grid */}
        <div
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6"
          style={{
            gridTemplateRows: "repeat(2, minmax(280px, 1fr))",
          }}
        >
          {projects.map((project, index) => (
            <VaultTile key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default VaultSection;
