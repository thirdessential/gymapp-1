/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native'
import {connect} from "react-redux";

import PackageOverview from '../../components/Package/PackageOverview';
import {spacing} from "../../constants/dimension";
import * as actionCreators from "../../store/actions";
import {appTheme} from "../../constants/colors";
import RouteNames from "../../navigation/RouteNames";

class PackageList extends Component {

  state = {
    packages: [
      {
        title: 'Weight loss plan',
        // duration:4,
        price: 6500,
        description: 'this is the description of the package this is the description of the package this is the description of the package this is the description of the package this is the description of the package',
        sessionCount: 15,
        sessionsPerWeek: 3
      },
      {
        title: 'Weight loss plan',
        // duration:4,
        price: 6500,
        description: 'this is the description of the package this is the description of the package this is the description of the package this is the description of the package this is the description of the package',
        sessionCount: 15,
        sessionsPerWeek: 3
      },
      {
        title: 'Weight loss plan',
        // duration:4,
        price: 6500,
        description: 'this is the description of the package this is the description of the package this is the description of the package this is the description of the package this is the description of the package',
        sessionCount: 15,
        sessionsPerWeek: 3
      },
      {
        title: 'Weight loss plan',
        // duration:4,
        price: 6500,
        description: 'this is the description of the package this is the description of the package this is the description of the package this is the description of the package this is the description of the package',
        sessionCount: 15,
        sessionsPerWeek: 3
      },
      {
        title: 'Weight loss plan',
        // duration:4,
        price: 6500,
        description: 'this is the description of the package this is the description of the package this is the description of the package this is the description of the package this is the description of the package',
        sessionCount: 15,
        sessionsPerWeek: 3
      },
      {
        title: 'Weight loss plan',
        // duration:4,
        price: 6500,
        description: 'this is the description of the package this is the description of the package this is the description of the package this is the description of the package this is the description of the package',
        sessionCount: 15,
        sessionsPerWeek: 3
      },
      {
        title: 'Weight loss plan',
        // duration:4,
        price: 6500,
        description: 'this is the description of the package this is the description of the package this is the description of the package this is the description of the package this is the description of the package',
        sessionCount: 15,
        sessionsPerWeek: 3
      },
      {
        title: 'Weight loss plan',
        // duration:4,
        price: 6500,
        description: 'this is the description of the package this is the description of the package this is the description of the package this is the description of the package this is the description of the package',
        sessionCount: 15,
        sessionsPerWeek: 3
      },
      {
        title: 'Weight loss plan',
        // duration:4,
        price: 6500,
        description: 'this is the description of the package this is the description of the package this is the description of the package this is the description of the package this is the description of the package',
        sessionCount: 15,
        sessionsPerWeek: 3
      },
      {
        title: 'Weight loss plan',
        // duration:4,
        price: 6500,
        description: 'this is the description of the package this is the description of the package this is the description of the package this is the description of the package this is the description of the package',
        sessionCount: 15,
        sessionsPerWeek: 3
      },
      {
        title: 'Weight loss plan',
        // duration:4,
        price: 6500,
        description: 'this is the description of the package this is the description of the package this is the description of the package this is the description of the package this is the description of the package',
        sessionCount: 15,
        sessionsPerWeek: 3
      },
    ]
  }

  packageSelected = () => {
    console.log("package selected");
  }

  renderPlan = (plan) => {
    const {title, sessionCount, sessionsPerWeek, price, description} = plan;
    return (
      <View style={styles.packageContainer}>
        <PackageOverview
          title={title}
          duration={sessionCount / sessionsPerWeek}
          sessionCount={sessionCount}
          sessionsPerWeek={sessionsPerWeek}
          price={price}
          description={description}
          // enrollCallback={this.packageSelected}
          editCallback={()=>{this.props.navigation.navigate(RouteNames.PackageEdit)}}
        />
      </View>
    )
  }

  render() {

    return (
      <FlatList
        contentContainerStyle={styles.listContainer}
        style={styles.container}
        data={this.state.packages}
        renderItem={({item}) => this.renderPlan(item)}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.darkBackground,
  },
  listContainer: {
    justifyContent: 'center',
    marginLeft: spacing.medium_lg,
    marginRight: spacing.medium_lg,
  },
  packageContainer: {
    marginTop: spacing.medium_sm,
    marginBottom: spacing.medium_sm
  }
});

const mapStateToProps = (state) => ({
  users: state.app.users
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PackageList);