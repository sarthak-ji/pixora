import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: String,
    },
    followee: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["accepted", "pending", "rejected"],
        message: "Status can only be pending, accepted or rejected.",
      },
    },
  },
  {
    timestamps: true,
  },
);

followSchema.index(
  {
    follower: 1,
    followee: 1,
  },
  {
    unique: true,
  },
);

const followModel = mongoose.model("follows", followSchema);


export default followModel;
