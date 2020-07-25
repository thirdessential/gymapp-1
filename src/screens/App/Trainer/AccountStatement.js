/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native'
import {connect} from "react-redux";

import {appTheme} from "../../../constants/colors";
import {openDrawerButtonDark} from "../../../navigation/openDrawerButton";

import StatementCard from "../../../components/Trainer/StatementCard";
import {spacing} from "../../../constants/dimension";

class AccountStatement extends PureComponent {
  state = {}

  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'Account Statement',
      headerTintColor: appTheme.darkBackground,
      headerStyle: {
        backgroundColor: appTheme.brightContent,
      },
      headerLeft: openDrawerButtonDark
    })
  }

  renderStatement = (data) => {
    return (
      <StatementCard/>
    )
  }

  render() {
    return (
      <View showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.content}>
          {this.renderStatement()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.brightContent,
  },
  content: {
    backgroundColor: appTheme.darkBackground,
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding:spacing.large,
    paddingHorizontal:spacing.medium
  },
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AccountStatement);
