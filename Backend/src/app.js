import express from 'express'
import authRouter from './routes/auth.route';
import cookieParser from 'cookie-parser';

const app = express();


app.use(express.json()); // midware: isse 'req.body' me data humare pass aa jayega
app.use(cookieParser()); // midware: 'token' ko 'cookie' me set karne ke liye

app.use("/api/auth", authRouter);


export default app;