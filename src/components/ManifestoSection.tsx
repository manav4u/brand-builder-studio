const ManifestoSection = () => {
  const marqueeText = "• DIGITAL IDENTITY • VIRAL ENGINEERING • VISUAL IMPACT ";

  return (
    <section className="relative bg-background py-24 md:py-32 overflow-hidden">
      {/* Infinite Scrolling Marquee */}
      <div className="relative w-full overflow-hidden mb-16 md:mb-24">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* Duplicate the text multiple times for seamless loop */}
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-display italic text-4xl md:text-6xl lg:text-7xl text-white/20 mx-4"
            >
              {marqueeText}
            </span>
          ))}
        </div>
        {/* Duplicate row for seamless infinite scroll */}
        <div className="flex animate-marquee whitespace-nowrap absolute top-0 left-0" style={{ animationDelay: '-10s' }}>
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-display italic text-4xl md:text-6xl lg:text-7xl text-white/20 mx-4"
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* The Statement */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <p className="font-body text-xl md:text-2xl lg:text-[2rem] text-lavender text-center max-w-4xl mx-auto leading-relaxed md:leading-relaxed">
          In a digital ocean of infinite noise, clarity is power. I don't just design websites; I{" "}
          <span className="font-bold text-gold">engineer attention</span>. Your brand wasn't made to whisper.
        </p>
      </div>
    </section>
  );
};

export default ManifestoSection;
