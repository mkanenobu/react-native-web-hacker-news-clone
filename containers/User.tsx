import React from "react";
import { View, Text } from "react-native";

import { User as UserType } from "../api";
import { getDateFromEpochTime } from "../utils/time_utils";

export const User: React.FC<{ user: UserType }> = (props) => (
  <View>
    {props?.user ? (
      <>
        <Text>user: {props.user.id}</Text>
        <Text>
          created: {getDateFromEpochTime(props.user.created).toLocaleString()}
        </Text>
        <Text>karma: {props.user.karma}</Text>
        <Text>about: {props.user.about}</Text>
      </>
    ) : (
      <Text>Failed to Load...{"\n"}Try again.</Text>
    )}
  </View>
);
