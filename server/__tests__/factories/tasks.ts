import { Task, Status } from "../../../app/types";

const create = ({
  title = "test",
  description = "Some Description",
  assignedTo = "John",
  category = "test",
  status = Status.pending,
  creationDate = new Date().toISOString(),
  dueDate = "16-Oct-2023",
}: Task): Task => ({
  id: Math.floor(Math.random() * 100),
  title,
  description,
  creationDate,
  dueDate,
  assignedTo,
  category,
  status,
});

export default create;
