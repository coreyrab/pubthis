import { Hero } from "@/components/hero";
import { InstallSteps } from "@/components/install-steps";
import { CodeBlock } from "@/components/code-block";
import { FeatureGrid } from "@/components/feature-grid";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <InstallSteps />
      <CodeBlock />
      <FeatureGrid />
      <FAQ />
      <Footer />
    </main>
  );
}
