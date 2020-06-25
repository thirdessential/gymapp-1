import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import TrainerSignupDetails from "../../screens/Auth/TrainerSignupDetails";
import Stack from './stack';

const initialLoginUpScreen = ({navigationRef}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="TrainerSignupDetails" component={TrainerSignupDetails}
                      options={{title: 'Enter details'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default initialLoginUpScreen;