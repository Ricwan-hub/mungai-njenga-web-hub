
import { useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const teamMembers = [
  {
    name: "Njoki Mungai",
    role: "Managing Partner",
    image: "/lovable-uploads/76e90a5b-1ad1-4804-85da-e222713ed96b.png",
    bio: "With extensive experience in corporate law and dispute resolution, Njoki has been instrumental in driving the firm's strategic direction since May 2016. She holds a Post Graduate Diploma in Law from the Kenya School of Law."
  },
  {
    name: "James Njenga",
    role: "Senior Associate",
    image: "/lovable-uploads/8573d457-173d-4658-a443-3b611b2906cc.png",
    bio: "Specializing in banking, finance, real estate, and construction law, James brings a wealth of knowledge in complex legal matters. His background includes significant roles in various reputable firms before joining Mungai & Njenga."
  },
  {
    name: "Lillian Mungai",
    role: "Senior Associate",
    image: "/lovable-uploads/79db3f3e-45d7-45ad-9939-3f8df315bf6b.png",
    bio: "Specializing in intellectual property, corporate governance, and commercial transactions, Lillian brings expertise in protecting clients' valuable assets and ensuring regulatory compliance."
  },
  {
    name: "Keshi Mungai",
    role: "Senior Associate",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "Specializing in banking, finance, real estate, and construction law, Keshi brings a wealth of knowledge in complex legal matters and has significant experience in various reputable firms before joining Mungai & Njenga."
  }
];

const Team = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const memberRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    memberRefs.current.forEach((member) => {
      if (member) observer.observe(member);
    });

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
      memberRefs.current.forEach((member) => {
        if (member) observer.unobserve(member);
      });
    };
  }, []);

  return (
    <section id="team" className="section bg-muted/30">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0" ref={sectionRef}>
          <Badge variant="outline" className="mb-4">
            Our Team
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Meet Our Legal Experts</h2>
          <p className="text-muted-foreground">
            Our team combines deep legal expertise with a commitment to client service.
            Each attorney brings specialized knowledge and a passion for achieving optimal outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              ref={(el) => (memberRefs.current[index] = el)}
              className="opacity-0"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white h-full">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-secondary text-sm font-medium mb-3">{member.role}</p>
                  <Separator className="my-3" />
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            The firm also comprises a dedicated team of associates who bring specialized knowledge across various legal fields, ensuring comprehensive service delivery.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Team;
