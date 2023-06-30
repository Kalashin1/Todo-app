import  mongoose from 'mongoose';
import express from 'express';
import router from './router/router';

const app = express();
app.use(express.json());
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