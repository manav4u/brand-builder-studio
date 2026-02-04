import { cn } from "@/lib/utils";
import GradualBlur from "./GradualBlur";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <>
      {/* Gradual blur effect - positioned separately from header content */}
      <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <GradualBlur
          position="top"
          height="7rem"
          strength={2}
          divCount={2}
          exponential
          opacity={1}
        />
      </div>

      {/* Header content - floating above the blur */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "px-6 py-8 md:px-12 lg:px-16",
          className
        )}
      >
        <div className="flex items-center justify-between">
          {/* Brand name - clean, no container */}
          <h1 
            className="font-display text-2xl md:text-3xl font-bold text-lavender tracking-[0.2em] uppercase"
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
