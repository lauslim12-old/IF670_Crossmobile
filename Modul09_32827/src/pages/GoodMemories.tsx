import { isPlatform } from '@ionic/core';
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
} from '@ionic/react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { addOutline } from 'ionicons/icons';
import { useContext } from 'react';
import MemoriesContext from '../data/memories-context';

const GoodMemories = () => {
  const memoriesCtx = useContext(MemoriesContext);
  const goodMemories = memoriesCtx.memories.filter((memory) => memory.type === 'good');

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

          <IonTitle>Good Memories</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          {goodMemories.length === 0 && (
            <IonRow>
              <IonCol className="ion-text-center">
                <h2>No good memories found.</h2>
              </IonCol>
            </IonRow>
          )}

          {goodMemories.map((memory) => (
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

export default GoodMemories;
