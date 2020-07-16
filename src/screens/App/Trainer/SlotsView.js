/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native'
import {connect} from "react-redux";

import {appTheme} from "../../../constants/colors";
import {spacing} from "../../../constants/dimension";
import SlotsByTime from "../../../components/Trainer/SlotsByTime";

class SlotsView extends Component {

  render() {
    const {slots} = this.props.userData
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <SlotsByTime
          slots={slots}
          // bookCallback={bookCallback}
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

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SlotsView);