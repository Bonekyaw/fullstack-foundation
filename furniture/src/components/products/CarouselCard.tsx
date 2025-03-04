import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types";
import { Link } from "react-router";

interface ProductProps {
  products: Product[];
}

const imageUrl = import.meta.env.VITE_IMG_URL;

export default function CarouselCard({ products }: ProductProps) {
  return (
    <Carousel
      className="w-full"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent className="-ml-1">
        {products.map((product) => (
          <CarouselItem key={product.id} className="pl-1 lg:basis-1/3">
            <div className="flex gap-4 p-4 lg:px-4">
              <img
                src={imageUrl + product.images[0].path}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="h-28 rounded-md"
              />
              <div>
                <h3 className="line-clamp-1 text-sm font-bold">
                  {product.name}
                </h3>
                <p className="my-2 line-clamp-2 text-sm text-gray-600">
                  {product.description}
                </p>
                <Link
                  to={`/products/${product.id}`}
                  className="text-sm font-semibold text-own hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
