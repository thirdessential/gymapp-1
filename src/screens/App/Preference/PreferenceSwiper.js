import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import AppIntroSlider from "react-native-app-intro-slider";

import UserInfo from "./UserInfo";
import WorkoutDays from "./WorkoutDays";
import WorkoutPreference from "./WorkoutPreference";
import RouteNames from "../../../navigation/RouteNames";
import { appTheme } from "../../../constants/colors";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import fontSizes from "../../../constants/fontSizes";
import fonts from "../../../constants/fonts";
const slides = [
  {
    key: RouteNames.UserInfo,
    component: UserInfo,
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

class PreferenceSwiper extends React.Component {
  _renderItem = ({ item }) => {
    return <item.component />;
  };
  _onDone = () => {
    const { setInitialLoginOff, updateUserData, navigation } = this.props;
    setInitialLoginOff();
    if (navigation.canGoBack()) navigation.goBack();
  };
  _renderDoneButton = () => {
    return (
      <View style={{ marginTop: "30%", marginRight: 10 }}>
        <TouchableOpacity onPress={() => this._onDone()}>
          <Text style={styles.button}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  };
  _renderNextButton = () => {
    return (
      <View style={{ marginTop: "30%", marginRight: 10 }}>
       
          <Text style={styles.button}>Next</Text>
       
      </View>
    );
  };
  render() {
    return (
      <AppIntroSlider
        style={styles.container}
        renderItem={this._renderItem}
        data={slides}
        // onDone={this._onDone}
        renderDoneButton={this._renderDoneButton}
       renderNextButton={this._renderNextButton}
       
        dotStyle={{ marginTop: 30, backgroundColor: "rgba(0, 0, 0, .2)" }}
        activeDotStyle={{ marginTop: 30, backgroundColor: "#fff" }}
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
  authToken: state.user.authToken,
  userData: state.user.userData,
});

const mapDispatchToProps = (dispatch) => ({
  setAuthenticated: (value) => dispatch(actionCreators.setAuthenticated(value)),
  setInitialLoginOff: () => dispatch(actionCreators.setInitialLoginOff()),
  updateUserData: () => dispatch(actionCreators.updateUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceSwiper);
