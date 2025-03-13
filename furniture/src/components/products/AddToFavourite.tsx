import { useFetcher } from "react-router";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

interface FavouriteProp extends ButtonProps {
  productId: string;
  rating: number;
  isFavourite: boolean;
}

function AddToFavourite({
  productId,
  // rating,
  isFavourite,
  className,
  ...props
}: FavouriteProp) {
  const fetcher = useFetcher({ key: `product:${productId}` });

  let favourite = isFavourite;
  if (fetcher.formData) {
    favourite = fetcher.formData.get("favourite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <Button
        variant="secondary"
        size="icon"
        className={cn("size-8 shrink-0", className)}
        name="favourite"
        value={favourite ? "false" : "true"}
        title={favourite ? "Remove from favourites" : "Add to favourites"}
        {...props}
      >
        {favourite ? (
          <Icons.heartFill className="size-4 text-red-500" />
        ) : (
          <Icons.heart className="size-4 text-red-500" />
        )}
      </Button>
    </fetcher.Form>
  );
}

export default AddToFavourite;
