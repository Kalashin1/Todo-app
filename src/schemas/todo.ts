import { Schema } from "mongoose";

const TodoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title']
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default TodoSchema;