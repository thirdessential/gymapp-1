import React from 'react';
import {Platform, SafeAreaView, UIManager} from "react-native";
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/lib/integration/react';
import FlashMessage from "react-native-flash-message";
import {MenuProvider} from 'react-native-popup-menu';

import store from './src/store/configureStore';
import {persistor} from './src/store/configureStore';
import AppStack from './src/navigation';
import fonts from "./src/constants/fonts";
import fontSizes from "./src/constants/fontSizes";

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MenuProvider>
          <SafeAreaView style={{flex: 1}}>
            <AppStack/>
            <FlashMessage position="top" floating={true}
                          titleStyle={{fontSize: fontSizes.h2, fontFamily: fonts.MontserratMedium}}/>
          </SafeAreaView>
        </MenuProvider>
      </PersistGate>
    </Provider>
  );
}


