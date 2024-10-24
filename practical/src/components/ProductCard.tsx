interface productType {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductCard = ({ id, name, price, image }: productType) => {
  return (
    <>
      <div>{id}</div>
      <div>{name}</div>
      <div>{price}</div>
      <img src={image} alt={name} />
    </>
  );
};

export default ProductCard;
