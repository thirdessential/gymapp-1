import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {appTheme} from "../../constants/colors";

const ActionButtonTwo = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={[styles.Button,{backgroundColor:props.color,width:props.width}]} {...props}>
      <Text style={styles.label}>{props.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create(
  {
    Button: {
      borderRadius: 25,
      alignItems: 'center',
      padding: 10,
      marginTop: 20
    },
    label: {
      color:appTheme.textPrimary,
      fontSize: 16,
    }
  }
);

export default ActionButtonTwo;