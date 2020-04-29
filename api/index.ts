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

export type Categories =
  | "top"
  | "new"
  | "best"
  | "ask"
  | "show"
  | "job"
  | "user";
export const StoryCategories: Categories[] = [
  "top",
  "new",
  "best",
  "ask",
  "show",
  "job",
];

const baseUrl = "https://hacker-news.firebaseio.com/v0";

export class Api {
  private static async fetchBase(endpoint: string): Promise<any> {
    return (await fetch(`${baseUrl}${endpoint}.json`)).json();
  }

  static getStories(type: Categories): Promise<number[]> {
    return this.fetchBase(`/${type}stories`);
  }

  static getShowStories(): Promise<number[]> {
    return this.fetchBase("/showstories");
  }

  static getJobStories(): Promise<number[]> {
    return this.fetchBase("/jobstories");
  }

  static getItem(id: number): Promise<Item> {
    return this.fetchBase(`/item/${id}`);
  }

  static getItems(ids: number[]): Promise<Item[]> {
    return Promise.all(ids.map((id) => this.getItem(id)));
  }

  static getUser(id: string): Promise<User> {
    return this.fetchBase(`/user/${id}`);
  }
}
