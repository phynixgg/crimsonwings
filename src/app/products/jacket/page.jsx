import ProductDetailView from "@/components/ProductDetailView";
import { products } from "@/data/products";

export const metadata = {
  title: `${products.jacket.name} | Akahane Legion`,
  description: products.jacket.description,
};

export default function JacketPage() {
  return <ProductDetailView product={products.jacket} />;
}
