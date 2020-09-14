import React from "react";
import FontAwesome from "react-native-vector-icons/Entypo";

import {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import {TouchableOpacity} from "react-native";
import PropTypes from "prop-types";

const barButton = ({onPress, name='plus',color=appTheme.lightBackground})=> {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome
        name={name}
        color={appTheme.textPrimary}
        size={30}
        style={{backgroundColor: color, borderRadius: 200, padding: spacing.small}}
      />
    </TouchableOpacity>
  )
}

barButton.propTypes = {
  onPress: PropTypes.func,
  name: PropTypes.string
};

export default React.memo(barButton);