import { supabase } from "@/lib/supabase";
import { Tables } from "@/types";
import { useStripe } from "@stripe/stripe-react-native";
import { Session } from "@supabase/supabase-js";
import { Redirect } from "expo-router";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const StripeFunctionsContext = createContext<any>(null);

export default function StripeFunctionsProvider({
  children,
}: PropsWithChildren) {
  const stripeFunctions = useStripe();

  return (
    <StripeFunctionsContext.Provider value={stripeFunctions}>
      {children}
    </StripeFunctionsContext.Provider>
  );
}

export const useStripeFunctions = () => {
  return useContext(StripeFunctionsContext);
};
