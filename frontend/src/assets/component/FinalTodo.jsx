import React, { useState, useEffect } from "react";
import "./FinalTodo.css";
import Swal from "sweetalert2";
import axios from "axios";
import { Label, Pivot, PivotItem } from "@fluentui/react";
import Uncompleted from "./Uncompleted";
import Completed from "./Completed";
let EditItemID,
  tododata = [];

const BASE_URL = import.meta.env.VITE_BASE_URL;
function FinalTodo() {
  const [count, setCount] = useState(0);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  // const [iscompletedsrcreen, setIscompletedscreen] = useState(false);
  // function todohandler() {
  //   setIscompletedscreen(false);
  // }
  // function donehandler() {
  //   setIscompletedscreen(true);
  // }
  const labelStyles = {
    root: { marginTop: 10 },
  };
  const [data, setdata] = useState({
    Task: "",
    Date: "",
    Description: "",
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
        console.log("DATA........", data);
        const response = await axios.post(
          `${BASE_URL}/api/todo/create`,
          data
        );
        if (response.status === 200) {
          console.log("Data successfully saved:", response.data);
          setdata({
            Task: "",
            Date: "",
            Description: "",
            Status: false,
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
        console.log("DATA in update........", data);
        response = await axios.put(
          `${BASE_URL}/api/todo/update/${EditItemID}`,
          data
        );
        if (response.status === 200) {
          console.log("Data successfully saved:", response.data);
          setdata({
            Task: "",
            Date: "",
            Description: "",
            Status: false,
          });

          setCount(count + 1);
          setToggleSubmit(true);
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
          `${BASE_URL}/api/todo/fetch`
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
            `${BASE_URL}/api/todo/remove/${id}`,
            data
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

  //UPDATING STATUS ----------------------------->
  // const handlestatus = async ({ Uid }) => {
  //   let newstatus = todo.find(({ Uid }) => {
  //     return (tasks.Status = true);
  //   });
  // };
  const handlestatus = async ({ Uid }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/todo/update/${Uid}`,
        {
          Status: true,
        }
      );
      if (response.status === 200) {
        console.log("Data successfully saved:", response.data);
        setCount(count + 1);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handlecompletedstatus = async ({ Uid }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/todo/update/${Uid}`,
        {
          Status: false,
        }
      );
      if (response.status === 200) {
        console.log("Data successfully saved:", response.data);
        setCount(count + 1);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
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

        <Pivot className="pivotitems PivotAddstyles">
          <PivotItem headerText="Todos" style={{ color: "white" }}>
            <Uncompleted
              todo={todo}
              handleDelete={handleDelete}
              handleedit={handleedit}
              handlestatus={handlestatus}
            />
          </PivotItem>
          <PivotItem headerText="Done">
            <Completed
              completedTodos={completedTodos}
              handleDelete={handleDelete}
              handlecompletedstatus={handlecompletedstatus}
            />
          </PivotItem>
        </Pivot>
      </div>
    </div>
  );
}

export default FinalTodo;
