//NAVIGATORS
import AppNavigator from './Navigators/Main';

// CONTEXT API
import Auth from './Context/store/Auth'


const App = () => {

  return (
    <Auth>
        <AppNavigator />
    </Auth>
  );
}

export default App;

// #363435  GRIS
// #8e8e8e  GRIS CLARO
// #FE6816  NARANJA
// #00CAA6  VERDE