import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

interface FavouriteProp extends ButtonProps {
  productId: string;
  rating: number;
}

function AddToFavourite({
  // productId,
  // rating,
  className,
  ...props
}: FavouriteProp) {
  return (
    <Button
      variant="secondary"
      size="icon"
      className={cn("size-8 shrink-0", className)}
      {...props}
    >
      <Icons.heart className="size-4" />
    </Button>
  );
}

export default AddToFavourite;
