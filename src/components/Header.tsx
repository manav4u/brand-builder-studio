import { cn } from "@/lib/utils";
import GradualBlur from "./GradualBlur";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        className
      )}
    >
      {/* Gradual blur effect behind header */}
      <GradualBlur
        position="top"
        height="7rem"
        strength={2}
        divCount={2}
        exponential
        opacity={1}
      />

      {/* Header content - floating above the blur */}
      <div className="relative px-6 py-8 md:px-12 lg:px-16 flex items-center justify-between">
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
  );
};

export default Header;
