import React, {PureComponent} from "react";
import {StyleSheet} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import moment from "moment";

import {appTheme} from "../constants/colors";
import fonts from "../constants/fonts";
import TodaySession from "./TodaySession";
import {packageImages} from "../constants/appConstants";

class TodaySessionSwiper extends PureComponent {
  state = {
    currentSlide: 0,
  }
  setCurrentSlide = (index) => {
    if (this.state.currentSlide !== index)
      this.setState({currentSlide: index})
  }
  _renderItem = ({item: session}) => {
    const date = new Date(session.date);
    const {users} = session;
    return <TodaySession
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
      loading={this.state.joinLoading}
    />
  };
  renderNull = () => {
    return null;
  };

  render() {
    return (
      <AppIntroSlider
        // style={styles.container}
        renderItem={this._renderItem}
        data={this.props.sessions}
        onSlideChange={(index) => this.setCurrentSlide(index)}
        renderDoneButton={this.renderNull}
        renderNextButton={this.renderNull}
        keyExtractor={item=>item._id}
        // dotStyle={{marginTop:-50, backgroundColor: "rgba(0, 0, 0, .2)"}}
        // activeDotStyle={{marginTop: 30, backgroundColor: "#fff"}}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.brightContent,
    height:100
    // flex: 1,
  },
  button: {
    color: "#fff",
    fontSize: 20,
    fontFamily: fonts.CenturyGothic,
  },
});


export default TodaySessionSwiper;