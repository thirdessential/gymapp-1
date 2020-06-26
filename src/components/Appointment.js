/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import PropTypes from 'prop-types';
import colors from "../constants/colors";
import {StyleSheet, Text, View} from "react-native";
import RoundedDP from "./RoundedDP";
import {spacing} from "../constants/dimension";
const appointment = (props) => {
  return (
    <View style={styles.container}
    >
      <RoundedDP/>
      <View>
        <Text>{props.startTime}</Text>
        <Text>{props.displayName}</Text>

      </View>
    </View>
  );
}

appointment.propTypes = {
  startTime: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  imageUrl:PropTypes.string.isRequired
};

appointment.defaultProps = {
  displayName: 'Yatanvesh Bhardwaj',
  startTime: '5:20 PM',
  imageUrl:'sd'
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    alignItems:'center',
    flexDirection:'row'
  },

});

export default appointment;