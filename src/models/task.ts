export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "To Do" | "In Progress" | "Done";
  userId: string;
}
