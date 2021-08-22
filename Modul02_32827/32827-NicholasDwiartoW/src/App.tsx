import {
  IonApp,
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { calculatorOutline, refreshOutline } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useRef, useState } from 'react';

const App: React.FC = () => {
  const [bmiCategory, setBmiCategory] = useState('');
  const [calculatedBMI, setCalculatedBMI] = useState(0);
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    if (
      !heightInputRef.current ||
      !weightInputRef.current ||
      !weightInputRef.current.value ||
      !heightInputRef.current.value
    ) {
      return;
    }

    const enteredWeight = Number(weightInputRef.current.value);
    const enteredHeight = Number(heightInputRef.current.value) / 100;

    if (!enteredWeight || !enteredWeight) {
      return;
    }

    const bmi = enteredWeight / (enteredHeight * enteredHeight);
    setCalculatedBMI(bmi);

    if (bmi < 18.5) {
      setBmiCategory('Kurus');
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      setBmiCategory('Normal');
    } else if (bmi >= 25 && bmi <= 29.9) {
      setBmiCategory('Gemuk');
    } else {
      setBmiCategory('Obseitas');
    }
  };

  const resetInputs = () => {
    if (
      !heightInputRef.current ||
      !weightInputRef.current ||
      !weightInputRef.current.value ||
      !heightInputRef.current.value
    ) {
      return;
    }

    weightInputRef.current.value = '';
    heightInputRef.current.value = '';
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Tinggi Badan (cm)</IonLabel>
                <IonInput ref={heightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Berat Badan (kg)</IonLabel>
                <IonInput ref={weightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="ion-text-left">
              <IonButton onClick={calculateBMI}>
                <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
                Calculate
              </IonButton>
            </IonCol>
            <IonCol className="ion-text-right">
              <IonButton onClick={resetInputs}>
                <IonIcon slot="start" icon={refreshOutline}></IonIcon>
                Reset
              </IonButton>
            </IonCol>
          </IonRow>

          {calculatedBMI ? (
            <IonCol>
              <IonCard>
                <IonCardContent className="ion-text-center">
                  <h2>{calculatedBMI}</h2>
                  <h1>{bmiCategory}</h1>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ) : null}
        </IonGrid>
      </IonContent>
    </IonApp>
  );
};

export default App;
