
import { useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, FileText, Building, Users, Scale, Database, 
  Bank, Landmark, ScrollText, BarChart3, Leaf, Globe, 
  Heart, GraduationCap, Plane
} from "lucide-react";
import { ButtonCustom } from "./ui/button-custom";
import { Link } from "react-router-dom";

const practiceAreas = [
  {
    icon: <Briefcase className="h-8 w-8" />,
    title: "Corporate & Commercial Law",
    description: "Expert guidance through complex mergers, acquisitions, corporate restructuring, joint ventures, and commercial contracts."
  },
  {
    icon: <Bank className="h-8 w-8" />,
    title: "Banking & Finance",
    description: "Legal support for banking operations, regulatory compliance, project finance transactions, and financial restructuring."
  },
  {
    icon: <Building className="h-8 w-8" />,
    title: "Real Estate & Conveyancing",
    description: "Handling property transactions, ensuring smooth property transfers, and advising on land use regulations."
  },
  {
    icon: <Database className="h-8 w-8" />,
    title: "Intellectual Property",
    description: "Registration and enforcement of trademarks, patents, and copyrights, as well as representation in IP disputes."
  },
  {
    icon: <Scale className="h-8 w-8" />,
    title: "Litigation & Dispute Resolution",
    description: "Representing clients in civil and commercial disputes, offering mediation, arbitration, and negotiation services."
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Employment & Labor Law",
    description: "Drafting employment contracts, handling labor disputes, and ensuring compliance with labor laws."
  },
  {
    icon: <Leaf className="h-8 w-8" />,
    title: "Environmental Law",
    description: "Assisting with environmental compliance, sustainability practices, and conservation issues."
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Tax Law",
    description: "Tax planning, representation in tax disputes, and advising on VAT, corporate tax, and PAYE compliance."
  },
  {
    icon: <ScrollText className="h-8 w-8" />,
    title: "Insurance Law",
    description: "Drafting and reviewing insurance policies, representing clients in claims disputes, and regulatory compliance."
  },
  {
    icon: <Landmark className="h-8 w-8" />,
    title: "Regulatory & Compliance",
    description: "Assisting with obtaining operational licenses and permits, and advising on industry-specific regulations."
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Technology & Data Protection",
    description: "Advising on cybersecurity, data privacy, and compliance with data protection laws."
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Family & Succession Law",
    description: "Drafting wills, managing estate planning, and handling probate and succession disputes."
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
        
        <div className="text-center mt-12">
          <ButtonCustom asChild>
            <Link to="/services">View Detailed Service Portfolio</Link>
          </ButtonCustom>
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
