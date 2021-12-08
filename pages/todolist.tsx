import axios from "axios";
import NextNProgress from "nextjs-progressbar";
import React, { useEffect, useState } from "react";
import { MainLayout } from "../components/MainLayout";
import { useActions } from "../hooks/useAction";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { addTodo, deleteTodo, editTodo } from "../store/actions/todo";
import { Todo } from "../types/todo";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const TodoList: React.FC = () => {
  const { error, page, loading, limit, todos, q, status } = useTypedSelector(
    (state) => state.todo
  );
  const [pages, setPages] = useState([]);
  const getPages = async (limit: number): Promise<any> => {
    let arr = [];
    if (status) {
      const { data } = await axios.get("http://localhost:8000/todos", {
        params: { q, status },
      });
      const n = Math.ceil(data.length / limit);

      for (let i = 1; i <= n; i++) {
        arr.push(i);
      }
      setPages(arr);
    } else {
      const { data } = await axios.get("http://localhost:8000/todos", {
        params: { q },
      });
      const n = Math.ceil(data.length / limit);

      for (let i = 1; i <= n; i++) {
        arr.push(i);
      }
      setPages(arr);
    }
  };
  const [todo, setTodo] = useState({ title: "", status: "notcompleted" });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [id, setId] = useState(null);
  const [type, setType] = useState("all");
  const { fetchTodos, SetTodoPage, SetTodoQ, SetStatus } = useActions();

  useEffect(() => {
    fetchTodos(page, limit, q, status);
  }, [page, q, status]);

  useEffect(() => {
    getPages(limit);
  }, [todos]);
  const handleDelete = (id: number) => {
    deleteTodo(id);
    fetchTodos(page, limit, q);
  };
  const handleValue = (str: string) => {
    setValue(str);
  };

  const handleSearch = (value: string) => {
    SetTodoQ(value);
    setValue("");
    SetTodoPage(1);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);

    setTodo({ title: value, status: "notcompleted" });
  };
  const handleAddTodo = (todo: Todo) => {
    addTodo(todo);
    fetchTodos(page, limit, q);
    setTodo({ title: "", status: "notcompleted" });
  };
  const handleSaveEdit = (id: number | null, todo: Todo) => {
    editTodo(id, todo);
    setTimeout(() => {
      fetchTodos(page, limit, q);
      setOpen(false);
    }, 200);
    setTodo({ title: "", status: "notcompleted" });
  };
  const handleChangeType = (e) => {
    if (e.target.value == "all") {
      SetStatus("");
      setType("all");
    } else {
      setType(e.target.value);
      SetStatus(e.target.value);
    }
  };
  if (loading) {
    return (
      <>
        <MainLayout>loading...</MainLayout>
      </>
    );
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <MainLayout>
        <div>
          <input
            onChange={(e) => handleValue(e.target.value)}
            onBlur={() => SetTodoQ("")}
            type="text"
            placeholder="Search"
            value={value}
          />
          <button onClick={() => handleSearch(value)}>search</button>
          {/* <div className="radio">
            <input
              onChange={(e) => console.log(e.target)}
              type="radio"
              id="html"
              name="all"
              value="HTML"
            />
            <label>all</label>
            <br />
            <input
              onChange={(e) => console.log(e.target)}
              type="radio"
              id="css"
              name="completed"
              value="CSS"
            />
            <label>completed</label>
            <br />
            <input
              onChange={(e) => console.log(e.target)}
              type="radio"
              id="javascript"
              name="notcompleted"
              value="JavaScript"
            />
            <label>notcompleted</label>
          </div> */}

          <FormControl component="fieldset">
            <FormLabel component="legend">Sort</FormLabel>
            <RadioGroup
              aria-label="sort"
              defaultValue="all"
              name="radio-buttons-group"
              value={type}
              onChange={handleChangeType}
            >
              <FormControlLabel
                value="completed"
                control={<Radio />}
                label="Completed"
              />
              <FormControlLabel
                value="notcompleted"
                control={<Radio />}
                label="Not completed"
              />
              <FormControlLabel value="all" control={<Radio />} label="All" />
            </RadioGroup>
          </FormControl>

          <div>
            <input onChange={(e) => handleChange(e)} type="text" />
            <button onClick={(e) => handleAddTodo(todo)}>add</button>
          </div>
          <br />
          <button onClick={() => SetTodoQ("")}>reset</button>
          <br />
          <div style={!open ? { display: "none" } : { display: "inline" }}>
            <input
              autoFocus
              onChange={(e) => handleChange(e)}
              value={todo.title}
              type="text"
            />
            <button onClick={() => handleSaveEdit(id, todo)}>save</button>
          </div>

          {todos ? (
            todos.map((todo: any) => (
              <div key={todo.id}>
                <input type="checkbox" />
                <label>
                  {todo.id} - {todo.title} - {todo.status}
                </label>
                <button onClick={() => handleDelete(todo.id)}>delete</button>
                <button
                  onClick={() => {
                    setOpen(true);
                    setId(todo.id);
                    setTodo({ title: todo.title, status: todo.status });
                  }}
                >
                  edit
                </button>
              </div>
            ))
          ) : (
            <h2>loading...</h2>
          )}
          <div style={{ display: "flex" }}>
            {pages &&
              pages?.map((p) => (
                <div
                  onClick={() => SetTodoPage(p)}
                  style={{
                    border: p === page ? "2px solid green" : "1px solid gray",
                    padding: 10,
                  }}
                >
                  {p}
                </div>
              ))}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default TodoList;
