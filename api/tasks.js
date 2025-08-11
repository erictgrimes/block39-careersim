import express from "express";
const router = express.Router();
export default router;

import { createTask, getTasksByUserId, getTasks } from "#db/queries/tasks";

import requireUser from "#middleware/requireUser";

router.use(requireUser);


router.
route("/")
.get(async (req, res) => {
  const tasks = await getTasks(req.user.id);
  res.send(tasks);
})
.post(async (req, res) => {
    if (!req.body) return res.status(400).send("Request body is required");
    const { title, done } = req.body;
    if (!title || !done) return res.status(400).send("Title and done status are required");
    const task = await createTask(title, done, req.user.id);
    res.status(201).send(task);
})