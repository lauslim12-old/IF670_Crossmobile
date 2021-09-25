import {
  IonAvatar,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { banSharp, createOutline, trash } from 'ionicons/icons';
import { useRef } from 'react';

export const friends = [
  {
    id: 'f1',
    name: 'John Thor',
    avatar:
      'https://static.wikia.nocookie.net/swordartonline/images/d/d4/Alice_Synthesis_Thirty.png',
  },
  {
    id: 'f2',
    name: 'John Ness',
    avatar: 'https://i.pinimg.com/originals/4d/91/8f/4d918fa11977eced737ed20a191ad4cb.jpg',
  },
  {
    id: 'f3',
    name: 'John Doe',
    avatar: 'https://avatarfiles.alphacoders.com/258/thumb-1920-258123.jpg',
  },
];

const Meet = () => {
  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

  const blockFriendHandler = () => {
    slidingOptionsRef.current?.closeOpened();
    console.log('Blocking...');
  };

  const callFriendHandler = () => console.log('Calling...');

  const deleteFriendHandler = () => {
    slidingOptionsRef.current?.closeOpened();
    console.log('Deleting...');
  };

  const editFriendHandler = () => {
    slidingOptionsRef.current?.closeOpened();
    console.log('Editing...');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="primary" />
          </IonButtons>

          <IonTitle>Meet</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          {friends.map((friend) => (
            <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
              <IonItemOptions side="start">
                <IonItemOption color="danger" onClick={blockFriendHandler}>
                  <IonIcon icon={banSharp} slot="icon-only" />
                </IonItemOption>

                <IonItemOption color="warning" onClick={deleteFriendHandler}>
                  <IonIcon icon={trash} slot="icon-only" />
                </IonItemOption>
              </IonItemOptions>

              <IonItemOptions side="end">
                <IonItemOption color="warning" onClick={editFriendHandler}>
                  <IonIcon icon={createOutline} slot="icon-only" />
                </IonItemOption>
              </IonItemOptions>

              <IonItem key={friend.id} lines="full" onClick={callFriendHandler} button>
                <IonAvatar slot="start">
                  <img src={friend.avatar} alt={`Avatar of ${friend.name}`} />
                </IonAvatar>
                <IonLabel>{friend.name}</IonLabel>
              </IonItem>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Meet;
