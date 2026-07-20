import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';


// Importing routes
import authRouter from './routes/auth.route.js';
import postRouter from './routes/post.route.js';
import followRouter from './routes/follow.route.js';


const app = express();

app.use(express.json()); // midware: isse 'req.body' me data humare pass aa jayega
app.use(cookieParser()); // midware: 'token' ko 'cookie' me set karne ke liye
app.use(morgan("dev"))
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: [ "GET", "POST", "PUT", "DELETE" ],
}))


// Using routes
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/user", followRouter);


export default app;