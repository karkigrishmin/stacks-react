import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { CodeDemo } from '@/components/code-demo';
import { Stats } from '@/components/stats';
import { CTA } from '@/components/cta';
import { Footer } from '@/components/footer';

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
