import { useState } from "react";
interface productType {
  //   id: number;
  name: string;
  price: number;
  image: string;
}

const ProductCard = ({ name, price, image }: productType) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-lg">
      <div className="relative h-48 w-full">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse rounded-md bg-gray-200"></div>
        )}
        <img
          src={image}
          alt={name}
          className={`h-full w-full rounded-md object-contain transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={handleImageLoad}
        />
      </div>
      <div className="mt-2 flex justify-between">
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-gray-600">${price}</p>
        </div>
        <button className="rounded-md bg-sky-500 px-4 py-2 text-white hover:bg-sky-600">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
