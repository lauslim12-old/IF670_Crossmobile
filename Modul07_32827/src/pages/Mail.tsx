import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

export const mailData = [
  {
    id: '1',
    subject: 'Magang MBKM sudah dimulai',
  },
  {
    id: '2',
    subject: 'Bimbingan Skripsi',
  },
  {
    id: '3',
    subject: 'Progress Laporan',
  },
];

const Mail = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>Ionic Mail</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent className="ion-padding">
      {mailData.map((mail) => (
        <IonCard key={mail.id}>
          <IonCardContent className="ion-text-center">
            <h2>{mail.subject}</h2>
            <IonButton routerLink={`/mail/${mail.id}`}>View Mail</IonButton>
          </IonCardContent>
        </IonCard>
      ))}
    </IonContent>
  </IonPage>
);

export default Mail;
