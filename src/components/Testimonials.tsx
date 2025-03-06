
import { useRef, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Mungai & Njenga provided exceptional legal counsel during our corporate restructuring. Their strategic approach and attention to detail were invaluable.",
    author: "Jane Smith",
    title: "CEO, Horizon Enterprises"
  },
  {
    quote: "The team's expertise in real estate law saved us from potential pitfalls during a complex property acquisition. Their guidance was thorough and practical.",
    author: "Michael Chen",
    title: "Director, Urban Development Group"
  },
  {
    quote: "I cannot recommend Mungai & Njenga highly enough. Their dedication to my case and clear communication throughout the process made a difficult situation manageable.",
    author: "Sarah Johnson",
    title: "Client"
  },
  {
    quote: "Working with Mungai & Njenga has been transformative for our business. Their proactive approach to legal matters has allowed us to focus on growth with confidence.",
    author: "Thomas Ochieng",
    title: "Founder, TechInnovate"
  },
  {
    quote: "The intellectual property team at Mungai & Njenga provided strategic advice that helped us protect our innovations and expand our market presence.",
    author: "Patricia Wambui",
    title: "COO, Creative Solutions Ltd"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);

  const showNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const showPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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

    const interval = setInterval(() => {
      showNext();
    }, 5000);

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
      clearInterval(interval);
    };
  }, []);

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
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-white/10 backdrop-blur-md border-none shadow-lg">
                    <CardContent className="p-8 md:p-12">
                      <Quote className="h-12 w-12 text-secondary opacity-80 mb-6" />
                      <p className="text-xl md:text-2xl font-serif italic mb-8">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-white/70 text-sm">{testimonial.title}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

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

          {/* Navigation buttons */}
          <button
            onClick={showPrev}
            className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white h-10 w-10 rounded-full flex items-center justify-center transition-all hover:bg-white/20"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={showNext}
            className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 bg-white/10 backdrop-blur-md text-white h-10 w-10 rounded-full flex items-center justify-center transition-all hover:bg-white/20"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
