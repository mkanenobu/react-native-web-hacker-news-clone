import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { Stories } from "../components/Stories";

export const MainRouter = () => {
  return (
    <NavigationContainer>
      <View style={{ padding: 16 }}>
        <Stories />
      </View>
    </NavigationContainer>
  );
};
