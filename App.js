import { NavigationContainer } from '@react-navigation/native';

//NAVIGATORS
import Main from './Navigators/Main';

//REDUX
// import { Provider } from 'react-redux';
// import store from './Redux/store';


// CONTEXT API
import Auth from './Context/store/Auth'

const App = () => {
  return (
    <Auth>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Auth>
  );
}

export default App;

// #363435  GRIS
// #FE6816  NARANJA
// #00CAA6  VERDE