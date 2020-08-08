import React from "react";
import {Image, StatusBar} from "react-native";
import AppLogo from '../../../assets/images/logo.png';
import LinearGradient from "react-native-linear-gradient";
import {appTheme} from "../../constants/colors";
import {screenWidth} from "../../utils/screenDimensions";

const splash = () => {
  return (
    <LinearGradient
      colors={[appTheme.darkBackground, appTheme.darkBackground]}
      style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar backgroundColor={appTheme.darkBackground}/>
      <Image source={AppLogo} style={{width: screenWidth / 1.4}} resizeMode={'contain'}/>
    </LinearGradient>
  );
}

export default splash;