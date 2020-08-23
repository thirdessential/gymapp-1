/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TextInput,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  LayoutAnimation, Image, ImageBackground
} from 'react-native'
import {connect} from "react-redux";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ion from "react-native-vector-icons/Ionicons";
import RBSheet from "react-native-raw-bottom-sheet";

import {spacing} from "../../../constants/dimension";
import * as actionCreators from "../../../store/actions";
import colors, {appTheme, bmiColors, darkPallet} from "../../../constants/colors";
import strings from "../../../constants/strings";
import fonts from "../../../constants/fonts";
import fontSizes from "../../../constants/fontSizes";
import {validatePackage} from "../../../utils/validators";
import {showSuccess} from "../../../utils/notification";
import {FlatGrid} from "react-native-super-grid";
import ImageCard, {cardSize} from "../../../components/ImageCard";
import {packageImages, packageTypes, WEEK_DAYS} from "../../../constants/appConstants";
import {screenHeight, screenWidth} from "../../../utils/screenDimensions";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Slot from "../../../components/Slot";
import cuid from "cuid/index";
import {dateToString} from "../../../utils/utils";
import DateTimePicker from "@react-native-community/datetimepicker";

class Packages extends PureComponent {

  state = {
    title: 'Sample Title',
    price: '',
    description: '',
    noOfSessions: '',
    category: '',
    submitPending: false,
    categories: [],
    group: false,
    maxParticipants: 10,
    slot: {
      duration: 60,
      time: '1500',
      days: [WEEK_DAYS.MON, WEEK_DAYS.TUE, WEEK_DAYS.WED, WEEK_DAYS.THU, WEEK_DAYS.FRI],
    },
    startDate: new Date(),
    today: Date.now(),
    futureDate: new Date().setDate(new Date().getDate() + 30),
    pickerVisible: false
  }

  componentDidMount() {
    const {route} = this.props;
    if (route.params) {
      const {packageId} = route.params;
      if (packageId) {
        const filteredPackages = this.props.packages.filter(packageData => packageData._id === packageId);
        if (filteredPackages.length !== 0)
          this.setState({...filteredPackages[0]});
      }
    }
    let categories = Object.keys(packageTypes).map((packageName) => {
      return {title: packageName, image: packageImages[packageName]};
    });
    this.setState({categories});
  }

  onTitleChange = (title) => this.setState({title});

  sessionCountChange = (noOfSessions) => {
    this.setState({noOfSessions});
  }

  priceChange = (price) => {
    this.setState({price: price.replace(/\D+/g, '')});
  }
  descriptionChange = (description) => this.setState({description});

