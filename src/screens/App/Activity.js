import * as React from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
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
import ActivityComponent from "../../components/ActivityComponent";

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

  renderActivityCard = () => {
    return (
      <View style={styles.cardContainer}>
        <ActivityComponent time={'12:30 PM'} displayName={'Henlo boye'} day={'Monday'} type={'Session'}/>
      </View>
    )
  }

  renderActivityList = () => {
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={[1,2,3,4]}
          renderItem={({item})=>this.renderActivityCard(item)}
        />
      </View>
    )
  }

  render() {
    return (
      <LinearGradient
        colors={[darkPallet.darkBlue, darkPallet.extraDarkBlue]}
        style={styles.container}>
        {this.renderUser()}
        <View style={[styles.titleContainer,{ width:'100%', marginTop:spacing.medium_lg}]}>
          <Text style={styles.title}>Today</Text>
        </View>
        {this.renderActivityList()}
      </LinearGradient>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingLeft: spacing.medium_lg,
    paddingRight: spacing.medium_lg,
    paddingTop: spacing.medium_lg,
    paddingBottom: spacing.medium,
    alignItems: "center",
    backgroundColor: appTheme.background,
  },
  titleContainer: {
    paddingLeft: spacing.medium,
    justifyContent: 'space-around',
  },
  title: {
    color: 'white',
    fontSize: fontSizes.h0,
    fontFamily: fonts.PoppinsRegular,
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
  listContainer: {
    width:'100%'
  },
  cardContainer:{
    marginBottom:spacing.small
  },
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

});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  myAppointments: state.user.myAppointments,
  activities: state.user.activities
});

const mapDispatchToProps = (dispatch) => ({});


export default connect(mapStateToProps, mapDispatchToProps)(Activity);
