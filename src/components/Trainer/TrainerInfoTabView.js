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

const Packages = (props) => (
  <View>
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
  <View>
    <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionTitle}>{strings.SLOTS}</Text>
    </View>
    <SlotsByTime slots={props.slots}/>
  </View>
)

const initialLayout = {width: screenWidth};

const Routes = {
  Packages: 'Packages',
  Posts: 'Posts',
  Slots: 'Slots'
}

function TrainerInfo(props) {
  const {packages, enrollCallback, slots} = props;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: Routes.Packages, title: 'Packages'},
    // {key: Routes.Posts, title: 'Posts'},
    {key: Routes.Slots, title: 'Slots',},
  ]);

  const renderScene = (props) => {
    const {route} = props;
    switch (route.key) {
      case Routes.Packages:
        return <Packages packages={packages} enrollCallback={enrollCallback}/>;
      case Routes.Slots:
        return <Slots slots={slots}/>
      // case Routes.Appointment:
      //   return <Schedule/>
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
      sceneContainerStyle={{paddingLeft: spacing.medium_lg, paddingRight: spacing.medium_lg}}
      renderTabBar={props =>
        <TabBar
          {...props}
          style={{backgroundColor: appTheme.background}}
          indicatorStyle={{backgroundColor: appTheme.grey}}
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
    case(Routes.Slots):
      return <FontAwesome name='calendar' size={22} color={'white'}/>;
    case(Routes.Packages):
      return <FontAwesome name='list' size={22} color={'white'}/>
    // case(Routes.Posts):
    //   return <FontAwesome name='table' size={22} color={'white'}/>

  }

  if (route.key === Routes.Appointment) {

    return

  } else {


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