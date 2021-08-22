import {
  IonAlert,
  IonApp,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

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
import BmiControls from './components/BmiControls';
import InputControl from './components/InputControl';
import { Category, Units } from './types';
import BmiResult from './components/BmiResult';

const App: React.FC = () => {
  const [bmiCategory, setBmiCategory] = useState<Category>('Normal');
  const [calculatedBMI, setCalculatedBMI] = useState(0);
  const [calcUnits, setCalcUnits] = useState<Units>('cmkg');
  const [error, setError] = useState('');
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    let enteredWeight, enteredHeight;

    if (
      !heightInputRef.current ||
      !weightInputRef.current ||
      !weightInputRef.current.value ||
      !heightInputRef.current.value
    ) {
      return;
    }

    if (calcUnits === 'cmkg') {
      enteredWeight = Number(weightInputRef.current.value);
      enteredHeight = Number(heightInputRef.current.value) / 100;
    } else if (calcUnits === 'ftlbs') {
      enteredWeight = Number(weightInputRef.current.value) * 0.453; // convert lbs to kg
      enteredHeight = Number(heightInputRef.current.value) * 0.3048; // convert ft to m
    } else {
      setError(
        "You're definitely something if you can hack the units that I had predefined in this Ionic application."
      );
      return;
    }

    if (!enteredWeight || !enteredWeight || enteredWeight < 0 || enteredHeight < 0) {
      setError('Please return a non-negative input number!');
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
      setBmiCategory('Obesitas');
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

  const clearError = () => {
    setError('');
  };

  const selectCalcUnitHandler = (selectValue: Units) => {
    setCalcUnits(selectValue);
  };

  return (
    <>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: 'Okay', handler: clearError }]}
      />

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
                <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler} />
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Tinggi Badan ({calcUnits === 'cmkg' ? 'cm' : 'feet'})
                  </IonLabel>
                  <IonInput ref={heightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Berat Badan ({calcUnits === 'ftlbs' ? 'lbs' : 'kg'})
                  </IonLabel>
                  <IonInput ref={weightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>

            <BmiControls calculateBMI={calculateBMI} resetInputs={resetInputs} />

            {calculatedBMI ? (
              <BmiResult calculatedBMI={calculatedBMI} bmiCategory={bmiCategory} />
            ) : null}
          </IonGrid>
        </IonContent>
      </IonApp>
    </>
  );
};

export default App;
