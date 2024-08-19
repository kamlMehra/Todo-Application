import * as React from "react";
import { FaCheck } from "react-icons/fa";
import { MdEditCalendar } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import "./FinalTodo.css";

function Uncompleted({ todo, handleedit, handleDelete, handlestatus }) {
  return (
    <div>
      {todo.map((item) => (
        <div className="todo-list-item" key={item._id}>
          <div className="todo-details">
            <h3>{item.Task}</h3>
            <h2>{item.Date}</h2>
            <p>{item.Description}</p>
          </div>
          <div className="icons">
            <FaCheck
              className="check-icon"
              aria-label="Mark as Completed"
              onClick={() => handlestatus({ Uid: item._id })}
            />
            <MdEditCalendar
              className="edit-icon"
              onClick={() => {
                handleedit(item);
              }}
            />
            <MdDelete
              className="delete-icon"
              onClick={() => {
                handleDelete({ id: item._id });
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Uncompleted;
