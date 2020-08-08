import React, { Component } from "react";

import Stack from "./stack";
import RouteNames from "../RouteNames";
import openDrawerButton from "../openDrawerButton";
import { appTheme } from "../../constants/colors";
import Activity from "../../screens/App/Activity";
import { spacing } from "../../constants/dimension";
import Profile from "../../screens/App/Profile";
import { defaultHeaderStyle } from "../../constants/styles";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import Feather from "react-native-vector-icons/Feather";
import {
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Alert,
  Text,
  FlatList,
} from "react-native";

import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuDivider,
} from "react-native-popup-menu";

const data = [
  {
    text: "Jinit booked your slot on 9PM",
    id: "1",
  },
  {
    text: "Jinit booked your slot on 9PM",
    id: "2",
  },
  {
    text: "Jinit booked your slot on 9PM",
    id: "3",
  },
  {
    text: "Jinit booked your slot on 9PM",
    id: "4",
  },
  {
    text: "Jinit booked your slot on 9PM",
    id: "5",
  },
  {
    text: "Jinit booked your slot on 9PM",
    id: "6",
  },
];

export default class activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      all: false,
    };
  }
  render() {
    return (
      <Stack.Navigator screenOptions={defaultHeaderStyle}>
        <Stack.Screen
          name={RouteNames.Activity}
          component={Activity}
          options={{
            title: "Activity",
            headerLeft: openDrawerButton,
            headerRight: () => (
              <Menu>
                <MenuTrigger style={{ marginRight: 10 }}>
                  <Feather
                    name="bell"
                    color={appTheme.brightContent}
                    size={30}
                  />
                  <View style={styles.bellIcon}>
                    <Text style={{ color: appTheme.brightContent }}>
                      {this.state.data.length}
                    </Text>
                  </View>
                </MenuTrigger>
                <MenuOptions
                  customStyles={{
                    backgroundColor: appTheme.darkBackground,
                    flex: 1,
                  }}
                >
                  <FlatList
                    data={
                      this.state.all
                        ? this.state.data
                        : this.state.data.slice(0, 4)
                    }
                    renderItem={({ item }) => (
                      <MenuOption
                        style={{
                          flexDirection: "row",
                          backgroundColor: appTheme.background,

                          padding: spacing.small_lg,
                        }}
                      >
                        <Text style={styles.text}>{item.id}</Text>
                        <Text style={styles.text}>{item.text}</Text>
                      </MenuOption>
                    )}
                    keyExtractor={(item) => item.id}
                  />
                  <MenuOption
                    style={{
                      flexDirection: "row",
                      backgroundColor: appTheme.background,

                      justifyContent: "center",
                    }}
                  >
                    {!this.state.all && (
                      <Text
                        style={styles.showOrHide}
                        onPress={() => {
                          this.setState({ all: !this.state.all });
                        }}
                      >
                        View all notifications
                      </Text>
                    )}
                    {this.state.all && (
                      <Text
                        style={styles.showOrHide}
                        onPress={() => {
                          this.setState({ all: !this.state.all });
                        }}
                      >
                        Show recent
                      </Text>
                    )}
                  </MenuOption>
                </MenuOptions>
              </Menu>
            ),
          }}
        />
        <Stack.Screen
          name={RouteNames.Profile}
          component={Profile}
          options={{ title: "", headerTransparent: true }}
        />
      </Stack.Navigator>
    );
  }
}
const styles = StyleSheet.create({
  // menuButton: ,
  // menuText: ,
  text: {
    marginLeft: spacing.medium_sm,
    color: appTheme.greyC,
    fontFamily: fonts.CenturyGothic,
    fontSize: fontSizes.h2,
  },
  showOrHide: {
    marginLeft: spacing.medium_sm,
    color: appTheme.brightContent,
    fontFamily: fonts.CenturyGothic,
    fontSize: fontSizes.h3,
  },
  bellIcon: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    marginLeft: -5,
    marginTop: -5,
    backgroundColor: "white",
    borderRadius: 20,
    height: 20,
    width: 20,
  },
});
