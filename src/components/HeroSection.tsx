import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {/* Hero Image with cinematic scale-in animation */}
      <div className="absolute inset-0 animate-scale-in">
        <img
          src="/IMG_20260204_010438.jpg"
          alt="Golden figure standing out from the crowd"
          className="h-full w-full object-contain"
        />
        {/* Subtle gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent opacity-40" />
      </div>

      {/* Tagline - positioned in lower third */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 md:pb-40">
        <div className="text-center px-6">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
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
