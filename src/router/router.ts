import { Router } from 'express';
import { 
  makeTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,getTodoByStatus
} from '../controllers/todo';

const router = Router()

router.post('/todo/', makeTodo);
router.get('/todo', getTodos);
router.get('/todo/:id', getTodo);
router.patch('/todo/:id', updateTodo);
router.delete('/todo/:id', deleteTodo);
router.get('/todo/get/status', getTodoByStatus);

export default router;