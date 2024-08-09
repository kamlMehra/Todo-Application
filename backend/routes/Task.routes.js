import express from "express";

import {
  create,
  fetch,
  remove,
  update,
} from "../controller/Task.controller.js";

const route = express.Router();

route.post("/create", create);
route.get("/fetch", fetch);
route.put("/update/:id", update);
route.delete("/remove/:id", remove);

export default route;
