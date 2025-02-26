import { Request, Response } from "express";
import Reaction from "../models/reactions.js";
import User from "../models/user.js";

export const getReactions = async (_req: Request, res: Response): Promise<void> => {
  try {
    const reactions = await Reaction.find();
    res.json(reactions);
  } catch (error) {
    console.error("Failed to fetch reactions:", error);
    res.status(500).json({ message: "Error retrieving reactions.", error });
  }
};

export const getReactionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const reaction = await Reaction.findById(req.params.id);

    if (!reaction) {
      res.status(404).json({ message: "Reaction not found." });
      return;
    }

    res.json(reaction);
  } catch (error) {
    console.error("Failed to retrieve reaction:", error);
    res.status(500).json({ message: "Error fetching reaction details.", error });
  }
};

export const createReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reactionBody, username, userId } = req.body;

    if (!reactionBody || !username || !userId) {
      res.status(400).json({ message: "Required fields missing: reactionBody, username, and userId." });
      return;
    }

    const newReaction = await Reaction.create({ reactionBody, username });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { reactions: newReaction._id } },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.json(newReaction);
  } catch (error) {
    console.error("Error while creating reaction:", error);
    res.status(500).json({ message: "Failed to create reaction.", error });
  }
};

export const updateReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reactionBody, username } = req.body;

    if (!reactionBody || !username) {
      res.status(400).json({ message: "Missing fields: reactionBody and username are required." });
      return;
    }

    const reaction = await Reaction.findByIdAndUpdate(
      req.params.id,
      { reactionBody, username },
      { new: true }
    );

    if (!reaction) {
      res.status(404).json({ message: "Reaction not found." });
      return;
    }

    res.json(reaction);
  } catch (error) {
    console.error("Error while updating reaction:", error);
    res.status(500).json({ message: "Failed to update reaction.", error });
  }
};

export const deleteReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const reaction = await Reaction.findByIdAndDelete(req.params.id);

    if (!reaction) {
      res.status(404).json({ message: "Reaction not found." });
      return;
    }

    res.json(reaction);
  } catch (error) {
    console.error("Error while deleting reaction:", error);
    res.status(500).json({ message: "Failed to delete reaction.", error });
  }
};

export const addReactionToUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reactionBody, username } = req.body;

    if (!reactionBody || !username) {
      res.status(400).json({ message: "Fields missing: reactionBody and username are required." });
      return;
    }

    const newReaction = await Reaction.create({ reactionBody, username });

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $push: { reactions: newReaction._id } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    res.json(newReaction);
  } catch (error) {
    console.error("Error while adding reaction:", error);
    res.status(500).json({ message: "Failed to add reaction.", error });
  }
};

export const removeUserReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { reactions: req.params.reactionId } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const reaction = await Reaction.findByIdAndDelete(req.params.reactionId);

    if (!reaction) {
      res.status(404).json({ message: "Reaction not found." });
      return;
    }

    res.json(reaction);
  } catch (error) {
    console.error("Error while removing reaction:", error);
    res.status(500).json({ message: "Failed to remove reaction.", error });
  }
};
