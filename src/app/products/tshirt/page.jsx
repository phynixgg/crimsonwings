import ProductDetailView from "@/components/ProductDetailView";
import { products } from "@/data/products";

export const metadata = {
  title: `${products.tshirt.name} | Akahane Legion`,
  description: products.tshirt.description,
};

export default function TshirtPage() {
  return <ProductDetailView product={products.tshirt} />;
}
