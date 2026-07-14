import dotenv from 'dotenv';
dotenv.config();

import app from './src/app';
import connectDB from './src/config/database';


connectDB();

const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});