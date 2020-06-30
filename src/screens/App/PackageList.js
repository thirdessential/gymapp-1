/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native'
import {connect} from "react-redux";

import PackageOverview from '../../components/Package/PackageOverview';
import {spacing} from "../../constants/dimension";
import * as actionCreators from "../../store/actions";
import colors, {appTheme} from "../../constants/colors";
import RouteNames from "../../navigation/RouteNames";
import PackageFlatList from "../../components/Trainer/PackageFlatList";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import strings from "../../constants/strings";
import FontAwesome from 'react-native-vector-icons/Entypo';

class PackageList extends Component {

  state = {
    packages: [
      {
        title: 'Weight loss plan',
        // duration:4,
        price: 6500,
        description: 'this is the description of the package this is the description of the package this is the description of the package this is the description of the package this is the description of the package',
        noOfSessions: 15,
        sessionsPerWeek: 3
      },
      {
        title: 'Weight loss plan',
        // duration:4,
        price: 6500,
        description: 'this is the description of the package this is the description of the package this is the description of the package this is the description of the package this is the description of the package',
        noOfSessions: 15,
        sessionsPerWeek: 3
      },
      {
        title: 'Weight loss plan',
        // duration:4,
        price: 6500,
        description: 'this is the description of the package this is the description of the package this is the description of the package this is the description of the package this is the description of the package',
        noOfSessions: 15,
        sessionsPerWeek: 3
      },
      {
        title: 'Weight loss plan',
        // duration:4,
        price: 6500,
        description: 'this is the description of the package this is the description of the package this is the description of the package this is the description of the package this is the description of the package',
        noOfSessions: 15,
        sessionsPerWeek: 3
      },
      {
        title: 'Weight loss plan',
        // duration:4,
        price: 6500,
        description: 'this is the description of the package this is the description of the package this is the description of the package this is the description of the package this is the description of the package',
        noOfSessions: 15,
        sessionsPerWeek: 3
      },
      {
        title: 'Weight loss plan',
        // duration:4,
        price: 6500,
        description: 'this is the description of the package this is the description of the package this is the description of the package this is the description of the package this is the description of the package',
        noOfSessions: 15,
        sessionsPerWeek: 3
      },

      {
        title: 'Weight loss plan',
        // duration:4,
        price: 6500,
        description: 'this is the description of the package this is the description of the package this is the description of the package this is the description of the package this is the description of the package',
        noOfSessions: 15,
        sessionsPerWeek: 3
      },
      {
        title: 'Weight loss plan',
        // duration:4,
        price: 6500,
        description: 'this is the description of the package this is the description of the package this is the description of the package this is the description of the package this is the description of the package',
        noOfSessions: 15,
        sessionsPerWeek: 3
      },
    ]
  }

  editPackage = packageId => {
    this.props.navigation.navigate(RouteNames.PackageEdit,{
      packageId
    });
  }
  createPackage = () => {
    this.props.navigation.navigate(RouteNames.PackageEdit);
  }

  addButton = () => (
    <View style={styles.addButtonContainer}>
      <TouchableOpacity onPress={this.createPackage}>
        <FontAwesome
          name="plus"
          color={'white'}
          size={30}
          style={{backgroundColor: appTheme.lightBackground, borderRadius: 200, padding: spacing.small}}
        />
      </TouchableOpacity>
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{strings.MY_PACKAGES}</Text>
        </View>

        <PackageFlatList
          packages={this.props.packages}
          editCallBack={this.editPackage}
        />
        <this.addButton/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.darkBackground,
  },
  titleContainer: {
    paddingTop: spacing.medium_sm,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingBottom: spacing.medium_sm,
    marginBottom:spacing.medium_sm,
    backgroundColor: appTheme.background,
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: fontSizes.h0,
    fontFamily: fonts.PoppinsRegular
  },
  addButtonContainer: {
    paddingTop: spacing.medium_sm,
    // paddingLeft: spacing.large,
    // paddingRight: spacing.large,
    paddingBottom: spacing.small,
    backgroundColor: appTheme.background,
    alignItems: 'center'
  }
});

const mapStateToProps = (state) => ({
  packages: state.trainer.packages
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PackageList);