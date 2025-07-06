import express from 'express';
import cors from 'cors';
import transactionsRouter from './routes/transactions';
import categoriesRouter from './routes/categories';
import detectCategoryRouter from './routes/detectCategory';
import goalsRouter from './routes/goals';
import userRouter from './routes/users';
import avatarRouter from './routes/avatar';
import { connectDB } from './config/db/db';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/transactions', transactionsRouter);
app.use('/categories', categoriesRouter);
app.use('/detect-category', detectCategoryRouter);
app.use('/goals', goalsRouter);
app.use('/users', userRouter);
app.use('/avatar', avatarRouter);

const PORT = 3001;
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server runs on port ${PORT}`));
  } catch (error) {
    console.error('Failed to connect to DB', error);
    process.exit(1);
  }
})();