import Todos from '../models/todos';
import handleError from '../helper';
import { Request, Response } from 'express';

export const makeTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const todo = await Todos.create({ title });
    return res.json(todo);
  } catch (error: any) {
    // * handle errors
    const err = handleError(error)
    res.status(400).json(err);
  }
}

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todos.find({});
    return res.json(todos);
  } catch (error) {
    // * handle errors
    console.log(error);
    res.status(400).json({ error: 'oops something happened' });
  }
}

export const getTodo = async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    const todo = await Todos.findById(id);
    return res.json(todo);
  } catch (error) {
    // * handle errors
    console.log(error);
    res.status(400).json({ error: 'oops something happened' });
  }
}


export const updateTodo = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {title} = req.body;
  try {
    const todo = await Todos.findById(id);
    await todo?.updateOne({ title });
    return res.json({ status: 'updated' })
  } catch (error: any) {
     // * handle errors
     const err = handleError(error)
     res.status(400).json(err);
  }
}

export const deleteTodo = async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    await Todos.findByIdAndDelete(id);
    return res.json({ status: 'deleted' });
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}