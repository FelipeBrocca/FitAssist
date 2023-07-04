//NAVIGATORS
import AppNavigator from './Navigators/Main';

// CONTEXT API
import Auth from './Context/store/Auth'
import { EnvironmentsProvider } from './Context/EnvContext';


const App = () => {

  return (
    <Auth>
      <EnvironmentsProvider>
        <AppNavigator />
      </EnvironmentsProvider>
    </Auth>
  );
}

export default App;

// #363435  GRIS
// #8e8e8e  GRIS CLARO
// #FE6816  NARANJA
// #00CAA6  VERDE