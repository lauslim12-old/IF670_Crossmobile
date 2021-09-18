import {
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
} from '@ionic/react';
import { useState } from 'react';
import BmiControls from '../components/BmiControls';
import BmrResult from '../components/BmrResult';
import Header from '../components/Header';
import InputControl from '../components/InputControl';
import { Calories, Units } from '../types';

// Pure functions (given same input, return same output) as to not pollute the component scope.
const calculateBmrMale = (weight: number, height: number, age: number) =>
  66 + 13.7 * weight + 5 * height - 6.8 * age;

const calculateBmrFemale = (weight: number, height: number, age: number) =>
  65 + 9.6 * weight + 1.8 * height - 4.7 * age;

const convertFtlbsToCmkg = (weight: number, height: number) => {
  const lbsToKilograms = weight * 0.453;
  const feetToCentimeters = height * 30.48;

  return [lbsToKilograms, feetToCentimeters];
};

const calculateCalories = (bmr: number): Calories => {
  const sedentary = bmr * 1.2;
  const lightExercise = bmr * 1.375;
  const mediumExercise = bmr * 1.55;
  const regularExercise = bmr * 1.725;
  const intenseExercise = bmr * 1.9;

  return {
    sedentary,
    lightExercise,
    mediumExercise,
    regularExercise,
    intenseExercise,
  };
};

// Main component to handle Ionic events and activities.
const BmrCalc = () => {
  const [age, setAge] = useState(0);
  const [calculatedBmr, setCalculatedBmr] = useState(0);
  const [calcUnits, setCalcUnits] = useState('cmkg' as Units);
  const [calories, setCalories] = useState({} as Calories);
  const [gender, setGender] = useState('male' as 'female' | 'male');
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);

  const calculateBmrHandler = () => {
    const [convertedWeight, convertedHeight] =
      calcUnits === 'ftlbs' ? convertFtlbsToCmkg(weight, height) : [weight, height];
    const bmr =
      gender === 'male'
        ? calculateBmrMale(convertedWeight, convertedHeight, age)
        : calculateBmrFemale(convertedWeight, convertedHeight, age);

    // Calculate required calories.
    const calories = calculateCalories(bmr);

    // Do all side effects.
    setCalculatedBmr(bmr);
    setCalories(calories);
  };

  const selectCalcUnitHandler = (selectedValue: Units) => {
    setCalcUnits(selectedValue);
  };

  const resetInputs = () => {
    setGender('male');
    setAge(0);
    setHeight(0);
    setWeight(0);
  };

  return (
    <IonPage>
      <Header title="BMR Calculator" />

      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol sizeSm="8" offsetSm="2" sizeMd="6" offsetMd="3">
              <IonGrid className="ion-no-padding">
                <IonRow>
                  <IonCol>
                    <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler} />
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="floating">Age</IonLabel>
                      <IonInput
                        type="number"
                        onIonChange={({ detail: { value } }) => setAge(Number(value))}
                        value={age}
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRadioGroup
                  value={gender}
                  onIonChange={({ detail: { value } }) => setGender(value)}
                >
                  <IonRow>
                    <IonCol>
                      <IonItem lines="none">
                        <IonLabel>Gender</IonLabel>
                      </IonItem>

                      <IonRow>
                        <IonCol>
                          <IonItem>
                            <IonLabel>Male</IonLabel>
                            <IonRadio slot="start" value="male" />
                          </IonItem>
                        </IonCol>

                        <IonCol>
                          <IonItem>
                            <IonLabel>Female</IonLabel>
                            <IonRadio slot="start" value="female" />
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                </IonRadioGroup>

                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="floating">
                        Tinggi Badan ({calcUnits === 'cmkg' ? 'cm' : 'feet'})
                      </IonLabel>
                      <IonInput
                        type="number"
                        onIonChange={({ detail: { value } }) => setHeight(Number(value))}
                        value={height}
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel position="floating">
                        Berat Badan ({calcUnits === 'ftlbs' ? 'lbs' : 'kg'})
                      </IonLabel>
                      <IonInput
                        type="number"
                        onIonChange={({ detail: { value } }) => setWeight(Number(value))}
                        value={weight}
                      ></IonInput>
                    </IonItem>
                  </IonCol>
                </IonRow>

                <BmiControls calculateBMI={calculateBmrHandler} resetInputs={resetInputs} />

                {calculatedBmr && calories ? (
                  <BmrResult bmr={calculatedBmr} calories={calories} />
                ) : null}
              </IonGrid>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default BmrCalc;
