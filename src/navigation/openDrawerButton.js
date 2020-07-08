import React from "react";
import FontAwesome from "react-native-vector-icons/Feather";
import {TouchableOpacity} from "react-native";

import {openDrawer} from "./RootNavigation";
import {spacing} from "../constants/dimension";
import {appTheme} from "../constants/colors";

const openDrawerButton = () => (
  <TouchableOpacity onPress={openDrawer} style={{marginLeft: spacing.medium_lg, marginRight: 0}}>
    <FontAwesome
      name={'menu'}
      color={appTheme.brightContent}
      size={20}
    />
  </TouchableOpacity>
)

export default openDrawerButton;