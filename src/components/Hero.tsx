
import { useEffect, useRef } from "react";
import { ButtonCustom } from "./ui/button-custom";
import { Link } from "react-router-dom";

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
      {/* Enhanced Overlay with teal gradient */}
      <div className="absolute inset-0 teal-gradient opacity-85"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-primary/40"></div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-20 md:pt-0">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="animate-fade-in-down">
            {/* Enhanced Logo in hero section */}
            <div className="flex justify-center mb-8">
              <div className="relative transform hover:scale-105 transition-all duration-500">
                <div className="w-32 h-20 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20">
                  <img
                    src="/lovable-uploads/61a7f345-f09a-49ac-92fa-87f2f93aa59c.png"
                    alt="Mungai & Njenga"
                    className="h-16 w-auto object-contain drop-shadow-2xl"
                  />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-secondary/20 to-secondary/20 rounded-3xl blur-lg opacity-50"></div>
              </div>
            </div>
            <span className="inline-block px-4 py-2 mb-8 text-sm font-medium tracking-wider uppercase bg-white/10 backdrop-blur-sm rounded-full border border-secondary/30 gold-accent">
              Premier Legal Services in Kenya
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight md:leading-tight lg:leading-tight mb-8 text-balance">
              Exceptional Legal Services for 
              <span className="block gold-accent mt-2">Complex Matters</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-10 max-w-3xl mx-auto text-balance leading-relaxed">
              We provide comprehensive legal support, combining deep industry expertise with a practical approach to ensure effective solutions for both local and international clients.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up">
            <ButtonCustom
              size="lg"
              variant="secondary"
              asChild
              className="group relative overflow-hidden shadow-2xl px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
            >
              <Link to="/#contact">
                <span className="relative z-10">Schedule Consultation</span>
                <span className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-secondary/40 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
              </Link>
            </ButtonCustom>
            <ButtonCustom
              size="lg"
              variant="outline"
              asChild
              className="border-2 border-white/50 text-white hover:bg-white/10 hover:text-white hover:border-secondary px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
            >
              <Link to="/services">
                Our Services
              </Link>
            </ButtonCustom>
          </div>
        </div>
      </div>

      {/* Enhanced animated arrow */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-secondary"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
