/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {connect} from "react-redux";
import moment from "moment";
import {Card} from 'native-base';

import {spacing} from "../../constants/dimension";
import * as actionCreators from "../../store/actions";
import CalendarStripChooser from '../../components/calendarStripChooser';
import Appointment from "../../components/Appointment";

class Schedule extends Component {

  state = {
    dates: [{
      start: moment(),
      end: moment().add(6, 'days')
    }],

  }

  onDateSelected = data => {
    console.log(data);
  }

  renderAppointment = appointment => {

    return (
      <View style={styles.appointmentContainer}>
        <Appointment/>
      </View>
    )
  }

  renderAppointments = (date) => {
    const data = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
      },
    ];
    return (
      <View style={{margin:10,}}>
      <Card style={{padding:10,paddingBottom:20, paddingTop:20,borderRadius:5}}>
        <FlatList
          data={data}
          contentContainerStyle={styles.appointmentList}
          renderItem={({item}) => <Appointment title={item.title}/>}
        />
      </Card>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <CalendarStripChooser
          dates={this.state.dates}
          onDateSelect={this.onDateSelected}
        />
        <this.renderAppointments/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems:'center',
    // flex:1

  },
  appointmentList: {
    // borderWidth: 1,
    // borderColor: 'blac/k',
    // borderRadius: 5,
    // padding: spacing.medium_lg
  },
  appointmentContainer: {
    padding: spacing.medium_lg
  }
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);