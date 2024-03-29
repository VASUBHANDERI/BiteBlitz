import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { supabase } from "./supabase";
import { Tables } from "@/types";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
export async function sendPushNotification(
  expoPushToken: string | null | undefined,
  title: string,
  body: string
) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: title,
    body: body,
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
  console.log("Sent push notification to token: ", expoPushToken);
}

export async function registerForPushNotificationsAsync() {
  console.log(
    "registerForPushNotificationsAsync ###############################################>>>>>>>>>>>>"
  );
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      })
    ).data;
    console.log("got from register with token", token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  console.log("returned token", token);
  return token;
}

const getUserToken = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("expo_push_token")
    .eq("id", userId)
    .single();
  return data?.expo_push_token;
};

export const notifyUserAboutOrderUPdate = async (order: Tables<"orders">) => {
  console.log("order update notification triggered!");
  const token = await getUserToken(order.user_id);
  sendPushNotification(
    token,
    `Order #${order.id}`,
    `Your order is now ${order.status}`
  );
};
