import React, {Component} from "react";

import Stack from "./stack";
import RouteNames from "../RouteNames";
import openDrawerButton from "../openDrawerButton";

import Tools from "../../screens/App/Tools";
import {defaultHeaderStyle} from "../../constants/styles";
import RightHeader from "../RightHeader";
import {connect} from "react-redux";

class toolStack extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={defaultHeaderStyle}>
        <Stack.Screen
          name={RouteNames.Tools}
          component={Tools}
          options={{
            title: "Tools",
            headerLeft: openDrawerButton,
            headerRight: () => <RightHeader userData={this.props.userData}/>
          }}
        />
      </Stack.Navigator>
    );
  }
};

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(toolStack);
