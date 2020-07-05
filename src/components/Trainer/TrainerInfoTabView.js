import React from "react";
import {View, StyleSheet, Text} from "react-native";
import {screenWidth} from "../../utils/screenDimensions";
import {TabBar, TabView} from "react-native-tab-view";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {appTheme} from "../../constants/colors";
import strings from "../../constants/strings";
import PackageFlatList from "./PackageFlatList";

import {spacing} from "../../constants/dimension";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import SlotsByTime from "./SlotsByTime";
import SubscriptionList from "../SubscriptionList";
import {TabRoutes} from "../../navigation/RouteNames";

const Packages = (props) => (
  <View style={{flex: 1}}>
    <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionTitle}>{strings.PACKAGES}</Text>
    </View>

    <PackageFlatList
      packages={props.packages}
      enrollCallback={props.enrollCallback}
    />
  </View>
)

const Slots = (props) => (
  <View style={{marginBottom: spacing.large}}>
    <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionTitle}>{strings.SLOTS}</Text>
    </View>
    <SlotsByTime slots={props.slots} bookCallback={props.bookCallback ? props.bookCallback : null}/>
  </View>
)

const Subscriptions = (props) => (
  <View style={{marginBottom: spacing.large}}>
    <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionTitle}>{strings.SUBSCRIPTIONS}</Text>
    </View>
    <SubscriptionList subscriptions={props.subscriptions} callCallback={props.callCallback}/>
  </View>
)

const initialLayout = {width: screenWidth};

function TrainerInfo(props) {
  const {packages, enrollCallback, slots, bookCallback, subscriptions, callCallback, initialRouteName = TabRoutes.Packages} = props;
  const [index, setIndex] = React.useState(Object.keys(TabRoutes).indexOf(initialRouteName));
  const routeArray = [
    {key: TabRoutes.Packages, title: 'Packages'},
    // {key: Routes.Posts, title: 'Posts'},
    {key: TabRoutes.Slots, title: 'Slots',},
  ];
  if (subscriptions) routeArray.push({key: TabRoutes.Subscriptions, title: 'Subscriptions'})

  const [routes] = React.useState(routeArray);

  const renderScene = (props) => {
    const {route} = props;
    switch (route.key) {
      case TabRoutes.Packages:
        return <Packages packages={packages} enrollCallback={enrollCallback}/>;
      case TabRoutes.Slots:
        return <Slots slots={slots} bookCallback={bookCallback ? bookCallback : null}/>;
      case TabRoutes.Subscriptions:
        return <Subscriptions subscriptions={subscriptions} callCallback={callCallback}/>
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
      sceneContainerStyle={{paddingLeft: spacing.medium_lg, paddingRight: spacing.medium_lg, backgroundColor:appTheme.lightBackground}}
      renderTabBar={props =>
        <TabBar
          {...props}
          style={{backgroundColor: appTheme.darkBackground}}
          indicatorStyle={{backgroundColor: appTheme.lightContent}}
          renderIcon={
            props => getTabBarIcon(props)
          }
          tabStyle={styles.bubble}
          labelStyle={styles.noLabel}
        />
      }
    />
  );
}


const getTabBarIcon = (props) => {

  const {route} = props
  switch (route.key) {
    case(TabRoutes.Slots):
      return <FontAwesome name='calendar' size={22} color={'white'}/>;
    case(TabRoutes.Packages):
      return <FontAwesome name='list' size={22} color={'white'}/>;
    case(TabRoutes.Subscriptions):
      return <FontAwesome name='eye' size={22} color={'white'}/>;
    default:
      return null
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  noLabel: {
    display: 'none',
    height: 0
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
})
export default TrainerInfo;