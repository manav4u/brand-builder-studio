import { ChevronDown } from "lucide-react";
import GradualBlur from "./GradualBlur";

const HeroSection = () => {
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {/* Mobile Background - centered figure */}
      <div 
        className="absolute inset-0 animate-scale-in md:hidden"
        style={{
          backgroundImage: "url('/hero-mobile.jpg')",
          backgroundSize: "contain",
         backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Desktop Background - figure anchored to the right, fills screen */}
      <div 
        className="absolute inset-0 animate-scale-in hidden md:block"
        style={{
          backgroundImage: "url('/hero-desktop.jpg')",
          backgroundSize: "cover",
         backgroundPosition: "top right",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Gradual blur effect at top for header area */}
      <GradualBlur
        position="top"
        height="7rem"
        strength={2}
        divCount={2}
        exponential
        opacity={1}
      />
      
      {/* Premium gradient overlay - transparent top to Midnight Aubergine bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(285,55%,9%)]" />

      {/* Mobile Tagline - centered at bottom */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 md:hidden">
        <div className="text-center px-6">
          <h1 className="font-display text-4xl font-bold text-foreground tracking-tight">
            <span
              className="block opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              Built to stand out.
            </span>
            <span
              className="block opacity-0 animate-fade-in-up mt-2"
              style={{ animationDelay: "0.9s" }}
            >
              Not to blend in.
            </span>
          </h1>
        </div>
      </div>

      {/* Desktop Tagline - left-aligned, large and bold */}
      <div className="absolute inset-0 hidden md:flex items-center pt-24 lg:pt-32">
        <div className="pl-12 lg:pl-20 xl:pl-28">
          <h1 className="font-display text-7xl lg:text-8xl xl:text-[7rem] 2xl:text-[8rem] font-bold text-foreground tracking-tight text-left leading-[0.95]">
            <span
              className="block opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              Built to stand out.
            </span>
            <span
              className="block opacity-0 animate-fade-in-up mt-4 lg:mt-6"
              style={{ animationDelay: "0.9s" }}
            >
              Not to blend in.
            </span>
          </h1>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <button
          onClick={handleScrollDown}
          className="flex flex-col items-center gap-2 opacity-0 animate-fade-in cursor-pointer group"
          style={{ animationDelay: "1.5s" }}
          aria-label="Scroll down"
        >
          <span className="text-sm text-muted-foreground uppercase tracking-widest font-body">
            Scroll
          </span>
          <ChevronDown className="h-6 w-6 text-primary animate-bounce-gentle" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
