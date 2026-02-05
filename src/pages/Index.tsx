import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import ManifestoSection from "@/components/ManifestoSection";
import VaultSection from "@/components/VaultSection";

const Index = () => {
  return (
    <main className="bg-background">
      <Header />
      <HeroSection />
      <ManifestoSection />
      <VaultSection />
      
      {/* Placeholder for future sections */}
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-lg font-body">
          More content coming soon...
        </p>
      </section>
    </main>
  );
};

export default Index;
