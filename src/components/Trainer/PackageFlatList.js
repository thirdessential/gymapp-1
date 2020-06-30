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
          editCallback={() => {
            props.editCallBack(2)
          }}
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

export default packageFlatList;