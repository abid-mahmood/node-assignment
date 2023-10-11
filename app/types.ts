enum Status {
  pending = "Pending",
  completed = "Completed"
}

interface Task {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  dueDate: string;
  assignedTo: string;
  category: string;
  status: Status;
}

type GetTask = Task | null;
type AddTask = boolean;
type DeleteTask = boolean;
type GetTasks = Task[];
type UpdateTask = Task;

type TaskAction =
    GetTask
  | AddTask
  | DeleteTask
  | GetTasks
  | UpdateTask;

export {
  Task,
  TaskAction,
  Status,
}
