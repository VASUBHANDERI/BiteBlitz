import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Order, Tables, InsertTables, UpdateTables } from "@/types";
import { useAuth } from "@/providers/AuthProvider";

export const useInsertOrderItems = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn(items: InsertTables<"order_items">[]) {
      const { error, data: newItems } = await supabase
        .from("order_items")
        .insert(items)
        .select("*")
        

      if (error) {
        throw new Error(error.message);
      }
      return newItems;
    },
    async onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["order_items"] });
    },
  });
};
