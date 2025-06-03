
import { useRef, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import LoadingSpinner from "@/components/LoadingSpinner"; // Assuming this exists

interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string | null;
  bio: string;
  // createdAt and updatedAt can be included if needed for display or logic
  // createdAt: string;
  // updatedAt: string;
}

const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  const response = await fetch('/api/team-members');
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network response was not ok and no JSON body' }));
    throw new Error(errorData.message || 'Network response was not ok');
  }
  return response.json();
};

const Team = () => {
  const { data: teamMembers, isLoading, isError, error } = useQuery<TeamMember[], Error>({
    queryKey: ['teamMembers'],
    queryFn: fetchTeamMembers,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  // Initialize memberRefs with an empty array, it will be populated after data is fetched
  const memberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Ensure IntersectionObserver is set up only when data is available and not loading
    if (isLoading || !teamMembers || teamMembers.length === 0) {
      return; // Don't setup observer if loading or no data
    }

    // Initialize refs array based on fetched data length
    memberRefs.current = memberRefs.current.slice(0, teamMembers.length);


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

    memberRefs.current.forEach((memberEl) => {
      if (memberEl) observer.observe(memberEl);
    });

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
      memberRefs.current.forEach((memberEl) => {
        if (memberEl) observer.unobserve(memberEl);
      });
    };
  }, [isLoading, teamMembers]); // Rerun effect if loading state or data changes

  if (isLoading) return (
    <div className="container-custom text-center py-20">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-muted-foreground">Loading team members...</p>
    </div>
  );

  if (isError) return (
    <div className="container-custom text-center py-10">
      <p className="text-red-500">Error fetching team members: {error?.message}</p>
    </div>
  );

  if (!teamMembers || teamMembers.length === 0) return (
    <div className="container-custom text-center py-10">
      <p>No team members found.</p>
    </div>
  );

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
              key={member.id} // Use database ID as key
              ref={(el) => (memberRefs.current[index] = el)}
              className="opacity-0" // Initial state for animation
              style={{ animationDelay: `${0.1 * index}s` }} // Staggered animation
            >
              <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white h-full">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={member.imageUrl || '/placeholder.svg'} // Use placeholder if imageUrl is null
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-secondary text-sm font-medium mb-3">{member.role}</p>
                  <Separator className="my-3" />
                  <p className="text-muted-foreground text-sm line-clamp-4">{member.bio}</p>
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
