import mongoose, { connect } from 'mongoose';

async function connectDB() {

    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Database is connected successfully.");
    } catch (err) {
        console.error("Database connection failed: ", err.message);
        process.exit(1);
    }

}


export default connectDB;