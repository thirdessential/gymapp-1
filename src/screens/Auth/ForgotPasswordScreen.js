import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { Item, Input, Button } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import TripleLine from "../../../assets/images/tripleLine.png";
import RouteNames from "../../navigation/RouteNames";
import { attemptGoogleAuth, signInWithEmail } from "../../API";

import Loader from "../../components/Loader";
import { showMessage } from "react-native-flash-message";
import strings from "../../constants/strings";
import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import { appTheme } from "../../constants/colors";
import { screenHeight, screenWidth } from "../../utils/screenDimensions";
import Logo from "../../../assets/images/newlogo.png";
import Icon from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import { showError } from "../../utils/notification";
import Dash from "react-native-dash";

export default class SignInNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",

      googleLoading: false,
      loading: false,
    };
  }

  setEmail = (text) => {
    this.setState({ email: text });
  };
resetPass = ()=>{
    showMessage({
        message: "Please check your email for reset link",
        type: "success",
      });
}
  renderBars = () => (
    <View
      style={{
        position: "absolute",
        right: -screenWidth / 10,
        top: -screenWidth / 10,
      }}
    >
      <Image
        style={{ height: screenWidth / 2.5, width: screenWidth / 2.5 }}
        resizeMode={"contain"}
        source={TripleLine}
      />
    </View>
  );

  render() {
    return (
      <>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={"handled"}
          style={styles.container}
        >
          <StatusBar backgroundColor="black" />
          <Loader loading={this.state.loading} />

          <Image resizeMode={"contain"} source={Logo} style={styles.image} />
          {this.renderBars()}
          <View style={styles.itemContainer}>
            <View
              style={{
                alignItems: "center",
                alignSelf: "center",
                marginTop: 20,
              }}
            >
              <Text style={styles.signin}>Forgot Password?</Text>
            </View>
            <View style={{ alignItems: "center", alignSelf: "center" }}>
              <Text
                style={{ color: appTheme.greyC, fontSize: 18, marginTop: 20 }}
              >
                That's ok..
              </Text>
              <Text
                style={{
                  color: appTheme.greyC,
                  fontSize: 18,
                  marginTop: 15,
                  textAlign: "center",
                }}
              >
                Just enter the email address you've used to register your
                account.{" "}
              </Text>
            </View>
            <View style={{ marginTop: 30 }}>
              <Item rounded style={styles.item}>
                <Icon name="mail" color={appTheme.brightContent} size={25} />
                <Input
                  onChangeText={(text) => {
                    this.setEmail(text);
                  }}
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={appTheme.greyC}
                />
              </Item>
            </View>

            <View style={styles.loginandforgot}>
              <TouchableOpacity
                style={{ marginTop: 30, marginRight: 10 }}
                onPress={() => {this.resetPass()}}
              >
                <View style={styles.circleButton}>
                  <Feather name="arrow-right" color="white" size={30} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.darkBackground,
    flex: 1,
  },
  image: {
    height: screenHeight * 0.1,
    width: screenWidth * 0.6,
    marginTop: "10%",
  },
  itemContainer: {
    flex: 1,
    marginTop: "20%",
    backgroundColor: appTheme.background,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: "5%",
    paddingHorizontal: "8%",
    height: screenHeight * 0.85,
  },
  signin: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    fontFamily: fonts.CenturyGothicBold,
    marginLeft: "4%",
  },
  label: {
    fontSize: fontSizes.h3,
    color: appTheme.greyC,
    marginLeft: "10%",
    paddingBottom: "2%",
  },
  item: {
    backgroundColor: appTheme.darkBackground,
    borderColor: appTheme.darkBackground,
    paddingLeft: "8%",
    justifyContent: "center",
  },

  input: {
    marginLeft: "3%",
    color: "white",
  },
  loginandforgot: {
    alignItems: "flex-end",
    marginTop: 20,
  },
  circleButton: {
    height: 60,
    width: 60,
    backgroundColor: appTheme.brightContent,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
