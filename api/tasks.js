import express from "express";
const router = express.Router();
export default router;

import {
  createTask,
  getTasksByUserId,
  updateTask,
  deleteTask,
  getTaskById,
} from "#db/queries/tasks";

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";

router.use(requireUser);

router
  .route("/")
  .get(async (req, res) => {
    const tasks = await getTasksByUserId(req.user.id);
    res.send(tasks);
  })
  .post(requireBody(["title", "done"]), async (req, res) => {
    const { title, done } = req.body;
    const task = await createTask(title, done, req.user.id);
    res.status(201).send(task);
  });

router.param("id", async (req, res, next, id) => {
  const task = await getTaskById(id);
  if (!task) return res.status(404).send("Task not found");
  
     if (Number(req.user.id) !== Number(task.user_id))
      return res
        .status(403)
        .send("You do not have permission to view this task");
  req.task = task;
  next();
});

router
  .route("/:id")
  .get((req, res) => {
    res.send(req.task);
  })
  .put(requireBody(["title", "done"]), async (req, res) => {
    const { title, done } = req.body;
    const task = await updateTask(req.params.id, title, done, req.user.id);
    res.send(task);
  })
  .delete(async (req, res) => {
    await deleteTask(req.params.id, req.user.id);
    res.sendStatus(204);
  });
