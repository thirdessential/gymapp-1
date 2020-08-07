import React from "react";
import {FlatList} from "react-native";

import LiveCard from "./LiveCard";

const LiveCardList = ({data}) => {
  const renderCard = data => <LiveCard  {...data}/>
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{flexGrow: 0, height: 130}}
      data={data}
      renderItem={({item: rowData}) => renderCard(rowData)}
      keyExtractor={(item, index) => index}
    />
  );
};

export default LiveCardList;