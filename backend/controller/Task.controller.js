import { Tasks } from "../models/Task.models.js";

export const create = async (req, res) => {
  try {
    const Taskdata = new Tasks(req.body);
    const { Task } = req.body;

    if (!Task) {
      res.status(400).json({ message: "Task already exists" });
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
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
