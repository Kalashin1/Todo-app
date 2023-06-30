# Read MongoDB documents with Mongoose

We need to edit our package json file to add a new script, open your package json file and add the following script to it.

```json
/* package.json */
{
  "compile-dev": "tsc --w"
}
```

This script will be used to compile our app in watch mode so that when we make changes to the app source code, Typescript will automatically compile our Typescript file to Javascript. 

Next open up your controller file inside `src/controllers/todos.ts`, let's edit the previous controller we added for creating todos. We are going to change where we get the title property from, instead of getting it from request parameter, we are going to get it from the request body, thus your file should look like this.

```typescript
// src/controller/todos.ts

export const makeTodo = async (req: Request, res: Response) => {
  const { title } = req.body ;
  try {
    const todo = await Todos.create({ title });
    return res.json(todo);
  } catch (error: any) {
    // * handle errors
    const err = handleError(error)
    res.status(400).json(err);
  }
}
```

Open up your router file, since we are not getting the title from the request parameter again we don't need to add a parameter in the route, thus our route will now be `/todos/` instead of `/todos/:title`.


```typescript
import { Router } from 'express';
import {makeTodo} from '../controllers/todo';

const router = Router()

router.post('/todo/', makeTodo);

export default router;
```

Next open up the `index.ts` file in the `src` directory which is the entry point for all our typescript file, we will add a new middleware to the file. Since we are expecting information on the request body we need to parse the request data so we can get access to it on `request.body`. We can use `express.json()` method to achieve this.

```typescript
import  mongoose from 'mongoose';
import express from 'express';
import router from './router/router';

const app = express();
app.use(express.json()); // new middleware
app.use(router);

const main = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/todo');
  console.log('Connected');
};

main().then(() => {
  app.listen(3000, () => console.log(`App running on PORT 3000`));
}).catch(error => {
  console.log(error);
});
```

Now we can compile our app in watch mode by running the compile-dev script we created earlier.  We can see that our app is now being compiled in watch mode. Let's create a new terminal in vscode and run our app.

```http
POST http://localhost:3000/todo/
Content-Type: application/json

{
  "title": "Cooking"
}

```

Open our `.http` file we've been using to test this server, give our todo a new name, I'm going to call this one `Cooking` and send a request, we should see that newly created todo.

```http
POST http://localhost:3000/todo/
Content-Type: application/json

{
  "title": "Cleaning"
}

```

Let's Change the title again, this time to `Cleaning`, send the request again, you should see a new todo created for you with it's name is cleaning.


Now open the controller file again let's export a new variable from it, this variable is called `getTodos` and it's value is an async function, we accept the request object and the response object as parameters. Inside the function we use the `try/catch` syntax. We copy the previous catch block we used for the `makeTodo` function and paste it into this `getTodos` function. Inside the catch block we get all todos we've created by calling the `Todos.find` method, this function accepts an object as it's argument, the properties on this object will be used as filter to retrieve the documents in this collection.

```typescript
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
```

Since we want to retrieve all the documents in the collection we are going to pass in an empty object, then we return the result we get back from calling this method, which is the value stored inside the `todos` variable.

```http
POST http://localhost:3000/todo/
Content-Type: application/json

{
  "title": "Piano Class"
}

###

```

Open up your `http` file again skip a line and add three `###` this gives us room to add another request, before we add that request, let's visit our router file to import the newly created handler function and specify a route for this function. Import the `getTodos` function we created from the `controllers/todos` file, next add a get method to the router object and the route for this controller will be `/todo` then we pass in the `getTodos` function as the handler for this route.

```typescript
import { Router } from 'express';
import { makeTodo, getTodos } from '../controllers/todo';

const router = Router()

router.post('/todo/', makeTodo);
router.get('/todo', getTodos);

export default router;
```

Now open your http file let's add that request, method for this request is going to be `GET` and the endpoint is going to be `http://localhost:3000/todo`, click on send request and we get back all the todos that we've created 

```curl
GET http://localhost:3000/todo
```