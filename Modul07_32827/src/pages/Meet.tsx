import { isPlatform } from '@ionic/core';
import {
  IonAlert,
  IonAvatar,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { addOutline, banSharp, createOutline, trash } from 'ionicons/icons';
import { useContext, useRef, useState } from 'react';
import FriendContext, { Friend } from '../data/context';

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
  const friendsCtx = useContext(FriendContext);
  const [startBlocking, setStartBlocking] = useState(false);
  const [startDeleting, setStartDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<{
    id: string;
    name: string;
    avatar: string;
  } | null>();
  const [toastMessage, setToastMessage] = useState('');
  const nameRef = useRef<HTMLIonInputElement>(null);
  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

  const blockFriendHandler = () => {
    setStartBlocking(false);
    setToastMessage('Blocked friend!');
    slidingOptionsRef.current?.closeOpened();
    console.log('Blocking...');
  };

  const callFriendHandler = () => console.log('Calling...');

  const cancelAddFriendHandler = () => setIsAdding(false);

  const cancelEditFriendHandler = () => setIsEditing(false);

  const deleteFriendHandler = () => {
    if (!selectedFriend) {
      return;
    }

    setStartDeleting(false);
    setToastMessage('Deleted friend!');
    slidingOptionsRef.current?.closeOpened();
    console.log('Deleting...');
    friendsCtx.deleteFriend(selectedFriend.id);
  };

  const startAddFriendHandler = () => {
    console.log('Adding friend...');
    setIsAdding(true);
    setSelectedFriend(null);
  };

  const startDeleteFriendHandler = (friend: Friend) => {
    setStartDeleting(true);
    setSelectedFriend(friend);
  };

  const startEditFriendHandler = (friendId: string) => {
    slidingOptionsRef.current?.closeOpened();
    console.log('Editing...');

    const friend = friendsCtx.friends.find((f) => f.id === friendId);
    setSelectedFriend(friend);
    setIsEditing(true);
  };

  const saveEditFriendHandler = () => {
    const enteredName = nameRef.current?.value;
    if (!enteredName || !selectedFriend) {
      return;
    }

    friendsCtx.updateFriend(selectedFriend.id, enteredName as string);
    setSelectedFriend(null);
    setIsEditing(false);
  };

  const saveAddFriendHandler = () => {
    const enteredName = nameRef.current?.value;
    if (!enteredName) {
      return;
    }

    if (selectedFriend === null) {
      friendsCtx.addFriend(enteredName.toString(), '');
    }

    setIsAdding(false);
  };

  return (
    <>
      <IonModal isOpen={isEditing}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Friend</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Friend Name</IonLabel>
                  <IonInput ref={nameRef} type="text" value={selectedFriend?.name} />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="ion-text-center">
              <IonCol>
                <IonButton fill="clear" color="dark" onClick={cancelEditFriendHandler}>
                  Cancel
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton color="secondary" expand="block" onClick={saveEditFriendHandler}>
                  Save
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>

      <IonModal isOpen={isAdding}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Add Friend</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Friend Name</IonLabel>
                  <IonInput ref={nameRef} type="text" value={selectedFriend?.name} />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow className="ion-text-center">
              <IonCol>
                <IonButton fill="clear" color="dark" onClick={cancelAddFriendHandler}>
                  Cancel
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton color="secondary" expand="block" onClick={saveAddFriendHandler}>
                  Save
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>

      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        duration={2000}
        onDidDismiss={() => setToastMessage('')}
      />

      <IonAlert
        isOpen={startDeleting}
        header="Are you sure?"
        message="Do you want to delete your friend? This cannot be undone."
        buttons={[
          { text: 'No', role: 'cancel', handler: () => setStartDeleting(false) },
          { text: 'Yes', handler: deleteFriendHandler },
        ]}
      />

      <IonAlert
        isOpen={startBlocking}
        header="Are you sure?"
        message="Do you want to block your friend? This cannot be undone."
        buttons={[
          { text: 'No', role: 'cancel', handler: () => setStartBlocking(false) },
          { text: 'Yes', handler: blockFriendHandler },
        ]}
      />

      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton color="primary" />
            </IonButtons>
            {!isPlatform('android') && (
              <IonButtons slot="end">
                <IonButton onClick={startAddFriendHandler}>
                  <IonIcon icon={addOutline} />
                </IonButton>
              </IonButtons>
            )}

            <IonTitle>Meet</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonList>
            {friendsCtx.friends.map((friend) => (
              <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
                <IonItemOptions side="start">
                  <IonItemOption color="danger" onClick={() => setStartBlocking(true)}>
                    <IonIcon icon={banSharp} slot="icon-only" />
                  </IonItemOption>

                  <IonItemOption color="warning" onClick={() => startDeleteFriendHandler(friend)}>
                    <IonIcon icon={trash} slot="icon-only" />
                  </IonItemOption>
                </IonItemOptions>

                <IonItemOptions side="end">
                  <IonItemOption color="success" onClick={() => startEditFriendHandler(friend.id)}>
                    <IonIcon icon={createOutline} slot="icon-only" />
                  </IonItemOption>
                </IonItemOptions>

                <IonItem key={friend.id} lines="full" onClick={callFriendHandler} button>
                  <IonAvatar slot="start">
                    <IonImg src={friend.avatar} alt={`Avatar of ${friend.name}`} />
                  </IonAvatar>
                  <IonLabel>{friend.name}</IonLabel>
                </IonItem>
              </IonItemSliding>
            ))}
          </IonList>

          {isPlatform('android') && (
            <IonFab horizontal="end" vertical="bottom" slot="fixed">
              <IonFabButton color="secondary" onClick={startAddFriendHandler}>
                <IonIcon icon={addOutline} />
              </IonFabButton>
            </IonFab>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Meet;
