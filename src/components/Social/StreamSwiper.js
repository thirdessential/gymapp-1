import React, {PureComponent} from "react";
import {StyleSheet, View} from "react-native";
import Swiper from 'react-native-swiper';

import StreamCard from "./StreamCard";

class StreamSwiper extends PureComponent {
  renderStream = (stream) => {
    return <View key={stream._id}>
      <StreamCard
        title={stream.title}
        status={stream.status}
        duration={stream.duration}
        date={stream.date}
        host={stream.host}
        onJoin={this.props.onJoin ? () => this.props.onJoin(stream._id) : null}
        onStart={this.props.onStart ? () => this.props.onStart(stream) : null}
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
          {this.props.streams.map(stream => this.renderStream(stream))}
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


export default StreamSwiper;