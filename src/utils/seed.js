import mongoose from 'mongoose';
import { User, Thought } from '../models/index.js';
import connection from '../config/connection.js';
import dotenv from 'dotenv';

dotenv.config();

const seedUsers = async () => {
    try {
        await User.deleteMany({});
        await Thought.deleteMany({});

        const usersData = [
            { username: 'user_one', email: 'userone@email.com' },
            { username: 'user_two', email: 'usertwo@email.com' },
            { username: 'alex_king', email: 'alex.king@gmail.com' },
            { username: 'emily_james', email: 'emily.james@gmail.com' },
            { username: 'lucy_star', email: 'lucy@example.com' },
            { username: 'charlie_brown', email: 'charlie@example.com' },
        ];

        const createdUsers = await User.insertMany(usersData);

        const thoughtsData = [
            { thoughtText: 'This is a test message', username: createdUsers[0].username },
            { thoughtText: 'Here is another test message', username: createdUsers[1].username },
            { thoughtText: 'Thoughts from Alex King', username: createdUsers[2].username },
            { thoughtText: 'Message from Emily James', username: createdUsers[3].username },
            { thoughtText: 'Lucy is thinking about life', username: createdUsers[4].username },
            { thoughtText: 'Charlie is busy working', username: createdUsers[5].username },
        ];

        const createdThoughts = await Thought.insertMany(thoughtsData);

         // Reactions Data
        const reactionsData = [
            { reactionBody: 'Fantastic!', username: createdUsers[1].username },
            { reactionBody: 'So thought-provoking...', username: createdUsers[2].username },
            { reactionBody: 'Totally agree!', username: createdUsers[3].username },
            { reactionBody: 'I like this one!', username: createdUsers[0].username },
        ];

        // Add friends and thoughts to users
        await User.findByIdAndUpdate(createdUsers[0]._id, {
            $push: {
                thoughts: createdThoughts[0]._id,
            },
        });
        await User.findByIdAndUpdate(createdUsers[0]._id, {
            $push: {
                friends: createdUsers[1]._id,
            },
        });
        await User.findByIdAndUpdate(createdUsers[0]._id, {
            $push: {
                friends: createdUsers[2]._id,
            },
        });

        await User.findByIdAndUpdate(createdUsers[1]._id, {
            $push: {
                thoughts: createdThoughts[1]._id,
            },
        });
        await User.findByIdAndUpdate(createdUsers[1]._id, {
            $push: {
                friends: createdUsers[0]._id,
            },
        });
        await User.findByIdAndUpdate(createdUsers[1]._id, {
            $push: {
                friends: createdUsers[3]._id,
            },
        });

        await User.findByIdAndUpdate(createdUsers[2]._id, {
            $push: {
                thoughts: createdThoughts[2]._id,
            },
        });
        await User.findByIdAndUpdate(createdUsers[2]._id, {
            $push: {
                friends: createdUsers[3]._id,
            },
        });
        await User.findByIdAndUpdate(createdUsers[2]._id, {
            $push: {
                friends: createdUsers[4]._id,
            },
        });

        await User.findByIdAndUpdate(createdUsers[3]._id, {
            $push: {
                thoughts: createdThoughts[3]._id,
            },
        });
        await User.findByIdAndUpdate(createdUsers[3]._id, {
            $push: {
                friends: createdUsers[2]._id,
            },
        });
        await User.findByIdAndUpdate(createdUsers[3]._id, {
            $push: {
                friends: createdUsers[5]._id,
            },
        });

        await User.findByIdAndUpdate(createdUsers[4]._id, {
            $push: {
                thoughts: createdThoughts[4]._id,
            },
        });

        await User.findByIdAndUpdate(createdUsers[5]._id, {
            $push: {
                thoughts: createdThoughts[5]._id,
            },
        });

        // Add reactions to thoughts
        await Thought.findByIdAndUpdate(createdThoughts[0]._id, {
            $push: {
                reactions: reactionsData[0],
            },
        });
        await Thought.findByIdAndUpdate(createdThoughts[1]._id, {
            $push: {
                reactions: reactionsData[1],
            },
        });
        await Thought.findByIdAndUpdate(createdThoughts[2]._id, {
            $push: {
                reactions: reactionsData[2],
            },
        });
        await Thought.findByIdAndUpdate(createdThoughts[3]._id, {
            $push: {
                reactions: reactionsData[3],
            },
        });

        console.log('Database successfully seeded!');
        mongoose.disconnect();
    } catch (err) {
        console.error(err);
        mongoose.disconnect();
    }
};

mongoose.connection.once('open', async () => {
    await seedUsers();
});

mongoose.connection.on('error', err => {
    console.error(err);
});
