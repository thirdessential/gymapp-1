/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from 'react';
import {View, StyleSheet,  LayoutAnimation} from 'react-native';
import {connect} from "react-redux";

import {spacing} from "../../../constants/dimension";
import * as actionCreators from "../../../store/actions";
import  {appTheme, darkPallet} from "../../../constants/colors";
import RouteNames from "../../../navigation/RouteNames";
import PackageFlatList from "../../../components/Trainer/PackageFlatList";
import fontSizes from "../../../constants/fontSizes";
import fonts from "../../../constants/fonts";
import BarButton from '../../../components/BarButton';
import LinearGradient from "react-native-linear-gradient";

class PackageList extends PureComponent {

  editPackage = packageId => {
    this.props.navigation.navigate(RouteNames.PackageEdit, {
      packageId
    });
  }
  createPackage = () => {
    this.props.navigation.navigate(RouteNames.PackageEdit);
  }

  addButton = () => (
    <View style={styles.addButtonContainer}>
      <BarButton onPress={this.createPackage}/>
    </View>
  )

  deletePackage = (packageId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.props.deletePackage(packageId);
  }

  render() {
    return (
      <LinearGradient
        colors={[darkPallet.darkBlue, darkPallet.extraDarkBlue]}
        style={styles.container}>
        <View style={styles.listContainer}>
          <PackageFlatList
            packages={this.props.packages}
            editCallback={this.editPackage}
            deleteCallback={this.deletePackage}
          />
        </View>
        <this.addButton/>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.background,
  },
  titleContainer: {
    paddingTop: spacing.medium_sm,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingBottom: spacing.medium_sm,
    marginBottom: spacing.medium_sm,
    backgroundColor: appTheme.darkBackground,
    alignItems: 'center'
  },
  listContainer:{
    marginTop:spacing.medium_lg,
    marginLeft:spacing.medium_lg,
    marginRight:spacing.medium_lg,
    flex:1
  },
  title: {
    color: 'white',
    fontSize: fontSizes.h0,
    fontFamily: fonts.PoppinsRegular
  },
  addButtonContainer: {
    paddingTop: spacing.medium_sm,
    paddingBottom: spacing.medium_sm,
    backgroundColor: appTheme.darkBackground,
    alignItems: 'center'
  }
});

const mapStateToProps = (state) => ({
  packages: state.trainer.packages
});

const mapDispatchToProps = (dispatch) => ({
  deletePackage: packageId => dispatch(actionCreators.deletePackage(packageId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PackageList);