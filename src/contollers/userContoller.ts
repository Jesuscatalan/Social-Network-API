import { Request, Response } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Failed to retrieve users.", error });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Failed to retrieve user.", error });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, name, friends } = req.body;

    if (!username || !email || !password || !name) {
      res.status(400).json({ message: "Missing required fields: username, email, password, and name are required." });
      return;
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      name,
      friends: friends || [], // Default to an empty array if no friends are provided
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Failed to create user.", error });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email) {
      res.status(400).json({ message: "Missing required fields: username and email are required." });
      return;
    }

    const updateData: Record<string, any> = { username, email };

    // If password is provided, hash it before updating
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true, // Ensure schema validation is enforced
    });

    if (!updatedUser) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user.", error });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.json({ message: "User successfully deleted." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user.", error });
  }
};

export const deleteAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await User.deleteMany({});
    res.json({ message: "All users successfully deleted.", deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Error deleting all users:", error);
    res.status(500).json({ message: "Failed to delete all users.", error });
  }
};
