import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";

const Index = () => {
  return (
    <main className="bg-background">
      <Header name="Nithin" />
      <HeroSection />
      
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
