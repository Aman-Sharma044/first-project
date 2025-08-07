import { useState } from "react";
import TodoItem from "./components/TodoList.tsx";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text,
      done: false,
    };

    setTodos([...todos, newTodo]);
    setText("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    // Filter out the todo with the matching id
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>hello</h1>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Todo List</h1>

        {/* Input field to enter new todo */}
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)} // Update input value
          placeholder="Add a new task"
        />

        <button onClick={addTodo}>Add</button>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
