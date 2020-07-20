/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';

import {spacing} from "../constants/dimension";

import ClientCard from "./ClientCard";
import {defaultDP} from "../constants/appConstants";

const subscriptionList = (props) => {
  if (!props.subscriptions) return null;

  const renderSubscription = (subscription) => {
    let user = subscription.user;
    if (!user.name) user = subscription.trainer;
    if (!user) return null;
    let {name, city, _id, displayPictureUrl} = user;
    if (!name) name = 'User';
    if (!displayPictureUrl) displayPictureUrl = defaultDP;
    const {totalSessions, heldSessions} = subscription;
    const sessions = `${heldSessions}/${totalSessions}`;
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => props.onProfilePress(_id)}
                        style={styles.appointmentContainer}>
        <ClientCard
          callCallback={() => props.callCallback(_id)}
          displayName={name}
          location={city}
          imageUrl={displayPictureUrl}
          sessions={sessions}/>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      data={props.subscriptions}
      ListHeaderComponent={() => <View style={{marginTop: spacing.medium}}/>}
      ListFooterComponent={() => <View style={{marginTop: spacing.medium}}/>}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => renderSubscription(item, index)}
      keyExtractor={({item, index}) => index}
    />
  )
}

const styles = StyleSheet.create({});

export default React.memo(subscriptionList);