  deletePackage = async () => {
    this.props.deletePackage(this.state._id);
    this.props.navigation.goBack()
  }
  setCategory = (category) => {
    const title = !!this.state.title ? this.state.title : packageTypes[category];
    this.setState({category, title});
    this.closeRbSheet();
  }
  savePackage = async () => {
    Keyboard.dismiss();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({submitPending: true});
    await this.props.createPackage(this.state);
    this.setState({submitPending: false});
    const {route} = this.props;
    if (route.params && route.params.packageId)
      showSuccess(strings.CHANGES_SAVED);
    else showSuccess(strings.PACKAGE_CREATED);
    if(this.state.group)
      this.props.updateUserData()
    this.props.navigation.goBack();
  }
  toggleGroup = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({group: !this.state.group})
  }
  maxParticipantsChange = (maxParticipants) => {
    if (Number.isNaN(parseInt(maxParticipants)))
      maxParticipants = '';
    else if (maxParticipants < 2) maxParticipants = 2;
    if (maxParticipants > 50) maxParticipants = 50;
    this.setState({maxParticipants});
  }
  cancelEdit = () => {
    this.props.navigation.goBack()
  }
  openRbSheet = () => this.RBSheet.open()
  closeRbSheet = () => this.RBSheet.close()
  rbSheet = () => (<RBSheet
      ref={ref => {
        this.RBSheet = ref;
      }}
      height={screenHeight / 1.5}
      animationType={'slide'}
      closeOnDragDown={true}
      customStyles={{
        container: {
          padding: spacing.medium,
          paddingBottom: 0,
          backgroundColor: appTheme.darkBackground,
          borderRadius: 10,
          borderWidth: 1,
          borderTopColor: appTheme.content,
          borderRightColor: appTheme.content,
          borderLeftColor: appTheme.content,
        },
        wrapper: {
          backgroundColor: 'transparent'
        }
      }}>
      {this.renderCategories()}
    </RBSheet>
  )

  showDatePicker = () => {
    this.setState({pickerVisible: true});
  }
  renderCategory = (item) => (
    <TouchableOpacity onPress={() => this.setCategory(item.title)} style={{alignItems: 'center'}}>
      <Image style={styles.imageCard} source={item.image}/>
      <Text numberOfLines={2} style={styles.categoryTitle}>{packageTypes[item.title]}</Text>
    </TouchableOpacity>
  )
  renderCategories = () => {
    return <FlatGrid
      itemDimension={cardSize - spacing.medium}
      showsVerticalScrollIndicator={false}
      data={this.state.categories}
      renderItem={({item}) => this.renderCategory(item)}
    />
  }

  validateGroup = () => {
    const {group, maxParticipants} = this.state;
    if (!group) return true;
    else return maxParticipants >= 2 && maxParticipants <= 50;
  }
  handleTimeChange = (time) => {
    const slot = {...this.state.slot};
    slot.time = dateToString(time);
    this.setState({slot});
  }
  handleDurationChange = (duration) => {
    const slot = {...this.state.slot};
    slot.duration = duration;
    this.setState({slot});
  }
  handleDaysChange = (days) => {
    const slot = {...this.state.slot};
    slot.days = days;
    this.setState({slot});
  }
  onDateChange = (result) => {
    const {timestamp} = result.nativeEvent;
    if (!timestamp) return;
    this.setState({startDate: timestamp, pickerVisible: false})
  }

  render() {
    const inputsValid = validatePackage(this.state) && this.validateGroup();
    const {category, slot, startDate} = this.state;
    const date = new Date(startDate).toLocaleDateString();
    return (
      <KeyboardAwareScrollView style={styles.container} showsVerticalScrollIndicator={false} enableOnAndroid={true}
                               keyboardShouldPersistTaps={'handled'}>
        <StatusBar backgroundColor={appTheme.darkBackground}/>
        {!!this.state.category && (
          <ImageBackground source={packageImages[this.state.category]} style={styles.titleContainer}>
            <Text style={styles.title}>Title</Text>
            <TextInput
              style={styles.titleTextInput}
              onChangeText={this.onTitleChange}
              value={this.state.title}
            />
          </ImageBackground>
        )}
        {
          !this.state.category && (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Title</Text>
              <TextInput
                style={styles.titleTextInput}
                onChangeText={this.onTitleChange}
                value={this.state.title}
              />
            </View>
          )
        }

        <View style={styles.content}>
          <View style={styles.inputRow}>
            <Text style={styles.title}>{strings.CATEGORY}</Text>
            <TouchableOpacity activeOpacity={0.7} onPress={this.openRbSheet}>
              <Text style={styles.contentInput}>{!!category ? packageTypes[category] : strings.SELECT_CATEGORY}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View style={[styles.inputRow, {width: '50%', marginRight: 'auto'}]}>
              <Text style={styles.title}>{strings.SESSIONS}</Text>
              <TextInput
                keyboardType={'numeric'}
                style={styles.contentInput}
                placeholder={strings.SESSION_COUNT}
                placeholderTextColor={appTheme.grey}
                onChangeText={this.sessionCountChange}
                value={this.state.noOfSessions.toString()}
              />
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.title}>{strings.GROUP_SESSIONS}</Text>
              <TouchableOpacity activeOpacity={0.6} onPress={this.toggleGroup} style={styles.iconButton}>
                <FontAwesome5Icon name={'check'} color={this.state.group ? bmiColors.blue : appTheme.grey}
                                  size={20}/>
              </TouchableOpacity>
            </View>
          </View>
          {
            this.state.group && (
              <View>
                <View style={styles.inputRow}>
                  <Text style={styles.title}>{strings.MAX_PARTICIPANTS}</Text>
                  <TextInput
                    keyboardType={'numeric'}
                    style={styles.contentInput}
                    placeholder={strings.MAX_ALLOWED_PARTICIPANTS}
                    placeholderTextColor={appTheme.grey}
                    onChangeText={this.maxParticipantsChange}
                    value={this.state.maxParticipants.toString()}
                  />
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.title}>{strings.SET_TIMING}</Text>
                  <Slot
                    containerStyle={styles.slotContainer}
                    days={slot.days}
                    duration={slot.duration}
                    index={''}
                    time={slot.time}
                    onTimeChange={this.handleTimeChange}
                    onDurationChange={this.handleDurationChange}
                    onDaysChange={this.handleDaysChange}
                  />
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.title}>{strings.START_DATE}</Text>
                  <TouchableOpacity activeOpacity={0.8} onPress={this.showDatePicker}>
                    <Text style={styles.contentInput}>{date}</Text>
                  </TouchableOpacity>
                </View>
                {this.state.pickerVisible && this.state.group && (
                  <DateTimePicker
                    value={this.state.startDate}
                    mode={'date'}
                    is24Hour={false}
                    display="default"
                    onChange={this.onDateChange}
                    minimumDate={this.state.today}
                    maximumDate={this.state.futureDate}
                  />
                )}
              </View>
            )
          }
          <View style={styles.inputRow}>
            <Text style={styles.title}>{strings.DESCRIPTION}</Text>
            <TextInput
              multiline={true}
              style={styles.contentInput}
              numberOfLines={4}
              placeholder={strings.PLAN_DESCRIPTION}
              placeholderTextColor={appTheme.grey}
              onChangeText={this.descriptionChange}
              value={this.state.description}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.title}>{strings.PRICE_TITLE}</Text>
            <TextInput
              keyboardType={'numeric'}
              style={styles.contentInput}
              onChangeText={this.priceChange}
              value={strings.RUPEE + ' ' + this.state.price}
            />
          </View>
        </View>
        <View style={styles.buttonRow}>
          {
            !this.state.submitPending && (
              <TouchableOpacity style={styles.buttonContainer} onPress={this.cancelEdit}>
                <Ion
                  name={'ios-arrow-back'}
                  color={colors.appBlue}
                  size={22}
                />
              </TouchableOpacity>
            )
          }

          {
            this.state._id && !this.state.submitPending && (
              <TouchableOpacity style={styles.buttonContainer} onPress={this.deletePackage}>
                <FontAwesome
                  name={'trash'}
                  color={colors.rejectRed}
                  size={22}
                />
              </TouchableOpacity>
            )
          }
          <TouchableOpacity style={styles.buttonContainer} disabled={!inputsValid} onPress={this.savePackage}>
            {
              this.state.submitPending && (
                <ActivityIndicator size={28} color={appTheme.brightContent}/>
              )
            }
            {
              !this.state.submitPending && (
                <FontAwesome
                  name={'check'}
                  color={inputsValid ? appTheme.brightContent : colors.darkGrey}
                  size={22}
                />
              )
            }

          </TouchableOpacity>
        </View>
        {this.rbSheet()}

      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.background
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: spacing.thumbnailMini,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingBottom: spacing.small,
    backgroundColor: appTheme.darkBackground,
    height: 170,
    width: screenWidth
  },
  bgImage: {
    width: screenWidth,
    height: 170
  },
  title: {
    color: 'white',
    fontSize: fontSizes.h2,
    fontFamily: fonts.PoppinsRegular
  },
  greyText: {
    color: 'grey',
    marginLeft: spacing.small,
    fontSize: fontSizes.h2,
    fontFamily: fonts.PoppinsRegular
  },
  titleTextInput: {
    color: 'white',
    fontSize: fontSizes.h0,
    fontFamily: fonts.PoppinsRegular,
    paddingLeft: 0
  },
  content: {
    flex: 1,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
  },
  contentInput: {
    backgroundColor: appTheme.darkBackground,
    borderRadius: 10,
    padding: spacing.small,
    paddingLeft: spacing.medium_lg,
    color: 'white',
    fontSize: fontSizes.h2,
    fontFamily: fonts.PoppinsRegular,
    textAlignVertical: "top",
    elevation: 6
  },
  inputRow: {
    marginTop: spacing.medium_lg,
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.medium_lg,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingBottom: spacing.small,
    marginBottom: spacing.large_lg
  },
  buttonContainer: {
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: appTheme.darkBackground,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryTitle: {
    color: 'white',
    fontSize: fontSizes.h2,
    fontFamily: fonts.CenturyGothicBold,
    marginTop: spacing.medium_sm,
    textAlign: 'center',
    paddingHorizontal: spacing.medium,
    position: 'absolute',
    width: cardSize - spacing.medium,
    bottom: spacing.small
  },
  imageCard: {
    height: cardSize - spacing.medium,
    width: cardSize - spacing.medium,
    borderRadius: 10
  },
  row: {
    flexDirection: 'row',
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appTheme.darkBackground,
    height: 38,
    flexDirection: 'row',
    elevation: 6,
    borderRadius: 10,
    marginRight: spacing.large,
  },
  slotContainer: {
    elevation: 6,
    width: '100%',
    padding: spacing.medium,
    borderRadius: 10,
    margin: 2,
    backgroundColor: appTheme.darkBackground
  }
});

const mapStateToProps = (state) => ({
  packages: state.trainer.packages
});

const mapDispatchToProps = (dispatch) => ({
  createPackage: (packageData) => dispatch(actionCreators.createPackage(packageData)),
  deletePackage: packageId => dispatch(actionCreators.deletePackage(packageId)),
  updateUserData: () => dispatch(actionCreators.updateUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Packages);

