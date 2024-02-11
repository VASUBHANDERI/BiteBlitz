import { CartItem, PizzaSize, Tables } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "@/api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "@/api/order-items";

type CartType = {
  items: CartItem[];
  addItem: (product: Tables<"products">, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: Number;
  checkout: () => void;
};
const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems } = useInsertOrderItems();

  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const addItem = (product: Tables<"products">, size: CartItem["size"]) => {
    // if product is already in the cart
    const existingItem = items.find(
      (item) => item.product_id === product.id && item.size === size
    );
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }
    // adding a new product to the cart
    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItems([newCartItem, ...items]);
  };
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + amount } : item
    );
    setItems(updatedItems.filter((item) => item.quantity > 0) as CartItem[]); // remove if empty
  };
  // calculate total
  const getFactor = (size: PizzaSize) => {
    if (size == "M") {
      return 1;
    } else if (size == "L") {
      return 1.5;
    } else if (size == "XL") {
      return 2;
    } else if (size == "S") {
      return 0.8;
    }
    return 1;
  };
  const total: number = items.reduce(
    (sum: number, item: CartItem) => sum + item.quantity * item.product.price * getFactor(item.size),
    0
  );
  const clearCart = () => {
    setItems([]);
  };

  const saveOrderItems = (order: Tables<"orders">) => {
    const orderItems = items.map((CartItem)=> {
      return {
        product_id: CartItem.product_id,
        order_id: order.id,
        size: CartItem.size,
        quantity: CartItem.quantity,
      };
    });

   insertOrderItems(orderItems,{onSuccess(){
    clearCart();
    router.push(`/(user)/orders`);
   }})
  };

  const checkout = () => {
    insertOrder(
      { total },
      {
        onSuccess: saveOrderItems,
      }
    );
  };
  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
