import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import { Story, Border } from "../components";
import { Api } from "../api";

import type { Category, Item } from "../types";

const sliceByPage = (arr: any[], page: number, perPage: number = 15): any[] =>
  arr.slice(page * perPage, (page + 1) * perPage);

export const Stories: React.FC<{
  category: Category;
  setCategory: (c: Category) => void;
} | null> = (props) => {
  const [page, setPage] = useState(0);
  const [stories, setStories] = useState<Item[]>([]);
  const [storyIds, setStoryIds] = useState<number[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      const _storyIds = storyIds || (await Api.getStories(props.category!));
      setStoryIds(storyIds);
      Api.getItems(sliceByPage(_storyIds, page))
        .then((stories) => {
          setStories(stories);
        })
        .finally(() => setLoading(false));
    };
    StoryCategories.includes(props?.category) && fetchStories();
  }, [props?.category, page]);

  useEffect(() => {
    setPage(0);
  }, [props?.category]);

  return (
    <View>
      <TouchableOpacity onPress={() => setPage(0)}>
        <Text>Back to top</Text>
      </TouchableOpacity>
      {!loading && (
        <FlatList
          data={stories}
          renderItem={({ item, index }) => (
            <Story
              key={`${item.id}`}
              item={item}
              index={index + 1 + page * 15}
              last={index === stories.length - 1}
              setCategory={props.setCategory}
            />
          )}
          ItemSeparatorComponent={Border}
        />
      )}
      <TouchableOpacity onPress={() => setPage((page) => page + 1)}>
        <Text>Show more</Text>
      </TouchableOpacity>
    </View>
  );
};
