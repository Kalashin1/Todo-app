# Update

Let's add a controller for updating todos, say we gave them a wrong title and we also want to mark them as completed. Let's see how we can update the title property first. 

Open your todo controller file and let's add a new async function called `updateTodo`, inside this function, we destructure the `id` property from the request params. Next we also get destructure the title from the request body. We use a try/catch block and inside the catch block we use the `errorHandler` function to mop up our errors and send them back, inside the catch block

```typescript
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

```

Inside the catch block we handle our errors and send them back to the client, in the try catch block we get the todo we want to edit by it's ID then we update the todo and send back a response with a status property that reads `updated`.

```typescript
import { 
  updateTodo,
} from '../controllers/todo';

router.patch('/todo/:id', updateTodo);
```

We import the newly created controller inside the router file and create a new patch route handler. The method for this request is patch while the route is `/todo/:id` we pass the todo controller we imported as the handler for that route. Let's test this route.


```http
PATCH http://localhost:3000/todo/6490c7f99aa0309d3bb4c8a7
Content-Type: application/json

{
  "title": "Jogging"
}
```

Using the above snippet to the test the endpoint with the id of the todo we want to create and the new title for that todo, the response we get back is as follows;

```json
{
  "status": "updated"
}
```