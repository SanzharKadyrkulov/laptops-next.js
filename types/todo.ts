export interface TodoState {
  todos: any[];
  loading: boolean;
  error: null | string;
  page: number;
  limit: number;
  q: string;
  status: string;
}

export interface Todo {
  id?: number;
  title: string;
  status: string;
}

export enum TodoActionTypes {
  FETCH_TODOS = "FETCH_TODOS",
  FETCH_TODOS_SUCCES = "FETCH_TODOS_SUCCES",
  FETCH_TODOS_ERROR = "FETCH_TODOS_ERROR",
  SET_TODO_PAGE = "SET_TODO_PAGE",
  SET_TODO_Q = "SET_TODO_Q",
  SET_STATUS = "SET_STATUS",
}

interface FetchTodoAction {
  type: TodoActionTypes.FETCH_TODOS;
}
interface FetchTodoSuccesAction {
  type: TodoActionTypes.FETCH_TODOS_SUCCES;
  payload: any[];
}
interface FetchTodoErrorAction {
  type: TodoActionTypes.FETCH_TODOS_ERROR;
  payload: string;
}
interface SetTodoPage {
  type: TodoActionTypes.SET_TODO_PAGE;
  payload: number;
}
interface SetTodoQ {
  type: TodoActionTypes.SET_TODO_Q;
  payload: string;
}
interface Set_Status {
  type: TodoActionTypes.SET_STATUS;
  payload: string;
}

export type TodoAction =
  | FetchTodoAction
  | FetchTodoSuccesAction
  | FetchTodoErrorAction
  | SetTodoPage
  | SetTodoQ
  | Set_Status;
