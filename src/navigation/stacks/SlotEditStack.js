import React, {Component} from "react";
import {connect} from "react-redux";

import Stack from './stack';
import RouteNames from "../RouteNames";
import openDrawerButton from "../openDrawerButton";
import SlotList from "../../screens/App/Trainer/SlotList";
import {defaultHeaderStyle} from "../../constants/styles";
import RightHeader from "../RightHeader";

class slotEditStack extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={defaultHeaderStyle}>
        <Stack.Screen
          name={RouteNames.SlotEdit}
          component={SlotList}
          options={{
            title: 'My Slots',
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

export default connect(mapStateToProps, mapDispatchToProps)(slotEditStack);
