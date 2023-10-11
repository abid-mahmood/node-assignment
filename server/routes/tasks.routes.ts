import { Application } from "express";
import { tasks } from "../../app/contollers"

const tasksRoutes = (app: Application) => {
  app.get("/tasks", tasks.findAll);

  app.post("/tasks", tasks.create);

  app.get("/tasks/:id", tasks.findOne);

  app.put("/tasks/:id", tasks.update);

  app.delete("/tasks/:id", tasks.destroy);

  app.delete("/tasks/reset/all", tasks.reset); // For Testing purposes
};

export default tasksRoutes;
