// filepath: /home/tyler/Documents/programming/bunExpress/routes/notes/get.ts
import type { PrismaClient } from "@prisma/client/extension";
import type { Request, Response } from "express";
import { Router } from "express";
import type { GetByIdRequest } from "../models/requests/getById";
import { getClient } from "../prisma/client";

const router = Router();

// Swagger definition
/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get a note by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the note to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       404:
 *         description: Note not found
 *       500:
 *         description: Error retrieving notes
 */
router.get("/:id", async (req: Request<GetByIdRequest>, res: Response) => {
  let client: PrismaClient;
  try {
    client = await getClient();
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

