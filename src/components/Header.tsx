import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <>
      {/* SVG Filters for glass distortion effects */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          {/* Chromatic aberration filter with color offsets */}
          <filter id="glass-chromatic" x="-20%" y="-20%" width="140%" height="140%">
            {/* Displacement effect */}
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.01" 
              numOctaves="3" 
              result="noise"
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="0.5"
              xChannelSelector="R" 
              yChannelSelector="G"
              result="displaced"
            />
            
            {/* Red channel - no offset */}
            <feOffset in="displaced" dx="0" dy="0" result="red" />
            <feColorMatrix
              in="red"
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="redOut"
            />
            
            {/* Green channel - offset 10 */}
            <feOffset in="displaced" dx="0.3" dy="0.3" result="green" />
            <feColorMatrix
              in="green"
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="greenOut"
            />
            
            {/* Blue channel - offset 20 */}
            <feOffset in="displaced" dx="0.6" dy="0.6" result="blue" />
            <feColorMatrix
              in="blue"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
              result="blueOut"
            />
            
            {/* Blend channels */}
            <feBlend in="redOut" in2="greenOut" mode="screen" result="rg" />
            <feBlend in="rg" in2="blueOut" mode="screen" result="rgb" />
            
            {/* Apply brightness */}
            <feComponentTransfer in="rgb">
              <feFuncR type="linear" slope="0.5" />
              <feFuncG type="linear" slope="0.5" />
              <feFuncB type="linear" slope="0.5" />
            </feComponentTransfer>
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
          background: "rgba(30, 11, 36, 0)", // Background opacity: 0
          backdropFilter: "blur(11px) saturate(1) brightness(0.5)",
          WebkitBackdropFilter: "blur(11px) saturate(1) brightness(0.5)",
          border: "0.07px solid rgba(255, 210, 51, 0.2)",
          opacity: 0.93,
          filter: "url(#glass-chromatic)",
          mixBlendMode: "screen",
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
