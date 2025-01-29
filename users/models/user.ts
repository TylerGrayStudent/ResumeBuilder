import type { Note } from "../../notes/models/note";
import type { UserDetails } from "./userDetails";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  notes: Note[];
  userDetails: UserDetails;
}
