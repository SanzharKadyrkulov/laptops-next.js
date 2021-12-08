import { combineReducers } from "redux";
import { laptopReducer } from "./laptopReducer";
import { postReducer } from "./postsReducer";
import { todoReducer } from "./todoReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
  post: postReducer,
  todo: todoReducer,
  laptop: laptopReducer,
  auth: authReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
