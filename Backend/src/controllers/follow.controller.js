import followModel from "../models/follow.model";
import userModel from "../models/user.model";

async function followUser(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followeeUsername == followeeUsername) {
    return res.status(400).json({
      message: "You can't follow yourself!",
    });
  }

  const isFolloweeExists = await followModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExists) {
    return res.status(404).json({
      message: "User you are trying to follow doesn't exists.",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyFollowing) {
    return res.status(200).json({
      message: `You are already following ${followeeUsername}`,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  return res.status(201).json({
    message: `You are now following ${followeeUsername}`,
    followRecord,
  });
}

async function unfollowUser(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isAlreadyFollowing = await followModel.findOne({
    followee: followeeUsername,
    follower: followerUsername,
  });

  if (!isAlreadyFollowing) {
    return res.status(200).json9({
        message: `You are not following ${followeeUsername}`
    });
  }

  const unfollowRecord = await followModel.findOneAndDelete({
    followee: followeeUsername
  });

  return res.status(200).json({
    message: `You have unfollowed ${followeeUsername}`
  });
}

export default {
  followUser,
  unfollowUser,
};
