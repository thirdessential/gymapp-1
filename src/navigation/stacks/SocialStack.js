import React, {Component} from "react";
import {connect} from "react-redux";

import Stack from './stack';
import RouteNames from "../RouteNames";
import openDrawerButton from "../openDrawerButton";
import Community from "../../screens/Social/Community";
import {defaultHeaderStyle} from "../../constants/styles";
import RightHeader from "../RightHeader";

class socialStack extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={defaultHeaderStyle}>
        <Stack.Screen
          name={RouteNames.Community}
          component={Community}
          options={{
            title: 'Community',
            headerLeft: openDrawerButton,
            headerRight: () => <RightHeader userData={this.props.userData}/>
          }}/>
      </Stack.Navigator>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(socialStack);
