import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { User } from "../containers";
import { ContainerContext } from "../contexts";
import { openLink } from "../platform";
import { getDateFromEpochTime } from "../utils/time_utils";
import { Api, Categories, Item } from "../api";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "auto",
    paddingVertical: 4,
  },
});

export const Story: React.FC<{
  item: Item;
  index: number;
  last?: boolean;
  setCategory: (c: Categories) => void;
}> = (props) => (
  <View style={styles.container}>
    <Text style={{ height: 16, width: "auto" }}>{props.index}</Text>
    <View style={{ paddingLeft: 4 }}>
      <Text onPress={() => props.item.url && openLink(props.item.url, true)}>
        {props.item.title}
      </Text>
      <Text>
        {props.item.by && (
          <ContainerContext.Consumer>
            {(value) => (
              <Text
                onPress={() =>
                  Api.getUser(props.item.by!).then((user) => {
                    props.setCategory("user");
                    value.setCurrentView(User({ user }));
                  })
                }
              >
                by {props.item.by}
              </Text>
            )}
          </ContainerContext.Consumer>
        )}
        <Text style={{ paddingLeft: 4 }}>
          {props.item.time &&
            getDateFromEpochTime(props.item.time).toLocaleString()}
        </Text>
      </Text>
    </View>
  </View>
);
