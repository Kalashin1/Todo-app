# Delete

To delete a todo we are going to create a new controller that will handle that.

```typescript
export const deleteTodo = async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    await Todos.findByIdAndDelete(id);
    return res.json({ status: 'deleted' });
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

```

We get the id of the todo we want to delete from the request parameter, then we call `findByIdAndDelete(id)` and pass in the id of the todo.

```typescript
import { Router } from 'express';
import { 
  makeTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo, // new
} from '../controllers/todo';

const router = Router()

router.post('/todo/', makeTodo);
router.get('/todo', getTodos);
router.get('/todo/:id', getTodo);
router.patch('/todo/:id', updateTodo);
router.delete('/todo/:id', deleteTodo);

export default router;
```

Next thing is to enter out http file and test this endpoint.

```http
###
DELETE http://localhost:3000/todo/6490c7f99aa0309d3bb4c8a7
```

