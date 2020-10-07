/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  LayoutAnimation,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import Video from 'react-native-video';
import { ListItem, Overlay, Card } from 'react-native-elements';
import CropImagePicker from 'react-native-image-crop-picker';
import ImagePicker from "react-native-image-crop-picker";
import MediaMeta from 'react-native-media-meta';

import { appTheme } from "../../constants/colors";
import * as actionCreators from "../../store/actions";
import { spacing } from "../../constants/dimension";
import fonts from "../../constants/fonts";
import HalfRoundedButton from "../../components/HalfRoundedButton";
import strings from "../../constants/strings";
import {
  INITIAL_PAGE,
  MAX_POST_LENGTH, MAX_VIDEO_LENGTH,
  POST_TYPE,
} from "../../constants/appConstants";
import { pickImage } from "../../utils/utils";
import { createImagePost, createTextPost, postQuestion, createVideoPost } from "../../API";
import { screenWidth } from "../../utils/screenDimensions";
import { showError, showSuccess } from "../../utils/notification";

class CreatePost extends PureComponent {

  state = {
    description: "",
    imagePath: "",
    imageSrc: null,
    submitting: false,
    type: POST_TYPE.TYPE_POST,
    videoSrc: null,
    videoPath: "",
    isModalVisible : false
  };

  componentDidMount() {
    const { route } = this.props;
    if (route.params && route.params.type) {
      const { type } = route.params;
      this.setState({ type });
      this.props.navigation.setOptions({
        title:
          type === POST_TYPE.TYPE_VIDEO
            ? "Upload video"
            : type === POST_TYPE.TYPE_POST
              ? "Create post"
              : "Ask an expert",
      });
    }
  }

  setImage = () => {
    pickImage(async (response) => {
      if (!response.uri) return;
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({
        imageSrc: { uri: response.uri },
        imagePath: response.path,
      });
    });

  };
  setVideo = async () => {
    ImagePicker.showImagePicker({
      title: 'Select video',
      takePhotoButtonTitle:'Take Video',
      mediaType: 'video',
      path: 'video',
      videoQuality: 'high',
    }, async (response) => {

      if (response.didCancel) { 
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // Finding duration differs on ios, related article:
        // https://dev.to/saadbashar/finding-video-duration-react-native-456f
        const metaData = await MediaMeta.get(response.path);
        if (metaData.duration > MAX_VIDEO_LENGTH) {
          showError(strings.VIDEO_LENGTH_EXCEEDED); // TODO: derive video length in this string constant
        } else await
          this.setState({
            videoSrc: { uri: response.uri },
            videoPath: response.path
          })
      }
    });
  }
  handleUpload = () => {  
    CropImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(response => {
      this.toggleModal()
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({
        imageSrc: { uri: response.path },
        imagePath: response.path,
      });
    });
    
  };
  handleCapture = () => {
    CropImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(response => {
      this.toggleModal()
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({
        imageSrc: { uri: response.path },
        imagePath: response.path,
      });
    });
 
  };
  renderImage = () => {
    const titleText = this.state.imageSrc
      ? strings.CHANGE_IMAGE
      : strings.ADD_IMAGE;
    return (
      <View style={styles.imageContainer}>
        {this.state.imageSrc && (
          <Image source={this.state.imageSrc} style={styles.imageStyle} />
        )}
        <View style={{ marginRight: "auto", padding: spacing.medium_sm }}>
          <HalfRoundedButton onPress={this.toggleModal} title={titleText} />
        </View>
      </View>
    );
  };

