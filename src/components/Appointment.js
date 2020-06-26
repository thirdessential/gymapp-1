/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import PropTypes from 'prop-types';
import colors from "../constants/colors";
import {StyleSheet, View} from "react-native";
import {Container, Header, Card, Text} from 'native-base';
import RoundedDP from "./RoundedDP";
import {spacing} from "../constants/dimension";
import GenericText from "./GenericText";

const appointment = (props) => {


  return (
    <Card style={styles.cardStyle}>
      <View style={styles.container}>
        <RoundedDP
          size={60}
          border={true}

        />
        <View style={styles.appointmentDetails}>
          <Text style={styles.displayName}>{props.displayName}</Text>
          <Text style={styles.timeText}>{props.startTime}</Text>

        </View>
      </View>
    </Card>
  );
}

appointment.propTypes = {
  startTime: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired
};

appointment.defaultProps = {
  displayName: 'Yash Shrivastav',
  startTime: '5:20 PM',
  imageUrl: 'sd'
}

const styles = StyleSheet.create({
  cardStyle:{
    borderRadius: 20,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding:spacing.medium_sm,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium
  },
  appointmentDetails:{
    paddingLeft:spacing.medium
  },
  displayName:{
    color:'#092532',
    fontFamily:'Poppins-SemiBold'
  },
  timeText:{
    fontFamily:'Poppins-Medium',
    color:'#4f8a8b'

  }

});

export default appointment;