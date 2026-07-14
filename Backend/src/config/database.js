import mongoose, { connect } from 'mongoose';

async function connectDB() {

    try {
        mongoose.connect(process.env.JWT_SECRET);
        console.log("Database is connected successfully.");
    } catch (err) {
        console.error("Database connection failed: ", err.message);
        process.exit(1);
    }

}


export default connectDB;