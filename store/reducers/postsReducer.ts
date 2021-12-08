import { PostsAction, PostsActionTypes, PostsState } from "../../types/post";

const inititalState: PostsState = {
  posts: [],
  post: null,
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  q: "",
};

export const postReducer = (
  state = inititalState,
  action: PostsAction
): PostsState => {
  switch (action.type) {
    case PostsActionTypes.FETCH_POSTS_SUCCES:
      return { ...state, loading: false, error: null, posts: action.payload };
    case PostsActionTypes.FETCH_ONE_POST_SUCCES:
      return { ...state, loading: false, error: null, post: action.payload };
    default:
      return state;
  }
};
