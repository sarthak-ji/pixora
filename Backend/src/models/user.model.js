import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already exists."],
        required: [true, "Username is required."],
    },
    email: {
        type: String,
        unique: [true, "Email already exists."],
        required: [true, "Email is required."],
    },
    password: {
        type: String,
        required: [true, "Password is required."],
    },
    profile_pic: {
        type: String,
        default: "https://ik.imagekit.io/5aqxteobf/istockphoto-1477583639-612x612.jpg?updatedAt=1771524006436",
    },
    bio: String,
});

const userModel = mongoose.model("users", userSchema);


export default userModel;