/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native'
import PropTypes from 'prop-types';
import CustomProgressBar from "../CustomProgressBar";
import GenericText from "../GenericText";
import strings from "../../constants/strings";
import PackagePreview from './PackagePreview';

import {spacing, spacing as dimension} from "../../constants/dimension";

const renderPackagePreview = (packageData, index) => {
  return (
    <View style={styles.packageContainer} key={index}>
      <PackagePreview
        duration={packageData.duration}
        title={packageData.name}
        price={packageData.price}
      />
    </View>
  )
}

const packagePreviewList = (props) => {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      // style={styles.container}
      data={props.packages}
      renderItem={({item, index}) => renderPackagePreview(item, index)}
      keyExtractor={(item, index) => index}
      // ItemSeparatorComponent={this.renderHorizontalSeparatorView}
    />
  );
}

packagePreviewList.propTypes = {

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center"
  },
  packageContainer:{
    marginRight:spacing.medium_lg
  }
});

export default packagePreviewList;