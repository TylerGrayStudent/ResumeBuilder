export interface Note {
  id: string;
  title: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
  completedAt: Date;
  userId: string;
}
