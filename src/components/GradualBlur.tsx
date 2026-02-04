// GradualBlur component - creates a gradual blur effect at edges
// Inspired by react-bits gradual blur pattern

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface GradualBlurProps {
  position?: "top" | "bottom";
  height?: string;
  strength?: number;
  divCount?: number;
  exponential?: boolean;
  opacity?: number;
  className?: string;
}

const GradualBlur = ({
  position = "top",
  height = "7rem",
  strength = 2,
  divCount = 2,
  exponential = true,
  opacity = 1,
  className,
}: GradualBlurProps) => {
  const layers = useMemo(() => {
    return Array.from({ length: divCount }, (_, i) => {
      const progress = (i + 1) / divCount;
      const blurValue = exponential
        ? Math.pow(progress, 2) * strength * 10
        : progress * strength * 10;
      
      return {
        zIndex: i + 1,
        backdropFilter: `blur(${blurValue}px)`,
        WebkitBackdropFilter: `blur(${blurValue}px)`,
        maskImage: position === "top"
          ? `linear-gradient(to bottom, rgba(0,0,0,${opacity}) 0%, rgba(0,0,0,0) 100%)`
          : `linear-gradient(to top, rgba(0,0,0,${opacity}) 0%, rgba(0,0,0,0) 100%)`,
        WebkitMaskImage: position === "top"
          ? `linear-gradient(to bottom, rgba(0,0,0,${opacity}) 0%, rgba(0,0,0,0) 100%)`
          : `linear-gradient(to top, rgba(0,0,0,${opacity}) 0%, rgba(0,0,0,0) 100%)`,
      };
    });
  }, [divCount, exponential, strength, opacity, position]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute left-0 right-0",
        position === "top" ? "top-0" : "bottom-0",
        className
      )}
      style={{ height }}
    >
      {layers.map((style, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={style}
        />
      ))}
    </div>
  );
};

export default GradualBlur;
