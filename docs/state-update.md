# State Update

To update the state of the todo, we extract the status from the request body, this status will be an integer that will update the state of todo.

```typescript
export const updateTodo = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {title, status} = req.body; // new
  try {
    const todo = await Todos.findById(id);
    if((status) && (!TODO_STATUS[status])) throw Error('Invalid todo status')
    await todo?.updateOne({ 
      title, 
      status: TODO_STATUS[status],
      completed: status <= 0 ? false: true
    });
    return res.json({ status: 'updated' })
  } catch (error: any) {
     // * handle errors
     const err = handleError(error)
     res.status(400).json(err);
  }
}
```

Let's export a `TODO_STATUS` which is an array that contains two string, the first `PENDING` represents the uncompleted state of the todo, whereas the second `COMPLETED` represents the completed state of the todo.

```typescript
// src/helper

export const TODO_STATUS = ['PENDING', 'COMPLETED'];
```

Now we need to update the schema of the todo to accommodate for new changes.

```typescript
// src/models/schemas/todo.ts

import { Schema } from "mongoose";
import { TODO_STATUS } from "../helper";

const TodoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title']
  },
  completed: {
    type: Boolean,
    default: false
  },
  status: { // new
    type: String,
    default: TODO_STATUS[0]
  }
}, {
  timestamps: true
});

export default TodoSchema;
```

We have added a new property on the todo, this property is a status property which is a string, the default value for this string if none is provided is `PENDING` so all new todo will be pending by default except we update the status.


Back inside our controller we check if the status is provided and if the the value provided for the status is not inside the `TODO_STATUS` array then we throw an error notifying the user that the status provided is invalid. 

However if everything is fine then we update the state of the todo and update the user that the todo has been updated.

```javascript
export const updateTodo = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {title, status} = req.body; // new
  try {
    const todo = await Todos.findById(id);
    if((status) && (!TODO_STATUS[status])) throw Error('Invalid todo status')
    await todo?.updateOne({ 
      title, 
      status: TODO_STATUS[status],
      completed: status <= 0 ? false: true
    });
    return res.json({ status: 'updated' })
  } catch (error: any) {
     // * handle errors
     const err = handleError(error)
     res.status(400).json(err);
  }
}
```

Let's write the http test for this endpoint, remember that we already have a route for this.

```http
PATCH http://localhost:3000/todo/649ef6c66e6f87f4a613fd9c
Content-Type: application/json

{
  "status": 1
}
```