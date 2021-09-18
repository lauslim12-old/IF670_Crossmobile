import { IonButton, IonCol, IonIcon, IonRow } from '@ionic/react';
import { calculatorOutline, refreshOutline } from 'ionicons/icons';

type Props = {
  calculateBMI: () => void;
  resetInputs: () => void;
};

const BmiControls = ({ calculateBMI, resetInputs }: Props) => (
  <IonRow>
    <IonCol className="ion-text-center" size="12" sizeMd="6">
      <IonButton expand="block" color="success" onClick={calculateBMI}>
        <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
        Calculate
      </IonButton>
    </IonCol>

    <IonCol className="ion-text-center" size="12" sizeMd="6">
      <IonButton fill="clear" color="medium" onClick={resetInputs}>
        <IonIcon slot="start" icon={refreshOutline}></IonIcon>
        Reset
      </IonButton>
    </IonCol>
  </IonRow>
);

export default BmiControls;
