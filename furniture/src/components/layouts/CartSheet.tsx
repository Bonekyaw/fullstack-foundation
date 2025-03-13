import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cartItems } from "@/data/carts";
import { Icons } from "@/components/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartItem from "@/components/carts/CartItem";
import { formatPrice } from "@/lib/utils";

export default function CartSheet() {
  const itemCount = 4;
  const amountTotal = 190;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          aria-label="Open cart"
        >
          <Badge
            variant="destructive"
            className="absolute -right-2 -top-2 size-6 justify-center rounded-full p-2.5"
          >
            {itemCount}
          </Badge>
          <Icons.cart className="size-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:max-w-lg">
        <SheetHeader>
          <SheetTitle>Cart - {itemCount}</SheetTitle>
        </SheetHeader>
        <Separator className="my-2" />
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="my-4 h-[68vh] pb-8">
              <div className="flex-1">
                {cartItems.map((cart) => (
                  <CartItem cart={cart} key={cart.id} />
                ))}
              </div>
            </ScrollArea>
            <div className="space-y-4">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>{formatPrice(amountTotal.toFixed(2))}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit" asChild className="w-full">
                    <Link to="/checkout" aria-label="Check out">
                      Continue to checkout
                    </Link>
                  </Button>
                </SheetClose>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <Icons.cart className="mb-4 size-16 text-muted-foreground" />
            <div className="text-xl font-medium text-muted-foreground">
              Your cart is empty
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
