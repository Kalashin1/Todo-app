# Setting up a NodeJS app with MongoDB.

You have to ensure that you have NodeJS installed on your computer, if not you can visit the [NodeJS](https://nodejs.org) to download and install the latest version of NodeJS.

Open a command prompt, navigate to the folder you want to create your project in, use the mkdir command to create a folder named todo-app, cd into that newly created folder. use `code .` to open up VSCode inside that project directory.

Use `CTRL` + `SHIFT` + backticks to open up a terminal in VSCode, close the first terminal we opened outside VSCode, then enter the following command to start a new NodeJS project.

```bash
$ npm init --y
```

NodeJS will create a package.json file for us which to keep track of our application dependencies.

Next we install typescript using the following command, 

```bash
$ npm i typescript
```

To install the typescript compiler into our project, once that's done you have to install mongoose and express using the following command.

```bash 
$ npm i mongoose express
```

With those dependencies installed we need to install some dev dependencies to make our experience with typescript to be fun. run the following command 

```bash
$ npm i -D @types/node @types/mongoose @types/express
```

We are done with the installations for now, next thing we need to do is to generate a tsconfig.json file, this file houses the configurations for the typescript compiler with the following command

```bash
$ tsc --init
```

Typescript will auto generate the tsconfig file for us, open it and go to line 27 where the key reads module change the value for that key from `commonjs` to `nodenext`. 

Next go to line 29 that has the key of `moduleResolution` change the value for that key from `node` to `nodenext`. The two configurations we just did we allow us to use the `import statement` inside a NodeJS project instead of the require syntax.

Go to line 28 find the key of `rootDir` and change the value for this key, from the root level for this folder to src folder inside this project. This command sets the directory the typescript compiler will start reading our typescript file from.

Go to line 50 find the key of `outDir` and change the value for this key to the app folder, this command specifies the folder where the typescript compiler will output it's Javascript bundles.

Now we are done with all the configurations we can start writing code, I knew you couldn't wait.

Open up the src folder and create a new Typescript file with the name of `index.ts`. Next you import mongoose from the mongoose library and then import express form it's own library too.

Create an express app by calling the express function, and storing the result inside a variable named app. We then define a function called `main`, this function is an async function and inside it we await the result of calling the `mongoose.connect` method this method accepts a parameter which is the connection string for the mongoDB database.

We call the main function and chain the `.then` method to the result since it is a promise, inside the callback function we provide to main then method we create an express server by calling `app.listen` and passing in `3000` as the port for our server to listen on, the callback function we provide to the listen method just logs out a message to the console which reads `App is running on PORT 3000`.

Next we chain the `catch` method to the `then` method as we do when using the then and catch syntax for promises, inside this method we just log out any errors encountered while trying to connect to the database or while trying to set our server up and running. 

The benefit of this approach is that we ensure that there is a successful and open connection to the database first before our server starts running to ensure that all database read and write operations are made to a connected database

Next we jump back to the `main` function we defined above and we just log out `connected` to the console to notify us of when there's a successful database connection, if there are any errors while trying to connect to the database the catch block will handle that error.

Okay, some more configuration again, I know you don't like configurations, I also don't like it but let's do it one more time. open up your `package.json` file and add the following scripts to the script property, the first script is called `compile` and this script compiles our Typescript code into Javascript. The next script `dev` executes the compiled Javascript file.

To get our app up and running, run;

```bash
$ npm run compile
```

Once typescript is done with compiling the file for us, we can see the generated Javascript file inside the app folder. Next run;

```bash
$ npm run dev
```

To start up the project locally, if you did everything correctly and successfully you'll see the message `Connected` printed out to your console first next you'd see the message `App running on PORT 3000` also printed out to the console.

If not God will be on your side, thank you for your time and I will see you in the next video.