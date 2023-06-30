# REST Client

We will proceed to testing our application, to do that we need to install a VS Code extension that will help us with that, the name of the extension is `REST CLIENT`. Open your extension tab in VS Code, search for the extension.

This will be the first in the result, click on it and install that extension, when your'e done, reload your VS Code. Create a New file at the root of the project, that file should have a `.http` extension.

Our tests for our endpoint will go inside this file, now you might ask yourself why we are using this approach? Normally we could use Postman for that, but why should we have to leave our development environment, that is VS Code?

REST CLIENT enables us to test our http endpoints from inside VS Code, now let's write our first test. Inside your `.http` file, First you need to declare the method you want for the request you want to make, and in this case it is a `POST` request.

Next comes the endpoint you want to make the call to, and in this instance we are making the request to `http://localhost:3000/todo/Laundry`. Remember when we created the handler function for this route in our todo app the title of the todo will be passed as a route parameter. Later we'll update this.

```http
POST http://localhost:3000/todo/Laundry

```

Now let's open up our VS Code terminal using `CTRL` + `SHIFT` + `backtick`, first to get our MongoDB database up and running we navigate to the folder our mongoDB instance is stored in and run the `mongod` command to get our database up and running.

Open up a second terminal in VS Code and run the app using `npm run dev`, once our app is up and running, open up you will see a small text right above your first test that reads `Send Request`, click that button to make a request to our app.

You will see the result in the right window of your app, you will see the headers returned from the response along with the response body, and here we get an empty object, interesting. Let's inspect our MongoDB database to be sure that a document was created for us.

If you have the MongoDB VS Code extension open it otherwise visit the extension tab and install it, next add a connection to your MongoDB database, I've already done that before now let's select our database which is todo, click on it to reveal the collections inside it. It has only one which is `todos` that mongoose created for us.

Open that collection and you'll find that it has only one document inside, Click on the `Documents` to reveal that document, click on the `ID` of the document and it will open up in VS Code as a JSON document we can view.

```json
{
  "_id": {
    "$oid": "6490c7f99aa0309d3bb4c8a7"
  },
  "title": "Laundry",
  "completed": false,
  "createdAt": {
    "$date": "2023-06-19T21:26:17.486Z"
  },
  "updatedAt": {
    "$date": "2023-06-19T21:26:17.486Z"
  },
  "__v": 0
}
```

Now let's address why we got a back en empty object in our response body, open up your controller file `src/controllers/todo.ts` go to line 7, calling the `create` method on a mongoose model returns a promise and we forgot to use the `await` keyword on it to get the response from that promise. Now let's add the `await` keyword in before we call `Todos.create()`.

Go back to your terminal, terminate the running instance using `CTRL` + `C` then compile our app back to Javascript. When that's done, run the application again;

```bash
$ npm run dev
```

Once our app is up and running, open your `.http` file again and send another request, this time we get back the correct response body which is the newly created TODO.