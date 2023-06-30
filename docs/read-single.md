# Read Single File

Let's see how we can read a single document using it's `ID`. 

```typescript
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
```

Open up your controller file at `src/controllers/todos.ts` let's add a new async function. First we create and export a variable `getTodo` which houses the function for retrieving a todo. We accept the request and response object. 

Inside the function we use the `try/catch` syntax again, let's copy the catch block we used for the most recent function, and paste that in the catch block for this function. Outside the `try/catch` block we get the `ID` of the todo from the request parameters and In the try block first we create a variable `todo` which will store the found todo. Then we call `Todos.findById(id)` and we pass in that id we got from the request parameters to it, then we return the found todo back to the user.

```typescript
import { Router } from 'express';
import { makeTodo, getTodos, getTodo } from '../controllers/todo';

const router = Router()

router.post('/todo/', makeTodo);
router.get('/todo', getTodos);
router.get('/todo/:id', getTodo);

export default router;
```

Let's open up our router file and let's add a route for this handler function, first we import the `getTodo` function from the todo controller, then we register a `GET` request on the router object, the route for this get request will be `/todo/:id` and `id` is a route parameter which represents the ID of the todo we want to fetch, then we pass in the `getTodo` function as the handler for this route.

```curl
GET http://localhost:3000/todo/6496900124a94d5346c9820c
```

Let's test this, we start up our local server using `npm run dev` and open the http file, we add a new line after the last request, add three `###` then we can add a new request. First let's get all the todos in the database so we can grab an ID of a todo we want to fetch. I'm going to click on send request to get all todos, then let's add the new request right under the `#`.

The method for this request is `GET` and the endpoint is `http://localhost:3000/todo/6496900124a94d5346c9820c` we copy the id of one of the todos and attach it to the endpoint, remember we are trying to fetch this todo from the database. We click on Send Request and we get back that todo with the ID we just passed in.