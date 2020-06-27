import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet, TouchableOpacity, ImageBackground, StatusBar} from 'react-native';
import {attemptGoogleAuth, registerWithEmail} from '../../API';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CheckBox} from 'react-native-elements'
import EmailValidation from '../../Validation/Email';
import PasswordValidation from '../../Validation/Password';
import {signInWithEmail} from '../../API';
import bgImage from '../../../assets/images/loginbg.jpg';
import FormElementThree from '../../components/Login/FormElementThree';
import ActionButtonFour from '../../components/Login/ActionButtonFour';
import LoginFooterTwo from '../../components/Login/LoginFooterTwo';
import PasswordElementThree from '../../components/Login/PasswordElementThree';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailError: null,
      passwordError: null,
      checked: false
    }
  }

  validateInputs() {
    this.setState({emailError: EmailValidation(this.state.email.text)})
    this.setState({passwordError: PasswordValidation(this.state.password.text)})

    if (!this.state.checked)
      this.showMessage('kindly accept the terms and conditions')
    return (this.state.emailError == null &&
      this.state.passwordError == null &&
      this.state.checked)
  }

  async signUp() {
    if (this.validateInputs()) {
      var result = await registerWithEmail(this.state.email.text, this.state.password.text);

      //call the signup api based on the role of user
    }
  }

  googleLogin = () => {
    attemptGoogleAuth();
  }

  async signIn() {
    var result = await signInWithEmail(this.state.email.text, this.state.password.text);
  }

  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={styles.contentContainer}>
        <StatusBar backgroundColor='black'/>
        <ImageBackground source={bgImage} resizeMode="cover" blurRadius={2} style={styles.backgroundImage}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Get Started</Text>
            </View>
            <View style={styles.subContainer}>
              <View style={styles.formElements}>
                <FormElementThree placeholder="  Email" onChangeText={(text) => this.setState({email: text})}/>
                {!!this.state.emailError && (
                  <Text style={styles.formError}>{this.state.emailError}</Text>
                )}
                <PasswordElementThree placeholder="  Password" onChangeText={(text) => {
                  this.setState({password: text})
                }}/>
                {!!this.state.passwordError && (
                  <Text style={styles.formError}>{this.state.passwordError}</Text>
                )}

                <View style={styles.formElementsFooter}>
                  <CheckBox
                    wrapperStyle={styles.checkBoxWrapperStyle}
                    center
                    title={<TouchableOpacity onPress={() => {
                    }} style={styles.terms}>
                      <Text style={styles.termsOne}>I accept the </Text>
                      <Text style={styles.termTwo}>terms & conditions</Text>
                    </TouchableOpacity>}
                    containerStyle={styles.checkBoxContainerStyle}
                    checked={this.state.checked}
                    checkedColor="white"
                    onPress={() => {
                      this.setState({checked: !this.state.checked}), console.log(this.state.checked)
                    }}
                  />
                  <ActionButtonFour label="Sign Up" onPress={() => this.signUp()}></ActionButtonFour>
                </View>

              </View>
              <View style={styles.alternateOptionsTextContainer}>
                <Text style={styles.alternateOptionsText}>Or Continue with </Text>
                <View style={styles.googleIcon}>
                  <TouchableOpacity onPress={() => {
                    this.googleLogin()
                  }}>
                    <FontAwesome
                      name='google'
                      color='white'
                      size={40}
                      style={{marginTop: 10}}
                    />
                  </TouchableOpacity>
                </View>
                <LoginFooterTwo content="Already have an account?  " clickableContent=" Sign in"
                                onPress={() => this.props.navigation.pop()}/>
              </View>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create(
  {
    contentContainer: {
      flexGrow: 1,
      backgroundColor: 'black',
      width: "100%"
    },
    backgroundImage: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    },
    container: {
      flex: 1,
      width: '100%',
      marginRight: 30,
      marginLeft: 30
    },
    header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginLeft: 30
    },
    headerText: {
      // color: "#BCBCBF",
      color: 'white',
      fontSize: 35,
      fontWeight: 'bold'
    },
    subContainer: {
      flex: 5,
      justifyContent: 'center',
      marginRight: 20,
      marginLeft: 20
    },
    formElements: {
      flex: 3,
      justifyContent: 'center',
      width: '100%'
    },
    formElementsFooter: {
      marginTop: 80,
      width: "100%",
      alignItems: 'center'
    },
    formError: {
      color: "white",
      marginLeft: 15
    },
    checkBoxContainerStyle: {
      backgroundColor: "rgba(0,0,0,0)",
      backfaceVisibility: "hidden",
      borderColor: "rgba(0,0,0,0)",
      alignSelf: "auto",
      marginTop: 10
    },
    terms: {
      flexDirection: 'row'
    },
    googleIcon: {
      flexDirection: 'row'
      , marginTop: 10
    },
    alternateOptionsTextContainer: {
      alignItems: 'center',
      flex: 2,
      justifyContent: 'center'
    },
    alternateOptionsText: {
      color: '#BCBCBF',
      fontSize: 18,
      marginTop: 30,
      fontWeight: 'bold'
    },
    termsOne: {
      fontSize: 16,
      // color: '',
      color: '#BCBCBF'
    },

    checkBoxWrapperStyle: {
      marginBottom: 20
    },
    termTwo: {
      color: 'white',
      fontSize: 16,
      fontWeight: "bold"
    }
  });