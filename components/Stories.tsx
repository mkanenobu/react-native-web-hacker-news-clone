import React, { useState, useEffect, useMemo } from "react";
import { View, Text, TouchableOpacity, TextStyle } from "react-native";

import { styles, colors } from "./styles";
import { Story } from "./Story";
import { getStories, getItems, StoryCategories, Item, StoryType } from "../api";

const CategorySelectButton: React.FC<{
  style: TextStyle;
  category: StoryType;
  setCategory: (cat: StoryType) => void;
  selected: boolean;
}> = (props) => (
  <TouchableOpacity onPress={() => props.setCategory(props.category)}>
    <Text style={[props.style, props.selected && { color: colors.orange }]}>
      {props.category}
    </Text>
  </TouchableOpacity>
);

const sliceByPage = (arr: any[], page: number, perPage: number = 15): any[] =>
  arr.slice(page * perPage, (page + 1) * perPage);

export const Stories: React.FC = () => {
  const [category, setCategory] = useState<StoryType>("top");
  const [page, setPage] = useState(0);
  const [stories, setStories] = useState<Item[]>([]);
  const [storyIds, setStoryIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const storiesForDisplay = useMemo(() => {}, [stories]);

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      const storyIds = await getStories(category);
      setStoryIds(storyIds);
      getItems(sliceByPage(storyIds, page)).then(setStories);
      setLoading(false);
    };
    fetchStories();
  }, [category, page]);

  useEffect(() => {
    setPage(0);
  }, [category]);

  return (
    <View>
      <View style={[styles.rowDirection, { paddingBottom: 4 }]}>
        {StoryCategories.map((cat) => (
          <CategorySelectButton
            style={{ paddingRight: 4 }}
            key={cat}
            category={cat}
            setCategory={setCategory}
            selected={cat === category}
          />
        ))}
      </View>
      <TouchableOpacity onPress={() => setPage(0)}>
        <Text>Back to top</Text>
      </TouchableOpacity>
      {!loading &&
        stories.map((story, index) => (
          <Story
            key={`${story.id}${index}`}
            item={story}
            index={index + 1 + page * 15}
          />
        ))}
      <TouchableOpacity onPress={() => setPage((page) => page + 1)}>
        <Text>Show more</Text>
      </TouchableOpacity>
      <Text>{JSON.stringify(stories, undefined, 2)}</Text>
    </View>
  );
};
