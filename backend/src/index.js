import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import cookieparser from 'cookie-parser';
import { connectDB } from './libs/db.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieparser());
// app.use(express.urlencoded({ extended: true }));

const port  = process.env.PORT || 5001;

app.use("/api/auth",authRoutes);


app.listen(port || 5001, () => {
  console.log(`Server is running on ${port ?? 5001}`);
  connectDB();
}
);
