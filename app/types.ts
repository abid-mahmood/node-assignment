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

export {
  Task,
}
