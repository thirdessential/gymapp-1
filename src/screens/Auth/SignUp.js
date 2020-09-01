import React, {Component} from "react";
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Keyboard,
  Image,
  ScrollView, ActivityIndicator,
} from "react-native";
import {CheckBox} from "react-native-elements";
import {Item, Input} from "native-base";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {attemptGoogleAuth, registerWithEmail} from "../../API";
import Loader from "../../components/Loader";
import strings from "../../constants/strings";
import fonts from "../../constants/fonts";
import {appTheme} from "../../constants/colors";
import {screenHeight, screenWidth} from "../../utils/screenDimensions";
import EmailValidation from "../../utils/validation/Email";
import PasswordValidation from "../../utils/validation/Password";
import Logo from "../../../assets/images/logo.png";
import Icon from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import TripleLine from "../../../assets/images/tripleLine.png";
import {showError} from "../../utils/notification";
import {INITIAL_USER_TYPE, userTypes} from "../../constants/appConstants";
import RouteNames from "../../navigation/RouteNames";
import {onFacebookButtonPress} from "../../API/firebaseMethods";
import {spacing} from "../../constants/dimension";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: null,
      passwordError: null,
      checked: false,
      loading: false,
      authLoading: false
    };
  }

  showMessage(msg) {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      // AlertIOS.alert(msg);
    }
  }

  openTerms = () => {
    const {navigation} = this.props;
    const pdfSource = INITIAL_USER_TYPE === userTypes.TRAINER ?
      {uri: 'bundle-assets://pdf/trainerPolicy.pdf'} :
      {uri: 'bundle-assets://pdf/terms.pdf'};
    navigation.navigate(RouteNames.PdfViewer, {
      source: pdfSource
    })

  }
  openPolicy = () => {
    const {navigation} = this.props;
    navigation.navigate(RouteNames.PdfViewer, {
      source: {uri: 'bundle-assets://pdf/privacyPolicy.pdf'}
    })
  }

  validateInputs() {
    this.setState({emailError: EmailValidation(this.state.email)});
    this.setState({passwordError: PasswordValidation(this.state.password)});

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
      this.setState({loading: true});
      var result = await registerWithEmail(
        this.state.email,
        this.state.password
      );
      this.setState({loading: false});
      if (result) {
      } else
        showError(strings.SIGNUP_FAILED)

      this.setState({loading: false});
    } else
      showError(strings.SIGNUP_FAILED)
    this.setState({loading: false});

  }

  googleSignup = async () => {
    this.setState({loading: true});
    let res = await attemptGoogleAuth();
    if (res) {

    } else {
      showError(strings.SIGNUP_FAILED)
      this.setState({loading: false});
    }
  };
  facebookLogin = async () => {
    this.setState({loading: true});
    let res = await onFacebookButtonPress();
    if (res) {

    } else {
      this.setState({loading: false});
      showError(strings.SIGNUP_FAILED);
    }
  };
  setEmail = (text) => {
    this.setState({email: text});
  };
  setPassword = (text) => {
    this.setState({password: text});
  };
  renderBars = () => (
    <View
      style={{
        position: "absolute",
        right: -screenWidth / 10,
        top: -screenWidth / 10,
        flex: 1,
      }}
    >
      <Image
        style={{height: screenWidth / 2.5, width: screenWidth / 2.5}}
        resizeMode={"contain"}
        source={TripleLine}
      />
    </View>
  );

  render() {
    return (
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
        style={styles.container}
      >
        <StatusBar backgroundColor="black"/>
        {this.renderBars()}
        <Loader loading={this.state.loading}/>
        <Image resizeMode={"contain"} source={Logo} style={styles.image}/>

        <View style={styles.detailsView}>
          <View style={{flexDirection: "row"}}>
            <Text style={styles.signUp}>{strings.SIGN_UP}</Text>
            <View style={{flexDirection: 'row', marginTop: spacing.small, marginLeft: 'auto'}}>
              <TouchableOpacity
                onPress={this.googleSignup}
                style={styles.authLogin}
              >
                <Icon
                  name="google-"
                  color="#c33a09"
                  size={40}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.facebookLogin}
                style={styles.authLogin}
              >
                <Icon
                  name="facebook"
                  color="#3b5998"
                  size={40}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: "8%"}}>
            <View style={{paddingBottom: "5%"}}>
              <Text style={styles.label}>{strings.EMAIL}</Text>
              <Item rounded style={styles.item}>
                <Icon name="mail" color={appTheme.brightContent} size={25}/>
                <Input
                  onChangeText={(text) => {
                    this.setEmail(text);
                  }}
                  keyboardType={'email-address'}
                  style={styles.input}
                />
              </Item>
              {!!this.state.emailError && (
                <Text style={styles.formError}>{this.state.emailError}</Text>
              )}
            </View>

            <Text style={styles.label}>{strings.PASSWORD}</Text>
            <Item rounded style={styles.item}>
              <Icon name="key" color={appTheme.brightContent} size={25}/>
              <Input
                secureTextEntry={true}
                style={styles.input}
                onChangeText={(text) => this.setPassword(text)}
              />
            </Item>
            {!!this.state.passwordError && (
              <Text style={styles.formError}>{this.state.passwordError}</Text>
            )}
          </View>
          <View style={styles.formElementsFooter}>
            <CheckBox
              center
              title={
                <TouchableOpacity
                  onPress={() => {
                    this.setState({checked: !this.state.checked});
                  }}
                  style={styles.terms}
                >
                  <Text style={styles.termsOne}>{strings.I_ACCEPT}</Text>
                  <TouchableOpacity onPress={this.openTerms}>
                    <Text style={styles.termTwo}>{strings.TERMS_AND_CONDITIONS}</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              }
              containerStyle={styles.checkBoxContainerStyle}
              checked={this.state.checked}
              checkedColor="white"
              onPress={() => this.setState({checked: !this.state.checked})}
            />
            <TouchableOpacity
              onPress={this.openPolicy}
              style={[styles.terms, {marginBottom: spacing.large}]}
            >
              <Text style={styles.termTwo}>{strings.PRIVACY_POLICY}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 20,
            }}
          >
            <TouchableOpacity onPress={() => this.signUp()}>
              <View style={styles.signUpButton}>
                <Feather name="arrow-right" color="white" size={30}/>
              </View>
            </TouchableOpacity>
            <View style={styles.AlreadySigned}>
              <TouchableOpacity
                style={{justifyContent: "center", marginTop: -20}}
                onPress={() => {
                  this.props.navigation.pop();
                }}
              >
                <Text style={{color: appTheme.greyC}}>
                  {strings.ALREADY_ACCOUNT}
                </Text>
                <Text style={{color: appTheme.greyC}}>{strings.SIGN_IN}</Text>
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
    flex: 1,
  },

  detailsView: {
    marginTop: 60,
    backgroundColor: appTheme.background,
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: screenHeight * 0.85,
    paddingTop: "5%",
    paddingHorizontal: 30,
  },
  input: {
    marginLeft: "3%",
    color: "white",
  },
  signUp: {
    fontSize: 45,
    fontWeight: "bold",
    color: appTheme.textPrimary,
    fontFamily: fonts.CenturyGothicBold,
  },
  googleLogo: {
    backgroundColor: appTheme.darkBackground,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    height: 60,
    width: 60,
    marginLeft: 20,
    marginTop: "4%",
  },
  label: {
    fontSize: 14,
    color: appTheme.greyC,
    marginLeft: "10%",
    paddingBottom: "2%",
  },
  signUpButton: {
    height: 60,
    width: 60,
    backgroundColor: appTheme.brightContent,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    backgroundColor: appTheme.darkBackground,
    borderColor: appTheme.darkBackground,
    paddingLeft: "8%",
    justifyContent: "center",
  },
  formElementsFooter: {
    marginTop: 30,
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
    justifyContent: 'center'
  },
  AlreadySigned: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "10%",
  },
  termsOne: {
    fontSize: 14,
    color: "#BCBCBF",
  },
  authLogin: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.medium_sm
  },
  termTwo: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: appTheme.brightContent,
    marginVertical: spacing.large_lg
  }
});
