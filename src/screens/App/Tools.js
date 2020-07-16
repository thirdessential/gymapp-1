/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {connect} from "react-redux";

import {appTheme} from "../../constants/colors";
import {spacing} from "../../constants/dimension";
import {screenWidth} from "../../utils/screenDimensions";
import Feather from "react-native-vector-icons/Feather";
import fonts from "../../constants/fonts";
import strings from "../../constants/strings";
import Entypo from "react-native-vector-icons/Entypo";
import fontSizes from "../../constants/fontSizes";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import RouteNames from "../../navigation/RouteNames";

class Tools extends Component {

  openPackages=()=>this.props.navigation.navigate(RouteNames.Packages)
  openAppointments=()=>this.props.navigation.navigate(RouteNames.MyAppointments)
  openSlots=()=>this.props.navigation.navigate(RouteNames.SlotsView)
  openSubscriptions=()=>this.props.navigation.navigate(RouteNames.Subscriptions)
  packages = () => {
    return (
      <TouchableOpacity onPress={this.openPackages} style={styles.toolContainer}>
        <Feather color={appTheme.brightContent} name='box' size={30}/>
        <Text style={styles.toolText}>{strings.PACKAGES}</Text>
        <Entypo color={appTheme.brightContent} name='chevron-right' size={25}/>
      </TouchableOpacity>
    )
  }
  appointments = () => (
    <TouchableOpacity onPress={this.openAppointments} style={styles.toolContainer}>
      <Entypo color={appTheme.brightContent} name='calendar' size={30}/>
      <Text style={styles.toolText}>{strings.APPOINTMENTS}</Text>
      <Entypo color={appTheme.brightContent} name='chevron-right' size={25}/>
    </TouchableOpacity>
  )
  slots = () => (
    <TouchableOpacity onPress={this.openSlots} style={styles.toolContainer}>
      <Entypo color={appTheme.brightContent} name='time-slot' size={30}/>
      <Text style={styles.toolText}>{strings.SLOTS}</Text>
      <Entypo color={appTheme.brightContent} name='chevron-right' size={25}/>
    </TouchableOpacity>
  )
  subscriptions = () => (
    <TouchableOpacity onPress={this.openSubscriptions} style={styles.toolContainer}>
      <FontAwesome5Icon color={appTheme.brightContent} name='users' size={30}/>
      <Text style={styles.toolText}>{strings.SUBSCRIPTIONS}</Text>
      <Entypo color={appTheme.brightContent} name='chevron-right' size={25}/>
    </TouchableOpacity>
  )

  render() {
    return (
      <View style={styles.container}>
        {this.packages()}
        <View style={styles.separator}/>
        {this.appointments()}
        <View style={styles.separator}/>
        {this.slots()}
        <View style={styles.separator}/>
        {this.subscriptions()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.background,
    flex: 1,
    padding: spacing.medium,
    paddingTop: spacing.small
  },
  separator: {
    borderBottomWidth: 0.4,
    borderColor: appTheme.grey,
  },
  toolContainer: {
    padding: spacing.medium_sm,
    paddingBottom: spacing.medium,
    paddingTop: spacing.medium,
    flexDirection: 'row',
    alignItems: 'center'
  },
  toolText: {
    color: 'white',
    fontFamily: fonts.MontserratMedium,
    marginLeft: spacing.medium_lg,
    marginRight: 'auto',
    fontSize: fontSizes.h1
  }


});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Tools);