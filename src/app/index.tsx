import { View, Text } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { ActivityIndicator } from "react-native";
import { supabase } from "@/lib/supabase";
import Loader from "@/components/Loader";

const index = () => {
  console.log(
    "############################Starting Index Screen ############################"
  );

  const { session, loading, isAdmin, isLoggedIn, setIsLoggedin } = useAuth();

  if (loading) {
    console.log("indexScreen loading: ", loading);
    return <Loader />;
  } else if (!isLoggedIn) {
    console.log("Found Session: ", session);
    return <Redirect href={"/(auth)/sign-in"} />;
  } else if (!isAdmin) {
    return <Redirect href={"/(user)"} />;
  } else if (isAdmin) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
        <Link href={"/(user)"} asChild>
          <Button text="User" />
        </Link>
        <Link href={"/(admin)"} asChild>
          <Button text="Admin" />
        </Link>

        <Button text="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    );
  }
};

export default index;
