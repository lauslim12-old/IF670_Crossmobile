import { IonButton, IonCol, IonIcon, IonRow } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';

type Props = {
  calculateBMI: () => void;
  resetInputs: () => void;
};

const BmiControls = ({ calculateBMI, resetInputs }: Props) => (
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
);

export default BmiControls;
