import { registerForPushNotificationsAsync } from "@/lib/notifications";
import { ExpoPushToken } from "expo-notifications";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<
    ExpoPushToken | undefined
  >();
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
        setExpoPushToken(token as ExpoPushToken | undefined)
    );

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
  }, []);

console.log("Notification: ",notification);
console.log("Push Token: ",expoPushToken);

  return <>{children}</>;
};

export default NotificationProvider;
