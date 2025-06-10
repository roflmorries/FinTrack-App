import express from 'express';
import cors from 'cors';
import transactionsRouter from './routes/transactions.js';
import categoriesRouter from './routes/categories.js';
import detectCategoryRouter from './routes/detectCategory.js'
import goalsRouter from './routes/goals.js'

const app = express();
app.use(cors());

app.use('/transactions', transactionsRouter);
app.use('/categories', categoriesRouter);
app.use('/detect-category', detectCategoryRouter);
app.use('/goals', goalsRouter);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server runs on port ${PORT}`))