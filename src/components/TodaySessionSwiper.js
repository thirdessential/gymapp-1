import React, {PureComponent} from "react";
import {StyleSheet, View} from "react-native";
import Swiper from 'react-native-swiper';
import moment from "moment";
import {convertdate,militaryTimeToString} from '../utils/utils'
import TodaySession from "./TodaySession";
import {packageImages} from "../constants/appConstants";

class TodaySessionSwiper extends PureComponent {
  renderSession = (session) => {
    const date = convertdate(session.date);
    const hours = session.date.substr(11,2);
    const mins = session.date.substr(14,2);
    const time = hours + mins;
    // console.log(moment(date).format('LT'),"dateeeee",date)
    // console.log(convertdate(date),'convertdate',date)
    const {users} = session;
    return <View key={session._id}>
      <TodaySession
        title={session.packageId.title}
        thumbnail={packageImages[session.packageId.category]}
        duration={session.duration}
        date={date}
        time={militaryTimeToString(time)}
        status={session.status}
        trainer={this.props.trainer}
        subscribers={users && users.length}
        type={session.type}
        onJoin={() => this.props.onJoin(session._id, session.type)}
        loading={this.props.loadingId === session._id}
        referenceMode={this.props.referenceMode}
      />
    </View>
  };

  render() {
    return (
      <View style={styles.card}>
        <Swiper
          loop={false}
          loadMinimal={true}
        >
          {this.props.sessions.map(session => this.renderSession(session))}
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: 233
  }
});


export default TodaySessionSwiper;