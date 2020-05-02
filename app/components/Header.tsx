import React, { ReactElement } from "react";
import {
  Text,
  TextStyle,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Colors } from "../shared/constants";
import type { Categories } from "../types";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingBottom: 4,
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 2,
  },
});

const StoryCategories: Categories[] = [
  "top",
  "new",
  "best",
  "ask",
  "show",
  "job",
];

const CategorySelectButton: React.FC<{
  style: TextStyle;
  category: Categories;
  setCategory: (cat: Categories) => void;
  selected: boolean;
}> = (props) => (
  <TouchableOpacity onPress={() => props.setCategory(props.category)}>
    <Text style={[props.style, props.selected && { color: Colors.orange }]}>
      {props.category}
    </Text>
  </TouchableOpacity>
);

export const Header: React.FC<{
  history: ReactElement[];
  setHistory: (h: ReactElement[]) => void;
  category: Categories;
  setCategory: (t: Categories) => void;
  setCurrentView: (v: ReactElement | null) => void;
}> = (props) => (
  <View style={styles.header}>
    {StoryCategories.map((cat) => (
      <CategorySelectButton
        style={styles.button}
        key={cat}
        category={cat}
        setCategory={props.setCategory}
        selected={cat === props.category}
      />
    ))}
  </View>
);
