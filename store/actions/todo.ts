import axios from "axios";
import { Dispatch } from "react";
import { TodoAction, TodoActionTypes, Todo } from "../../types/todo";
import { defaultLimit } from "../../consts";
export const fetchTodos = (
  page = 1,
  limit = defaultLimit,
  q = "",
  status = ""
) => {
  return async (dispatch: Dispatch<TodoAction>) => {
    try {
      dispatch({ type: TodoActionTypes.FETCH_TODOS });
      if (status) {
        const response = await axios.get("http://localhost:8000/todos", {
          params: { _page: page, _limit: limit, q, status },
        });
        dispatch({
          type: TodoActionTypes.FETCH_TODOS_SUCCES,
          payload: response.data,
        });
      } else {
        const response = await axios.get("http://localhost:8000/todos", {
          params: { _page: page, _limit: limit, q },
        });
        dispatch({
          type: TodoActionTypes.FETCH_TODOS_SUCCES,
          payload: response.data,
        });
      }
    } catch (e) {
      dispatch({
        type: TodoActionTypes.FETCH_TODOS_ERROR,
        payload: "Произошла ошибка при загрузке пользователей",
      });
    }
  };
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`http://localhost:8000/todos/${id}`);
};
export const addTodo = async (todo: Todo) => {
  await axios.post("http://localhost:8000/todos", todo);
};

export const editTodo = async (id: number | null, todo: Todo) => {
  await axios.patch(`http://localhost:8000/todos/${id}`, todo);
};

export function SetTodoPage(page: number): TodoAction {
  return { type: TodoActionTypes.SET_TODO_PAGE, payload: page };
}
export function SetTodoQ(q: string): TodoAction {
  return { type: TodoActionTypes.SET_TODO_Q, payload: q };
}
export function SetStatus(status: string): TodoAction {
  return { type: TodoActionTypes.SET_STATUS, payload: status };
}
