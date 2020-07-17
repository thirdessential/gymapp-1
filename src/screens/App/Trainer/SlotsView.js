/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native'
import {connect} from "react-redux";

import {appTheme} from "../../../constants/colors";
import {spacing} from "../../../constants/dimension";
import SlotsByTime from "../../../components/Trainer/SlotsByTime";
import {showError, showSuccess} from "../../../utils/notification";
import {bookAppointment} from "../../../API";
import * as actionCreators from "../../../store/actions";

class SlotsView extends Component {

  componentDidMount() {
    this.props.updateUserData();
  }

  bookAppointment = async (day, time) => {
    const {route, setUser} = this.props;
    const {userId} = route.params;
    let response = await bookAppointment(userId, day, time);
    if (response.success)
      showSuccess(response.message);
    else showError(response.message);
    setUser(userId);
  }

  getUser = () => {
    const {route, users} = this.props;
    if (route.params && route.params.userId)
      return users[route.params.userId];
    else return this.props.userData;
  }
  selfNavigated = () => {
    const {route} = this.props;
    return !(route.params && route.params.userId);
  }

  render() {
    const {slots} = this.getUser();
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <SlotsByTime
          slots={slots}
          bookCallback={this.selfNavigated() ? null : this.bookAppointment}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.background,
    flex: 1,
    padding: spacing.medium,
    paddingBottom: spacing.large_lg
  },

});

const mapStateToProps = (state) => ({
  userData: state.user.userData,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserData: () => dispatch(actionCreators.updateUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlotsView);