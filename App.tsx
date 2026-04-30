import React, { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';
import Toast from 'react-native-toast-message';
import { store, persistor } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
  const hideSplash = useCallback(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PersistGate loading={null} persistor={persistor} onBeforeLift={hideSplash}>
          <StatusBar barStyle="dark-content" backgroundColor="#FAF6F0" />
          <RootNavigator />
        </PersistGate>
        <Toast position="bottom" bottomOffset={40} />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
