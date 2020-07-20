/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import PropTypes from 'prop-types';
import colors, {appTheme} from "../constants/colors";
import {StyleSheet, View} from "react-native";
import {Card, Text} from 'native-base';
import Avatar from "./Avatar";
import {spacing} from "../constants/dimension";
import GenericButton from "./GenericButton";
import SelectableButton from "./selectableButton";
import strings from "../constants/strings";
import CallButton from "./CallButton";
import fontSizes from "../constants/fontSizes";

const client = (props) => {
  return (
    <Card style={styles.cardStyle}>
      <View style={styles.container}>
        <Avatar
          size={60}
          border={true}
          rounded={false}
          url={props.imageUrl}
        />
        <View style={styles.appointmentDetails}>
          <Text style={styles.displayName}>{props.displayName}</Text>
          <Text style={styles.timeText}>{props.location}</Text>
          <Text style={styles.timeText}> {props.sessions} { strings.SESSIONS} </Text>
        </View>
        <View style={styles.actionButtonContainer}>
          <CallButton size={26} onPress={props.callCallback}/>
        </View>
      </View>
    </Card>
  );
}


client.propTypes = {

};

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 6,
    backgroundColor:appTheme.darkBackground,
    borderColor:appTheme.background,
    elevation:11
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: spacing.medium_sm,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    justifyContent: 'space-between'
  },
  appointmentDetails: {
    paddingLeft: spacing.medium
  },
  displayName: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold'
  },
  timeText: {
    color:appTheme.grey,
    fontSize:fontSizes.h3,
    fontFamily: 'Poppins-Medium',
  },
  actionButtonContainer:{
    alignSelf:'flex-end',
    marginLeft:'auto',
  }

});

export default React.memo(client);