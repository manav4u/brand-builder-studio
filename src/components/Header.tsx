import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <>
      {/* SVG Filter for chromatic aberration effect */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="glass-distortion" x="-50%" y="-50%" width="200%" height="200%">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0.039
                      0 0 1 0 0.078
                      0 0 0 1 0"
            />
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>
      </svg>

      <header
        className={cn(
          "fixed top-4 left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12 z-50",
          "px-6 py-4 md:px-8",
          "transition-all duration-300",
          className
        )}
        style={{
          borderRadius: "50px",
          background: `rgba(30, 11, 36, 0.1)`,
          backdropFilter: "blur(11px) saturate(1) brightness(0.5)",
          WebkitBackdropFilter: "blur(11px) saturate(1) brightness(0.5)",
          border: "0.07px solid rgba(255, 210, 51, 0.15)",
          opacity: 0.93,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        }}
      >
        <div className="flex items-center justify-between">
          {/* Brand name on left */}
          <h1 
            className="font-display text-xl md:text-2xl font-bold text-foreground tracking-[0.2em] uppercase"
            style={{
              textShadow: "0 0 20px rgba(255, 210, 51, 0.3)",
            }}
          >
            MANAV
          </h1>

          {/* Navigation placeholder */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Future nav links */}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
