import { Request, Response, Router } from "express";
import { getClient } from "../prisma/client";
import { CreateNoteRequest } from "./models/requests/CreateNoteRequest";

const router = Router();

router.post("/", async (req: Request<CreateNoteRequest>, res: Response) => {
  try {
    const client = getClient();
    const { title, text, userId } = req.body;
    const note = await client.notes.create({
      data: {
        title,
        text,
        userId,
      },
    });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Error creating note" });
  }
});

export default router;
