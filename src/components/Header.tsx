import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header
      className={cn(
        "fixed top-4 left-4 right-4 md:left-8 md:right-8 lg:left-12 lg:right-12 z-50",
        "px-6 py-4 md:px-8",
        "transition-all duration-500",
        className
      )}
      style={{
        borderRadius: "50px",
        background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        backdropFilter: "blur(12px) saturate(1.2)",
        WebkitBackdropFilter: "blur(12px) saturate(1.2)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.12),
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          inset 0 -1px 0 rgba(0, 0, 0, 0.05)
        `,
      }}
    >
      <div className="flex items-center justify-between">
        {/* Brand name on left */}
        <h1 
          className="font-display text-xl md:text-2xl font-bold text-foreground tracking-[0.2em] uppercase"
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
