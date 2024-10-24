import t1 from "@/assets/images/t1.png";
import t2 from "@/assets/images/t2.png";
import t3 from "@/assets/images/t3.png";
import ProductCard from "@/components/ProductCard";

const products = [
  { id: 1, name: "T-Shirt", price: 20, image: t1 },
  { id: 2, name: "Jeans", price: 40, image: t2 },
  { id: 3, name: "Jacket", price: 60, image: t3 },
];

function Shop() {
  return (
    <section className="flex grow bg-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Shop;
