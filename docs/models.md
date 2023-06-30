# Mongoose Models - I

A mongoose `model` is just a way of collectively managing `documents` in mongoose, but take that slowly, first the concept of models can be related to the concept of collections of in MongoDB, they are just there to group related documents together. An instance of a `model` is a `Document`.

Models allow you to perform simple CRUD (create, read, update and delete) operations on your database. Let's create our own collection for managing all todos;

```typescript
// ---- src/models/todos.ts

import { model } from 'mongoose';
import TodoSchema from '../schemas/todo';

const Todos = model('todo', TodoSchema);

export default Todos;
```

We import `model` from mongoose, then we import the `TodoSchema` we created in the last lesson, next create a variable named Todos which will store the model for all todos. The value is the result of calling the `model` function we imported from mongoose earlier, this function accepts a couple of arguments, first is a string which is the name for the underlying collection that will be created for documents that belong to this category.

The next argument is an optional `Schema` that will serve as the schema for that collection. Then we export that model by default from the file.