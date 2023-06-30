# Routers

A router is an object that allows us to map urls to a controller, a URL is usually a backend route in our application. We are going to create a stand alone modular router using the express router. Let's see how we can do that;

```typescript
// src/router/router.ts

import { Router } from 'express';
import { makeTodo } from '../controllers/todo';

const router = Router()

router.post('/todo/:title', makeTodo);

export default router;
```

Create a folder name `router` inside of the `src` directory, then create a file named `router.ts` inside of that folder. 

Next we import the `Router` object from express, then we import the `makeTodo` controller into our router file.

Next we store the result of calling the `Router` object inside a variable named `router`. Then we can begin to add our routes to this router object.

The first route we add is a post method handler, the first argument we pass to this function is a string that will serve as the route to match, the value of that string is `/todo/:title` we did this because inside of the controller file we got the title of the todo from the route params and this is the syntax for defining routes with params.

next we just pass the controller function as the second argument to this method. We then export the router by default from the file.

```typescript
// src/index.ts

import  mongoose from 'mongoose';
import express from 'express';
import router from './router/router';

const app = express();
app.use(router); // new

const main = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/todo');
  console.log('Connected');
};

main().then(() => {
  app.listen(3000, () => console.log(`App running on PORT 3000`));
}).catch(error => {
  console.log(error);
})
```
Open up the `index.ts` file import the router we just created and use the router as a middleware in your application.