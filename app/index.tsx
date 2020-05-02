import "react-native-gesture-handler";
import React, { setGlobal } from "reactn";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Linking } from "expo";

import * as Views from "./containers";

const prefix = Linking.makeUrl("/");
const linking = {
  prefixes: [prefix],
};

const Stack = createStackNavigator();

setGlobal({ category: "top" });

const AppMain = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="stories" component={Views.Stories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppMain;
