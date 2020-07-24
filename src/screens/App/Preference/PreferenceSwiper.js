import React from "react";
import {StyleSheet, View, TouchableOpacity, Text} from "react-native";

import AppIntroSlider from "react-native-app-intro-slider";

import UserInfo from "./UserInfo";
import WorkoutDays from "./WorkoutDays";
import WorkoutPreference from "./WorkoutPreference";
import RouteNames from "../../../navigation/RouteNames";
import {appTheme} from "../../../constants/colors";
import * as actionCreators from "../../../store/actions";
import {connect} from "react-redux";
import fonts from "../../../constants/fonts";
import {userTypes} from "../../../constants/appConstants";
import PhysicalData from "./PhysicalData";

const userSlides = [
  {
    key: RouteNames.UserInfo,
    component: UserInfo,
  },
  {
    key: RouteNames.PhysicalData,
    component: PhysicalData,
  },
  {
    key: RouteNames.WorkoutDays,
    component: WorkoutDays,
  },
  {
    key: RouteNames.WorkoutPreference,
    component: WorkoutPreference,
  },
];
const trainerSlides = [{
  key: RouteNames.UserInfo,
  component: UserInfo,
}]

class PreferenceSwiper extends React.Component {
  _renderItem = ({item}) => {
    return <item.component navigation={this.props.navigation}/>;
  };
  _onDone = () => {
    const {setInitialLoginOff, updateUserData, navigation} = this.props;
    setInitialLoginOff();
    updateUserData();
    if (navigation.canGoBack()) navigation.goBack();
  };
  _renderDoneButton = () => {
    return (
      <View style={{marginTop: "30%", marginRight: 10}}>
        <TouchableOpacity onPress={this._onDone}>
          <Text style={styles.button}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  };

  componentDidMount() {
    this.props.updatePreferences(); // preload preferences from api
  }

  _renderNextButton = () => {
    return (
      <View style={{marginTop: "30%", marginRight: 10}}>
        <Text style={styles.button}>Next</Text>
      </View>
    );
  };

  render() {
    const {userType} = this.props;
    const data = userType === userTypes.USER ? userSlides : trainerSlides;
    return (
      <AppIntroSlider
        style={styles.container}
        renderItem={this._renderItem}
        data={data}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        dotStyle={{marginTop: 30, backgroundColor: "rgba(0, 0, 0, .2)"}}
        activeDotStyle={{marginTop: 30, backgroundColor: "#fff"}}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.darkBackground,
    flex: 1,
  },
  button: {
    color: "#fff",
    fontSize: 20,

    fontFamily: fonts.CenturyGothic,
  },
});
const mapStateToProps = (state) => ({
  userData: state.user.userData,
  userType: state.user.userType
});

const mapDispatchToProps = (dispatch) => ({
  setInitialLoginOff: () => dispatch(actionCreators.setInitialLoginOff()),
  updateUserData: () => dispatch(actionCreators.updateUserData()),
  updatePreferences: () => dispatch(actionCreators.updatePreferences())
});

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceSwiper);
