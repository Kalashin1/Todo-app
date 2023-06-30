import { Router } from 'express';
import { 
  makeTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todo';

const router = Router()

router.post('/todo/', makeTodo);
router.get('/todo', getTodos);
router.get('/todo/:id', getTodo);
router.patch('/todo/:id', updateTodo);
router.delete('/todo/:id', deleteTodo);

export default router;