  renderVideo = () => {
    const titleText = this.state.videoSrc
      ? strings.CHANGE_VIDEO
      : strings.ADD_VIDEO;
    return (
      <View style={styles.videoContainer}>
        {this.state.videoSrc && (
          <Video source={this.state.videoSrc}
            repeat={true}
            resizeMode="stretch"
            ref={(ref) => {
              this.player = ref
            }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onError={this.videoError}
            style={{ position: 'relative', height: 250, width: '100%' }} />
        )}
        <View style={{ marginRight: "auto", padding: spacing.medium_sm }}>
          <HalfRoundedButton onPress={this.setVideo} title={titleText} />
        </View>
      </View>
    );
  };
  renderDescription = () => {
    const title =
      this.state.type === POST_TYPE.TYPE_POST
        ? strings.POST
        : this.state.type === POST_TYPE.TYPE_VIDEO
          ? strings.DESCRIPTION
          : strings.DESCRIPTION;
    return (
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.title, { color: appTheme.brightContent }]}>
            {this.state.description.length}/{MAX_POST_LENGTH}
          </Text>
        </View>
        <TextInput
          numberOfLines={3}
          multiline={true}
          value={this.state.description}
          onChangeText={this.onDescriptionChange}
          style={[styles.title, styles.textInput]}
          underlineColorAndroid={"transparent"}
          maxLength={MAX_POST_LENGTH}
        />
      </View>
    );
  };
  onDescriptionChange = (description) => {
    this.setState({ description });
  };

  renderSubmit = () => {
    const disabled = this.state.description.length < 1;
    if (this.state.submitting)
      return <ActivityIndicator color={appTheme.brightContent} size={40} />;
    return (
      <View style={{ flexDirection: "row", marginTop: spacing.medium_sm }}>
        <TouchableOpacity
          onPress={
            this.state.type === POST_TYPE.TYPE_POST
              ? this.createPost : this.state.type === POST_TYPE.TYPE_QUESTION ?
                this.createQuestion : this.createVideo
          }
          disabled={disabled}
          style={[
            styles.submitButton,
            {
              backgroundColor: disabled
                ? appTheme.grey
                : appTheme.brightContent,
            },
          ]}
        >
          <Text style={{ color: appTheme.textPrimary, fontFamily: fonts.CenturyGothic }}>
            {strings.POST}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  createVideo = async () => {
    const { videoPath, description, videoSrc } = this.state;
    const { navigation, updatePosts, updateMyPosts } = this.props;
    Keyboard.dismiss();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ submitting: true });
    let result;
    if (videoPath) {
      navigation.goBack();
      result = await createVideoPost(
        videoPath,
        description,
        this.props.authToken,
        videoSrc
      );
    } else result = null;
    // this.setState({submitting: false});
    if (result) {
      updatePosts();
      updateMyPosts();
      showSuccess("Approval awaited");
    } else {
      showError("Video upload failed, try again");
    }

  }
  createPost = async () => {
    const { imagePath, description } = this.state;
    const { navigation, updatePosts, updateMyPosts } = this.props;
    Keyboard.dismiss();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ submitting: true });
    let result;
    if (imagePath) {
      result = await createImagePost(
        imagePath,
        description,
        this.props.authToken
      );
    } else result = await createTextPost(description);
    this.setState({ submitting: false });
    if (result) {
      updatePosts();
      updateMyPosts();
      showSuccess("Approval awaited");
      navigation.goBack();
    } else {
      showError("Post creation failed, try again");
    }
  };
  createQuestion = async () => {
    const { description } = this.state;
    const { navigation, updateQuestions } = this.props;
    Keyboard.dismiss();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ submitting: true });
    let result = await postQuestion(description);
    this.setState({ submitting: false });
    if (result) {
      showSuccess("Question posted");
      updateQuestions();
      navigation.goBack();
    } else {
      showError("Error, try again");
    }
  };
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  render() {
    const { type } = this.state;

    return (
      <>
        <StatusBar backgroundColor={appTheme.lightBackground} />
        <View style={styles.container}>
          <ScrollView
            keyboardShouldPersistTaps={"always"}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {/*{this.props.userType === userTypes.USER || true && this.renderSelector()}*/}
            {type === POST_TYPE.TYPE_POST && this.renderImage()}
            {type === POST_TYPE.TYPE_VIDEO && this.renderVideo()}
            {this.renderDescription()}
            {this.renderSubmit()}
          </ScrollView>
        </View>
        <Overlay isVisible={this.state.isModalVisible} onBackdropPress={this.toggleModal}>
          <View style = {{width : 350}}>
            <Text style = {{fontSize : 15, textAlign : "center", padding : 10}}>Select Image</Text>
            <Card.Divider/>
            <TouchableOpacity onPress={this.handleCapture}>
              <Card.Title>Take Photo</Card.Title>
              <Card.Divider/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleUpload} >
              <Card.Title>Upload Photo</Card.Title>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleModal} >
              <Card.Divider/>
              <Card.Title>Cancel</Card.Title>
            </TouchableOpacity>
          </View>                   
        </Overlay>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: spacing.medium,
    backgroundColor: appTheme.background,
    flex: 1,
  },
  imageContainer: {
    backgroundColor: appTheme.darkBackground,
    borderRadius: 10,
    marginBottom: spacing.medium,
  },
  videoContainer: {
    backgroundColor: appTheme.darkBackground,
    borderRadius: 10,
    marginBottom: spacing.medium,
    flex: 1
  },
  contentContainer: {
    backgroundColor: appTheme.darkBackground,
    borderRadius: 10,
    padding: spacing.medium,
    marginBottom: spacing.medium,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: appTheme.textPrimary,
    fontFamily: fonts.CenturyGothic,
    fontWeight: "700",
  },
  imageStyle: {
    width: screenWidth - spacing.medium * 2,
    height: 300,
    borderRadius: 10,
  },
  videoStyle: {
    width: '100%',
    height: '100%',
  },
  textInput: {
    backgroundColor: appTheme.background,
    borderRadius: 10,
    marginTop: spacing.medium_sm,
    textAlignVertical: "top",
    paddingLeft: spacing.small,
    paddingRight: spacing.small,
  },
  submitButton: {
    backgroundColor: appTheme.brightContent,
    borderRadius: 20,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    padding: spacing.small,
    flexGrow: 0,
  },
  switchStyle: {
    width: 200,
    marginBottom: spacing.medium,
  },
});

const mapStateToProps = (state) => ({
  postDetails: state.social.postDetails,
  authToken: state.user.authToken,
  userType: state.user.userType,
});

const mapDispatchToProps = (dispatch) => ({
  updatePost: (postId) => dispatch(actionCreators.updatePost(postId)),
  updatePosts: () => dispatch(actionCreators.updatePosts(INITIAL_PAGE)),
  updateMyPosts: () => dispatch(actionCreators.updatePosts(INITIAL_PAGE, true)),
  updateQuestions: () => dispatch(actionCreators.updateQuestions(INITIAL_PAGE)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
