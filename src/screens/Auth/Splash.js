import React from "react";
import {Image, StatusBar, View} from "react-native";
// import AppLogo from '../../../assets/images/newlogo.png';
import AppLogo from '../../../assets/images/logo.svg';
import LinearGradient from "react-native-linear-gradient";
import {appTheme} from "../../constants/colors";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {screenWidth} from "../../utils/screenDimensions";

const splash = () => {
  return (
    <LinearGradient
      colors={[appTheme.darkBackground, appTheme.darkBackground]}
      style={{flex: 1, backgroundColor:'white', justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar backgroundColor={appTheme.darkBackground}/>
      <AppLogo />
    </LinearGradient>
  );
}

export default splash;