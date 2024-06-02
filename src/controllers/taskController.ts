import { Request, Response } from "express";
import { Effect } from "effect";
import { TaskRepository } from "../services/taskService";

export const createTask = (req: Request, res: Response) =>
  Effect.gen(function* () {
    const repo = yield* TaskRepository;
    const userId = Number(req.params.user_id);
    const { title, description, dueDate, status } = req.body;
    const task = yield* repo.createTask(
      userId,
      title,
      description,
      dueDate,
      status
    );
    res.json(task);
  });

export const getTasks = (req: Request, res: Response) =>
  Effect.gen(function* () {
    const repo = yield* TaskRepository;
    const userId = Number(req.params.user_id);
    const tasks = yield* repo.getTasks(userId);
    res.json(tasks);
  });

export const getTask = (req: Request, res: Response) =>
  Effect.gen(function* () {
    const repo = yield* TaskRepository;
    const userId = Number(req.params.user_id);
    const taskId = Number(req.params.task_id);
    const task = yield* repo.getTask(userId, taskId);
    res.json(task);
  });

export const updateTask = (req: Request, res: Response) =>
  Effect.gen(function* () {
    const repo = yield* TaskRepository;
    const userId = Number(req.params.user_id);
    const taskId = Number(req.params.task_id);
    const { title, description, dueDate, status } = req.body;
    const task = yield* repo.updateTask(
      userId,
      taskId,
      title,
      description,
      dueDate,
      status
    );
    res.json(task);
  });

export const deleteTask = (req: Request, res: Response) =>
  Effect.gen(function* () {
    const repo = yield* TaskRepository;
    const userId = Number(req.params.user_id);
    const taskId = Number(req.params.task_id);
    yield* repo.deleteTask(userId, taskId);
    res.sendStatus(204);
  });
