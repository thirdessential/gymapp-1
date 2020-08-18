import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { screenWidth } from "../utils/screenDimensions";
import { TabBar, TabView } from "react-native-tab-view";

import { appTheme } from "../constants/colors";
import { spacing } from "../constants/dimension";
import fontSizes from "../constants/fontSizes";
import fonts from "../constants/fonts";
import { TabRoutes } from "../navigation/RouteNames";
import { defaultDP } from "../constants/appConstants";
import { militaryTimeToString } from "../utils/utils";
import strings from "../constants/strings";

const initialLayout = { width: screenWidth };

function timeline(props) {
  const { today, tomorrow, onProfilePress } = props;
  const [index, setIndex] = React.useState(0);

  const routeArray = [
    { key: TabRoutes.Today, title: "Today" },
    { key: TabRoutes.Tomorrow, title: "Tomorrow" },
  ];

  const [routes] = React.useState(routeArray);

  const renderTime = (time) => {
    return (
      <>
        <Text style={{ color: "white", fontSize: fontSizes.h2 }}>
          {militaryTimeToString(time)}
        </Text>
      </>
    );
  };
  const renderCards = (item) => {
    let user = item.user || item.trainer;
    if (!user) return null;
    let { displayPictureUrl, name, id } = user;
    if (!displayPictureUrl) displayPictureUrl = defaultDP;
    return (
      <View style={styles.cardView}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            onProfilePress(id);
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image source={{ uri: displayPictureUrl }} style={styles.Image} />
            <View style={styles.infoView}>
              <Text style={styles.sessionText}>
                {strings.SESSION_WITH} {name}
              </Text>
              <Text style={styles.timeInfo}>{renderTime(item.time)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const noActivity = () => {
    return (
      <View style={styles.noActivity}>
        <Text style={[styles.sectionTitle, { color: appTheme.brightContent }]}>
          {strings.NO_ACTIVITY}
        </Text>
      </View>
    );
  };
  const renderScene = (props) => {
    const { route } = props;
    switch (route.key) {
      case TabRoutes.Today:
        if (!today || today.length === 0) return noActivity();
        return (
          <View style={{ justifyContent: "center" }}>
            <FlatList
              data={today}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => renderCards(item)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        );

      case TabRoutes.Tomorrow:
        if (!tomorrow || tomorrow.length === 0) return noActivity();

        return (
          <View style={{ justifyContent: "center" }}>
            <FlatList
              data={tomorrow}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => renderCards(item)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        );

      default:
        return null;
    }
  };
  return (
    <TabView
      lazy={true}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      swipeEnabled={false}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{ backgroundColor: "transparent" }}
          indicatorStyle={{ backgroundColor: appTheme.lightContent }}
          tabStyle={styles.bubble}
          labelStyle={styles.noLabel}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  noLabel: {
    fontSize: fontSizes.h3,
  },
  bubble: {
    backgroundColor: "transparent",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },
  sectionTitleContainer: {
    marginTop: spacing.medium_lg,
    marginBottom: spacing.medium_sm,
  },
  sectionTitle: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h1,
    fontFamily: fonts.MontserratMedium,
  },
  timeStyle: {
    textAlign: "center",
    backgroundColor: appTheme.brightContent,
    color: appTheme.textPrimary,
    fontFamily: fonts.MontserratMedium,
    padding: 5,
    borderRadius: 13,
  },
  cardContainer: {
    marginBottom: spacing.small,
  },
  cardView: {
    marginHorizontal: spacing.medium_sm,
    marginTop: spacing.medium_lg,
    height: 100,
    backgroundColor: appTheme.darkBackground,
    borderRadius: 20,
    padding: spacing.medium_lg,
    justifyContent: "center",
  },
  Image: { height: 80, width: 80, borderRadius: 40 },
  infoView: {
    width: 200,
    marginLeft: spacing.medium_lg,
    marginTop: spacing.medium_sm,
  },
  sessionText: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h3,
    fontWeight: "bold",
    fontFamily: fonts.CenturyGothicBold,
  },
  timeInfo: {
    justifyContent: "center",
    alignContent: "flex-end",
  },
  noActivity: {
    flex: 1,
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default React.memo(timeline);
