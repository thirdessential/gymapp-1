/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native'
import PropTypes from 'prop-types';

import PackagePreview from './PackagePreview';

import {spacing} from "../../constants/dimension";

const packagePreviewList = (props) => {
  const renderPackagePreview = (packageData, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={()=>props.onPackagePress(packageData._id)}
        style={styles.packageContainer}
        key={index}>
        <PackagePreview
          count={packageData.noOfSessions}
          title={packageData.title}
          price={packageData.price}
        />
      </TouchableOpacity>
    )
  }
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={props.packages}
      renderItem={({item, index}) => renderPackagePreview(item, index)}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

packagePreviewList.propTypes = {};

const styles = StyleSheet.create({
  packageContainer: {
    marginRight: spacing.medium
  }
});

export default React.memo(packagePreviewList);