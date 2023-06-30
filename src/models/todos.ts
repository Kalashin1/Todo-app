import { model } from 'mongoose';
import TodoSchema from '../schemas/todo';

const Todos = model('todo', TodoSchema);

export default Todos;