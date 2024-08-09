import { Tasks } from "../models/Task.models.js";

export const create = async (req, res) => {
  try {
    const Taskdata = new Tasks(req.body);
    const { SameTask } = Taskdata;

    const taskExist = await Tasks.findOne({ SameTask });

    if (taskExist) {
      res.status(400).json({ error: "Task Already Exist --" });
    } else {
      const savedTask = await Taskdata.save();
      res.status(200).json(savedTask);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetch = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    if (tasks.length === 0) {
      res.status(404).json({ error: "No Tasks Found" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const update = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const userExist = await Task.findOne({ _id: id });

//     if (!userExist) {
//       res.status(404).json({ error: "Task Not Found" });
//     }
//     const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     res.status(200).json(updatedTask);
//   } catch (error) {
//     res.status(500).json({ error: "The Server does not Respond " });
//   }
// };

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Tasks.findOne({ _id: id });
    if (!task) {
      return res.status(404).json({ message: error.message });
    } else {
      const updatedTask = await Tasks.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json(updatedTask);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Tasks.findByIdAndDelete({ _id: id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
