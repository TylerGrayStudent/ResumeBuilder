/**
 * @swagger
 * components:
 *  schemas:
 *   CreateNoteRequest:
 *    type: object
 *   properties:
 *   content:
 *   type: string
 *  description: The content of the note
 * example:
 * content: "This is a note"
 *
 */

export interface CreateNoteRequest {
  content: string;
}

