import React from 'react';
// navigation and router
import {NavigationContainer} from '@react-navigation/native';
import {NativeRouter} from 'react-router-native';
import {MainStackNavigator} from './src/navigation/StackNavigator';
// store
import {StoreContext} from 'redux-react-hook';
import {Provider} from 'react-redux';
import {store} from './src/store';

const App = () => {
  return (
    <StoreContext.Provider value={store}>
      <Provider store={store}>
        <NavigationContainer>
          <NativeRouter>
            <MainStackNavigator />
          </NativeRouter>
        </NavigationContainer>
      </Provider>
    </StoreContext.Provider>
  );
};

export default App;
