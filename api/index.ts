import type { Request, Response } from "express";
import express from "express";
import notesRoute from "./notes/routes";
import { setupSwagger } from "./swagger";
import userRoutes from "./users/routes";

const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/notes", notesRoute);
app.use("/users", userRoutes);

// Swagger
setupSwagger(app);

app.listen(port, () => {
  console.log("Server is running on port 3000");
});

