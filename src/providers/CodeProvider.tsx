import { PropsWithChildren, createContext, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "@/api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "@/api/order-items";
import { initialisePaymentSheet, openPaymentSheet } from "@/lib/stripe";

type CodeType = {
  code: string;
  setCode: (value: string) => void;
};
const CodeContext = createContext<CodeType>({
  code: "",
  setCode: () => {},
});

const CodeProvider = ({ children }: PropsWithChildren) => {
  const [cod, setcode] = useState("");
  const setCode = (value: string) => {
    setcode(value);
  }
const code = cod;
  return (
    <CodeContext.Provider
      value={{ code,setCode }}
    >
      {children}
    </CodeContext.Provider>
  );
};

export default CodeProvider;

export const useCode = () => useContext(CodeContext);
