import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
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
import MemoriesContext from '../data/memories-context';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Geolocation } from '@capacitor/geolocation';

type State = {
  path: string;
  preview: string;
};

// from https://gist.github.com/lauslim12/08e5d9483d20179ead58fc5667f4d720.
async function base64FromFilePath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('Method did not return a string.');
      }
    };

    reader.readAsDataURL(blob);
  });
}

const NewMemory = () => {
  const [chosenMemoryType, setChosenMemoryType] = useState('good' as 'good' | 'bad');
  const [lat, setLat] = useState(-6.257608009415188);
  const [lng, setLng] = useState(106.61837051975617);
  const [takenPhoto, setTakenPhoto] = useState<State>();
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
      !takenPhoto ||
      !chosenMemoryType
    ) {
      return;
    }

    const filename = new Date().getTime() + '.jpeg';
    const base64Data = await base64FromFilePath(takenPhoto!.preview);
    await Filesystem.writeFile({
      path: filename,
      data: base64Data,
      directory: Directory.Data,
    });

    memoriesCtx.addMemory(
      filename,
      base64Data,
      enteredTitle.toString(),
      chosenMemoryType,
      lat,
      lng
    );
    if (history.length > 0) {
      history.goBack();
    } else {
      history.replace('/tabs/good');
    }
  };

  const handleTakePhoto = async () => {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 80,
      width: 500,
    });

    // pwa elements, allow testing on web
    if (!image.path && image.webPath) {
      image.path = image.webPath;
    }

    if (!image || !image.path || !image.webPath) {
      return;
    }

    setTakenPhoto({
      path: image.path,
      preview: image.webPath,
    });
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
                {takenPhoto ? (
                  <IonImg src={takenPhoto.preview} alt="Photo preview" />
                ) : (
                  <h3>No photo chosen.</h3>
                )}
              </div>

              <IonButton fill="clear" onClick={handleTakePhoto}>
                <IonIcon slot="start" icon={cameraSharp} />
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
