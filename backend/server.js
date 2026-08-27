import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './confing/db.js';
import authRouter from './routes/authRoutes.js';
import studentRouter from './routes/studentRoutes.js';
import bookRouter from './routes/bookRoutes.js';

const PORT = process.env.PORT || 50000;
const app = express();

//MIDDLEWARES
app.use(cors());
app.use(express.json());


//DB
connectDB();

//ROUTES
app.use("/api/auth", authRouter);
app.use("/api/students", studentRouter);
app.use("/api/books", bookRouter);

app.get("/", (req, res)=> {
    res.send("API WORKING");
});

app.listen(PORT, () => {
    console.log(`Server is Started on http://localhost:${PORT}`)
})