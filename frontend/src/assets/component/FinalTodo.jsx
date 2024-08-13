import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { MdEditCalendar } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import "./FinalTodo.css";
import Swal from "sweetalert2";
import axios from "axios";
let EditItemID,
  tododata = [];
function FinalTodo() {
  const [count, setCount] = useState(0);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [iscompletedsrcreen, setIscompletedscreen] = useState(false);
  function todohandler() {
    setIscompletedscreen(false);
  }
  function donehandler() {
    setIscompletedscreen(true);
  }

  const [data, setdata] = useState({
    Task: "",
    Date: "",
    Description: "",
    Status: false,
  });

  const [todo, setTodo] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async (val) => {
    let response;
    try {
      if (val == "Save") {
        const response = await axios.post(
          "http://localhost:8000/api/todo/create",
          data
        );
        if (response.status === 200) {
          console.log("Data successfully saved:", response.data);
          setdata({
            Task: "",
            Date: "",
            Description: "",
          });

          setCount(count + 1);

          Swal.fire({
            title: "Good job!",
            text: "Data successfully saved!",
            icon: "success",
            timer: 1500,
          });
        }
      } else {
        response = await axios.put(
          `http://localhost:8000/api/todo/update/${EditItemID}`,
          data
        );
        if (response.status === 200) {
          console.log("Data successfully saved:", response.data);
          setdata({
            Task: "",
            Date: "",
            Description: "",
          });

          setCount(count + 1);
          setToggleSubmit(true);

          Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Updated!",
                text: "Your file has been Updated.",
                icon: "success",
              });
            }
          });
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("API endpoint not found:", error.response.data);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  // FETCHING DATA-------------------------------->

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/todo/fetch"
        );
        const incompletedTodos = response.data.tasks.filter(
          (task) => task.Status === false
        );
        const com = response.data.tasks.filter((task) => task.Status !== false);
        setTodo(incompletedTodos);
        setCompletedTodos(com);
      } catch (err) {
        console.error("Error Occured---------->", err);
      }
    };
    fetchData();
  }, [count]);

  // DELETING DATA------------------------------>
  const handleDelete = async ({ id }) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const response = axios.delete(
            `http://localhost:8000/api/todo/remove/${id}`
          );
          if (response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
          setTodo(todo.filter((item) => item.id !== id));
          setCount(count + 1);
        }
      });
    } catch (error) {
      console.log("Error in Deleting is ---->", error);
    }
  };

  // UPDATING DATA ---------------------------->
  const handleedit = async ({ Uid }) => {
    let newedititem = todo.find(({ Uid }) => {
      return {
        task: todo.Task,
        date: todo.Date,
        description: todo.Description,
      };
    });
    EditItemID = Uid;
    console.log("Newdata =================", newedititem);
    setToggleSubmit(false);
    console.log("Object Id is", Uid);
    setdata(newedititem);
  };
  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Todo</label>
            <input
              type="text"
              placeholder="Enter your Todos"
              required={true}
              onChange={handleChange}
              value={data.Task}
              name="Task"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              placeholder="Enter your Description"
              required={true}
              onChange={handleChange}
              name="Description"
              value={data.Description}
            />
          </div>
          <div className="todo-input-item">
            <label>Date</label>
            <input
              type="date"
              placeholder="Enter your Date"
              required={true}
              onChange={handleChange}
              value={data.Date}
              name="Date"
            />
          </div>
          <div className="todo-input-item">
            {toggleSubmit ? (
              <button
                type="button"
                className="primaryBtn"
                onClick={() => handleSave("Save")}
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                className="primaryBtn"
                onClick={() => handleSave("Update")}
              >
                Update
              </button>
            )}
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${
              iscompletedsrcreen === false && "active"
            }`}
            onClick={todohandler}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${
              iscompletedsrcreen === true && "active"
            }`}
            onClick={donehandler}
          >
            Done
          </button>
        </div>
        <div className="todo-list">
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
                />
                <MdEditCalendar
                  className="edit-icon"
                  onClick={() => {
                    handleedit({ Uid: item._id });
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
      </div>
    </div>
  );
}

export default FinalTodo;
