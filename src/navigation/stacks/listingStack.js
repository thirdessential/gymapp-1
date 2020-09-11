import React, {Component} from "react";
import {connect} from "react-redux";

import Stack from './stack';
import RouteNames from "../RouteNames";
import UserListing from "../../screens/App/UserListing";
import openDrawerButton from "../openDrawerButton";
import {userTypes} from "../../constants/appConstants";
import {defaultHeaderStyle} from "../../constants/styles";
import RightHeader from "../RightHeader";

class listing extends Component {
  render() {
    const userData = this.props.userData;
    let {userType} = userData;
    const listingTitle = userType === userTypes.USER ? 'Trainers' : 'Users';
    return (
      <Stack.Navigator screenOptions={defaultHeaderStyle}>
        <Stack.Screen
          name={RouteNames.UserListing}
          component={UserListing}
          options={{
            title: listingTitle,
            headerLeft: openDrawerButton,
            headerRight: () => <RightHeader userData={userData}/>
          }}/>
      </Stack.Navigator>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(listing);