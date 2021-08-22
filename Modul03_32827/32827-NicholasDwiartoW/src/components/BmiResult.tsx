import { IonCard, IonCardContent, IonCol } from '@ionic/react';
import { Category } from '../types';

type Props = {
  calculatedBMI: number;
  bmiCategory: Category;
};

const BmiResult = ({ calculatedBMI, bmiCategory }: Props) => (
  <IonCol>
    <IonCard>
      <IonCardContent className="ion-text-center">
        <h2>{calculatedBMI}</h2>
        <h1>{bmiCategory}</h1>
      </IonCardContent>
    </IonCard>
  </IonCol>
);

export default BmiResult;
