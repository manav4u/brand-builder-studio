import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "px-6 py-6 md:px-12 lg:px-16",
        "transition-all duration-500",
        className
      )}
    >
      {/* Glass background - only visible on scroll */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          hasScrolled ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
          backdropFilter: "blur(12px) saturate(1.2)",
          WebkitBackdropFilter: "blur(12px) saturate(1.2)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      />

      <div className="relative flex items-center justify-between">
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
