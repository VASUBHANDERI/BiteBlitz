import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { registerForPushNotificationsAsync } from "@/lib/notifications";
import { ExpoPushToken } from "expo-notifications";
import * as Notifications from "expo-notifications";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<String | undefined>();
  console.log(
    "################# calling useAuth() in NotificationProvider #################"
  );
  const { profile } = useAuth();

  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const savePushToken = async (newToken: string | undefined) => {
    if (!newToken || !profile) {
      console.log("No token or profile");
      return;
    }
    setExpoPushToken(newToken);

    // update the token in the database
    await supabase
      .from("profiles")
      .update({ expo_push_token: newToken })
      .eq("id", profile.id);

    console.log("Push token saved to database");
  };

  useEffect(() => {
    // registerForPushNotificationsAsync().then((token) => savePushToken(token));
    const registerDevice = async () => {
      const token = await registerForPushNotificationsAsync();
      savePushToken(token);
    };

    registerDevice();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [profile]);

  console.log("Push token: ", expoPushToken);
  // console.log("Notif: ", notification);

  return <>{children}</>;
};

export default NotificationProvider;
