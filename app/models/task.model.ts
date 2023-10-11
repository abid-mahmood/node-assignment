import { Task as ITask, TaskAction } from "../types"

class Task {
  private static tasks: ITask[] = [];

  static addTask(task: ITask): TaskAction {
    this.tasks.push({ ...task });

    return true;
  }

  static getTasks(whereCondition?: (task: ITask) => void): TaskAction {
    return whereCondition
      ? this.tasks.filter(whereCondition)
      : this.tasks;
  }

  static getTask(taskId: number): TaskAction {
    return this.tasks.find((task: ITask) => task.id === taskId) || null;
  }

  static updateTask(task: ITask): TaskAction {
    let updatedTask: ITask = task;

    this.tasks = this.tasks.map((currentTask: ITask) => {
      if (Number(currentTask.id) === Number(task.id)) {
        updatedTask = {
          ...currentTask,
          ...task,
        };

        return updatedTask;
      } else {
        return currentTask;
      }
    });

    return updatedTask;
  }

  static deleteTask(taskId: number): TaskAction {
    const updatedTasks = this.tasks.filter((task: ITask) => task.id !== taskId);

    if (updatedTasks.length !== this.tasks.length) {
      this.tasks = updatedTasks;
      return true;
    }
    return false;
  }

  static reset() {
    this.tasks = [];
  }
}

export default Task;
