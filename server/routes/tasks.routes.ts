import { Application } from "express";
import { tasks } from "../../app/contollers";

// import auth from "../../middleware/auth";

const tasksRoutes = (app: Application) => {
  app.get("/tasks", tasks.findAll);

  // app.get("/tasks", auth, tasks.findAll); route needs authentication

  app.post("/tasks", tasks.create);

  app.get("/tasks/:id", tasks.findOne);

  app.put("/tasks/:id", tasks.update);

  app.delete("/tasks/:id", tasks.destroy);

  app.delete("/tasks/reset/all", tasks.reset); // For Testing purposes
};

export default tasksRoutes;
