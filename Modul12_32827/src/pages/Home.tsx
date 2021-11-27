import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { Toast } from "@capacitor/toast";
import {
  PushNotifications,
  Token,
  PushNotificationSchema,
  ActionPerformed,
} from "@capacitor/push-notifications";

const Home: React.FC = () => {
  const [notifications, setNotifications] = useState([] as any[]);

  const showToast = async (msg: string) => {
    await Toast.show({ text: msg });
  };

  const registerPush = () => {
    console.log("Initializing HomePage");

    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener("registration", (token: Token) => {
      showToast("Push registration success");
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener("registrationError", (error: any) => {
      alert("Error on registration: " + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification: PushNotificationSchema) => {
        setNotifications((notifications) => [
          ...notifications,
          {
            id: notification.id,
            title: notification.title,
            body: notification.body,
            type: "foreground",
          },
        ]);
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification: ActionPerformed) => {
        setNotifications((notifications) => [
          ...notifications,
          {
            id: notification.notification.data.id,
            title: notification.notification.data.title,
            body: notification.notification.data.body,
            type: "action",
          },
        ]);
      }
    );
  };

  useEffect(() => {
    PushNotifications.checkPermissions().then((res) => {
      if (res.receive !== "granted") {
        PushNotifications.requestPermissions().then((res) => {
          if (res.receive === "denied") {
            showToast("Push Notification permission denied");
          } else {
            showToast("Push Notification permission granted");
            registerPush();
          }
        });
      } else {
        registerPush();
      }
    });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Push Notifications</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>
            <p>Pengujian Push Notification</p>
          </IonCardContent>
        </IonCard>

        <IonListHeader>Notifications:</IonListHeader>

        <IonList>
          {notifications.map((notif: any) => (
            <IonItem key={notif.id}>
              <IonLabel>
                <IonText>
                  <h3>{notif.title}</h3>
                </IonText>

                <p>{notif.body}</p>

                {notif.type === "foreground" && (
                  <p>This data was received in foreground</p>
                )}

                {notif.type === "background" && (
                  <p>This data was received in background</p>
                )}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton color="success" expand="full" onClick={registerPush}>
            Register for Push
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
