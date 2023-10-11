import request from "supertest";
import app from "../../index";
import factories from "../factories"

describe("Task Creation", () => {
  afterEach(async () => {
    await request(app).delete("/tasks/reset/all");
  });

  it("returns the error if no data found in the request", async () => {
    const res = await request(app).post("/tasks");
    expect(res.body).toEqual({ error: "Please provide the contents for task" });
  });

  it("successfully adds the task to the array", async () => {
    const { task: taskFactory } = factories;

    const task = taskFactory.create({ title: "Do XYZ" });

    const res = await request(app).post("/tasks").send({ task });
    expect(res.body).toEqual({ message: "Task has been added" });
  });
});

describe("Task Fetch", () => {
  afterEach(async () => {
    await request(app).delete("/tasks/reset/all");
  });

  it("successfully fetches all the tasks", async () => {
    const { task: taskFactory } = factories;

    const task1 = taskFactory.create({ title: "Do XYZ" });
    const task2 = taskFactory.create({ title: "Do ABC" });

    await request(app).post("/tasks").send({ task1 });
    await request(app).post("/tasks").send({ task2 });

    const res = await request(app).get("/tasks");

    expect(res.body.tasks).toHaveLength(2);
  });

  it("successfully fetches a task with the ID", async () => {
    const { task: taskFactory } = factories;

    const task1 = taskFactory.create({ title: "Do XYZ" });
    const task2 = taskFactory.create({ title: "Do ABC" });

    await request(app).post("/tasks").send({ ...task1 });
    await request(app).post("/tasks").send({ ...task2 });

    const res = await request(app).get(`/tasks/${task1.id}`);

    expect(res.body.task.id).toEqual(task1.id);
  });

  it("returns error if no task found with an ID", async () => {
    const res = await request(app).get(`/tasks/20`);

    expect(res.body.message).toEqual("Task not found");
  });

  it("successfully fetches all the tasks provided the category", async () => {
    const { task: taskFactory } = factories;

    const task1 = taskFactory.create({ title: "Do XYZ", category: "products" });
    const task2 = taskFactory.create({ title: "Do ABC", category: "products" });
    const task3 = taskFactory.create({ title: "Do ABC", category: "vendor" });

    await request(app).post("/tasks").send({ ...task1 });
    await request(app).post("/tasks").send({ ...task2 });
    await request(app).post("/tasks").send({ ...task3 });

    const res = await request(app).get(`/tasks?category=products`);

    expect(res.body.tasks).toHaveLength(2);
  });

  it("successfully fetches all the tasks provided the assignedTo", async () => {
    const { task: taskFactory } = factories;

    const task1 = taskFactory.create({ title: "Do XYZ", assignedTo: "Abid" });
    const task2 = taskFactory.create({ title: "Do ABC", assignedTo: "John Doe" });
    const task3 = taskFactory.create({ title: "Do DEF", assignedTo: "Abid" });

    await request(app).post("/tasks").send({ ...task1 });
    await request(app).post("/tasks").send({ ...task2 });
    await request(app).post("/tasks").send({ ...task3 });

    const res = await request(app).get(`/tasks?assignedTo=Abid`);

    expect(res.body.tasks).toHaveLength(2);
  });
});

describe("Task Update", () => {
  afterEach(async () => {
    await request(app).delete("/tasks/reset/all");
  });

  it("returns error if no task found", async () => {
    const res = await request(app).put(`/tasks/12`).send({});

    expect(res.body.message).toEqual("Task Not Found");
  });

  it("successfully updates the task", async () => {
    const { task: taskFactory } = factories;

    const task1 = taskFactory.create({ title: "Do XYZ", category: "products" });
    const task2 = taskFactory.create({ title: "Do ABC", category: "products" });

    await request(app).post("/tasks").send({ ...task1 });
    await request(app).post("/tasks").send({ ...task2 });

    const updateTask = {
      title: "Updated Title",
    };

    const res = await request(app).put(`/tasks/${task1.id}`).send({ ...updateTask });

    expect(res.body.task.title).toEqual("Updated Title");
  });

  describe("Task Delete", () => {
    afterEach(async () => {
      await request(app).delete("/tasks/reset/all");
    });

    it("returns error message if task not found with ID", async () => {
      const res = await request(app).delete(`/tasks/30`);

      expect(res.body.message).toEqual("Task not found");
    });

    it("successfully deletes the task", async () => {
      const { task: taskFactory } = factories;

      const task1 = taskFactory.create({ title: "Do XYZ", category: "products" });
      const task2 = taskFactory.create({ title: "Do ABC", category: "products" });

      await request(app).post("/tasks").send({ ...task1 });
      await request(app).post("/tasks").send({ ...task2 });

      const res = await request(app).delete(`/tasks/${task1.id}`);
      const getTasks = await request(app).get("/tasks");

      expect(res.body.message).toEqual("Task deleted Successfully");
      expect(getTasks.body.tasks).toHaveLength(1);
    });
  });
})
