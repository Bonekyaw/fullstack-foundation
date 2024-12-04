import { formatPrice } from "@/lib/utils";
import type { Cart } from "@/types";
import { Separator } from "@/components/ui/separator";
import Editable from "./Editable";

interface CartProps {
  cart: Cart;
}

function CartItem({ cart }: CartProps) {
  return (
    <div className="space-y-3">
      <div className="mb-2 mt-4 flex gap-4">
        <img
          src={cart.image.url}
          alt="cart pic"
          className="w-16 object-cover"
        />
        <div className="flex flex-col space-y-1">
          <span className="line-clamp-1 text-sm font-medium">{cart.name}</span>
          <span className="text-xs text-muted-foreground">
            {formatPrice(cart.price)} x {cart.quantity} ={" "}
            {formatPrice((cart.price * cart.quantity).toFixed(2))}
          </span>
          <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
            {`${cart.category} / ${cart.subcategory}`}
          </span>
        </div>
      </div>
      <Editable />
      <Separator />
    </div>
  );
}

export default CartItem;
