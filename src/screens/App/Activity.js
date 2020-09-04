import React, {PureComponent} from "react";
import {StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity} from "react-native";

import {connect} from "react-redux";

import {spacing} from "../../constants/dimension";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import {appTheme, darkPallet} from "../../constants/colors";
import Avatar from "../../components/Avatar";
import {getJoinDurationString, toTitleCase} from "../../utils/utils";
import RouteNames from "../../navigation/RouteNames";
import {defaultDP, userTypes} from "../../constants/appConstants";
import TimelineTabview from "../../components/TimelineTabview";
import * as actionCreators from "../../store/actions";
import {setAvailable} from "../../API";
import LiveCardList from '../../components/LiveCardList';
import {screenWidth} from "../../utils/screenDimensions";
import {
  BarChart,
} from "react-native-chart-kit";

const data = [
  {
    day: "Monday",
    duration: "1 hr",
    time: "12:30 PM",
    bodyPart: "Biceps",
  },
  {
    day: "Tuesday",
    duration: "2 hrs",
    time: "4:30 PM",
    bodyPart: "Chest",
  },
  {
    day: "Wednesday",
    duration: "2 hrs",
    time: "1:30 PM",
    bodyPart: "Full",
  },
  {
    day: "Thursday",
    duration: "1 hr",
    time: "12:30 PM",
    bodyPart: "Thighs",
  },
  {
    day: "Friday",
    duration: "1 hr",
    time: "12 PM",
    bodyPart: "Shoulder",
  },
  {
    day: "Saturday",
    duration: "1 hr",
    time: "1:30 PM",
    bodyPart: "Legs",
  },
];

class Activity extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
    };
  }

  componentDidMount() {
    setAvailable();

    const {
      navigation,
      getActivities,
      updateUserData,
      syncCoupons,
      getCallbacks,
      userType,
      syncSubscriptions,
    } = this.props;
    updateUserData();
    syncCoupons();
    syncSubscriptions();
    userType === userTypes.TRAINER && getCallbacks();
    this.unsubscribeFocus = navigation.addListener("focus", (e) => {
      getActivities();
    });
  }

  componentWillUnmount() {
    this.unsubscribeFocus();
  }
renderChart=()=>{
  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri","Sat"],
    datasets: [
      {
        data: [60, 75,80, 80, 99, 100]
      }
    ]
  };
  return (
    <View style={{marginLeft:-20}}>
    <Text style={{fontSize:20,fontFamily:fonts.CenturyGothic,color:appTheme.textPrimary,textAlign:'center'}}>Weekly exercise</Text>
<BarChart
  //style={graphStyle}
  data={data}
  width={screenWidth }
  height={220}
  yAxisLabel=""
  chartConfig={{
  backgroundGradientFrom: appTheme.background,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: appTheme.background,
  
  decimalPlaces: 0,
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(255,127,80, 0.4)`,
  fillShadowGradientOpacity:1,
  labelColor: (opacity = 1) => appTheme.greyC,
  propsForBackgroundLines: {
     //strokeDasharray: "" // solid background lines with no dashes
     strokeWidth: 0
},
  fillShadowGradient:appTheme.brightContent,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
}}
  verticalLabelRotation={0}
/>
</View>
  )
}
  renderUser = () => {
    const {userData} = this.props;
    if (!userData) return null;
    return (
      <TouchableOpacity onPress={this.openMyProfile} style={styles.userContainer}>
        <Avatar
          url={userData.displayPictureUrl || defaultDP}
          size={spacing.thumbnailSmall}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.displayName}>{toTitleCase(userData.name)}</Text>
          <Text style={styles.infoText}>
            {getJoinDurationString(userData.dateJoined, userData.userType)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  openMyProfile = () => {
    const {navigation} = this.props;
    navigation.navigate(RouteNames.MyProfile);
  };
  openProfile = (userId) => {
    const {navigation} = this.props;
    if (!userId)
      navigation.navigate(RouteNames.MyProfile);
    else navigation.navigate(RouteNames.Profile, {
      userId: userId,
    });
  };

  render() {
    const {activities} = this.props;
    const {todaysEvents, tomorrowsEvents} = activities;

    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {this.renderChart()}
        <View style={{marginHorizontal:spacing.medium_lg}}><LiveCardList data={this.state.data}/></View>
        {/*<View style={{flex: 1, width: "100%", marginVertical: spacing.medium_lg}}>*/}
          <TimelineTabview
            today={todaysEvents}
            tomorrow={tomorrowsEvents}
            onProfilePress={this.openProfile}
          />
        {/*</View>*/}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    
     paddingTop: spacing.medium_lg,
    // paddingBottom: spacing.medium,
    // alignItems: "center",
    backgroundColor: appTheme.background,
  },
  titleContainer: {
    marginTop: spacing.medium_sm,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: fontSizes.h0,
    fontFamily: fonts.PoppinsRegular,
  },
  displayName: {
    color: "white",
    fontSize: fontSizes.h1,
    fontFamily: fonts.MontserratMedium,
  },
  infoText: {
    color: appTheme.lightContent,
    fontSize: fontSizes.h2,
    fontFamily: fonts.MontserratMedium,
  },
  listContainer: {
    width: "100%",
  },

  userContainer: {
    width: "100%",
    alignItems: "center",
  },
  editButton: {
    marginLeft: spacing.medium_sm,
    padding: spacing.small,
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  activities: state.user.activities,
  userType: state.user.userType,
});

const mapDispatchToProps = (dispatch) => ({
  getActivities: () => dispatch(actionCreators.getActivities()),
  updateUserData: () => dispatch(actionCreators.updateUserData()),
  syncCoupons: () => dispatch(actionCreators.syncCoupons()),
  getCallbacks: () => dispatch(actionCreators.getCallbacks()),
  syncSubscriptions: () => dispatch(actionCreators.syncSubscriptions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
