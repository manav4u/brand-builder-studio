import { cn } from "@/lib/utils";

interface HeaderProps {
  name?: string;
  className?: string;
}

const Header = ({ name = "Your Name", className }: HeaderProps) => {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 lg:px-20",
        "backdrop-blur-xl bg-background/30 border-b border-border/30",
        "transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center justify-between">
        {/* Name / Logo on left */}
        <h1 className="font-display text-xl md:text-2xl font-semibold text-foreground tracking-wide">
          {name}
        </h1>

        {/* Navigation placeholder - can add links later */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Future nav links */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
