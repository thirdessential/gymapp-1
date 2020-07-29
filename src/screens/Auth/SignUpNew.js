import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  Keyboard,
  Image,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { Item, Input } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { attemptGoogleAuth, registerWithEmail } from "../../API";
import Loader from "../../components/Loader";
import { showMessage } from "react-native-flash-message";
import strings from "../../constants/strings";
import fonts from "../../constants/fonts";
import { appTheme } from "../../constants/colors";
import { screenHeight, screenWidth } from "../../utils/screenDimensions";
import EmailValidation from "../../utils/validation/Email";
import PasswordValidation from "../../utils/validation/Password";
import { spacing } from "../../constants/dimension";
import Logo from "../../../assets/images/newlogo.png";
import Icon from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import TripleLine from "../../../assets/images/tripleLine.png";
export default class SignInNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: null,
      passwordError: null,
      checked: false,
      loading: false,
    };
  }
  showMessage(msg) {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  }
  validateInputs() {
    this.setState({ emailError: EmailValidation(this.state.email) });
    this.setState({ passwordError: PasswordValidation(this.state.password) });

    if (!this.state.checked)
      this.showMessage("kindly accept the terms and conditions");
    return (
      this.state.emailError == null &&
      this.state.passwordError == null &&
      this.state.checked
    );
  }
  async signUp() {
    Keyboard.dismiss();

    if (this.validateInputs()) {
      var result = await registerWithEmail(
        this.state.email,
        this.state.password
      );
      this.setState({ loading: false });
      if (result) {
      } else
        showMessage({
          message: strings.SIGNUP_FAILED,
          type: "danger",
        });
      this.setState({ loading: false });
    } else
      showMessage({
        message: strings.SIGNUP_FAILED,
        type: "danger",
      });
  }

  googleSignup = async () => {
    this.setState({ loading: true });
    let res = await attemptGoogleAuth();
    this.setState({ loading: false });
    if (res) {
    } else
      showMessage({
        message: strings.SIGNUP_FAILED,
        type: "danger",
      });
  };
  setEmail = (text) => {
    this.setState({ email: text });
  };
  setPassword = (text) => {
    this.setState({ password: text });
  };
  renderBars = ()=>(
    <View style={{position:'absolute', right:-screenWidth/10,top:-screenWidth/10}}>
      <Image style={{height:screenWidth/2.5, width:screenWidth/2.5}} resizeMode={'contain'} source={TripleLine}/>
    </View>
  )


  render() {
    return (
      <KeyboardAwareScrollView
       
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
        style={styles.container}
      >
        {this.renderBars()}
        <Loader loading={this.state.loading} />
        <Image resizeMode={'contain'} source={Logo} style={styles.image}/>

        <View style={styles.itemContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.signin}>{strings.SIGN_UP}</Text>
            <View style={styles.line}></View>
            <TouchableOpacity style={styles.googlelogo}>
              <View>
                <Icon
                  onPress={() => this.googleSignup()}
                  name="google-"
                  color={appTheme.brightContent}
                  size={40}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: "8%" }}>
            <View style={{ paddingBottom: "5%" }}>
              <Text style={styles.label}>{strings.EMAIL}</Text>
              <Item rounded style={styles.item}>
                <Icon name="mail" color={appTheme.brightContent} size={25} />
                <Input
                  onChangeText={(text) => {
                    this.setEmail(text);
                  }}
                  placeholder="Email"
                  style={styles.input}
                  placeholderTextColor="#fff"
                />
              </Item>
              {!!this.state.emailError && (
                <Text style={styles.formError}>{this.state.emailError}</Text>
              )}
            </View>

            <Text style={styles.label}>{strings.PASSWORD}</Text>
            <Item rounded style={styles.item}>
              <Icon name="key" color={appTheme.brightContent} size={25} />
              <Input
                secureTextEntry={true}
                placeholder="Password"
                style={styles.input}
                placeholderTextColor="#fff"
                onChangeText={(text) => this.setPassword(text)}
              />
            </Item>
            {!!this.state.passwordError && (
              <Text style={styles.formError}>{this.state.passwordError}</Text>
            )}
          </View>
          <View style={styles.formElementsFooter}>
            <CheckBox
              wrapperStyle={styles.checkBoxWrapperStyle}
              center
              title={
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ checked: !this.state.checked });
                  }}
                  style={styles.terms}
                >
                  <Text style={styles.termsOne}>I accept the </Text>
                  <Text style={styles.termTwo}>terms & conditions</Text>
                </TouchableOpacity>
              }
              containerStyle={styles.checkBoxContainerStyle}
              checked={this.state.checked}
              checkedColor="white"
              onPress={() => this.setState({ checked: !this.state.checked })}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{ marginTop: "10%", marginLeft: "5%" }}
              onPress={() => this.signUp()}
            >
              <View style={styles.circlebutton}>
                <Feather name="arrow-right" color="white" size={30} />
              </View>
            </TouchableOpacity>
            <View style={styles.alreadyaccount}>
              <TouchableOpacity
                style={{ justifyContent: "center", alignItems: "center" }}
                onPress={() => {
                  this.props.navigation.pop();
                }}
              >
                <Text style={{ color: appTheme.greyC }}>
                  {strings.ALREADY_ACCOUNT}
                </Text>
                <Text style={{ color: appTheme.greyC }}>{strings.SIGN_IN}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
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
    marginTop: "20%",
    backgroundColor: appTheme.background,
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: screenHeight * 0.8,
    paddingTop: "5%",
    paddingHorizontal: "8%",
  },
  input: {
    marginLeft: "3%",
    color: "white",
  },
  signin: {
    fontSize: 45,
    fontWeight: "bold",
    color: "white",
    fontFamily: fonts.CenturyGothicBold,
    marginLeft: "4%",
  },
  googlelogo: {
    backgroundColor: appTheme.darkBackground,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    height: 60,
    width: 60,
    marginLeft: "10%",
    marginTop: "4%",
  },
  circlebutton: {
    height: 60,
    width: 60,
    backgroundColor: appTheme.brightContent,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  alreadyaccount: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "10%",
  },

  line: {
    borderLeftWidth: 1,
    borderColor: appTheme.brightContent,
    marginTop: "5%",
    marginLeft: "10%",
  },

  label: {
    fontSize: 14,
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
  formElementsFooter: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  formError: {
    color: "white",
    marginLeft: 15,
  },
  checkBoxContainerStyle: {
    backgroundColor: "rgba(0,0,0,0)",
    backfaceVisibility: "hidden",
    borderColor: "rgba(0,0,0,0)",
    alignSelf: "auto",
    marginTop: 10,
  },
  terms: {
    flexDirection: "row",
  },

  alternateOptionsText: {
    color: "#BCBCBF",
    fontSize: 18,
    marginTop: 30,
    fontWeight: "bold",
  },
  termsOne: {
    fontSize: 16,
    // color: '',
    color: "#BCBCBF",
  },

  checkBoxWrapperStyle: {
    marginBottom: 20,
  },
  termTwo: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
