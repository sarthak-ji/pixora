import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    imgURL: {
        type: String,
        required: [true, "ImageURL is required."]
    },
    caption: {
        type: String,
        default: ""
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "UserID is required for creating a post."]
    }
});


const postModel = mongoose.model("posts", postSchema);


export default postModel;