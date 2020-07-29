/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  FlatList, LayoutAnimation, ActivityIndicator, Keyboard,
} from "react-native";
import {connect} from "react-redux";

import {appTheme} from "../../../constants/colors";
import fontSizes from "../../../constants/fontSizes";
import fonts from "../../../constants/fonts";
import strings from "../../../constants/strings";
import {spacing} from "../../../constants/dimension";
import {iconBackgrounds} from "../../../constants/images";
import * as actionCreators from "../../../store/actions";
import RouteNames from "../../../navigation/RouteNames";
import Entypo from "react-native-vector-icons/Entypo";
import {showMessage} from "react-native-flash-message";
import {showError, showSuccess} from "../../../utils/notification";

const initialState = {
  ifscCode: "",
  accountNumber: "",
  holderName: "",
  bankName: "",
  submitting: false
};

class AddAccount extends Component {
  state = initialState;

  componentDidMount() {
    this.props.getMyAccounts();
  }

  saveAccount = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Keyboard.dismiss();
    const {accountNumber, ifscCode, bankName, holderName} = this.state;
    if (
      accountNumber === "" ||
      ifscCode === "" ||
      bankName === "" ||
      holderName === ""
    )
      showError(strings.PLEASE_ENTER_DETAILS);
    else {
      this.setState({submitting: true});
      await this.props.addAccount(this.state);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      await this.props.getMyAccounts();
      showSuccess(strings.ACCOUNT_CREATED);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState(initialState);
    }
  };
  renderCard = () => {
    return (
      <View style={styles.detailsCard}>
        <View style={styles.details1detail}>
          <View style={styles.accountNumber}>
            <TextInput
              placeholder="Enter account number"
              style={{color: appTheme.brightContent, paddingLeft: 6}}
              placeholderTextColor="#CCC"
              value={this.state.accountNumber}
              keyboardType={'numeric'}
              onChangeText={(text) => this.setState({accountNumber: text})}
            />
          </View>
          <View style={styles.ifsc}>
            <TextInput
              placeholder="IFSC Code"
              style={{color: appTheme.brightContent, paddingLeft: 6}}
              placeholderTextColor="#CCC"
              value={this.state.ifscCode}
              onChangeText={(text) =>
                this.setState({ifscCode: text.toUpperCase()})
              }
            />
          </View>
        </View>
        <View style={{marginTop: spacing.medium_sm}}>
          <View style={styles.holderName}>
            <TextInput
              placeholder="Account holder name"
              style={{color: appTheme.brightContent, paddingLeft: 6}}
              placeholderTextColor="#CCC"
              value={this.state.holderName}
              onChangeText={(text) =>
                this.setState({holderName: text.toUpperCase()})
              }
            />
          </View>
          <View style={styles.bankName}>
            <TextInput
              placeholder="Bank name"
              placeholderTextColor="#CCC"
              value={this.state.bankName}
              style={{color: appTheme.brightContent, paddingLeft: 6}}
              onChangeText={(text) =>
                this.setState({bankName: text.toUpperCase()})
              }
            />
          </View>
        </View>
      </View>
    );
  };
  renderItem = (item) => {
    return (
      <View style={styles.flatlistcard}>
        <View style={styles.accandifsc}>
          <View style={styles.showaccountnumber}>
            <Text style={{color: "#CCC", paddingLeft: 6}}>
              {item.accountNumber}
            </Text>
          </View>
          <View style={styles.ifscflatlist}>
            <Text style={{color: "#CCC", paddingLeft: 6}}>
              {item.ifscCode}
            </Text>
          </View>
        </View>
        <View style={{marginTop: spacing.medium}}>
          <View style={styles.show_accounts_holdername}>
            <Text style={{color: "#CCC", paddingLeft: 6}}>
              {item.holderName}
            </Text>
          </View>
          <View style={styles.show_accounts_holdername}>
            <Text style={{color: "#CCC", paddingLeft: 6}}>
              {item.bankName}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View showsVerticalScrollIndicator={false} style={styles.container}>
        <ScrollView style={{flex: 1}} keyboardShouldPersistTaps={'always'} showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: "row", marginLeft: spacing.large_lg}}>
            <View style={{flex: 1, alignItems: "flex-start", marginTop: spacing.medium_sm}}>
              <Text style={styles.bankaccountdetailstext}>{strings.BANK}</Text>
              <Text style={styles.bankaccountdetailstext}>
                {strings.ACCOUNT}
              </Text>
              <Text style={styles.bankaccountdetailstext}>
                {strings.DETAILS}
              </Text>
            </View>
            <View style={{flex: 1, alignItems: "center", marginLeft: -20}}>
              <Image
                source={iconBackgrounds.addaccount}
                style={{height: 150, width: 160}}
              />
            </View>
          </View>
          <View style={styles.extraTextCard}>
            <Text style={styles.extraText}>{strings.ACCOUNT_CREATE_INFO}</Text>
          </View>

          {this.renderCard()}
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={this.saveAccount}
              disabled={this.state.submitting}
            >
              {this.state.submitting && <ActivityIndicator size={24} color={appTheme.textPrimary}/>}
              {!this.state.submitting && <Entypo color={appTheme.textPrimary} name="plus" size={30}/>}
            </TouchableOpacity>
          </View>
          {this.props.accounts.length !== 0 && (
            <>
              <View style={[styles.extraTextCard, {marginBottom: 0}]}>
                <Text style={styles.extraText}>{strings.MY_ACCOUNTS}</Text>
              </View>
              <FlatList
                data={this.props.accounts}
                renderItem={({item}) => this.renderItem(item)}
                keyExtractor={(item) => item._id}
                contentContainerStyle={styles.listContainer}
              />
            </>
          )}
          <View style={styles.tncView}>
            <Text style={styles.agree}>{strings.AGREE} </Text>
            <TouchableOpacity onPress={() => {
            }}>
              <Text style={styles.read}>{strings.CLICK_READ}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  accountData: state.trainer.accountData,
  accounts: state.trainer.accounts || [],
});

