import React, {Component} from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Image,
} from "react-native";
import {Item, Input} from "native-base";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import TripleLine from '../../../assets/images/tripleLine.png';
import RouteNames from "../../navigation/RouteNames";
import {attemptGoogleAuth, signInWithEmail} from "../../API";
import Loader from "../../components/Loader";
import {showMessage} from "react-native-flash-message";
import strings from "../../constants/strings";
import fonts from "../../constants/fonts";
import {appTheme} from "../../constants/colors";
import {screenHeight, screenWidth} from "../../utils/screenDimensions";
import Logo from "../../../assets/images/newlogo.png";
import Icon from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import {showError} from "../../utils/notification";

export default class SignInNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      googleLoading: false,
      loading: false,
    };
  }

  googleLogin = async () => {
    this.setState({loading: true});
    let res = await attemptGoogleAuth();
    this.setState({loading: false});
    if (res) this.setState({googleLoading: true});
    else
      showError(strings.LOGIN_FAILED);
  };
  signIn = async () => {
    if (
      this.state.email === "" || this.state.password === ""
    ) {
      showError(strings.CREDENTIAL);
      return null;
    }
    Keyboard.dismiss();
    this.setState({loading: true});
    var result = await signInWithEmail(this.state.email, this.state.password);
    this.setState({loading: false});
    if (result) {
    } else
      showError(strings.LOGIN_FAILED)
  };
  setEmail = (text) => {
    this.setState({email: text});
  };
  setPassword = (text) => {
    this.setState({password: text});
  };
  navigateToSignup = () => {
    this.props.navigation.navigate(RouteNames.SignUpNew);
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
        <Loader loading={this.state.loading}/>
        <Image resizeMode={'contain'} source={Logo} style={styles.image}/>
        {this.renderBars()}
        <View style={styles.itemContainer}>
          <Text style={styles.signin}>{strings.SIGN_IN}</Text>

          <View style={{marginTop: "8%"}}>
            <View style={{paddingBottom: "5%"}}>
              <Text style={styles.label}>{strings.EMAIL}</Text>
              <Item rounded style={styles.item}>
                <Icon name="mail" color={appTheme.brightContent} size={25}/>
                <Input
                  onChangeText={(text) => {
                    this.setEmail(text);
                  }}
                  placeholder="Email"
                  style={styles.input}
                  placeholderTextColor="#fff"
                />
              </Item>
            </View>

            <Text style={styles.label}>{strings.PASSWORD}</Text>
            <Item rounded style={styles.item}>
              <Icon name="key" color={appTheme.brightContent} size={25}/>
              <Input
                secureTextEntry={true}
                placeholder="Password"
                style={styles.input}
                placeholderTextColor="#fff"
                onChangeText={(text) => this.setPassword(text)}
              />
            </Item>
          </View>
          <View style={styles.loginandforgot}>
            <TouchableOpacity
              style={{marginTop: "10%", marginLeft: "5%"}}
              onPress={() => this.signIn()}
            >
              <View style={styles.circleButton}>
                <Feather name="arrow-right" color="white" size={30}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={{fontSize: 14, color: appTheme.greyC}}>
                {strings.FORGOT_PASSWORD}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.line}/>

          <TouchableOpacity onPress={() => this.googleLogin()}
                            style={styles.googleLogin}>
            <View>
              {this.state.googleLoading && (
                <ActivityIndicator size="large" color="white"/>
              )}
              {!this.state.googleLoading && (
                <Icon
                  name="google-"
                  color={appTheme.brightContent}
                  size={40}
                  style={{marginTop: 15}}
                />
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.signup}>
            <TouchableOpacity onPress={() => this.navigateToSignup()}>
              <Text style={{color: appTheme.greyC}}>{strings.NO_ACCOUNT}</Text>
            </TouchableOpacity>
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
    marginTop: "10%",
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
  loginandforgot: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  circleButton: {
    height: 60,
    width: 60,
    backgroundColor: appTheme.brightContent,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPassword: {
    marginTop: "15%",
    marginLeft: "30%",
  },
  signin: {
    fontSize: 45,
    fontWeight: "bold",
    color: "white",
    fontFamily: fonts.CenturyGothicBold,
    marginLeft: "4%",
  },
  line: {
    borderWidth: 1,
    width: "100%",
    borderBottomColor: appTheme.brightContent,
    marginTop: "10%",
  },
  googleLogin: {
    marginTop: "10%",
    marginHorizontal: "30%",
    backgroundColor: appTheme.darkBackground,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    height: 50,
    paddingBottom: "2%",
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
  signup: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
