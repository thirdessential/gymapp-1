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
import colors, {appTheme, darkPallet} from '../../constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import FastImage from "react-native-fast-image";
import {spacing} from "../../constants/dimension";
import LinearGradient from "react-native-linear-gradient";


class ProfileEdit extends Component {

  state = {
    name: '',
    bio: '',
    imageUri: null,
    imageUploading: false,
    renderCheck: true
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
      this.setState({renderCheck: false});

    this.unsubscribe = navigation.addListener('blur', e => {
      this.submit();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  setLocalState = (userData) => {
    const {name = '', displayPictureUrl, bio = ''} = userData;
    this.setState({name, imageUri: displayPictureUrl, bio});
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
    this.props.updateUserData();

  }

  submit = async () => {
    const {setInitialLoginOff, updateUserData} = this.props;
    updateUserInfo(this.state.name, this.state.bio);
    // updateUserData();
    // if (result) {
    setInitialLoginOff();
    // }
  }

  render() {
    return (
      <LinearGradient
        colors={[darkPallet.darkBlue, darkPallet.extraDarkBlue]}
        style={styles.container}>
        <StatusBar backgroundColor={appTheme.darkBackground}/>
        <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={styles.contentContainer}
                                 keyboardShouldPersistTaps={'handled'}>

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 30, marginRight: 30}}>
            <View style={styles.imageContainer}>
              {
                !this.state.imageUri &&
                <Image source={defaultPic} style={styles.imageDimensions}/>
              }
              {
                !!this.state.imageUri && (
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
                  <ActionButtonTwo onPress={this.pickImage} label="Update" color={appTheme.brightContent}/>
                )
              }
            </View>


          </View>
          <View style={{flex: 3, marginLeft: 30}}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.textInput} value={this.state.name} onChangeText={this.setName}/>
            <View style={styles.itemSeparatorHorizontal}/>
            <Text style={styles.label}>Bio</Text>
            <TextInput style={styles.textInput} value={this.state.bio} multiline={true} onChangeText={this.setBio}/>
            <View style={styles.itemSeparatorHorizontal}/>
            <KeyboardSpacer/>
          </View>

          <View style={styles.bottomBar}>
            {
              this.state.renderCheck && (
                <TouchableOpacity onPress={this.submit}>
                  <FontAwesome
                    name="check"
                    color={appTheme.brightContent}
                    size={30}
                  />
                </TouchableOpacity>
              )
            }

          </View>
          <KeyboardSpacer/>
        </KeyboardAwareScrollView>

      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1,
    marginTop: spacing.thumbnail
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
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginRight: spacing.large,
    marginLeft: spacing.large,
    marginBottom: spacing.medium
  },
  imageDimensions: {
    width: 200,
    height: 200,
    borderRadius: 15
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