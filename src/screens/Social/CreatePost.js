/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView, TouchableOpacity, TextInput, Image, LayoutAnimation, ActivityIndicator,
} from 'react-native'
import {connect} from "react-redux";

import {appTheme} from "../../constants/colors";
import * as actionCreators from '../../store/actions';
import {spacing} from "../../constants/dimension";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import HalfRoundedButton from "./HalfRoundedButton";
import strings from "../../constants/strings";
import {imageTypes, INITIAL_PAGE, MAX_POST_LENGTH} from "../../constants/appConstants";
import {pickImage} from "../../utils/utils";
import {createImagePost, createTextPost, uploadImage} from "../../API";
import {screenWidth} from "../../utils/screenDimensions";
import {showError, showSuccess} from "../../utils/notification";

class CreatePost extends Component {

  state = {
    description: '',
    imagePath: '',
    imageSrc: null,
    submitting: false
  }
  setImage = () => {
    pickImage(async response => {
      if (!response.uri) return;
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({
        imageSrc: {uri: response.uri},
        imagePath: response.path
      });
    });
  }

  renderImage = () => {
    const titleText = this.state.imageSrc ? strings.CHANGE_IMAGE : strings.ADD_IMAGE
    return (
      <View style={styles.imageContainer}>
        {this.state.imageSrc && <Image
          source={this.state.imageSrc}
          style={styles.imageStyle}
        />}

        <View style={{marginRight: 'auto', padding: spacing.medium_sm}}>
          <HalfRoundedButton onPress={this.setImage} title={titleText}/>
        </View>
      </View>
    )
  }

  renderDescription = () => {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{strings.DESCRIPTION}</Text>
          <Text
            style={[styles.title, {color: appTheme.brightContent}]}>{this.state.description.length}/{MAX_POST_LENGTH}</Text>
        </View>
        <TextInput
          numberOfLines={3}
          multiline={true}
          value={this.state.description}
          onChangeText={this.onDescriptionChange}
          style={[styles.title, styles.textInput]}
          underlineColorAndroid={'transparent'}
          maxLength={MAX_POST_LENGTH}
        />
      </View>
    )

  }
  onDescriptionChange = (description) => {
    this.setState({description});
  }

  renderSubmit = () => {
    const disabled = this.state.description.length < 5;
    if (this.state.submitting)
      return (
        <ActivityIndicator color={appTheme.brightContent} size={40}/>
      )
    return (
      <View style={{flexDirection: 'row', marginTop: spacing.medium_sm}}>
        <TouchableOpacity
          onPress={this.createPost}
          disabled={disabled}
          style={[styles.submitButton, {backgroundColor: disabled ? appTheme.grey : appTheme.brightContent}]}>
          <Text style={{color: 'white', fontFamily: fonts.CenturyGothic}}>{strings.POST}</Text>
        </TouchableOpacity>
      </View>
    )
  }
  createPost = async () => {
    const {imagePath, description} = this.state;
    const {navigation, updatePosts, updateMyPosts} = this.props;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({submitting: true});
    let result;
    if (imagePath) {
      result = await createImagePost(imagePath, description, this.props.authToken);
    } else result = await createTextPost(description);
    this.setState({submitting: false});
    if (result) {
      updatePosts();
      updateMyPosts();
      showSuccess('Post shared');
      navigation.goBack();
    } else {
      showError('Post creation failed, try again');
    }
  }

  render() {
    return (<>
        <StatusBar backgroundColor={appTheme.lightBackground}/>
        <View
          style={styles.container}>
          <ScrollView keyboardShouldPersistTaps={'always'} style={{flex: 1}} showsVerticalScrollIndicator={false}>
            {this.renderImage()}
            {this.renderDescription()}
            {this.renderSubmit()}
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: spacing.medium,
    // paddingRight: spacing.medium,
    backgroundColor: appTheme.background,
    flex: 1
  },
  imageContainer: {
    backgroundColor: appTheme.darkBackground,
    borderRadius: 10,
    marginBottom: spacing.medium
  },
  contentContainer: {
    backgroundColor: appTheme.darkBackground,
    borderRadius: 10,
    padding: spacing.medium,
    marginBottom: spacing.medium
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    color: 'white',
    fontFamily: fonts.CenturyGothic,
    fontWeight: '700'
  },
  imageStyle: {
    width: screenWidth - spacing.medium * 2,
    height: 300,
    borderRadius: 10
  },
  textInput: {
    backgroundColor: appTheme.background,
    borderRadius: 10,
    marginTop: spacing.medium_sm,
    textAlignVertical: 'top',
    paddingLeft: spacing.small,
    paddingRight: spacing.small
  },
  submitButton: {
    backgroundColor: appTheme.brightContent,
    borderRadius: 20,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    padding: spacing.small,
    flexGrow: 0
  }
});

const mapStateToProps = (state) => ({
  postDetails: state.social.postDetails,
  authToken: state.user.authToken,
});

const mapDispatchToProps = (dispatch) => ({
  updatePost: (postId) => dispatch(actionCreators.updatePost(postId)),
  updatePosts: () => dispatch(actionCreators.updatePosts(INITIAL_PAGE)),
  updateMyPosts: () => dispatch(actionCreators.updatePosts(INITIAL_PAGE, true))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);