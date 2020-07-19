/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity,} from 'react-native'
import PropTypes from 'prop-types';

import colors, {appTheme} from "../constants/colors";

import Icon from "react-native-vector-icons/MaterialIcons";

const callButton = (props) => {
  const [loading, setLoading] = useState(false);
  const {type = 'Accept', size = 25} = props; // TODO: make reject red button here

  const onPress = () => {
    props.onPress();
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  }
  return (
    <TouchableOpacity
      style={[styles.callButton, styles.shadow, {backgroundColor:appTheme.brightContent}]}
      activeOpacity={0.7}
      disabled={loading}
      onPress={onPress}
    >
      {!loading && <Icon name="call" color="white" size={size}/>}
      {loading && <ActivityIndicator color={"white"} size={size}/>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  callButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35
  },
});

export default callButton;