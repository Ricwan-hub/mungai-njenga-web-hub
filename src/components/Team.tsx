
import { useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const teamMembers = [
  {
    name: "John Mungai",
    role: "Founding Partner",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "With over 25 years of experience in corporate law, John has established himself as a trusted advisor to major corporations and government entities."
  },
  {
    name: "Sarah Njenga",
    role: "Managing Partner",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "Sarah specializes in complex litigation and has successfully represented clients in high-stakes disputes both domestically and internationally."
  },
  {
    name: "David Karanja",
    role: "Senior Associate",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "David brings expertise in intellectual property law, helping clients protect and leverage their most valuable assets."
  },
  {
    name: "Rebecca Ochieng",
    role: "Associate",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    bio: "Rebecca focuses on real estate and property law, guiding clients through complex transactions and development projects."
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
      </div>
    </section>
  );
};

export default Team;
