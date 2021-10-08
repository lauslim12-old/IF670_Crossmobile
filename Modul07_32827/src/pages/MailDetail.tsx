import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useParams } from 'react-router';
import { mailData } from './Mail';

const MailDetail = () => {
  const mId = useParams<{ mailId: string }>().mailId;
  const selectedMail = mailData.find((mail) => mail.id === mId);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>

          <IonTitle>{selectedMail ? selectedMail?.subject : 'No mail found!'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Mail ID: {mId}</h2>
      </IonContent>
    </IonPage>
  );
};

export default MailDetail;
