import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Calculator</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent className="ion-padding">
      <h2 className="title">00000032827 - Nicholas Dwiarto Wirasbawa</h2>

      <IonButton expand="block" routerLink="/bmi">
        BMI Calculator
      </IonButton>

      <IonButton expand="block" routerLink="/bmr">
        BMR Calculator
      </IonButton>
    </IonContent>
  </IonPage>
);

export default Home;
