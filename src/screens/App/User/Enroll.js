/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {PureComponent} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  LayoutAnimation,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native'
import {connect} from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import {spacing} from "../../../constants/dimension";
import colors, {appTheme} from "../../../constants/colors";
import strings from "../../../constants/strings";
import fontSizes from "../../../constants/fontSizes";
import fonts from "../../../constants/fonts";
import Slot from "../../../components/Slot";
import {findMissingDays, groupBy} from "../../../utils/utils";
import RouteNames from "../../../navigation/RouteNames";

class Enroll extends PureComponent {

  state = {
    slots: [],
    selectedDays: {},
    selectedTime: '',
    selectedSlotId: '',
    subscribeLoading: false
  }

  componentDidMount() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const {slots} = this.getUser();

    if (slots && slots.length > 0) {
      const filteredSlots = slots.filter(slot => slot.subscriptionId === null);
      const localSlots = this.mapSlotsToLocal(filteredSlots);
      const selectedDays = {};
      localSlots.map(slot => {
        selectedDays[slot._id] = [];
      });
      this.setState({selectedDays, slots: localSlots});
    }
  }

  getUser = () => {
    const {route, users} = this.props;
    const {userId} = route.params;
    return users[userId];
  }

  mapSlotsToLocal = (slots) => {
    const localSlots = [];
    const slotsByTime = groupBy(slots, 'time');
    Object.keys(slotsByTime).map(time => {
      let slotsAtT = slotsByTime[time];
      const slotObj = slotsAtT[0];
      let days = [];
      slotsAtT.map(slotAtT => days.push(slotAtT.dayOfWeek));
      slotObj.days = days;
      localSlots.push(slotObj);
    })
    return localSlots;
  }

  enroll = async () => {
    this.setState({subscribeLoading: true});
    const {route, navigation} = this.props;
    const {userId, packageId, trainerData, packageData} = route.params;
    const {selectedDays, selectedTime, selectedSlotId} = this.state;
    const days = selectedDays[selectedSlotId];
    const metadata = {
      packageName: packageData.title,
      sessionCount: packageData.noOfSessions,
      price: packageData.price,
      time: selectedTime,
      days,
      trainerName: trainerData.name,
    }
    this.setState({subscribeLoading: false});
    navigation.navigate(RouteNames.Payment, {
      metadata,
      userId,
      packageId
    })
  }

  changeActiveDays = (slotId, days, selectedTime) => {
    const selectedDays = {...this.state.selectedDays};
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Object.keys(selectedDays).map(day => selectedDays[day] = []);
    selectedDays[slotId] = days;
    this.setState({selectedDays, selectedTime, selectedSlotId: slotId});
  }

  renderSlot = (slot, index) => (
    <View style={styles.slotContainer}>
      <Slot
        days={this.state.selectedDays[slot._id]}
        disabledDays={findMissingDays(slot.days)}
        duration={slot.duration}
        index={index + 1}
        time={slot.time}
        // onEnroll={() => this.enroll(slot.time, this.state.selectedDays[slot._id])}
        // enrollDisabled={this.state.selectedDays[slot._id].length === 0}
        onDaysChange={(days) => this.changeActiveDays(slot._id, days, slot.time)}
      />
    </View>
  )

  renderSlots = () => {
    if (this.state.slots.length === 0)
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.warningText}>{strings.NO_SLOTS_AVAILABLE}</Text>
        </View>
      )
    return (
      <FlatList
        data={this.state.slots}
        renderItem={({item, index}) => this.renderSlot(item, index)}
        keyExtractor={item => item.time}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <View style={{margin: spacing.medium_sm}}/>}

      />);

  }

  fab = () => {
    const {selectedDays, selectedSlotId} = this.state;
    const days = selectedDays[selectedSlotId];
    if (!days || days.length === 0)
      return null;
    return (
      <TouchableOpacity style={[styles.fab, styles.fabPosition]} onPress={this.enroll}>
        {
          this.state.subscribeLoading && (
            <ActivityIndicator size={28} color={'white'}/>
          )
        }
        {
          !this.state.subscribeLoading && (
            <FontAwesome
              name={'check'}
              color={'white'}
              size={22}
            />
          )
        }
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={appTheme.darkBackground}/>
        <View style={styles.listContainer}>
          <this.renderSlots/>
        </View>
        <this.fab/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.background,
  },
  listContainer: {
    // justifyContent: 'center',
    // marginTop:spacing.medium_lg,
    marginLeft: spacing.medium_lg,
    marginRight: spacing.medium_lg,
    flex: 1,
  },
  slotContainer: {
    marginBottom: spacing.medium_lg
  },
  titleContainer: {
    paddingTop: spacing.medium_sm,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    paddingBottom: spacing.medium_sm,
    marginBottom: spacing.medium_sm,
    backgroundColor: appTheme.darkBackground,
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: fontSizes.h0,
    fontFamily: fonts.PoppinsRegular
  },
  addButtonContainer: {
    paddingTop: spacing.medium,
    paddingBottom: spacing.medium_sm,
    alignItems: 'center',
  },
  fab: {
    height: spacing.thumbnailMini,
    width: spacing.thumbnailMini,
    borderRadius: spacing.thumbnailMini / 2,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.acceptGreen,
  },
  fabPosition: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  fabText: {
    fontSize: 40,
    alignContent: "center",
    textAlign: "center",
    color: "white",
    lineHeight: 50,
  },
  warningText: {
    color: appTheme.brightContent,
    fontSize: fontSizes.h1,
    fontFamily: fonts.PoppinsRegular
  }
});

const mapStateToProps = (state) => ({
  users: state.app.users
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Enroll);
