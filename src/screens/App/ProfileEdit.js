import React, {useState, Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, TextInput, View, Image, StatusBar, ActivityIndicator} from 'react-native';
import {updateUserInfo} from '../../API';
import ImagePicker from 'react-native-image-picker';
import defaultPic from '../../../assets/images/male_pic_default.jpg';
import {uploadImage} from '../../API';
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ActionButtonTwo from '../../components/Login/ActionButtonTwo';
import {appTheme} from '../../constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SignupFormElement from '../../components/Signup/SIgnupFormElement';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import FastImage from "react-native-fast-image";
import {spacing} from "../../constants/dimension";
import {getRandomImage} from "../../constants/images";

class ProfileEdit extends Component {

  state = {
    name: '',
    bio: '',
    imageUri: null,
    imageUploading: false,
    renderCross: false
  }

  async componentDidMount() {
    const {userData, updateUserData, navigation} = this.props;
    if (userData) {
      this.setLocalState(userData);
      updateUserData();
    } else {
      let result = await updateUserData();
      this.setLocalState(result);
    }
    const {} = this.props;
    if (navigation.canGoBack())
      this.setState({renderCross: true});
  }

  setLocalState = (userData) => {
    const {name, displayPictureUrl} = userData;
    this.setState({name, imageUri: displayPictureUrl});
  }

  setName = (name) => {
    this.setState({name})
  }

  setBio = (bio) => {
    this.setState({bio});
  }

  pickImage = () => {
    const options = {};
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('image url', response.uri);
        this.setState({
          imageUri: response.uri,
        });
        this.submitPhoto(response.path, this.props.authToken);
      }
    });
  };

  submitPhoto = async (path, token) => {
    this.setState({imageUploading: true});
    let result = await uploadImage(path, token);
    if (result) {
      this.setState({imageUploading: false});
    } else {
      this.setState({imageUploading: false, image: null});
    }
  }

  submit = async () => {
    const {navigation, setInitialLoginOff, updateUserData} = this.props;
    const result = await updateUserInfo(this.state.name);
    updateUserData();
    if (result) {
      setInitialLoginOff();
    }
    if (navigation.canGoBack())
      navigation.goBack();
  }

  render() {

    return (
      <>
        <StatusBar backgroundColor={appTheme.darkBackground}/>
        <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={styles.contentContainer}
                                 keyboardShouldPersistTaps={'handled'}>
          <View style={{
            flex: 0.5,
            flexDirection: 'row',
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
            justifyContent: "center"
          }}>
            <Text style={{fontSize: 28, color: 'white'}}>Edit Profile</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 30, marginRight: 30}}>
            <View style={styles.imageContainer}>
              {
                !this.state.imageUri &&
                <Image source={defaultPic} style={styles.imageDimensions}/>
              }
              {
                this.state.imageUri && (
                  <FastImage
                    style={styles.imageDimensions}
                    source={{
                      uri: this.state.imageUri,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                )
              }
              {
                this.state.imageUploading && (
                  <View style={[styles.imageDimensions, styles.loader]}>
                    <ActivityIndicator size={50} color={'white'}/>
                  </View>
                )
              }
            </View>
            <View style={{alignItems: 'center', bottom: 45, width: "55%"}}>
              {
                !this.state.imageUploading && (
                  <ActionButtonTwo onPress={this.pickImage} label="Update" color='#DD3180'/>
                )
              }
            </View>


          </View>
          <View style={{flex: 3, marginLeft: 30}}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.textInput} value={this.state.name} onChangeText={this.setName}/>
            <View style={styles.itemSeparatorHorizontal}/>
            {/*<Text style={styles.label}>Bio</Text>*/}
            {/*<TextInput style={styles.textInput} multiline={true} onChangeText={this.setBio}/>*/}
            {/*<View style={styles.itemSeparatorHorizontal}/>*/}
            <KeyboardSpacer/>
          </View>

          <View style={styles.bottomBar}>
            {
              this.state.renderCross && (<TouchableOpacity
                  style={{marginRight: 60}}
                  onPress={() => {
                    this.props.navigation.goBack()
                  }}>
                  <FontAwesome
                    name="times-circle-o"
                    color="grey"
                    size={40}
                  />
                </TouchableOpacity>
              )
            }
            {
              !this.state.renderCross && <View/>
            }
            <TouchableOpacity
              style={{marginLeft: 60}}
              onPress={() => {
                this.submit()
              }}>
              <FontAwesome
                name="check-circle-o"
                color='#DD3180'
                size={40}
              />
            </TouchableOpacity>
          </View>
          <KeyboardSpacer/>
        </KeyboardAwareScrollView>

      </>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    backgroundColor: appTheme.darkBackground,
  },
  itemSeparatorHorizontal: {
    height: 1,
    borderLeftWidth: 1,
    backgroundColor: appTheme.grey,
    marginTop: 5,
    marginBottom: 20,
    marginRight: 30
  },
  label: {
    color: 'grey',
    fontSize: fontSizes.h2
  },
  textInput: {
    color: 'white',
    fontSize: fontSizes.h1,
    fontFamily: fonts.MontserratMedium
  },
  bottomBar: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginRight: spacing.large,
    marginLeft: spacing.large,
    marginBottom: spacing.medium
  },
  imageDimensions: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  loader: {
    position: 'absolute',
    backgroundColor: appTheme.grey + '9e',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

})
const mapStateToProps = (state) => ({
  authToken: state.user.authToken,
  userData: state.user.userData
});

const mapDispatchToProps = (dispatch) => ({
  setAuthenticated: (value) => dispatch(actionCreators.setAuthenticated(value)),
  setInitialLoginOff: () => dispatch(actionCreators.setInitialLoginOff()),
  updateUserData: () => dispatch(actionCreators.updateUserData())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);