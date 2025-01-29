// filepath: /home/tyler/Documents/programming/bunExpress/routes/notes/get.ts
import type { PrismaClient } from "@prisma/client/extension";
import type { Request, Response } from "express";
import { Router } from "express";
import type { GetByIdRequest } from "../models/requests/getById";
import { getClient } from "../prisma/client";

const router = Router();

router.get("/:id", async (req: Request<GetByIdRequest>, res: Response) => {
  let client: PrismaClient;
  try {
    client = getClient();
    const id = req.params.id;
    const note = await client.notes.findUnique({
      where: { Id: id },
    });
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ error: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving notes" });
  } finally {
    client?.$disconnect();
  }
});

export default router;
