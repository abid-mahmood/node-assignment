import { Task as ITask } from "../types"

class Task {
  static tasks: ITask[] = [];

  static addTask(task: ITask): boolean {
    this.tasks.push(task);

    return true;
  }

  static getTask(taskId: number): ITask | {} {
    const task = this.tasks.find((task: ITask) => task.id === taskId);
    return task || {};
  }

  static deleteTask(taskId: number): boolean {
    const task = this.tasks.find((task: ITask) => task.id === taskId);

    if (task) return true;
    return false;
  }

  static getTasks(whereCondition?: (task: ITask) => {}): ITask[] {
    return whereCondition
      ? this.tasks.filter(whereCondition)
      : this.tasks;
  }

  static updateTask(task: ITask): ITask {
    this.tasks = this.tasks.map((currentTask: ITask) => {
      if (Number(currentTask.id) === Number(task.id)) {
        const updatedTask = {
          ...currentTask,
          ...task,
        };

        return updatedTask;
      } else {
        return currentTask;
      }
    });

    return task;
  }
}

export default Task;
