
export enum Status {
  ToDo = 'To-do',
  InProgress = 'In Progress',
  Done = 'Done',
}

export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  tags: string[];
  createdAt: string;
  completedAt?: string;
}
