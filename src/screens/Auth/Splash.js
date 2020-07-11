import React from "react";
import {Image, StatusBar, View} from "react-native";
import AppLogo from '../../../assets/images/logo.png';
import LinearGradient from "react-native-linear-gradient";
import {appTheme} from "../../constants/colors";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {screenWidth} from "../../utils/screenDimensions";

const splash = () => {
  return (
    <LinearGradient
      colors={[appTheme.background, appTheme.darkBackground]}
      style={{flex: 1, backgroundColor:'white', justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar backgroundColor={appTheme.darkBackground}/>
      <Image source={AppLogo} resizeMode={'contain'} style={{width:screenWidth/1.3}}/>
    </LinearGradient>
  );
}

export default splash;