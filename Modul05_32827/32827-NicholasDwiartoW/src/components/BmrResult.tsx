import { IonCard, IonCardContent, IonCol, IonGrid, IonRow, IonText } from '@ionic/react';

import { Calories } from '../types';

type Props = {
  bmr: number;
  calories: Calories;
};

const BmrResult = ({ bmr, calories }: Props) => (
  <IonCol>
    <IonCard id="result">
      <IonCardContent className="ion-text-center">
        <h1>BMR: {bmr} calories / day!</h1>
        <h2>Daily calories need to be based on your activity level.</h2>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonText color="dark">Activity Level</IonText>
            </IonCol>
            <IonCol>
              <IonText color="dark">Calories</IonText>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>Sedentary: little to no exercise</IonCol>
            <IonCol>{calories.sedentary}</IonCol>
          </IonRow>

          <IonRow>
            <IonCol>Exercise 1-3 times/week</IonCol>
            <IonCol>{calories.lightExercise}</IonCol>
          </IonRow>

          <IonRow>
            <IonCol>Exercise 4-5 times/week</IonCol>
            <IonCol>{calories.mediumExercise}</IonCol>
          </IonRow>

          <IonRow>
            <IonCol>Daily exercise</IonCol>
            <IonCol>{calories.regularExercise}</IonCol>
          </IonRow>

          <IonRow>
            <IonCol>Intense exercise 6-7 times/week</IonCol>
            <IonCol>{calories.intenseExercise}</IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  </IonCol>
);

export default BmrResult;
