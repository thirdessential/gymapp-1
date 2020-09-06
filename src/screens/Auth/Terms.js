import React from "react";
import {ActivityIndicator, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import Pdf from "react-native-pdf";

import * as actionCreators from "../../store/actions";
import {appTheme, bmiColors} from "../../constants/colors";
import {INITIAL_USER_TYPE, userTypes} from "../../constants/appConstants";
import {screenHeight, screenWidth} from "../../utils/screenDimensions";
import strings from "../../constants/strings";
import {spacing} from "../../constants/dimension";
import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import RouteNames from "../../navigation/RouteNames";

class Terms extends React.Component {

  state = {
    source: null
  }

  componentDidMount() {
    const {userType} = this.props;
    const pdfSource = userType === userTypes.TRAINER ?
      {uri: 'bundle-assets://pdf/trainerPolicy.pdf'} :
      {uri: 'bundle-assets://pdf/terms.pdf'};
    this.setState({source: pdfSource})
  }

  openPolicy = () => {
    const {navigation} = this.props;
    navigation.navigate(RouteNames.PdfViewer, {
      source: {uri: 'bundle-assets://pdf/privacyPolicy.pdf'}
    })
  }
  acceptTerms = () => {
    this.props.acceptTerms();
  }

  renderAccept = () => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={this.openPolicy}>
          <Text style={styles.subHeading}>{strings.READ_TERMS}<Text
            style={{color: 'black'}}> {strings.PRIVACY_POLICY}</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.acceptTerms}
          activeOpacity={0.8}
          style={styles.button}>
          <Text style={styles.heading}>{strings.ACCEPT.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    )
  }


  render() {
    return (
      <View
        style={styles.container}>
        <StatusBar backgroundColor={appTheme.darkBackground}/>
        {this.state.source && (
          <Pdf
            source={this.state.source}
            // onPressLink={(uri) => {
            //   console.log(`Link pressed: ${uri}`)
            // }}
            fitPolicy={0}
            activityIndicator={<ActivityIndicator size={30} color={appTheme.grey}/>}
            style={styles.pdf}/>
        )}
        {this.renderAccept()}

      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  userType: state.user.userType
});

const mapDispatchToProps = (dispatch) => ({
  acceptTerms: () => dispatch(actionCreators.acceptTerms())
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.background,
  },
  pdf: {
    flex: 1,
    backgroundColor: appTheme.background
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderTopWidth: 0.7,
    borderColor: appTheme.greyC,
    padding: spacing.medium_sm,
    paddingHorizontal: spacing.medium_lg
  },
  button: {
    backgroundColor: bmiColors.blue,
    padding: spacing.small_lg,
    borderRadius: 20
  },
  heading: {
    color: appTheme.textPrimary,
    textAlign: 'center',
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fontSizes.h3
  },
  subHeading: {
    color: appTheme.grey,
    textAlign: 'center',
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: fontSizes.h4,
    marginBottom: spacing.small
  },
  row: {
    flexDirection: 'row',
    width: screenWidth / 1.3
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Terms);
