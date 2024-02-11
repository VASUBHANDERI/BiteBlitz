import { supabase } from "@/lib/supabase";
import { UpdateTables } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useProfile = (id: string) => {
  return useQuery({
    queryKey: ["profiles", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      console.log(data);
      return data;
    },
  });
};



export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      updatedFields,
    }: {
      id: string;
      updatedFields: UpdateTables<"profiles">;
    }) {
      const { data: updatedOrder, error } = await supabase
        .from("profiles")
        .update(updatedFields)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }
      return updatedOrder;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ["profiles"] });
      await queryClient.invalidateQueries({ queryKey: ["profiles", id] });
    },
    onError(error) {
      console.log(error);
    },
  });
};
