export interface PostsState {
  posts: any[];
  post: Post | null;
  loading: false;
  error: null;
  page: number;
  limit: number;
  q: string;
}

export interface Post {
  id?: number;
  title: string;
  body: string;
}

export enum PostsActionTypes {
  FETCH_POSTS = "FETCH_POSTS",
  FETCH_POSTS_SUCCES = "FETCH_POSTS_SUCCES",
  FETCH_ONE_POST_SUCCES = "FETCH_ONE_POST_SUCCES",
  FETCH_POSTS_ERROR = "FETCH_POSTS_ERROR",
  SET_POST_PAGE = "SET_POST_PAGE",
  SET_POST_Q = "SET_POST_Q",
}

interface FetchPostsAction {
  type: PostsActionTypes.FETCH_POSTS;
}
interface FetchPostsSuccesAction {
  type: PostsActionTypes.FETCH_POSTS_SUCCES;
  payload: any[];
}
interface FetchOnePostSucces {
  type: PostsActionTypes.FETCH_ONE_POST_SUCCES;
  payload: Post | any;
}
interface FetchPostsErrorAction {
  type: PostsActionTypes.FETCH_POSTS_ERROR;
  payload: string;
}
interface SetPostsPage {
  type: PostsActionTypes.SET_POST_PAGE;
  payload: number;
}
interface SetPostsQ {
  type: PostsActionTypes.SET_POST_Q;
  payload: string;
}

export type PostsAction =
  | FetchPostsAction
  | FetchPostsSuccesAction
  | FetchPostsErrorAction
  | SetPostsPage
  | SetPostsQ
  | FetchOnePostSucces;
