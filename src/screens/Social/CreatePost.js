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
import SwitchSelector from "react-native-switch-selector";
import Video from 'react-native-video';
import ImagePicker from "react-native-image-picker";


import { appTheme } from "../../constants/colors";
import * as actionCreators from "../../store/actions";
import { spacing } from "../../constants/dimension";
import fonts from "../../constants/fonts";
import HalfRoundedButton from "../../components/HalfRoundedButton";
import strings from "../../constants/strings";
import {
  INITIAL_PAGE,
  MAX_POST_LENGTH,
  POST_TYPE,
} from "../../constants/appConstants";
import { pickImage } from "../../utils/utils";
import { createImagePost, createTextPost, postQuestion,createVideoPost } from "../../API";
import { screenWidth } from "../../utils/screenDimensions";
import { showError, showSuccess } from "../../utils/notification";

class CreatePost extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      imagePath: "",
      imageSrc: null,
      submitting: false,
      type: "",
      videoSrc: null,
      videoPath: "",
    };
  }

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
setVideo=async()=>{
  ImagePicker.showImagePicker( {
    title: 'Select video',
     mediaType: 'video',
    path:'video',
    videoQuality: 'high',
  },async (response) => {
    console.log('Response = ', response);
    
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = { uri: response.uri };
    console.log("response.uri is "+response.uri);
    
    await  this.setState({videoSrc: { uri: response.uri },
        videoPath: response.path})
    
    
    }
    });
}
  changeSwitch = (type) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ type });
  };
  renderSelector = () => {
    return (
      <View style={styles.switchStyle}>
        <SwitchSelector
          initial={0}
          onPress={this.changeSwitch}
          textColor={"white"}
          selectedColor={"white"}
          buttonColor={appTheme.brightContent}
          borderColor={appTheme.darkBackground}
          backgroundColor={appTheme.darkBackground}
          hasPadding
          options={[
            { label: strings.POST, value: POST_TYPE.TYPE_POST },
            { label: strings.QUESTION, value: POST_TYPE.TYPE_QUESTION },
          ]}
        />
      </View>
    );
  };
  renderImage = () => {
    const titleText = this.state.imageSrc
      ? strings.CHANGE_IMAGE
      : strings.ADD_IMAGE;
    return (
      <View style={styles.imageContainer}>
        {this.state.imgSrc && (
          <Image source={this.state.imageSrc} style={styles.imageStyle} />
        )}
        <View style={{ marginRight: "auto", padding: spacing.medium_sm }}>
          <HalfRoundedButton onPress={this.setImage} title={titleText} />
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
          style={{position: 'relative',height: 250,width:'100%'}} />
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
    const disabled = this.state.description.length < 5;
    if (this.state.submitting)
      return <ActivityIndicator color={appTheme.brightContent} size={40} />;
    return (
      <View style={{ flexDirection: "row", marginTop: spacing.medium_sm }}>
        <TouchableOpacity
          onPress={
            this.state.type === POST_TYPE.TYPE_POST
              ? this.createPost:this.state.type === POST_TYPE.TYPE_QUESTION?
               this.createQuestion:this.createVideo
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
          <Text style={{ color: "white", fontFamily: fonts.CenturyGothic }}>
            {strings.POST}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  createVideo=async () => {
    const { videoPath, description ,videoSrc} = this.state;
    const { navigation, updatePosts, updateMyPosts } = this.props;
    Keyboard.dismiss();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ submitting: true });
     let result;
    if (videoPath) {
      result = await createVideoPost(
        videoPath,
        description,
        this.props.authToken,
        videoSrc
      );
    } else result = null;
    this.setState({ submitting: false });
    if (result) {
      updatePosts();
      updateMyPosts();
      showSuccess("Post shared");
      navigation.goBack();
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
      showSuccess("Post shared");
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
    flex:1
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
    color: "white",
    fontFamily: fonts.CenturyGothic,
    fontWeight: "700",
  },
  imageStyle: {
    width: screenWidth - spacing.medium * 2,
    height: 300,
    borderRadius: 10,
  },
  videoStyle:{
width:'100%',
height:'100%',
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
