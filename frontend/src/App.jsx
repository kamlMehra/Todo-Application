import React, { useEffect } from "react";
import "./App.css";
import FinalTodo from "./assets/component/FinalTodo";
// import TodoApp from "./assets/Components/TodoApp.jsx";
// import Todo from "./assets/component/Todo.jsx";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }} className="main-container">
      {/* <Todo /> */}
      <FinalTodo />
    </div>
  );
}

export default App;
