import React from "react";
import {StyleSheet} from "react-native";

import AppIntroSlider from 'react-native-app-intro-slider';

import UserInfo from "./UserInfo";
import WorkoutDays from "./WorkoutDays";
import WorkoutPreference from "./WorkoutPreference";
import RouteNames from "../../../navigation/RouteNames";
import {appTheme} from "../../../constants/colors";
import * as actionCreators from "../../../store/actions";
import {connect} from "react-redux";

const slides = [
  {
    key: RouteNames.UserInfo,
    component: UserInfo
  },
  {
    key: RouteNames.WorkoutDays,
    component: WorkoutDays
  },
  {
    key: RouteNames.WorkoutPreference,
    component: WorkoutPreference
  }
];

class PreferenceSwiper extends React.Component {

  _renderItem = ({item}) => {
    return <item.component/>;
  }
  _onDone = () => {
    const {setInitialLoginOff, updateUserData, navigation} = this.props;
    setInitialLoginOff();
    if (navigation.canGoBack())
      navigation.goBack();
  }

  render() {
    return <AppIntroSlider
      style={styles.container}
      renderItem={this._renderItem}
      data={slides}
      onDone={this._onDone}/>
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.darkBackground,
    flex: 1,
  }
});
const mapStateToProps = (state) => ({
  authToken: state.user.authToken,
  userData: state.user.userData
});

const mapDispatchToProps = (dispatch) => ({
  setAuthenticated: (value) => dispatch(actionCreators.setAuthenticated(value)),
  setInitialLoginOff: () => dispatch(actionCreators.setInitialLoginOff()),
  updateUserData: () => dispatch(actionCreators.updateUserData())
});

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceSwiper);