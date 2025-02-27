import { format } from 'date-fns';
import { Thought, User } from '../models/index.js';

const formatThought = (thought) => {
    const thoughtObject = thought.toObject();
    return {
        ...thoughtObject,
        createdAt: format(thought.createdAt, "MMM do, yyyy 'at' hh:mm a"),
        reactions: thoughtObject.reactions.map(reaction => ({
            ...reaction,
            createdAt: format(reaction.createdAt, "MMM do, yyyy 'at' hh:mm a"),
        })),
    };
};

export const getThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        const formattedThoughts = thoughts.map(formatThought);
        res.status(200).json(formattedThoughts);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);

        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        res.status(200).json(formatThought(thought));
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
};

export const createThought = async (req, res) => {
    try {
        const { thoughtText, username, userId } = req.body;

        if (!thoughtText || !username || !userId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const thought = await Thought.create({ thoughtText, username });

        await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } });

        res.status(201).json(formatThought(thought));
    } catch (err) {
        res.status(400).json(err);
    }
};

export const updateThought = async (req, res) => {
    try {
        const { thoughtText } = req.body;

        if (!thoughtText) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const updatedThought = await Thought.findByIdAndUpdate(req.params.id, { thoughtText }, { new: true });
        
        res.status(200).json(formatThought(updatedThought));
    } catch (err) {
        res.status(400).json(err);
    }
};

export const deleteThought = async (req, res) => {
    try {
        const thoughtToDelete = await Thought.findById(req.params.id);

        if (!thoughtToDelete) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        await User.findByIdAndUpdate(thoughtToDelete.userId, { $pull: { thoughts: thoughtToDelete._id } });

        await Thought.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: 'Thought deleted' });
    } catch (err) {
        res.status(400).json(err);
    }
};

export const addReaction = async (req, res) => {
    try {
        const { reactionBody, username } = req.body;

        if (!reactionBody || !username) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const updatedThought = await Thought.findByIdAndUpdate(req.params.id, { $push: { reactions: { reactionBody, username } } }, { new: true });
        
        res.status(200).json(formatThought(updatedThought));
    }
    catch (err) {
        res.status(400).json(err);
    }
};

export const deleteReaction = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.id, { $pull: { reactions: { _id: req.params.reactionId } } }, { new: true });
        res.status(200).json(formatThought(updatedThought));
    } catch (err) {
        res.status(400).json(err);
    }
};