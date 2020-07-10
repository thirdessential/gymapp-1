import * as React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Entypo from "react-native-vector-icons/Entypo";
import {connect} from "react-redux";

import {spacing} from "../../constants/dimension";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import {appTheme, darkPallet} from "../../constants/colors";
import * as actionCreators from "../../store/actions";
import Avatar from "../../components/Avatar";
import {dayTimeSorter, getJoinDurationString, toTitleCase} from "../../utils/utils";
import RouteNames, {TabRoutes} from "../../navigation/RouteNames";
import SelectableButton from '../../components/selectableButton';
import strings from "../../constants/strings";

class Activity extends React.Component {

  state = {
    sortedAgenda: []
  }

  componentDidMount() {
    const {activities, myAppointments} = this.props;

    const aggregateAgenda = [];
    const {nextDaySessions, todaySessions} = activities;
    todaySessions.map(session => aggregateAgenda.push(session));
    nextDaySessions.map(session => aggregateAgenda.push(session));
    myAppointments.map(appointment => aggregateAgenda.push(appointment));
    const sortedAgenda = aggregateAgenda.sort(dayTimeSorter);
    this.setState({sortedAgenda});
  }

  onEditPress = () => {
    this.props.navigation.navigate(RouteNames.ProfileEdit);
  }
  onPackagesPress = () => {
    this.props.navigation.navigate(RouteNames.Packages)
  }
  onSlotsPress = () => {
    this.props.navigation.navigate(RouteNames.SlotEdit)
  }
  onSubscriptionsPress = () => {
    this.props.navigation.navigate(RouteNames.MyProfile, {
      initialRouteName: TabRoutes.Subscriptions
    })
  }
  renderUser = () => {
    const {userData} = this.props;
    return (
      <View style={styles.userContainer}>
        <Avatar url={userData.displayPictureUrl} size={spacing.thumbnailMini}/>
        <View style={styles.titleContainer}>
          <Text style={styles.displayName}>{toTitleCase(userData.name)}</Text>
          <Text style={styles.infoText}>{getJoinDurationString(userData.dateJoined)}</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={this.onEditPress}
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
        >
          <Entypo
            name={'edit'}
            color={'white'}
            size={20}
          />
        </TouchableOpacity>
      </View>
    )
  }

  renderInfoButtonRow = () => {
    return (
      <View style={styles.buttonGroup}>
        <View style={styles.button}>
          <SelectableButton
            onPress={this.onPackagesPress}
            selected={true}
            textContent={strings.PACKAGES}
            textStyle={styles.buttonText}/>
        </View>
        <View style={styles.button}>
          <SelectableButton
            onPress={this.onSlotsPress}
            selected={true}
            textContent={strings.SLOTS}
            textStyle={styles.buttonText}/>
        </View>
        <View style={styles.button}>
          <SelectableButton
            onPress={this.onSubscriptionsPress}
            selected={true}
            textContent={strings.SUBSCRIPTIONS}
            textStyle={styles.buttonText}/>
        </View>
      </View>
    )
  }

  // renderActivityCard = (data)={
  //
  // }

  render() {
    return (
      <LinearGradient
        colors={[darkPallet.darkBlue, darkPallet.extraDarkBlue]}
        style={styles.container}>
        {this.renderUser()}
        {/*{this.renderInfoButtonRow()}*/}
      </LinearGradient>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingTop: spacing.medium_lg,
    paddingBottom: spacing.medium,
    alignItems: "center",
    backgroundColor: appTheme.background,
  },
  titleContainer: {
    paddingLeft: spacing.medium,
    // width:'100%',
    justifyContent: 'space-around',
  },
  title: {
    color: 'white',
    fontSize: fontSizes.h0,
    fontFamily: fonts.PoppinsRegular
  },
  displayName: {
    color: 'white',
    fontSize: fontSizes.h1,
    fontFamily: fonts.MontserratMedium,
  },
  infoText: {
    color: appTheme.lightContent,
    fontSize: fontSizes.h2,
    fontFamily: fonts.MontserratMedium,
  },
  listContainer: {},
  userContainer: {
    width: '100%',
    flexDirection: 'row',
    // backgroundColor:'red'
  },
  editButton: {
    marginLeft: spacing.medium_sm,
    padding: spacing.small,
    justifyContent: 'center'
  },
  buttonGroup: {
    flexDirection: 'row',
    padding: spacing.small,
    width: '100%',
    marginTop: spacing.medium_sm
  },
  button: {
    marginRight: spacing.medium_sm
  },
  buttonText: {
    fontSize: fontSizes.h3
  }
});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  myAppointments: state.user.myAppointments,
  activities: state.user.activities
});

const mapDispatchToProps = (dispatch) => ({});


export default connect(mapStateToProps, mapDispatchToProps)(Activity);
