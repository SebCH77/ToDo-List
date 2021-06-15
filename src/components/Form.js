import React, { useState, useRef } from "react";

function Form(props) {
  const inputEl = useRef("");

  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {props.edit ? (
        <>
          <input
            placeholder="Modifica la tarea"
            value={input}
            onChange={handleChange}
            name="text"
            className="todo-input edit"
          />
          <br />
          <button onClick={handleSubmit} className="todo-button edit">
            Modificar
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Agregar"
            value={input}
            name="text"
            className="todo-input"
            onChange={handleChange}
          />
          <br />
          <button onClick={handleSubmit} className="todo-button">
            Agregar
          </button>
          <br />
          <input
            ref={inputEl}
            placeholder="Buscar"
            value={props.term}
            name="text"
            className="todo-input2"
            onChange={getSearchTerm}
          />
        </>
      )}
    </form>
  );
}

export default Form;
