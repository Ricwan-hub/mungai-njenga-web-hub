
import { useEffect, useRef } from "react";
import { ButtonCustom } from "./ui/button-custom";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Scale, Shield, BookOpen } from "lucide-react";

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
              A Legacy of Excellence in Legal Practice
            </h2>
            <p className="text-muted-foreground mb-6">
              Founded in 1998, Mungai & Njenga has established itself as a premier legal practice, delivering exceptional counsel to individuals and organizations across diverse sectors. Our approach combines technical expertise with a deep understanding of our clients' unique needs.
            </p>

            <Separator className="my-8" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-start">
                <div className="bg-primary/10 p-3 rounded-lg mb-4">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Integrity</h3>
                <p className="text-sm text-muted-foreground">
                  We uphold the highest ethical standards in all our dealings.
                </p>
              </div>

              <div className="flex flex-col items-start">
                <div className="bg-primary/10 p-3 rounded-lg mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Excellence</h3>
                <p className="text-sm text-muted-foreground">
                  We are relentless in our pursuit of the best outcomes.
                </p>
              </div>

              <div className="flex flex-col items-start">
                <div className="bg-primary/10 p-3 rounded-lg mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Expertise</h3>
                <p className="text-sm text-muted-foreground">
                  Our attorneys bring specialized knowledge to every case.
                </p>
              </div>
            </div>

            <ButtonCustom>Learn About Our History</ButtonCustom>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
