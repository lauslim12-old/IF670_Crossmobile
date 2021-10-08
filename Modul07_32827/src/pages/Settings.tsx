import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

const Settings = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>

        <IonTitle>Settings</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent className="ion-padding">
      <h2>This is settings page!</h2>
    </IonContent>
  </IonPage>
);

export default Settings;
