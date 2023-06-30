# Controllers

A controller is part of an MVC approach to building applications, the C stands for controllers. Inside of our controllers we define functions that will serve as route handlers. Each time a particular server route is matched, the appropriate controller responsible for that route will be called. Let's go ahead and define a simple controller function that will handle creating new todos.

Create a new folder inside `src` named `controller` and inside this folder create a new file named `todos.ts`.


```typescript
// src/controllers/todos.ts

import Todos from '../models/todos';
import { Request, Response } from 'express';

export const makeTodo = async (req: Request, res: Response) => {
  const {title} = req.params;
  try {
    const todo = Todos.create({title});
    return res.json(todo);
  } catch (error) {
    // handle errors
    console.log(error)
    res.status(400).json({error: 'oops something happened'})
  }
}
```

First we import the `Todos` model into our controller, next we create a variable `makeTodo` that will handle the process of creating a new todo. We set it equal to an async function. This function accepts two parameters, first is the request object, we import `Request` and `Response` interface from express.

We strongly type the parameters with this interfaces we just imported to get nice auto-complete. `req` is of type `Request` while `res` is of type `Response`.

We obtain the title from the req.params, we then use a `try-catch` block to handle the next process. Inside the catch block is where we would handle errors, for now we just log the error out to the console, then we notify the client that there's an error using setting the status of the request to be 400 and sending an error message.

Inside the try block we create a variable named `todo` which represents an instance of a todo, we set this variable to be equal to a new Todo by calling `Todos.create`, this create method exists on the model and it's one of the ways of creating a new document, it accepts an object as the parameter, the object usually contains key value pairs we want on the document. The object here only has one property which is a title property.

We just send that todo back to the client and lastly we export this function from this file.