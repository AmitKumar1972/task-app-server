import { Request, Response } from "express";
import { Effect } from "effect";
import { TaskRepository } from "../services/taskService";
import { UserRepository } from "../services/userService";
import { log } from "../utils/logger";

const validateTask = (req: Request) => {
  const { title, description, dueDate, status } = req.body;
  if (!title || !description || !dueDate || !status) {
    return "Missing required fields: title, description, dueDate, and status";
  }
  if (!["To Do", "In Progress", "Done"].includes(status)) {
    return "Invalid status value. Allowed values are 'To Do', 'In Progress', 'Done'";
  }
  return null;
};

export const createTask = (req: Request, res: Response) =>
  Effect.gen(function* () {
    const userId = Number(req.params.user_id);
    const userRepo = yield* UserRepository;
    const user = yield* userRepo.getUser(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const validationError = validateTask(req);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
    const repo = yield* TaskRepository;
    const { title, description, dueDate, status } = req.body;
    const task = yield* repo.createTask(
      userId,
      title,
      description,
      dueDate,
      status
    );

    log(`Task created for user ${req.params.user_id}: ${task.id}`);

    const response = {
      message: "Task created",
      task,
    };

    return res.json(response);
  });

export const getTasks = (req: Request, res: Response) =>
  Effect.gen(function* () {
    const userId = Number(req.params.user_id);
    const userRepo = yield* UserRepository;
    const user = yield* userRepo.getUser(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const repo = yield* TaskRepository;
    const tasks = yield* repo.getTasks(userId);
    return res.json(tasks);
  });

export const getTask = (req: Request, res: Response) =>
  Effect.gen(function* () {
    const userId = Number(req.params.user_id);
    const taskId = Number(req.params.task_id);

    const userRepo = yield* UserRepository;

    const user = yield* userRepo.getUser(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const repo = yield* TaskRepository;

    const task = yield* repo.getTask(userId, taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    log(`Tasks retrieved for user ${userId}`);

    return res.json(task);
  });

export const updateTask = (req: Request, res: Response) =>
  Effect.gen(function* () {
    const userId = Number(req.params.user_id);
    const taskId = Number(req.params.task_id);

    const userRepo = yield* UserRepository;

    const user = yield* userRepo.getUser(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const validationError = validateTask(req);

    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const repo = yield* TaskRepository;

    const { title, description, dueDate, status } = req.body;

    const task = yield* repo.updateTask(
      userId,
      taskId,
      title,
      description,
      dueDate,
      status
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    log(`Task updated for user ${req.params.user_id}: ${task.id}`);

    return res.json(task);
  });

export const deleteTask = (req: Request, res: Response) =>
  Effect.gen(function* () {
    const userId = Number(req.params.user_id);
    const taskId = Number(req.params.task_id);

    const repo = yield* TaskRepository;

    yield* repo.deleteTask(userId, taskId);

    log(`Task deleted for user ${req.params.user_id}: ${req.params.task_id}`);

    return res.json({ message: "Task deleted" });
  });
