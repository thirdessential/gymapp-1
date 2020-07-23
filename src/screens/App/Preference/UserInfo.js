import React from 'react';
import { Text, TextInput, View, Image, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { spacing } from "../../../constants/dimension";
import fontSizes from "../../../constants/fontSizes";
import fonts from "../../../constants/fonts";
import { appTheme, darkPallet } from "../../../constants/colors";
import ActionButtonTwo from '../../../components/Login/ActionButtonTwo';
import ImagePicker from 'react-native-image-picker';
import defaultPic from '../../../../assets/images/male_pic_default.jpg';
import FastImage from "react-native-fast-image";
import DatePicker from 'react-native-datepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Female from '../../../../assets/Icons/undraw_female_avatar_w3jk.png';
import Male from '../../../../assets/Icons/undraw_male_avatar_323b.png';
import Other from '../../../../assets/Icons/undraw_scrum_board_cesn.png';

export default class UserInfo extends React.Component {
    state = {
        name: '',
        num: '',
        city: '',
        date: '',
        imageUri: null,
        imageUploading: false,
        renderCheck: true,
        checked: 0,
        radioSelected: 1
    }
    radioClick(id) {
        this.setState({
            radioSelected: id
        })
    }
    setName = (name) => {
        this.setState({ name })
    }
    onDateChange = (date) => {
        this.setState({
            selectedStartDate: date,
        });
    }

    setNum = (num) => {
        this.setState({ num });
    }
    setCity = (city) => {
        this.setState({ city });
    }
    
    pickImage = () => {
        const options = {};
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log('image url', response.uri);
                this.setState({
                    imageUri: response.uri,
                });
                // this.submitPhoto(response.path, this.props.authToken);
            }
        });
    };

    render() {
        const gender= [{
            id: 1,
            url: Female,
            gen: 'Female'
        },
        {
            id: 2,
            url:Male,
            gen: 'Male'
        },
        {
            id: 3,
            url:Other,
            gen: 'Other'
        }];
        return (
            <ScrollView showsVerticalScrollIndicator={false} enableOnAndroid={true} keyboardShouldPersistTaps={'handled'}>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.img}>
                            <Image style={styles.icon} source={require('../../../../assets/Icons/personal_data_.png')} />
                            <Text style={styles.heading}>Personal Information</Text>
                        </View>

                        <View style={styles.subContainer}>
                            <View style={{ marginLeft: 25, marginTop: -45 }}>
                                <View style={{height:40}}>
                                    {
                                        !this.state.imageUri &&
                                        <Image source={defaultPic} style={styles.imageDimensions} />
                                    }
                                    {
                                        !!this.state.imageUri && (
                                            <FastImage
                                                style={styles.imageDimensions}
                                                source={{
                                                    uri: this.state.imageUri,
                                                    priority: FastImage.priority.normal,
                                                }}
                                                resizeMode={FastImage.resizeMode.cover}
                                            />
                                        )
                                    }
                                    {
                                        this.state.imageUploading && (
                                            <View style={[styles.imageDimensions, styles.loader]}>
                                                <ActivityIndicator size={50} color={'white'} />
                                            </View>
                                        )
                                    }
                                </View>
                                <View style={{ alignItems: 'center', width: "35%" }}>
                                    {
                                        !this.state.imageUploading && (
                                            <ActionButtonTwo onPress={this.pickImage} label={<AntDesign size={15} name='plus' />} color={appTheme.brightContent} />
                                        )
                                    }
                                </View>

                            </View>

                            <View style={styles.info}>
                                <TextInput style={styles.textInput} placeholder='Name' placeholderTextColor='white' value={this.state.name} onChangeText={this.setName} />
                                <TextInput style={styles.textInput} placeholder='Number' placeholderTextColor='white' value={this.state.num} onChangeText={this.setNum} />
                                <View style={styles.datePicker}>
                                    <DatePicker
                                        style={{ width: "100%", color: darkPallet.hotOrange }}
                                        date={this.state.date}
                                        mode="date"
                                        placeholder="Date Of birth"
                                        placeholderTextColor='white'
                                        format="YYYY-MM-DD"
                                        minDate="1999-05-01"
                                        maxDate="2016-06-01"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0
                                            },
                                            dateInput: { borderWidth: 0 },
                                            dateText: {
                                                fontSize: fontSizes.h1,
                                                color: darkPallet.hotOrange
                                            }
                                        }}
                                        onDateChange={(date) => { this.setState({ date: date }) }}
                                    />
                                </View>
                                <TextInput style={styles.textInput} value={this.state.city} placeholder='Location' placeholderTextColor='white' onChangeText={this.setCity} />
                                
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    {gender.map((val) => {
                                        return (
                                            <TouchableOpacity key={val.id} onPress={this.radioClick.bind(this, val.id)}>
                                                <View style={{ marginHorizontal: 40, justifyContent: "center", alignItems: "center" }}>
                                                    <Image source={val.url} style={{ width: 60, height: 60, borderRadius: 30 }} />
                                                    <Text style={{ fontSize: fontSizes.h5, fontFamily: fonts.CenturyGothicBold, color: "white",marginVertical:10 }}>{val.gen}</Text>
                                                    <View style={styles.uncheckedItem}>
                                                        {
                                                            val.id == this.state.radioSelected ?
                                                                <View style={styles.checkedItem} />
                                                                : null
                                                        }
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })}</View>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: appTheme.background,
        flex: 1,
        // padding: spacing.medium_sm,
        paddingTop: spacing.small,
    },
    img:{ 
        justifyContent: "center", 
        alignItems: "center", 
        flex: 1 
    },
    heading:{ 
        color: "white", 
        fontFamily: fonts.CenturyGothicBold, 
        fontSize: fontSizes.h1 
    },
    icon: {
        width: 207,
        height: 169,
        justifyContent: "center"
    },
    textInput: {
        backgroundColor: appTheme.background,
        color: darkPallet.hotOrange,
        fontSize: fontSizes.h1,
        fontFamily: fonts.CenturyGothic,
        borderRadius: 25,
        paddingLeft: 29,
        width: 344,
        marginBottom: 20
    },
    imageDimensions: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    uncheckedItem:{
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: darkPallet.hotOrange,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkedItem:{
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: darkPallet.hotOrange,
    },
    datePicker:{
        borderRadius: 25, backgroundColor: appTheme.background,
        paddingHorizontal: 29,
        width: 344,
        marginBottom: 20
    },
    subContainer:{ 
        flex: 1, 
        marginTop: 50,
        paddingHorizontal:10, 
        backgroundColor: appTheme.darkBackground, 
        borderTopRightRadius: 30, 
        borderTopLeftRadius: 30 
    },
    info:{ 
        justifyContent: "center", 
        alignItems: "center", 
        marginTop: 20 
    }
})

