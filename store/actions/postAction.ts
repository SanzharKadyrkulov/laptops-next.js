import { Dispatch } from "react";
import { PostsAction, PostsActionTypes } from "../../types/post";

export const fetchPosts = () => async (dispatch: Dispatch<PostsAction>) => {
  dispatch({ type: PostsActionTypes.FETCH_POSTS });
  const response = await fetch(`${process.env.API_URL}/posts`);
  const data = await response.json();
  dispatch({
    type: PostsActionTypes.FETCH_POSTS_SUCCES,
    payload: data,
  });
};

export const fetchOnePost =
  (id: number | string | string[]) =>
  async (dispatch: Dispatch<PostsAction>) => {
    dispatch({ type: PostsActionTypes.FETCH_POSTS });
    const response = await fetch(`${process.env.API_URL}/posts/${id}`);
    const data = await response.json();

    dispatch({
      type: PostsActionTypes.FETCH_ONE_POST_SUCCES,
      payload: data,
    });
  };
