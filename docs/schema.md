# Mongoose Schema

A schema is a serves a way to provide structure to the documents stored inside a collection in MongoDB thus each Schema is mapped to a collection, let's go ahead and define a simple schema for our app.

Create a new folder inside the `src` directory, and give it a name of `schemas` inside this folder create a new typescript file named `todo.ts`.

```javascript
// src/schema/todo.ts
import { Schema } from "mongoose";

const TodoSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title']
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default TodoSchema;
```

Inside this file, import `Schema` from the mongoose library. We create a variable called `TodoSchema` and this variable will store our schema. We set it equal to a new mongoose schema.

The Schema constructor function accepts a couple of arguments, the first is an object that will house the configurations for our schema. Each key declared on this object will be a key on the documents in our collection.

The first key we declare on the object is a title property because we want all our todo to have a small title. The value for each key is a an object which will house the configuration for this key.

The first property is a `type` property which will specify the data type for that key, next property `required` ensures that a value for this key is provided when ever we try to write a new document to the database.

The value we provide for the required property is an array, the first value in this array is a boolean and it should be true, the second value is an error message that will be passed to the error object fired when this value is not provided.

We add another key `completed` which will track the state of the todo, the value for this property is a config object, the type of this key is a boolean, and we use the default property to ensure that all new Todo's added are false by default.

The next argument we pass to the schema constructor function is an optional object that specifies certain extra configuration options for this schema, we add the `timestamps` option which is a boolean and we set it equal to true, to ensure all documents in this collection have a `created_at` and `updated_at` property.

That was a lot, so now let's export this TodoSchema out of this file.