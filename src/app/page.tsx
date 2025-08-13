// app/page.tsx
import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { About } from '@/components/landing/about';
import { Features } from '@/components/landing/features';
import { WhyChooseUs } from '@/components/landing/why-choose-us';
import { Testimonials } from '@/components/landing/testimonials';
import { Pricing } from '@/components/landing/pricing';
import { CTA } from '@/components/landing/cta';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Features />
        <WhyChooseUs />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
