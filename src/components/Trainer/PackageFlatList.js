/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native'

import PackageOverview from '../../components/Package/PackageOverview';
import {spacing} from "../../constants/dimension";
import {appTheme} from "../../constants/colors";

const packageFlatList = (props) => {

  const renderPlan = (plan) => {
    const {title, noOfSessions, sessionsPerWeek, price, description, _id} = plan;
    const editCallback = props.editCallback ? () => props.editCallback(_id) : null;
    const deleteCallback = props.deleteCallback ? () => props.deleteCallback(_id) : null;
    const enrollCallback = props.enrollCallback ? () => props.enrollCallback(_id) : null;
    return (
      <View style={styles.packageContainer}>
        <PackageOverview
          open={props.initialOpenId}
          title={title}
          sessionCount={noOfSessions}
          sessionsPerWeek={sessionsPerWeek}
          price={price}
          description={description}
          editCallback={editCallback}
          deleteCallback={deleteCallback}
          enrollCallback={enrollCallback}
        />
      </View>
    )
  }

  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      style={styles.container}
      data={props.packages}
      renderItem={({item}) => renderPlan(item)}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: appTheme.darkBackground,
  },
  listContainer: {
    justifyContent: 'center',
  },
  packageContainer: {
    marginTop: spacing.medium_sm,
    marginBottom: spacing.medium_sm
  }
});

export default React.memo(packageFlatList);