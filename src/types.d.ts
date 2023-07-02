import { Document, Model } from "mongoose";

export interface Todo extends Document {
  title: string;
  completed: boolean;
  status?: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  updateSelf: ({ title: string, status: number}) => Promise<void>
}

export interface Todos extends Model<Todo> {
  filterTodo: ({ limit: number, status: number}) => Promise<Todo[]>
}