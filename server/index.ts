import express, { Application } from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import { tasksRoutes } from "./routes"

dotenv.config();

const app: Application = express();

app.use(bodyParser.json());

tasksRoutes(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
