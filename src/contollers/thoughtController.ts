import { Request, Response } from "express";
import Thought from "../models/thoughts.js";
import User from "../models/user.js";

export const getThoughts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    console.error("Failed to retrieve thoughts:", error);
    res.status(500).json({ message: "Error retrieving thoughts.", error });
  }
};

export const getThoughtById = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.id);

    if (!thought) {
      res.status(404).json({ message: "Thought not found." });
      return;
    }

    res.json(thought);
  } catch (error) {
    console.error("Failed to retrieve thought:", error);
    res.status(500).json({ message: "Error retrieving thought.", error });
  }
};

export const createThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const { thoughtText, username, userId } = req.body;

    if (!thoughtText || !username || !userId) {
      res.status(400).json({ message: "Required fields missing: thoughtText, username, and userId." });
      return;
    }

    const newThought = await Thought.create({ thoughtText, username });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.status(201).json(newThought);
  } catch (error) {
    console.error("Error creating thought:", error);
    res.status(500).json({ message: "Failed to create thought.", error });
  }
};

export const updateThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      res.status(404).json({ message: "Thought not found." });
      return;
    }

    res.json(updatedThought);
  } catch (error) {
    console.error("Error updating thought:", error);
    res.status(500).json({ message: "Failed to update thought.", error });
  }
};

export const deleteThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);

    if (!deletedThought) {
      res.status(404).json({ message: "Thought not found." });
      return;
    }

    res.json({ message: "Thought successfully deleted." });
  } catch (error) {
    console.error("Error deleting thought:", error);
    res.status(500).json({ message: "Failed to delete thought.", error });
  }
};
