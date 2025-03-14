import { useIsFetching, useMutation } from "@tanstack/react-query";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import api from "@/api";
import { queryClient } from "@/api/query";

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
  const fetching = useIsFetching() > 0;
  let favourite = isFavourite;

  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const data = {
        productId: +productId,
        favourite: !isFavourite,
      };

      const response = await api.patch("users/products/toggle-favourite", data);
      if (response.status !== 200) {
        // toast message
        console.log(response.data);
      }
      return response.data;
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["products", "detail", productId],
    //   });
    // },
    // onError: () => {},
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", "detail", productId],
      });
    },
  });

  if (isPending || fetching) {
    favourite = !isFavourite;
  }

  return (
    <Button
      variant="secondary"
      size="icon"
      className={cn("size-8 shrink-0", className)}
      title={favourite ? "Remove from favourites" : "Add to favourites"}
      onClick={() => mutate()}
      {...props}
    >
      {favourite ? (
        <Icons.heartFill className="size-4 text-red-500" />
      ) : (
        <Icons.heart className="size-4 text-red-500" />
      )}
    </Button>
  );
}

export default AddToFavourite;
