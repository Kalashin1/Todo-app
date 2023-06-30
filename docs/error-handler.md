# Error Handler

Let's define an error handler we'll use for our controller when trying to create a new todo. Let's create a new file named `helper.ts`, this module will contain our error-handler function and some other helper functions we might need through out the program.

```typescript
// /src/helper.ts

import {Error} from 'mongoose';

export default function errorHandler (err: Error.ValidationError) {
  const errors: Partial<Record<string|number, {}>> = {};

  if (err.message.includes('todo validation failed')) {
    Object.values(err.errors).forEach((error) => {
      if('properties' in error && error.properties.path) {
        errors[error.properties.path] = error.message
      }
    })
  }

  return errors;
}
```

We'll export a function `errorHandler` which will accept an error `err` object as a parameter, for now we'll specify the type for this `err` to be `any`, import `{Error}` from `mongoose` and set the type for `error` to be `Error.ValidationError`, this type matches the type of error that mongoose will throw if the object we are passing to the `Todos.create` method is valid according to the schema which we defined for the collection.

Next we create an object `errors`, the type of this object is a `Partial` of a `Record` that contain string or numbers as keys and any other type as values for the keys. For now it's value is going to be an empty object. We check the `message` property on the `err` object to see if it includes the words `todos validation failed` which will be part of the error message thrown when our schema validation fails. If it does then we use `Object.values` on the `errors` property on the `err` object to get an array  the specific type of validation error that was thrown, we use the `forEach` method on the array returned, for each error we check if the error has a property; `properties` and also check if the properties object contains a path property and if all those checks are passed we use the path as a key on the `errors` object we created earlier then it's value is equal to the message on the error finally we return the `errors` object from the `errorHandler` function.

```typescript
import Todos from '../models/todos';
import handleError from '../helper'; // new
import { Request, Response } from 'express';

export const makeTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const todo = await Todos.create({ title });
    return res.json(todo);
  } catch (error: any) {
    // * handle errors
    const err = handleError(error) // new
    res.status(400).json(err);
  }
}
```

Import the `errorHandler` function from the `helper` file. Inside the catch block we use the function to handle the error and return it to the client, now we'll a more descriptive error message back. Open `test.http` and try creating a new todo again, ensure you update the json payload and change the `title` property to something else, and make a request again.

```http
POST http://localhost:3000/todo/
Content-Type: application/json

{
  "tile": "Piano Class"
}

###
```

You should get a json response that look like this;

```json
{ 
  "title": "Please provide a title"
}
```

Now that's your error taken care of.