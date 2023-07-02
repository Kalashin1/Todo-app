import { Schema } from "mongoose";
import { TODO_STATUS } from "../helper";
import { Todo } from "../types";

const TodoSchema = new Schema<Todo>({
  title: {
    type: String,
    required: [true, 'Please provide a title']
  },
  completed: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: TODO_STATUS[0]
  }
}, {
  timestamps: true
});

export default TodoSchema;