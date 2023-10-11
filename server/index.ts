import express, { Application } from "express";
import bodyParser from "body-parser";
import { tasksRoutes } from "./routes"

const app: Application = express();

app.use(bodyParser.json());

tasksRoutes(app);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
