/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from 'react';
import {ScrollView, StyleSheet} from 'react-native'
import {connect} from "react-redux";

import {appTheme} from "../../../constants/colors";
import {spacing} from "../../../constants/dimension";
import PackageFlatList from "../../../components/Trainer/PackageFlatList";
import RouteNames from "../../../navigation/RouteNames";

class PackagesView extends PureComponent {

  getUser = () => {
    const {route, users} = this.props;
    if (route.params && route.params.userId)
      return users[route.params.userId];
    else return {}
  }

  enrollClicked = (packageId) => {
    const {navigation, route} = this.props;
    const {userId} = route.params;
    const user = this.getUser();

    let {name, packages} = user;
    const filteredPackages = packages.filter(packageData => packageData._id === packageId);
    if (filteredPackages && filteredPackages.length > 0) {
      // const sessionCount = filteredPackages[0].noOfSessions;
      navigation.navigate(RouteNames.Enroll, {
        userId,
        packageId,
        packageData:filteredPackages[0],
        trainerData:user
      });
    }
  }

  render() {
    const {route} = this.props;
    const {packageId} = route.params;
    const {packages} = this.getUser();
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <PackageFlatList
          packages={packages}
          enrollCallback={this.enrollClicked}
          initialOpenId={packageId}
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
  users: state.app.users,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PackagesView);