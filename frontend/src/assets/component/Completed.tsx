import * as React from "react";
import { ImCross } from "react-icons/im";
import { MdDelete, MdEditCalendar } from "react-icons/md";
import "./FinalTodo.css";

function Completed({
  completedTodos,
  handleDelete,
  handlecompletedstatus,
}) {
  return (
    <div>
      {completedTodos.map((item) => (
        <div className="todo-list-item" key={item._id}>
          <div className="todo-details">
            <h3>{item.Task}</h3>
            <h2>{item.Date}</h2>
            <p>{item.Description}</p>
          </div>
          <div className="icons">
            <ImCross
              className="cross-icon"
              aria-label="Mark as Completed"
              onClick={() => handlecompletedstatus({ Uid: item._id })}
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

export default Completed;
