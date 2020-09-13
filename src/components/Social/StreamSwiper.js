import React, {PureComponent} from "react";
import {StyleSheet, View} from "react-native";
import Swiper from 'react-native-swiper';

import StreamCard from "./StreamCard";

class StreamSwiper extends PureComponent {

  renderStream = (stream) => {
    const onJoin = stream.isMyStream ? null : () => this.props.onJoin(stream._id);
    const onStart = stream.isMyStream ? () => this.props.onStart(stream) : null;
    return <View key={stream._id}>
      <StreamCard
        title={stream.title}
        status={stream.status}
        duration={stream.duration}
        date={stream.date}
        host={stream.host}
        onJoin={onJoin}
        onStart={onStart}
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