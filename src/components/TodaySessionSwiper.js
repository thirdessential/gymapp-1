import React, {PureComponent} from "react";
import {StyleSheet, View} from "react-native";
import Swiper from 'react-native-swiper';
import moment from "moment";

import {appTheme} from "../constants/colors";
import fonts from "../constants/fonts";
import TodaySession from "./TodaySession";
import {packageImages} from "../constants/appConstants";

class TodaySessionSwiper extends PureComponent {

  renderSession = (session) => {
    const date = new Date(session.date);
    const {users} = session;
    return <View key={session._id}>
      <TodaySession
        title={session.packageId.title}
        thumbnail={packageImages[session.packageId.category]}
        duration={session.duration}
        date={date}
        time={moment(date).format('LT')}
        status={session.status}
        trainer={this.props.trainer}
        subscribers={users && users.length}
        type={session.type}
        onJoin={() => this.props.onJoin(session._id, session.type)}
        loading={this.props.loadingId===session._id}
      />
    </View>
  };

  render() {
    return (
      // height of the card
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