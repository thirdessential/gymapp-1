/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native'
import {connect} from "react-redux";

import {appTheme} from "../../../constants/colors";
import fontSizes from "../../../constants/fontSizes";
import fonts from "../../../constants/fonts";
import {openDrawerButtonDark} from "../../../navigation/openDrawerButton";
import strings from "../../../constants/strings";
import {spacing} from "../../../constants/dimension";
import {iconBackgrounds} from "../../../constants/images";

class AccountDash extends PureComponent {
  state = {}

  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'Dashboard',
      headerTintColor: appTheme.darkBackground,
      headerStyle: {
        backgroundColor: appTheme.brightContent,
      },
      headerLeft: openDrawerButtonDark
    })
  }

  sections = [
    {
      subtitle: strings.ACCOUNT,
      title: strings.STATEMENT,
      buttonText: strings.CHECK_NOW,
      callback: null,
      media: iconBackgrounds.graphMan
    }, {
      subtitle: strings.PAID_AMOUNT,
      title: '22000',
      buttonText: strings.GENERATE_INVOICE,
      callback: null,
      media: iconBackgrounds.moneyBag
    }, {
      subtitle: strings.DUE,
      title: 1000,
      buttonText: strings.CLAIM_NOW,
      callback: null,
      media: iconBackgrounds.serverTable
    },
  ]

  renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.subtitle}>{strings.TOTAL_EARNING}</Text>
      <Text style={styles.title}>55000<Text style={styles.subtitle}>{strings.INR}</Text></Text>
      <View style={{alignSelf: 'flex-start'}}>
        <TouchableOpacity activeOpacity={0.6} style={styles.pillButton}>
          <Text style={styles.boldSubtitle}>{strings.EXPORT_OVERVIEW}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  renderSection = (data) => (
    <View key={data.subtitle} style={[styles.bar,{flexDirection:'row', paddingVertical:spacing.medium}]}>
      <View>
        <Text style={styles.sectionHeading}>{data.subtitle}</Text>
        <Text style={styles.sectionTitle}>{data.title}</Text>
        <TouchableOpacity style={styles.sectionButtonContainer} onPress={data.callback}>
          <Text style={styles.sectionButtonText}>{data.buttonText}</Text>
        </TouchableOpacity>
      </View>
      <Image style={styles.sectionImage} source={data.media}/>
    </View>
  )
  renderContent = () => (
    <View style={styles.contentContainer}>
      <View style={[styles.bar, styles.halfBar]}>
        <Text style={styles.sectionHeading}>{strings.OVERVIEW}</Text>
      </View>
      {this.sections.map(section => this.renderSection(section))}
    </View>
  )

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {this.renderHeader()}
        {this.renderContent()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.brightContent,
  },
  headerContainer: {
    marginHorizontal: spacing.large_lg,
    marginVertical: spacing.space_50
  },
  title: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.largeTitle,
    fontFamily: fonts.CenturyGothicBold
  },
  subtitle: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h1,
    fontFamily: fonts.CenturyGothic
  },
  pillButton: {
    borderRadius: 100,
    backgroundColor: appTheme.darkBackground,
    padding: spacing.medium,
    paddingVertical: spacing.medium_sm,
    marginTop: spacing.small
  },
  boldSubtitle: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h4,
    fontFamily: fonts.CenturyGothicBold
  },
  contentContainer: {
    backgroundColor: appTheme.darkBackground,
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: spacing.medium_lg
  },
  sectionHeading: {
    color: appTheme.greyC,
    fontSize: fontSizes.h3,
    fontFamily: fonts.CenturyGothic
  },
  sectionTitle: {
    color: appTheme.textPrimary,
    fontSize: fontSizes.h0,
    fontFamily: fonts.CenturyGothicBold,
    marginTop: spacing.small
  },
  halfBar: {
    borderRadius: 0,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    alignItems: 'center',
    paddingLeft: spacing.medium
  },
  bar: {
    backgroundColor: appTheme.background,
    padding: spacing.medium,
    marginBottom: spacing.medium_lg,
    borderRadius: 25,
    paddingHorizontal: spacing.large_lg,
    justifyContent:'space-between',
    alignItems: 'center'
  },
  sectionButtonText: {
    color: appTheme.brightContent,
    fontSize: fontSizes.h3,
    fontFamily: fonts.CenturyGothic,
  },
  sectionButtonContainer: {
    marginTop: spacing.medium_sm
  },
  sectionImage: {
    height:100,
    width:100
  }
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDash);
