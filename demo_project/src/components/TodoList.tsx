import React from "react";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

interface Prop {
  todo: Todo;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<Prop> = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <li
      style={{
        textDecoration: todo.done ? "line-through" : "none",
        margin: "8px",
      }}
    >
      {todo.text}
      <button
        onClick={() => toggleTodo(todo.id)}
        style={{ marginLeft: "10px" }}
      >
        complete
      </button>
      <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: "5px" }}>
        delete
      </button>
    </li>
  );
};

export default TodoItem;
