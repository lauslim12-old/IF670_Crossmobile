import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react';
import { Units } from '../types';

type Props = {
  selectedValue: Units;
  onSelectValue: (val: Units) => void;
};

const InputControl = ({ selectedValue, onSelectValue }: Props) => {
  const inputChangeHandler = (e: CustomEvent) => {
    onSelectValue(e.detail.value);
  };

  return (
    <IonSegment value={selectedValue} onIonChange={inputChangeHandler}>
      <IonSegmentButton value="cmkg">
        <IonLabel>cm/kg</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="ftlbs">
        <IonLabel>ft/lbs</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default InputControl;
