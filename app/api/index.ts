// `/v0/user/`
import type { Category, Item, User } from "../types";

const baseUrl = "https://hacker-news.firebaseio.com/v0";

export class Api {
  private static async fetchBase(endpoint: string): Promise<any> {
    return (await fetch(`${baseUrl}${endpoint}.json`)).json();
  }

  static getStories(type: Category): Promise<number[]> {
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
