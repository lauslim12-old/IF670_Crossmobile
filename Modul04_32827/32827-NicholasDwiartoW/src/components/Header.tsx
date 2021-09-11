import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

const Header = ({ title }: { title: string }) => (
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonBackButton defaultHref="/home" />
      </IonButtons>
      <IonTitle>{title}</IonTitle>
    </IonToolbar>
  </IonHeader>
);

export default Header;
