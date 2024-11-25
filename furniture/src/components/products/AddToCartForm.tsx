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

const quantitySchema = z.object({
  quantity: z.number().min(0).default(1),
});

interface ShowBuyNowProps {
  canBuy: boolean;
}

export default function AddToCartForm({ canBuy }: ShowBuyNowProps) {
  const form = useForm<z.infer<typeof quantitySchema>>({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      quantity: 1,
    },
  });

  function onSubmit(values: z.infer<typeof quantitySchema>) {
    console.log(values);
    // Call api
    toast.success("Product is added to cart successfully.");
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
                    min={0}
                    {...field}
                    className="h-8 w-16 rounded-none border-x-0"
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
            Add To Cart
          </Button>
        </div>
      </form>
    </Form>
  );
}
