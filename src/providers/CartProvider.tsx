import { CartItem, Product } from "@/types";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total:Number;
};
const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total:0
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const addItem = (product: Product, size: CartItem["size"]) => {
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
  const total  = items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity,total }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
