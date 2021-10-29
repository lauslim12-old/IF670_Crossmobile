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
import { addOutline } from 'ionicons/icons';
import { useContext } from 'react';
import MemoriesContext from '../data/memories-context';

const BadMemories = () => {
  const memoriesCtx = useContext(MemoriesContext);
  const badMemories = memoriesCtx.memories.filter((memory) => memory.type === 'bad');

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
          {badMemories.length === 0 && (
            <IonRow>
              <IonCol className="ion-text-center">
                <h2>No bad memories found.</h2>
              </IonCol>
            </IonRow>
          )}

          {badMemories.map((memory) => (
            <IonRow key={memory.id}>
              <IonCol>
                <IonCard>
                  <IonImg src={memory.base64Url} alt={memory.title} />
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
