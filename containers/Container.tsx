import React, {
  ReactElement,
  useEffect,
  useState,
} from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";

import * as Views from "./index";
import { ContainerContext } from "../contexts";
import { StoryCategories, Categories } from "../api";
import { colors } from "../components";

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  header: {
    flexDirection: "row",
    paddingBottom: 4,
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 2,
  },
});

const CategorySelectButton: React.FC<{
  style: TextStyle;
  category: Categories;
  setCategory: (cat: Categories) => void;
  selected: boolean;
}> = (props) => (
  <TouchableOpacity onPress={() => props.setCategory(props.category)}>
    <Text style={[props.style, props.selected && { color: colors.orange }]}>
      {props.category}
    </Text>
  </TouchableOpacity>
);

const Header: React.FC<{
  history: ReactElement[];
  setHistory: (h: ReactElement[]) => void;
  category: Categories;
  setCategory: (t: Categories) => void;
  setCurrentView: (v: ReactElement | null) => void;
}> = (props) => (
  <View style={styles.header}>
    <Icon
      name={"ios-arrow-back"}
      size={14}
      style={{ paddingRight: 4 }}
      onPress={() => {
        const _current = props.history.pop();
        const prev = props.history.pop();
        // @ts-ignore
        props.setCurrentView(prev);
        props.setHistory(props.history);
      }}
    />

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

export const Container: React.FC = () => {
  const [currentView, setCurrentView] = useState<ReactElement | null>(null);
  const [history, setHistory] = useState<ReactElement[]>([]);
  const [category, setCategory] = useState<Categories>("top");

  useEffect(() => {
    currentView && setHistory([...history, currentView]);
  }, [currentView]);

  const displayStories = () => StoryCategories.includes(category);

  return (
    <ContainerContext.Provider value={{ setCurrentView }}>
      <SafeAreaView style={styles.container}>
        <Header
          history={history}
          setHistory={setHistory}
          category={category}
          setCategory={setCategory}
          setCurrentView={setCurrentView}
        />
        {typeof currentView === "object" &&
        currentView !== null &&
        !displayStories() ? (
          currentView
        ) : (
          <Views.Stories category={category} setCategory={setCategory} />
        )}
      </SafeAreaView>
    </ContainerContext.Provider>
  );
};
