/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {StyleSheet, View, FlatList} from "react-native";

import {spacing} from "../../constants/dimension";

import StreamCard from "./StreamCard";

const streamList = (props) => {
  const renderCard = ({item}) => {
    return (
      <StreamCard
        title={item.title}
        status={item.status}
        duration={item.duration}
        date={item.date}
        host={item.host}
        onJoin={props.onJoin ? () => props.onJoin(item._id) : null}
        onStart={props.onStart ? () => props.onStart(item) : null}
      />
    )
  }
  const renderSeparator = () => <View style={styles.separator}/>
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={props.streams}
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={renderSeparator}
      ListFooterComponent={renderSeparator}
      renderItem={renderCard}
      showsVerticalScrollIndicator={false}
    />
  )
}


const styles = StyleSheet.create({
  container: {
    // alignItems: 'center'
  },
  separator: {
    marginTop: spacing.medium
  }

});

export default React.memo(streamList);