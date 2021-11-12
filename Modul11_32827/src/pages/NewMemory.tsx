import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { cameraSharp } from 'ionicons/icons';
import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import MemoriesContext, { Memory } from '../data/memories-context';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Geolocation } from '@capacitor/geolocation';
import { createMemory } from '../firebase';

const NewMemory = () => {
  const [chosenMemoryType, setChosenMemoryType] = useState('good' as 'good' | 'bad');
  const [lat, setLat] = useState(-6.257608009415188);
  const [lng, setLng] = useState(106.61837051975617);
  const [selectedPhoto, setSelectedPhoto] = useState<File>();
  const memoriesCtx = useContext(MemoriesContext);
  const history = useHistory();
  const titleRef = useRef<HTMLIonInputElement>(null);

  useEffect(() => {
    getCurrentPosition();
  }, []);

  const handleChangeChosenMemory = (e: CustomEvent) => {
    setChosenMemoryType(e.detail.value);
  };

  const handleAddMemory = async () => {
    const enteredTitle = titleRef.current?.value;
    if (
      !enteredTitle ||
      enteredTitle.toString().trim().length === 0 ||
      !chosenMemoryType ||
      !selectedPhoto
    ) {
      return;
    }

    // create new memory
    const newMemory: Memory = {
      id: Math.random().toString(),
      title: enteredTitle.toString(),
      type: chosenMemoryType,
      lat,
      lng,
    };

    try {
      const recentlyAdded = await createMemory(newMemory, selectedPhoto);

      memoriesCtx.addMemory(
        recentlyAdded.imageUrl!,
        recentlyAdded.title,
        recentlyAdded.type,
        recentlyAdded.lat,
        recentlyAdded.lng
      );
    } catch (err) {
      throw err;
    }

    if (history.length > 0) {
      history.goBack();
    } else {
      history.replace('/tabs/good');
    }
  };

  const getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });

    setLat(coordinates.coords.latitude);
    setLng(coordinates.coords.longitude);
  };

  const selectPosition = (e: google.maps.MapMouseEvent) => {
    if (e.latLng?.lat()) {
      setLat(e.latLng?.lat());
    }

    if (e.latLng?.lng()) {
      setLng(e.latLng?.lng());
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/good" />
          </IonButtons>

          <IonTitle>Add New Memory</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonItem className="input-container" lines="full">
              <IonLabel position="floating">Memory title</IonLabel>
              <IonInput type="text" ref={titleRef} placeholder="Today, I did..."></IonInput>
            </IonItem>
          </IonRow>

          <IonRow className="ion-text-center ion-margin-top">
            <IonCol>
              <div className="image-preview">
                {selectedPhoto ? (
                  <IonImg src={URL.createObjectURL(selectedPhoto)} alt="Photo preview" />
                ) : (
                  <h3>No photo chosen.</h3>
                )}
              </div>

              <IonButton fill="clear">
                <IonIcon slot="start" icon={cameraSharp} />
                <input
                  type="file"
                  name="photo"
                  onChange={({ target }) => setSelectedPhoto(target!.files![0])}
                />
                <IonLabel>Take Photo</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <GoogleMap
                mapContainerStyle={{ width: '90vw', margin: '0 auto', height: '75vh' }}
                center={{ lat, lng }}
                zoom={18}
                onClick={selectPosition}
              >
                <Marker position={{ lat, lng }} />
              </GoogleMap>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonLabel>Memory Type</IonLabel>
              <IonSelect onIonChange={handleChangeChosenMemory} value={chosenMemoryType}>
                <IonSelectOption value="good">Good Memory</IonSelectOption>
                <IonSelectOption value="bad">Bad Memory</IonSelectOption>
              </IonSelect>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-top">
            <IonCol className="ion-text-center">
              <IonButton onClick={handleAddMemory}>Add Memory</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default NewMemory;
