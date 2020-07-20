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
import fontSizes from "../constants/fontSizes";

const globalSlot = (props) => {
  return (
    <Card style={styles.cardStyle}>
      <View style={styles.container}>
        <Avatar
          size={65}
          border={true}
          rounded={false}
          url={props.imageUrl}
        />
        <View style={styles.appointmentDetails}>
          <Text style={styles.displayName}>{props.displayName}</Text>
          <Text style={styles.timeText}>{props.location}</Text>
          <Text style={styles.timeText}>{props.duration} {strings.MINS}</Text>
        </View>
        <View style={styles.actionButtonContainer}>
          <SelectableButton  onPress={props.bookCallback} selected={true} textContent={strings.BOOK}/>
        </View>
      </View>
     </Card>
  );
}


globalSlot.propTypes = {
  duration: PropTypes.number.isRequired,
  displayName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired
};

globalSlot.defaultProps = {
  displayName: 'User',
  startTime: '5:20 PM',
  imageUrl: 'sd'
}

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 6,
    backgroundColor:appTheme.background,
    borderColor:appTheme.background
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
    fontFamily: 'Poppins-Medium',
    fontSize:fontSizes.h3
  },
  actionButtonContainer:{
    alignSelf:'flex-end',
    marginLeft:'auto',
    marginBottom:spacing.small
  }

});

export default React.memo(globalSlot);