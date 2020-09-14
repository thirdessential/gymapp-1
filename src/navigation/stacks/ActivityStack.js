import React, {Component} from "react";
import {connect} from "react-redux";

import Stack from "./stack";
import RouteNames from "../RouteNames";
import openDrawerButton from "../openDrawerButton";
import Activity from "../../screens/App/Activity";
import {defaultHeaderStyle} from "../../constants/styles";
import RightHeader from "../RightHeader";

class activity extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={defaultHeaderStyle}>
        <Stack.Screen
          name={RouteNames.Activity}
          component={Activity}
          options={{
            title: "Activity",
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

export default connect(mapStateToProps, mapDispatchToProps)(activity);
