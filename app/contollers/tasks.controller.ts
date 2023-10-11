import { Request, Response, Send } from "express";
import { Task } from "../models"
import { Task as ITask } from "../types"

const findAll = (req: Request, res: Response): Response<Send> => {
  try {
    let tasks: ITask[] = [];

    const {
      query: {
        category,
        assignedTo,
      },
    } = req;

    if (category) {
      const whereCondition = (task: ITask) => task.category === category;
      tasks = Task.getTasks(whereCondition) as ITask[];
    } else if (assignedTo) {
      const whereCondition = (task: ITask) => task.assignedTo === assignedTo;
      tasks = Task.getTasks(whereCondition) as ITask[];
    } else {
      tasks = Task.getTasks() as ITask[];
    }

    return res.send({ tasks });
  } catch(error) {
    return res.status(500).send({ error: "Tasks cannot be fetched atm!", details: error });
  }
};

const create = (req: Request, res: Response): Response<Send> => {
  const task = req.body;
  const hasBody = Object.keys(task).length > 0;

  try {
    if (hasBody) {
      const isTaskAdded = Task.addTask(task);

      if (isTaskAdded) return res.status(201).send({ message: "Task has been added" });
      return res.send({ error: "Task has been added." });
    }

    return res.send({ error: "Please provide the contents for task" });
  } catch(error) {
    return res.status(500).send({ error: "Task cannot be added", details: error });
  }
};

const findOne = (req: Request, res: Response): Response<Send> => {
  const {
    params: { id },
  } = req;

  try {
    const task = Task.getTask( Number(id));

    if (task) return res.send({ task });
    return res.status(404).send({ message: "Task not found" });
  } catch (error) {
    return res.status(500).send({ message: "Task cannot be fetched atm", details: error });
  }
};

const update = (req: Request, res: Response): Response<Send> => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const task = Task.getTask(Number(id));

    if (task) {
      return res.send({ message: "Task Updated", task:  Task.updateTask(body) });
    } else {
      return res.send({ message: "Task Not Found" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Task cannot be updated atm!", details: error });
  }
};

const destroy = (req: Request, res: Response): Response<Send> => {
  const {
    params: { id },
  } = req;

  try {
    const deletedTask = Task.deleteTask(Number(id));

    if (deletedTask) return res.status(201).send({ message: "Task deleted Successfully" });
    return res.status(404).send({ message: "Task not found" });
  } catch (error) {
    return res.status(500).send({ message: "Task cannot be deleted atm!", details: error });
  }
};

const reset = (req: Request, res: Response): Response<Send> => {
  Task.reset();
  return res.status(200).send({ message: "Tasks has been reset" });
};

const tasks = {
  create,
  findOne,
  findAll,
  update,
  destroy,
  reset,
};

export default tasks;