const mapDispatchToProps = (dispatch) => ({
  addAccount: (accountDetails) =>
    dispatch(actionCreators.addAccount(accountDetails)),
  getMyAccounts: () => dispatch(actionCreators.getMyAccounts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAccount);
const styles = StyleSheet.create({
  accountNumber: {
    backgroundColor: appTheme.background,
    alignSelf: "flex-start",
    flex: 4,
    marginRight: 10,
    borderRadius: 5,
  },
  ifsc: {
    backgroundColor: appTheme.background,
    alignSelf: "flex-end",
    flex: 3,
    marginLeft: 10,
    borderRadius: 5,
  },
  show_accounts_holdername: {
    backgroundColor: appTheme.background,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    height: 45,
    justifyContent: "center",
  },
  holderName: {
    backgroundColor: appTheme.background,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  bankName: {
    backgroundColor: appTheme.background,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: appTheme.background,
  },
  bankaccountdetailstext: {
    color: "white",
    fontSize: fontSizes.bigTitle,
    fontWeight: "bold",
    fontFamily: fonts.CenturyGothic,
  },
  showaccountnumber: {
    backgroundColor: appTheme.background,
    alignSelf: "flex-start",
    flex: 4,
    marginRight: 10,
    borderRadius: 5,
    height: 45,
    justifyContent: "center",
  },
  extraTextCard: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  extraText: {
    color: "#ccc",
    fontSize: fontSizes.h3,
    fontFamily: fonts.CenturyGothic,
  },
  flatlistcard: {
    backgroundColor: appTheme.darkBackground,
    marginTop: 10,
    borderRadius: 10,
  },
  ifscflatlist: {
    backgroundColor: appTheme.background,
    alignSelf: "flex-end",
    flex: 3,
    marginLeft: spacing.medium,
    borderRadius: 5,
    height: 45,
    justifyContent: "center",
  },
  accandifsc: {
    flexDirection: "row",
    marginTop: spacing.medium,
    marginHorizontal: spacing.medium_sm,
  },
  detailsCard: {
    backgroundColor: appTheme.darkBackground,
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 13,
    paddingBottom: 10,
  },
  details1detail: {
    flexDirection: "row",
    marginTop: 15,
    marginHorizontal: 10,
  },
  buttonView: {alignItems: "flex-end", marginRight: 25, marginTop: 20},

  saveButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: appTheme.brightContent,
    borderRadius: 26,
    height: 52,
    width: 52,
  },
  tncView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: spacing.small_lg,
  },
  agree: {
    color: appTheme.brightContent,
    fontSize: fontSizes.h4,
    fontFamily: fonts.CenturyGothic,

  },
  read: {color: "white", fontSize: fontSizes.h4, fontFamily: fonts.CenturyGothic},
  listContainer: {
    marginTop: spacing.medium,
    borderRadius: 10,
    marginHorizontal: 13,
    paddingBottom: spacing.medium,
  }
});
