import { TodoAction, TodoActionTypes, TodoState } from "../../types/todo";

const initialState: TodoState = {
  todos: [],
  page: 1,
  error: null,
  limit: 5,
  loading: false,
  q: "",
  status: "",
};

export const todoReducer = (
  state = initialState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case TodoActionTypes.FETCH_TODOS:
      return { ...state, loading: true };
    case TodoActionTypes.FETCH_TODOS_SUCCES:
      return { ...state, loading: false, todos: action.payload };
    case TodoActionTypes.FETCH_TODOS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case TodoActionTypes.SET_TODO_PAGE:
      return { ...state, page: action.payload };
    case TodoActionTypes.SET_TODO_Q:
      return { ...state, q: action.payload };
    case TodoActionTypes.SET_STATUS:
      return { ...state, status: action.payload };
    default:
      return state;
  }
};
