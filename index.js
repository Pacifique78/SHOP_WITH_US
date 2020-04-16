import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRouter from './Server/Routes/AuthRoutes';
import orderRouter from './Server/Routes/OrderRoutes';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Authorization ,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});
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
