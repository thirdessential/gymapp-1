
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';

import RoundedDP from '../RoundedDP';
import GenericText from "../GenericText";
import { coachedPeople } from "../../constants/strings";
import SlotPreview from "./SlotPreview";
import StarRating from "../StarRating";
import { Card } from 'react-native-elements';

import { spacing } from "../../constants/dimension";

const trainerThumbTwo = (props) => {
    return (
//grey background list layout
        // <Card containerStyle={{borderRadius:15}}>
        //     <View style={{flexDirection:'row'}}>
        //         <View style={{flex:1.5}}> 
        //         <RoundedDP
        //             url={props.dpUrl}
        //         />
        //         </View>
        //         <View style={{flex:2.5}}>
        //         <Text style={{ fontSize: 18, color: 'black', marginTop: 5 }}>{props.name}</Text>
        //         <View style={{ flexDirection: 'row' }}>
        //             <StarRating
        //                 // rating={props.rating}
        //                 rating="4"
        //             />
        //             <Text style={{ color: 'grey' }}> {coachedPeople(props.experience)}</Text>
        //         </View>
        //         <TouchableOpacity style={styles.checkAvailability} onPress={props.onPress}><Text style={{ color: 'white', borderRadius: 50, marginLeft: 6, marginRight: 3 }}>Check Availability</Text></TouchableOpacity>
        //         </View>
        //     </View>
        // </Card>

        //grey background grid layout
        <Card containerStyle={styles.container}>
            <View style={styles.subContainer}>
                <RoundedDP
                    url={props.dpUrl}
                />
                <Text style={styles.name}>{props.name}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <StarRating
                        rating="4"
                    />
                    <Text style={styles.experience}> {coachedPeople(props.experience)}</Text>
                </View>
                <TouchableOpacity style={styles.checkAvailability} onPress={props.onPress}><Text style={styles.checkAvailabilityText}>Check Availability</Text></TouchableOpacity>

            </View>


        </Card>

        //blue background grid system

        // <Card containerStyle={{ borderRadius: 40, backgroundColor: 'white' }}>
        //     <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
        //         <RoundedDP
        //             url={props.dpUrl}
        //         />
        //         <Text style={{ fontSize: 18, color: '#99DDCA', marginTop: 5 }}>{props.name}</Text>
        //         <View style={{ flexDirection: 'row' }}>
        //             <StarRating
        //                 rating="4"
        //             />
        //             <Text style={{ color: 'grey' }}> {coachedPeople(props.experience)}</Text>
        //         </View>
        //         <TouchableOpacity style={styles.checkAvailability} onPress={props.onPress}><Text style={{ color: 'white', borderRadius: 50, marginLeft: 3, marginRight: 3 }}>Check Availability</Text></TouchableOpacity>

        //     </View>


        // </Card>
    );
}

trainerThumbTwo.propTypes = {
    name: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    dpUrl: PropTypes.string.isRequired,
    slots: PropTypes.shape({
        used: PropTypes.number.isRequired,
        remaining: PropTypes.number.isRequired
    }),
    rating: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
    container:{
         borderRadius: 40,
          backgroundColor: 'white'
         },
    subContainer:{ 
        flex: 3, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    name:{ 
        fontSize: 18, 
        color: '#99DDCA', 
        marginTop: 5 
    },
    experience:{ 
        color: 'grey'
     },
     checkAvailabilityText: { 
        color: 'white', 
        borderRadius: 50, 
        marginLeft: 3,
         marginRight: 3
      },

//pink
    // checkAvailability: {
    //     backgroundColor: '#FBA1C4',
    //     borderRadius: 50,
    //     padding: 3,
    //     marginTop: 10
    // }
//blue grid
checkAvailability: {
        backgroundColor: '#0D1166',
        borderRadius: 50,
        padding: 3,
        marginTop: 10
    }
   

//blue list
// checkAvailability: {
//     backgroundColor: '#0D1166',
//     borderRadius: 50,
//     padding: 3,
//     marginTop: 10,
//     width:"60%"
// }


});

export default trainerThumbTwo;