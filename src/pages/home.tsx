import { CodeDemo } from '@/components/code-demo';
import { CTA } from '@/components/cta';
import { Features } from '@/components/features';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Navbar } from '@/components/navbar';
import { Stats } from '@/components/stats';

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <CodeDemo />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
