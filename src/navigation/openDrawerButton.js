import React from "react";
import FontAwesome from "react-native-vector-icons/Feather";
import {TouchableOpacity} from "react-native";

import {openDrawer} from "./RootNavigation";
import {spacing} from "../constants/dimension";
import {appTheme} from "../constants/colors";
import Entypo from "react-native-vector-icons/Entypo";
import {callbackStatus} from "../constants/appConstants";
import configureStore from "../store/configureStore";

const openDrawerButton = () => {
  const  newCallbacks=  configureStore.getState().trainer.callbacks.filter(callback => callback.status === callbackStatus.REQUESTED).length > 0;//hack
  return(
    <TouchableOpacity onPress={openDrawer} style={{marginLeft: spacing.medium, marginRight: 0}}>
      <FontAwesome
        name={'menu'}
        color={appTheme.brightContent}
        size={20}
      />
      {newCallbacks && <Entypo name={'dot-single'} color={appTheme.brightContent} size={30}
                               style={{position: 'absolute', top: -10, right: -3}}/>}
    </TouchableOpacity>
  )
}
export const openDrawerButtonDark = () => {
  const  newCallbacks=  configureStore.getState().trainer.callbacks.filter(callback => callback.status === callbackStatus.REQUESTED).length > 0
  return (
    <TouchableOpacity onPress={openDrawer} style={{marginLeft: spacing.medium, marginRight: 0}}>
      <FontAwesome
        name={'menu'}
        color={appTheme.darkBackground}
        size={20}
      />
      {newCallbacks && <Entypo name={'dot-single'} color={appTheme.darkBackground} size={30}
                               style={{position: 'absolute', top: -10, right: -3}}/>}
    </TouchableOpacity>
  )
}

export default openDrawerButton;