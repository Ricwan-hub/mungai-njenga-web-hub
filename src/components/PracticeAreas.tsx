
import { useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, FileText, Building, Users, Scale, Database } from "lucide-react";

const practiceAreas = [
  {
    icon: <Briefcase className="h-8 w-8" />,
    title: "Corporate Law",
    description: "Comprehensive legal guidance for businesses of all sizes, from startups to multinational corporations."
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: "Contract Law",
    description: "Expert drafting, review, and negotiation of contracts to protect your interests and minimize risk."
  },
  {
    icon: <Building className="h-8 w-8" />,
    title: "Real Estate",
    description: "Navigating complex property transactions, development projects, and real estate litigation."
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Family Law",
    description: "Sensitive and pragmatic representation in divorce, custody, and other family matters."
  },
  {
    icon: <Scale className="h-8 w-8" />,
    title: "Litigation",
    description: "Skilled advocacy in court proceedings, alternative dispute resolution, and settlement negotiations."
  },
  {
    icon: <Database className="h-8 w-8" />,
    title: "Intellectual Property",
    description: "Protection and enforcement of trademarks, patents, copyrights, and trade secrets."
  }
];

const PracticeAreas = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section id="practice-areas" className="section bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0" ref={sectionRef}>
          <Badge variant="outline" className="mb-4">
            Our Expertise
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Practice Areas</h2>
          <p className="text-muted-foreground">
            Our firm offers specialized legal services across a diverse range of practice areas.
            Each area is supported by attorneys with deep expertise and a proven track record of success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceAreas.map((area, index) => (
            <div
              key={area.title}
              ref={(el) => (cardRefs.current[index] = el)}
              className="opacity-0"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white">
                <CardHeader>
                  <div className="bg-primary/5 p-3 inline-flex rounded-lg mb-4">
                    {area.icon}
                  </div>
                  <CardTitle className="text-xl">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">
                    {area.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
