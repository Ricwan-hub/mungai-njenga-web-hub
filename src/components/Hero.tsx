
import { useEffect, useRef } from "react";
import { ButtonCustom } from "./ui/button-custom";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (heroRef.current) {
        // Parallax effect for background
        heroRef.current.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat overflow-hidden"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/70 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-20 md:pt-0">
        <div className="max-w-3xl mx-auto text-center text-white">
          <div className="animate-fade-in-down">
            {/* Logo in hero section */}
            <div className="flex justify-center mb-8">
              <div className="w-28 h-28 rounded-full bg-white p-2">
                <img
                  src="/lovable-uploads/43bd0766-8ffe-44de-8095-ccb246e710a0.png"
                  alt="Mungai & Njenga"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider uppercase bg-white/10 backdrop-blur-sm rounded-full">
              Trusted Legal Advocates
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold leading-tight md:leading-tight lg:leading-tight mb-6 text-balance">
              Exceptional Legal Services for Complex Matters
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto text-balance">
              Mungai & Njenga delivers sophisticated legal counsel with a personalized approach, helping clients navigate their most significant challenges.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
            <ButtonCustom
              size="lg"
              variant="secondary"
              className="group relative overflow-hidden shadow-lg"
            >
              <span className="relative z-10">Schedule Consultation</span>
              <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            </ButtonCustom>
            <ButtonCustom
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 hover:text-white"
            >
              Learn More
            </ButtonCustom>
          </div>
        </div>
      </div>

      {/* Animated arrow */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white opacity-70"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
