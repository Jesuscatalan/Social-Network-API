import { Request, Response } from "express";
import User from "../models/user.js";

export const addFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, friendUsername } = req.body;

    if (!username || !friendUsername) {
      res.status(400).json({ message: "Both usernames must be provided." });
      return;
    }

    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: "Specified user does not exist." });
      return;
    }

    const friend = await User.findOne({ username: friendUsername });
    if (!friend) {
      res.status(404).json({ message: "Friend not found in the database." });
      return;
    }

    if (!user.friends.includes(friend._id)) {
      user.friends.push(friend._id);
      await user.save();
    }

    res.json({ message: "Friend successfully added!", user });
  } catch (error) {
    console.error("Failed to add friend:", error);
    res.status(500).json({ message: "An error occurred while adding friend.", error });
  }
};

export const removeFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, friendUsername } = req.body;

    if (!username || !friendUsername) {
      res.status(400).json({ message: "Both usernames must be provided." });
      return;
    }

    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: "Specified user does not exist." });
      return;
    }

    const friend = await User.findOne({ username: friendUsername });
    if (!friend) {
      res.status(404).json({ message: "Friend not found in the database." });
      return;
    }

    user.friends = user.friends.filter((id) => !id.equals(friend._id));
    await user.save();

    res.json({ message: "Friend successfully removed!", user });
  } catch (error) {
    console.error("Failed to remove friend:", error);
    res.status(500).json({ message: "An error occurred while removing friend.", error });
  }
};

export const getFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, friendUsername } = req.body;

    if (!username || !friendUsername) {
      res.status(400).json({ message: "Both usernames must be provided." });
      return;
    }

    const user = await User.findOne({ username }).populate("friends");

    if (!user) {
      res.status(404).json({ message: "Specified user does not exist." });
      return;
    }

    const friend = user.friends.find((f) => (f as any).username === friendUsername);

    if (!friend) {
      res.status(404).json({ message: "Friend not found in user's list." });
      return;
    }

    res.json({ message: "Friend located successfully!", friend });
  } catch (error) {
    console.error("Failed to retrieve friend:", error);
    res.status(500).json({ message: "An error occurred while fetching friend.", error });
  }
};

export const getAllFriends = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select("username friends").populate("friends", "username");

    if (!users || users.length === 0) {
      res.status(404).json({ message: "No users with friends found." });
      return;
    }

    res.json(users);
  } catch (error) {
    console.error("Failed to retrieve friends list:", error);
    res.status(500).json({ message: "An error occurred while fetching friends.", error });
  }
};
