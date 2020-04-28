import React from "react";
import { View, Text, TouchableOpacity, Platform, Linking } from "react-native";

import { getDateFromEpochTime } from "../utils/time_utils";
import { Item } from "../api";
import { styles } from "./styles";

const openLink = (url: string) =>
  Platform.OS === "web" ? window.open(url, "_blank") : Linking.openURL(url);

export const Story: React.FC<{ item: Item } & { index: number }> = (props) => (
  <TouchableOpacity
    style={styles.rowDirection}
    onPress={() => props.item.url && openLink(props.item.url)}
  >
    <Text style={{ height: 16, width: 'auto' }}>{props.index}</Text>
    <View style={{paddingLeft: 4}}>
      <Text>{props.item.title}</Text>
      <Text>
        <Text>by {props.item.by}</Text>
        <Text style={{ paddingLeft: 4 }}>
          {props.item.time &&
            getDateFromEpochTime(props.item.time).toLocaleString()}
        </Text>
      </Text>
    </View>
  </TouchableOpacity>
);
