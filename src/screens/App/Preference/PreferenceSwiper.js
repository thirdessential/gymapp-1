import React, {PureComponent} from "react";
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
    index: 0
  },
  {
    key: RouteNames.PhysicalData,
    component: PhysicalData,
    index: 1
  },
  {
    key: RouteNames.WorkoutDays,
    component: WorkoutDays,
    index: 2
  },
  {
    key: RouteNames.WorkoutPreference,
    component: WorkoutPreference,
    index: 3
  },
];
const trainerSlides = [
  {
    key: RouteNames.UserInfo,
    component: UserInfo,
    index: 0,
  },
  {
    key: RouteNames.PhysicalData,
    component: PhysicalData,
    index: 1
  }
]

const physicalSlide = [ {
  key: RouteNames.PhysicalData,
  component: PhysicalData,
  index: 0
}]

class PreferenceSwiper extends PureComponent {
  state = {
    currentSlide: 0,
    slides:userSlides
  }
  setCurrentSlide = (index) => {
    if (this.state.currentSlide !== index)
      this.setState({currentSlide: index})
  }
  _renderItem = ({item}) => {
    return <item.component active={this.state.currentSlide === item.index}/>;
  };
  _onDone = () => {
    this.setCurrentSlide({currentSlide: this.state.currentSlide + 1}); // to inform last component that it is becoming inactive, and needs to submit data to api
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
    const {route,userType} = this.props;
    if (route.params && route.params.physical) {
      this.setState({slides:physicalSlide});
    }else {
      const slides = userType === userTypes.USER ? userSlides : trainerSlides;
      this.setState({slides});
    }
  }

  _renderNextButton = () => {
    return (
      <View style={{marginTop: "30%", marginRight: 10}}>
        <Text style={styles.button}>Next</Text>
      </View>
    );
  };

  render() {
    // const {userType} = this.props;
    // const data = userType === userTypes.USER ? userSlides : trainerSlides;
    return (
      <AppIntroSlider
        style={styles.container}
        renderItem={this._renderItem}
        data={this.state.slides}
        onSlideChange={(index) => this.setCurrentSlide(index)}
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
