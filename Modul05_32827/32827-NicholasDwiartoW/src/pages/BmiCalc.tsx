import {
  IonAlert,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
} from '@ionic/react';
import { useRef, useState } from 'react';

import { Category, Units } from '../types';
import BmiControls from '../components/BmiControls';
import InputControl from '../components/InputControl';
import BmiResult from '../components/BmiResult';
import Header from '../components/Header';

const BmiCalc: React.FC = () => {
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

      <IonPage>
        <Header title="BMI Calculator" />

        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol sizeSm="8" offsetSm="2" sizeMd="6" offsetMd="3">
                <IonGrid className="ion-no-padding">
                  <IonRow>
                    <IonCol>
                      <InputControl
                        selectedValue={calcUnits}
                        onSelectValue={selectCalcUnitHandler}
                      />
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
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default BmiCalc;
