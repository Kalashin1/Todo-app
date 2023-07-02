import { model } from 'mongoose';
import { TODO_STATUS } from '../helper';
import TodoSchema from '../schemas/todo';
import {Todo, Todos} from '../types'

TodoSchema.statics.filterTodo = async function ({
  limit = 5,
  status = 0
}: {
  limit?: number;
  status: number
}) {
  const todos = this
    .find()
    .where({
      completed: status > 0 ? true: false
    })
    .sort({
      'createdAt': 'desc'
    })
    .limit(limit);
    return todos.exec();
}

TodoSchema.methods.updateSelf = async function({
  title,
  status
}: {
  title: string;
  status: number
}){
  if ((status) && (!TODO_STATUS[status])) throw Error('Invalid todo status')
  await this.updateOne({
    title,
    status: TODO_STATUS[status],
    completed: status && status <= 0 ? false : true
  });
}


const Todos = model<Todo, Todos>('todo', TodoSchema);

export default Todos;