import React, { useState, useEffect } from "react";
import Form from "./Form";
import Todo from "./Todo";

function List() {
  const initialTodos = JSON.parse(localStorage.getItem("todos"));
  const [todos, setTodos] = useState(initialTodos || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(todo);
    console.log(...todos);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const doneTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removeArr);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newTodos = [...todos].filter((todo) => {
        return Object.values(todo)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newTodos);
    } else {
      setSearchResults(todos);
    }
  };

  return (
    <>
      <h1>ToDo List</h1>
      <Form
        todos={searchTerm.length < 1 ? todos : searchResults}
        onSubmit={addTodo}
        term={searchTerm}
        searchKeyword={searchHandler}
      />
      <Todo
        todos={searchTerm.length < 1 ? todos : searchResults}
        doneTodoapp={doneTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default List;
