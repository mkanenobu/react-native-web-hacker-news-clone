import { OneOf } from "../utils/type_utils";

// `/v0/user/`
export interface User {
  id: string; // unique username
  delay?: number; // Delay in minutes between a comment's creation and its visibility to other users.
  created: number; // Creation date in UnixTime
  karma: number;
  about?: string; // The user's optional self-description. HTML.
  submitted?: number[]; // List of the user's stories, polls and comments.
}

// `/v0/item/<id>`.
export interface Item {
  id: number;
  deleted?: boolean;
  type?: "job" | "story" | "comment" | "poll" | "pollopt"; // The type of item
  by?: string; // author's username
  time?: number; // Creation date in Unix Time
  text?: string; // The comment, story or poll text. HTML.
  dead?: boolean; // `true` if the item is dead.
  parent?: number; // The comment's parent: either another comment or the relevant story.
  poll?: number; // The pollopt's associated poll.
  kids?: number[]; // The ids of the item's comments, in ranked display order.
  url?: string; // The URL of the story.
  score?: number; // The story's score, or the votes for a pollopt.
  title?: string; // The title of the story, poll or job.
  parts?: number[]; // A list of related pollopts, in display order.
  descendants?: number; // In the case of stories or polls, the total comment count.
}

export type StoryType = "top" | "new" | "best" | "ask" | "show" | "job";
export const StoryCategories: StoryType[] = ["top", "new", "best", "ask", "show", "job"];

const baseUrl = "https://hacker-news.firebaseio.com/v0";

const getBase = async (endpoint: string): Promise<any> => {
  return (await fetch(`${baseUrl}${endpoint}.json`)).json();
};

export const getStories = async (type: StoryType): Promise<number[]> => {
  return await getBase(`/${type}stories`);
};

export const getShowStories = async (): Promise<number[]> => {
  return await getBase("/showstories");
};

export const getJobStories = async (): Promise<number[]> => {
  return await getBase("/jobstories");
};

export const getItem = async (id: number): Promise<Item> => {
  return await getBase(`/item/${id}`);
};

export const getItems = (ids: number[]): Promise<Item[]> => {
  return Promise.all(ids.map((id) => getItem(id)));
};

export const getUser = async (id: string): Promise<User> => {
  return await getBase(`/user/${id}`);
};
