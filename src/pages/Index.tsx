
import { Suspense, lazy, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy load components
const Hero = lazy(() => import('@/components/Hero'));
const About = lazy(() => import('@/components/About'));
const PracticeAreas = lazy(() => import('@/components/PracticeAreas'));
const Team = lazy(() => import('@/components/Team'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const Contact = lazy(() => import('@/components/Contact'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner size="lg" />
  </div>
);

const Index = () => {
  useEffect(() => {
    // Preload the components after initial render
    const preloadComponents = async () => {
      const componentImporters = [
        () => import('@/components/Hero'),
        () => import('@/components/About'),
        () => import('@/components/PracticeAreas'),
        () => import('@/components/Team'),
        () => import('@/components/Testimonials'),
        () => import('@/components/Contact')
      ];
      
      for (const importer of componentImporters) {
        await importer();
        await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
      }
    };
    
    preloadComponents();
  }, []);

  return (
    <MainLayout>
      <Suspense fallback={<LoadingFallback />}>
        <Hero />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <About />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <PracticeAreas />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Team />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <Contact />
      </Suspense>
    </MainLayout>
  );
};

export default Index;
