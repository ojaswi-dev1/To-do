export type Task = {
  id: string;
  description: string;
  dueDate: Date | null;
  completed: boolean;
  createdAt: Date;
};
