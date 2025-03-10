
import { useEffect, useRef } from "react";
import { ButtonCustom } from "./ui/button-custom";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Scale, Shield, BookOpen, HeartHandshake } from "lucide-react";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="about" className="section bg-muted/30">
      <div className="container-custom" ref={sectionRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="aspect-square overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80"
                alt="Mungai & Njenga Law Office"
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-lg hidden lg:block glass">
              <p className="text-xl font-serif font-semibold mb-1">25+</p>
              <p className="text-sm text-muted-foreground">Years of Excellence</p>
            </div>
          </div>

          {/* Content */}
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Badge variant="outline" className="mb-4">
              About Our Firm
            </Badge>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              A Leading Law Firm in Kenya
            </h2>
            <p className="text-muted-foreground mb-6">
              Mungai & Njenga Company Advocates is a premier law firm based in Murang'a, Kenya, dedicated to delivering exceptional legal services across various sectors. Established with a commitment to integrity, professionalism, and client satisfaction, the firm has carved a niche in the competitive legal landscape of Kenya.
            </p>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-xl font-medium mb-2">Our Mission</h3>
              <p className="text-muted-foreground">
                We aim to provide comprehensive legal support, combining deep industry expertise with a practical approach to ensure effective solutions for both local and international clients.
              </p>
            </div>

            <Separator className="my-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col items-start">
                <div className="bg-primary/10 p-3 rounded-lg mb-4">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Integrity</h3>
                <p className="text-sm text-muted-foreground">
                  Upholding ethical standards in all our dealings.
                </p>
              </div>

              <div className="flex flex-col items-start">
                <div className="bg-primary/10 p-3 rounded-lg mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Excellence</h3>
                <p className="text-sm text-muted-foreground">
                  Striving for the highest quality in service delivery.
                </p>
              </div>

              <div className="flex flex-col items-start">
                <div className="bg-primary/10 p-3 rounded-lg mb-4">
                  <HeartHandshake className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Collaboration</h3>
                <p className="text-sm text-muted-foreground">
                  Working together as a team to achieve client objectives.
                </p>
              </div>

              <div className="flex flex-col items-start">
                <div className="bg-primary/10 p-3 rounded-lg mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  Embracing new ideas and technologies to improve service efficiency.
                </p>
              </div>
            </div>

            <ButtonCustom>Learn More About Our History</ButtonCustom>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
