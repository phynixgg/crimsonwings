import Hero from "@/components/Hero";
import ModelShowcase from "@/components/ModelShowcase";
import ProductHighlight from "@/components/ProductHighlight";
import BrandStory from "@/components/BrandStory";

// Single-page parallax landing page.
export default function HomePage() {
  return (
    <>
      <Hero />
      <ModelShowcase />
      <ProductHighlight />
      <BrandStory />
    </>
  );
}
