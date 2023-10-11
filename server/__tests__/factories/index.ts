import { Task } from "../../../app/types"
import create from "./tasks";

interface TaskFactory {
  create(task?: Partial<Task>): Task;
}

interface Factories {
  task: TaskFactory;
}

const factories: Factories = {
  task: {
    create,
  },
};

export default factories;
