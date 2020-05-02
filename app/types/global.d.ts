import "reactn";
import { Category } from "./index";

declare module "reactn/default" {
  export interface State {
    categoryHook: Category;
  }
}
