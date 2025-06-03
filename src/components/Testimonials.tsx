
import { useRef, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  authorTitle: string | null;
}

const fetchTestimonials = async (): Promise<Testimonial[]> => {
  const response = await fetch('/api/testimonials');
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network response was not ok and no JSON body' }));
    throw new Error(errorData.message || 'Network response was not ok');
  }
  return response.json();
};

const Testimonials = () => {
  const { data: testimonials, isLoading, isError, error } = useQuery<Testimonial[], Error>({
    queryKey: ['testimonials'],
    queryFn: fetchTestimonials,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  // testimonialRefs for individual testimonial cards for animation, if needed, can be added similarly to other components.
  // For now, the main section animation is kept.

  const showNext = () => {
    if (testimonials && testimonials.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  const showPrev = () => {
    if (testimonials && testimonials.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

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

    let intervalId: NodeJS.Timeout | null = null;
    if (testimonials && testimonials.length > 0) {
      intervalId = setInterval(showNext, 7000); // Increased interval slightly
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [testimonials]); // Rerun effect if testimonials data changes for interval logic

  if (isLoading) return (
    <section id="testimonials" className="section bg-primary text-white">
      <div className="container-custom text-center py-20">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-white/80">Loading testimonials...</p>
      </div>
    </section>
  );

  if (isError) return (
    <section id="testimonials" className="section bg-primary text-white">
      <div className="container-custom text-center py-10">
        <p className="text-red-300">Error fetching testimonials: {error?.message}</p>
      </div>
    </section>
  );

  if (!testimonials || testimonials.length === 0) return (
    <section id="testimonials" className="section bg-primary text-white">
      <div className="container-custom text-center py-10">
        <p>No testimonials available at the moment.</p>
      </div>
    </section>
  );

  return (
    <section id="testimonials" className="section bg-primary text-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0" ref={sectionRef}>
          <Badge variant="outline" className="mb-4 border-white/30 text-white">
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">What Our Clients Say</h2>
          <p className="text-white/80">
            Our clients trust us with their most important legal matters.
            Here's what they have to say about working with Mungai & Njenga.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4"> {/* Use database ID */}
                  <Card className="bg-white/10 backdrop-blur-md border-none shadow-lg min-h-[250px] md:min-h-[280px] flex flex-col justify-center">
                    <CardContent className="p-8 md:p-12">
                      <Quote className="h-10 w-10 md:h-12 md:w-12 text-secondary opacity-80 mb-4 md:mb-6" />
                      <p className="text-lg md:text-xl lg:text-2xl font-serif italic mb-6 md:mb-8 line-clamp-5">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        {testimonial.authorTitle && (
                          <p className="text-white/70 text-sm">{testimonial.authorTitle}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {testimonials.length > 1 && (
            <>
              <div className="flex justify-center mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                      currentIndex === index ? "bg-white" : "bg-white/30"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={showPrev}
                className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white h-10 w-10 rounded-full flex items-center justify-center transition-all hover:bg-white/20 disabled:opacity-50"
                aria-label="Previous testimonial"
                disabled={testimonials.length <= 1}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={showNext}
                className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white h-10 w-10 rounded-full flex items-center justify-center transition-all hover:bg-white/20 disabled:opacity-50"
                aria-label="Next testimonial"
                disabled={testimonials.length <= 1}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
