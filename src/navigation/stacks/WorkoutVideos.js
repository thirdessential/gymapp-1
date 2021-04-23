import React, {Component} from "react";
import {connect} from "react-redux";

import Stack from "./stack";
import RouteNames from "../RouteNames";
import {defaultHeaderStyle} from "../../constants/styles";
import WorkoutVideos from "../../screens/Social/WorkoutVideos"
import openDrawerButton from "../openDrawerButton";
import RightHeader from "../RightHeader";

class workoutVideoStack extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={defaultHeaderStyle}>
        <Stack.Screen
          name={RouteNames.WorkoutVideos}
          component={WorkoutVideos}
          options={{
            title: "Workout",
            headerLeft: openDrawerButton,
            headerRight: () => <RightHeader userData={this.props.userData}/>
          }}
        />
      </Stack.Navigator>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(workoutVideoStack);
