import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  isPlatform,
} from '@ionic/react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { addOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { Memory } from '../data/memories-context';

const BadMemories = () => {
  const [memories, setMemories] = useState([] as Memory[]);

  useEffect(() => {
    fetch('http://localhost/api/main.php')
      .then((res) => res.json())
      .then(({ data }) => setMemories(data.filter((memory: Memory) => memory.type === 'bad')));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {isPlatform('ios') && (
            <IonButtons slot="end">
              <IonButton routerLink="/tabs/new">
                <IonIcon icon={addOutline} />
              </IonButton>
            </IonButtons>
          )}

          <IonTitle>Bad Memories</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          {memories.length === 0 && (
            <IonRow>
              <IonCol className="ion-text-center">
                <h2>No bad memories found.</h2>
              </IonCol>
            </IonRow>
          )}

          {memories.map((memory) => (
            <IonRow key={memory.id}>
              <IonCol>
                <IonCard>
                  <IonImg src={memory.base64Url} alt={memory.title} />

                  <GoogleMap
                    mapContainerStyle={{ width: '90vw', margin: '0 auto', height: '75vh' }}
                    center={{ lat: memory.lat, lng: memory.lng }}
                    zoom={18}
                  >
                    <Marker position={{ lat: memory.lat, lng: memory.lng }} />
                  </GoogleMap>

                  <IonCardHeader>
                    <IonCardTitle>{memory.title}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>

      {(isPlatform('android') || isPlatform('desktop')) && (
        <IonFab horizontal="end" vertical="bottom" slot="fixed">
          <IonFabButton color="secondary" routerLink="/tabs/new">
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      )}
    </IonPage>
  );
};

export default BadMemories;
