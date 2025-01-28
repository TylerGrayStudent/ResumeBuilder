import type { Request, Response } from "express";
import express from "express";
import notesRoute from "./notes/routes";
import { setupSwagger } from "./swagger";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/notes", notesRoute);

// Swagger
setupSwagger(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

