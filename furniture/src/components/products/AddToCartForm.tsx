import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  //FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

const quantitySchema = z.object({
  quantity: z
    .string()
    .min(1, "Must not be empty")
    .max(4, "Too Many! Is it real?")
    .regex(/^\d+$/, "Must be a number"),
});

interface ShowBuyNowProps {
  canBuy: boolean;
  onHandleCart: (quantity: number) => void;
  idInCart: number;
}

export default function AddToCartForm({
  canBuy,
  onHandleCart,
  idInCart,
}: ShowBuyNowProps) {
  const cartItem = useCartStore((state) =>
    state.carts.find((item) => item.id === idInCart),
  );

  const form = useForm<z.infer<typeof quantitySchema>>({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      quantity: cartItem ? cartItem.quantity.toString() : "1",
    },
  });

  const { setValue, watch } = form;
  const currentQuantity = Number(watch("quantity"));

  useEffect(() => {
    if (cartItem) {
      setValue("quantity", cartItem.quantity.toString(), {
        shouldValidate: true,
      });
    }
  }, [cartItem, setValue]);

  const handleDecrease = () => {
    const newQuantity = Math.max(currentQuantity - 1, 0); // Min limit 0
    setValue("quantity", newQuantity.toString(), { shouldValidate: true });
  };

  const handleIncrease = () => {
    const newQuantity = Math.min(currentQuantity + 1, 9999); // Max limit 9999
    setValue("quantity", newQuantity.toString(), { shouldValidate: true });
  };

  function onSubmit(values: z.infer<typeof quantitySchema>) {
    // console.log(values);
    // Call api
    onHandleCart(Number(values.quantity));
    toast.success(
      cartItem
        ? "Updated Cart successfully"
        : "Product is added to cart successfully.",
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-[260px] flex-col gap-4"
      >
        <div className="flex items-center">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8 shrink-0 rounded-r-none"
            onClick={handleDecrease}
            disabled={currentQuantity <= 1}
          >
            <Icons.minus className="size-3" aria-hidden="true" />
            <span className="sr-only">Remove one item</span>
          </Button>
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="sr-only">Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={9999}
                    {...field}
                    className="h-8 w-16 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8 shrink-0 rounded-l-none"
            onClick={handleIncrease}
            disabled={currentQuantity >= 9999}
          >
            <Icons.plus className="size-3" aria-hidden="true" />
            <span className="sr-only">Add one item</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2.5">
          <Button
            type="button"
            aria-label="Buy now"
            size="sm"
            className={cn("w-full bg-own font-bold", !canBuy && "bg-slate-400")}
          >
            Buy Now
          </Button>
          <Button
            type="submit"
            aria-label="Add To Cart"
            variant={canBuy ? "outline" : "default"}
            size="sm"
            className="w-full font-semibold"
          >
            {cartItem ? "Update Cart" : "Add To Cart"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
