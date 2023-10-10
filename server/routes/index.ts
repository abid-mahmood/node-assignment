import { Application } from "express";
import { tasks } from "../../app/contollers"

const routes = (app: Application) => {
  app.get("/tasks", tasks.findAll);

  app.post("/tasks", tasks.create);

  app.get("/tasks/:id", tasks.findOne);

  app.put("/tasks/:id", tasks.update);

  app.delete("/tasks/:id", tasks.destroy);
};

export default routes;
