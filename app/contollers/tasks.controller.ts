import { Request, Response } from "express";
import { Task } from "../models"
import { Task as ITask } from "../types"

const findAll = (req: Request, res: Response) => {
  try {
    let tasks: ITask[] = [];
    const { query: { category } } = req;

    if (category) {
      const whereCondition = (task: ITask) => task.category === category;
      tasks = Task.getTasks(whereCondition);
    } else {
      tasks = Task.getTasks();
    }

    return res.send({ tasks });
  } catch(error) {
    return res.send({ error: "Tasks cannot be fetched atm!", details: error });
  }
};

const create = (req: Request, res: Response) => {
  const task = req.body;

  try {
    const isTaskAdded = Task.addTask(task);

    if (isTaskAdded) return res.send({ message: "Task has been added" })
    return res.send({ error: "Task has been added." })
  } catch(error) {
    return res.send({ error: "Task cannot be added", details: error });
  }
};

const findOne = (req: Request, res: Response) => {};

const update = (req: Request, res: Response) => {
  try {
    const { params: { id }, body } = req;
    const task = Task.getTask(Number(id));

    if (task) {
      const updatedTask = Task.updateTask(body);
      return res.send({ message: "Task Updated", yasl: updatedTask });
    } else {
      return res.send({ message: "Task Not Found" });
    }
  } catch (error) {
    return res.send({ error: "Task cannot be updated atm!", details: error });
  }
};

const destroy = (req: Request, res: Response) => {};

const tasks = {
  create,
  findOne,
  findAll,
  update,
  destroy
};

export default tasks;
