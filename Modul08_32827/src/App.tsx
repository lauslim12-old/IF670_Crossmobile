import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { happySharp, sadSharp } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import GoodMemories from './pages/GoodMemories';
import BadMemories from './pages/BadMemories';
import NewMemory from './pages/NewMemory';
import MemoriesContextProvider from './data/MemoriesContextProvider';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <MemoriesContextProvider>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tabs/good" component={GoodMemories} />
            <Route exact path="/tabs/bad" component={BadMemories} />
            <Route exact path="/tabs/new" component={NewMemory} />
            <Redirect exact from="/" to="/tabs/good" />
          </IonRouterOutlet>

          <IonTabBar slot="bottom" color="success">
            <IonTabButton tab="good" href="/tabs/good">
              <IonIcon icon={happySharp} />
              <IonLabel>Good Memories</IonLabel>
            </IonTabButton>

            <IonTabButton tab="bad" href="/tabs/bad">
              <IonIcon icon={sadSharp} />
              <IonLabel>Bad Memories</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </MemoriesContextProvider>
    </IonReactRouter>
  </IonApp>
);

export default App;
