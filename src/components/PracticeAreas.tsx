
import { useRef, useEffect, ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, Building, Users, Scale, Database, Landmark, ScrollText,
  BarChart3, Leaf, Globe, Heart, Building2, HelpCircle // Added HelpCircle as default
} from "lucide-react";
import { ButtonCustom } from "./ui/button-custom";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";

interface PracticeArea {
  id: number;
  icon: string | null; // Icon name as string from API
  title: string;
  description: string;
}

// Map string names to Lucide components
const iconMap: Record<string, ReactElement> = {
  Briefcase: <Briefcase className="h-8 w-8" />,
  Building2: <Building2 className="h-8 w-8" />, // For Banking & Finance
  Building: <Building className="h-8 w-8" />,   // For Real Estate
  Database: <Database className="h-8 w-8" />,   // For IP
  Scale: <Scale className="h-8 w-8" />,         // For Litigation
  Users: <Users className="h-8 w-8" />,         // For Employment
  Leaf: <Leaf className="h-8 w-8" />,           // For Environmental
  BarChart3: <BarChart3 className="h-8 w-8" />, // For Tax
  ScrollText: <ScrollText className="h-8 w-8" />,// For Insurance
  Landmark: <Landmark className="h-8 w-8" />,   // For Regulatory
  Globe: <Globe className="h-8 w-8" />,         // For Technology
  Heart: <Heart className="h-8 w-8" />,         // For Family
  Default: <HelpCircle className="h-8 w-8" />   // Default icon
};

const fetchPracticeAreas = async (): Promise<PracticeArea[]> => {
  const response = await fetch('/api/practice-areas');
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network response was not ok and no JSON body' }));
    throw new Error(errorData.message || 'Network response was not ok');
  }
  return response.json();
};

const PracticeAreas = () => {
  const { data: practiceAreas, isLoading, isError, error } = useQuery<PracticeArea[], Error>({
    queryKey: ['practiceAreas'],
    queryFn: fetchPracticeAreas,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isLoading || !practiceAreas || practiceAreas.length === 0) {
      return;
    }
    cardRefs.current = cardRefs.current.slice(0, practiceAreas.length);

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
      if (currentSectionRef) observer.unobserve(currentSectionRef);
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [isLoading, practiceAreas]);

  if (isLoading) return (
    <div className="container-custom text-center py-20">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-muted-foreground">Loading practice areas...</p>
    </div>
  );

  if (isError) return (
    <div className="container-custom text-center py-10">
      <p className="text-red-500">Error fetching practice areas: {error?.message}</p>
    </div>
  );

  if (!practiceAreas || practiceAreas.length === 0) return (
    <div className="container-custom text-center py-10">
      <p>No practice areas found.</p>
    </div>
  );

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
              key={area.id} // Use database ID
              ref={(el) => (cardRefs.current[index] = el)}
              className="opacity-0"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white">
                <CardHeader>
                  <div className="bg-primary/5 p-3 inline-flex rounded-lg mb-4">
                    {iconMap[area.icon || 'Default'] || iconMap.Default}
                  </div>
                  <CardTitle className="text-xl">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground line-clamp-4">
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
