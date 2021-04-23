/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native'

import PackageOverview from '../../components/Package/PackageOverview';
import {spacing} from "../../constants/dimension";

const packageFlatList = (props) => {
  const renderPlan = (plan) => {
    console.log(plan)
    let {title, noOfSessions, sessionsPerWeek, price, description, category, group,totalSubscriptions, _id, slot} = plan;
    // slot = slot==null ? {days:[]} :slot
    console.log(slot)
    const editCallback = props.editCallback ? () => props.editCallback(_id) : null;
    const deleteCallback = props.deleteCallback ? () => props.deleteCallback(_id) : null;
    const enrollCallback = props.enrollCallback ? () => props.enrollCallback(_id) : null;
    return (
      <View style={styles.packageContainer}>
        <PackageOverview
          open={props.initialOpenId}
          title={title}
          slot = {slot}
          sessionCount={noOfSessions}
          sessionsPerWeek={sessionsPerWeek}
          price={price}
          description={description}
          category={category}
          editCallback={editCallback}
          deleteCallback={deleteCallback}
          enrollCallback={enrollCallback}
          group={group}
          totalSubscriptions={totalSubscriptions}
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
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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