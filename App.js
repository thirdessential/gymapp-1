import React,{ useEffect } from 'react';
import {Platform, SafeAreaView, StyleSheet, UIManager} from "react-native";
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/lib/integration/react';
import FlashMessage from "react-native-flash-message";
import {MenuProvider} from 'react-native-popup-menu';
// import VersionCheck from 'react-native-version-check';
import store from './src/store/configureStore';
import {persistor} from './src/store/configureStore';
import AppStack from './src/navigation';
import fonts from "./src/constants/fonts";
import fontSizes from "./src/constants/fontSizes";
// import {setUserCountry} from "./src/API/auth";
// import moment from 'moment'
// import moment from 'moment-timezone'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}



export default function App() {
//   const  convertUTCDateToLocalDate = (date) => {
//     var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

//     var offset = date.getTimezoneOffset() / 60;
//     var hours = date.getHours();

//     newDate.setHours(hours - offset);
// console.log(newDate,typeof newDate,'ausdgyusadyuasvu')
//     return newDate;   
// }
// async function getTimeZoneDate(tz) {
//   let date;
//   switch (tz) {
//     case "IN":
//       date = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
//       break;
//   }
//   console.log("Time for " + tz + ": " + date,new Date(date));
//   return new Date(date);
// }
// const jsCoreDateCreator = (dateString) => { 
//   // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"  
//   let dateParam = dateString.split(/[\s-:]/)  
//   dateParam[1] = (parseInt(dateParam[1], 10) - 1).toString()  
//   // console.log(dateParam)
//   return new Date(...dateParam.replace(' ','T'))  
// }
  // useEffect(() => {

   
  // //   VersionCheck.getLatestVersion()
  // // .then(latestVersion => {
  // //   console.log(latestVersion,'--------------------------');    // 0.1.2
  // // });
  // },[]);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MenuProvider>
          <SafeAreaView style={styles.container}>
            <AppStack/>
            {/*Library used for in app notification and success/error messages */}
            <FlashMessage
              position="top"
              floating={true}
              titleStyle={styles.flashTitle}/>
          </SafeAreaView>
        </MenuProvider>
      </PersistGate>
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flashTitle: {
    fontSize: fontSizes.h2,
    fontFamily: fonts.MontserratMedium
  }
});
