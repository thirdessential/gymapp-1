import React from 'react';
import {View, StyleSheet,Text} from 'react-native'
import PropTypes from 'prop-types';
import {Card} from 'react-native-elements';

import RoundedDP from '../RoundedDP';
import GenericText from "../GenericText";

import {spacing} from "../../constants/dimension";
import { TouchableOpacity } from 'react-native-gesture-handler';

const userThumbTwo = (props) => {
  console.log(props.name)
  return (
    
    <Card containerStyle={{ borderRadius: 40, backgroundColor: 'white' }}>
            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                <RoundedDP
                    url={props.dpUrl}
                />
                <Text style={{ fontSize: 18, color: '#99DDCA', marginTop: 5 }}>{props.name}</Text>
                <Text style={{ fontSize: 14, color: 'grey', marginTop: 5 }}>other infos.</Text>
           </View>
    </Card>
  );
}

userThumbTwo.propTypes = {
  name: PropTypes.string.isRequired,
  dpUrl: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     alignItems: "center"
//   },
//   roundedDPContainer: {
//     marginBottom: spacing.small
//   },
//   nameContainer: {
//     paddingTop: spacing.small,
//     paddingBottom: spacing.small
//   }
viewProfile:{backgroundColor:'#FBA1C4',width:"35%",borderRadius:50,padding:3,marginTop:10}
 });

export default userThumbTwo;