import React from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {screenWidth} from "../utils/screenDimensions";
import {TabBar, TabView} from "react-native-tab-view";

import {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import fontSizes from "../constants/fontSizes";
import fonts from "../constants/fonts";
import {TabRoutes} from "../navigation/RouteNames";
import Timeline from "react-native-timeline-flatlist";
import ActivityComponent from "./ActivityComponent";
import {defaultDP} from "../constants/appConstants";
import {militaryTimeToString} from "../utils/utils";
import strings from "../constants/strings";

const initialLayout = {width: screenWidth};

function timeline(props) {
  const {today, tomorrow, onProfilePress} = props;
  const [index, setIndex] = React.useState(0);

  const routeArray = [
    {key: TabRoutes.Today, title: 'Today'},
    {key: TabRoutes.Tomorrow, title: 'Tomorrow',},
  ];

  const [routes] = React.useState(routeArray);
  const renderActivity = (data) => {
    let user = data.user || data.trainer;
    if (!user) return null;
    let {displayPictureUrl, name, id} = user;
    if (!displayPictureUrl) displayPictureUrl = defaultDP;
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => onProfilePress(id)} style={styles.cardContainer}>
        <ActivityComponent imageUrl={displayPictureUrl} displayName={name} day={''} type={'Session'}/>
      </TouchableOpacity>
    )
  }
  const renderTime = ({time}) => {
    return (
      <View style={{minWidth: 52}}>
        <Text style={styles.timeStyle}> {militaryTimeToString(time)}</Text>
      </View>
    )
  }
  const noActivity = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={[styles.sectionTitle, {color: appTheme.brightContent}]}>{strings.NO_ACTIVITY}</Text>
      </View>
    )
  }
  const renderScene = (props) => {
    const {route} = props;
    switch (route.key) {
      case TabRoutes.Today:
        if (!today || today.length === 0)
          return noActivity();
        return (
          <Timeline
            data={today}
            style={{width: '100%'}}
            circleSize={20}
            circleColor={appTheme.brightContent}
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{minWidth: 52}}
            timeStyle={styles.timeStyle}
            descriptionStyle={{color: 'gray'}}
            innerCircle={'dot'}
            renderDetail={renderActivity}
            renderTime={renderTime}
            options={{
              style: {paddingTop: spacing.medium},
              showsVerticalScrollIndicator: false,
              ListFooterComponent: () => <View style={{marginTop: spacing.medium}}/>
            }}
          />
        )
        return null;
      case TabRoutes.Tomorrow:
        if (!tomorrow || tomorrow.length === 0)
          return noActivity();
        return (
          <Timeline
            data={tomorrow}
            style={{width: '100%'}}
            circleSize={20}
            circleColor={appTheme.brightContent}
            lineColor='rgb(45,156,219)'
            timeContainerStyle={{minWidth: 52}}
            timeStyle={styles.timeStyle}
            descriptionStyle={{color: 'gray'}}
            innerCircle={'dot'}
            renderTime={renderTime}
            renderDetail={renderActivity}
            options={{
              style: {paddingTop: spacing.medium},
              showsVerticalScrollIndicator: false,
              ListFooterComponent: () => <View style={{marginTop: spacing.medium}}/>
            }}
          />
        )

      default:
        return null;
    }
  };
  return (
    <TabView
      lazy={true}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      swipeEnabled={false}
      renderTabBar={props =>
        <TabBar
          {...props}
          style={{backgroundColor: 'transparent'}}
          indicatorStyle={{backgroundColor: appTheme.lightContent}}
          tabStyle={styles.bubble}
          labelStyle={styles.noLabel}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  noLabel: {
    fontSize: 14
  },
  bubble: {
    backgroundColor: 'transparent',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10
  },
  sectionTitleContainer: {
    marginTop: spacing.medium_lg,
    marginBottom: spacing.medium_sm
  },
  sectionTitle: {
    color: 'white',
    fontSize: fontSizes.h1,
    fontFamily: fonts.MontserratMedium
  },
  timeStyle: {
    textAlign: 'center',
    backgroundColor: appTheme.brightContent,
    color: 'white',
    fontFamily: fonts.MontserratMedium,
    padding: 5,
    borderRadius: 13
  },
  cardContainer: {
    marginBottom: spacing.small
  },
})
export default React.memo(timeline);