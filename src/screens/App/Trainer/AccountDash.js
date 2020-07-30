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
  Image,
  FlatList
} from 'react-native'
import {connect} from "react-redux";

import {appTheme} from "../../../constants/colors";
import fontSizes from "../../../constants/fontSizes";
import fonts from "../../../constants/fonts";
import strings from "../../../constants/strings";
import {spacing} from "../../../constants/dimension";
import {iconBackgrounds} from "../../../constants/images";
import * as actionCreators from "../../../store/actions";
import RouteNames from "../../../navigation/RouteNames";

class AccountDash extends PureComponent {
  state = {
    sections: []
  }

  async componentDidMount() {
    this.setSections();
    await this.props.getAccountSummary();
    this.setSections();
  }

  setSections = () => {
    let sections = [
      {
        subtitle: strings.ACCOUNT,
        title: strings.STATEMENT,
        buttonText: strings.CHECK_NOW,
        callback: this.props.statementsAvailable && this.openStatement,
        media: require('../../../../assets/Icons/graphManMini.png')
      }, {
        subtitle: strings.PAID_AMOUNT,
        title: this.props.claimedAmount,
        buttonText: strings.GENERATE_INVOICE,
        callback: this.props.claimableAmount > 0 ? null : null,
        media: require('../../../../assets/Icons/moneyBagMini.png')
      }, {
        subtitle: strings.DUE,
        title: this.props.claimableAmount,
        buttonText: strings.CLAIM_NOW,
        callback: this.props.claimableAmount > 0 ? null : null,
        media: require('../../../../assets/Icons/serverTableMini.png')
      },
    ]
    this.setState({sections});
  }

  openStatement = () => {
    this.props.navigation.navigate(RouteNames.AccountStatement);
  }
  openAccount = () => {
    this.props.navigation.navigate(RouteNames.AddAccount);
  }

  renderSection = (data) => {
    return (
      <View style={[styles.bar, styles.sectionContainer]}>
        <View>
          <Text style={styles.sectionHeading}>{data.subtitle}</Text>
          <Text style={styles.sectionTitle}>{data.title}</Text>

          <TouchableOpacity disabled={!data.callback} style={styles.sectionButtonContainer} onPress={data.callback}>
            <Text style={[styles.sectionButtonText, !data.callback && styles.disabled]}>{data.buttonText}</Text>
          </TouchableOpacity>

        </View>
        <Image style={styles.sectionImage} source={data.media}/>
      </View>
    )
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.subtitle}>{strings.TOTAL_EARNING}</Text>
          <Text style={styles.title}>{this.props.totalEarnings}<Text style={styles.subtitle}>{strings.INR}</Text></Text>
          <View style={{alignSelf: 'flex-start'}}>
            <TouchableOpacity activeOpacity={0.6} style={styles.pillButton}>
              <Text style={styles.boldSubtitle}>{strings.EXPORT_OVERVIEW}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} style={styles.pillButton} onPress={() => this.openAccount()}>
              <Text style={styles.boldSubtitle}>{strings.ADD_ACCOUNT}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={[styles.bar, styles.halfBar]}>
            <Text style={styles.sectionHeading}>{strings.OVERVIEW}</Text>
          </View>
          <FlatList
            data={this.state.sections}
            renderItem={({item, index}) => this.renderSection(item)}
            keyExtractor={item => item.subtitle}
            showsVerticalScrollIndicator={false}
          />
        </View>
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
  sectionContainer: {
    flexDirection: 'row',
    paddingVertical: spacing.medium
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
    marginTop: spacing.small,
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
    justifyContent: 'space-between',
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
    height: 100,
    width: 100
  },
  disabled: {
    color: appTheme.grey
  }
});

const mapStateToProps = (state) => ({
  claimedAmount: state.trainer.earnings.claimedAmount,
  claimableAmount: state.trainer.earnings.claimableAmount,
  totalEarnings: state.trainer.earnings.totalEarnings,
  statementsAvailable: state.trainer.statements.length > 0
});

const mapDispatchToProps = (dispatch) => ({
  getAccountSummary: () => dispatch(actionCreators.getAccountSummary())
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDash);
