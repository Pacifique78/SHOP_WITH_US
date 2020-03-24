import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRouter from './Server/Routes/AuthRoutes';
import orderRouter from './Server/Routes/OrderRoutes';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => res.status(200).json({ message: 'WELCOME TO SHOP_WITH_US' }));
app.use(authRouter);
app.use(orderRouter);
app.use((req, res) => res.status(400).json({
  status: 400,
  error: 'The route was not found',
}));
const port = process.env.PORT || 4500;
app.listen(port, console.log(`Server listening on ${port}`));
export default app;
