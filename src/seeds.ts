import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User, Thought, } from '../models/index.js';
import Reactions from "../models/reactions.js";
import Friends from "../models/friends.js";


dotenv.config();

const MONGO_URI: string = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/socialNetwork_db';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB!');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

const db = mongoose.connection;

const friends = [
  {
    friend: 'Admin',
    friendId: 1,
    username: 'Admin',
    userId: 1,
    email: 'admin@admin.com',
    name: 'Admin',
  }, {
    friend: 'ngreen1632',
    friendId: 2,
    username: 'ngreen1632',
    userId: 2,
    email: 'faux_lucks0v@icloud.com',
    name: 'ngreen1632',
  }, {
    friend: 'G-Gang',
    friendId: 3,
    username: 'G-Gang',
    userId: 3,
    email: 'g-gang@ggang.com',
    name: 'G-Gang',
  }, {
    friend: 'SlimShady',
    friendId: 4,
    username: 'SlimShady',
    userId: 4,
    email: 'slim@slim_thug.com',
    name: 'SlimShady',
  }, {
    friend: 'SnoopDogg',
    friendId: 5,
    username: 'SnoopDogg',
    userId: 5,
    email: 'snoop@snoop_dogg.com',
    name: 'SnoopDogg',
  }, {
    friend: 'DrDre',
    friendId: 6,
    username: 'DrDre',
    userId: 6,
    email: 'dr_dre@dr_dre.com',
    name: 'DrDre',
  }, {
    friend: 'Ace of Base',
    friendId: 7,
    username: 'Ace of Base',
    userId: 7,
    email: 'ace_of_base@ace_of_base.com',
    name: 'Ace of Base',
  }, {
    friend: 'The Notorious B.I.G.',
    friendId: 8,
    username: 'The Notorious B.I.G.',
    userId: 8,
    email: 'biggy@tupac.com',
    name: 'The Notorious B.I.G.',
  },{
    friend: 'Tupac',
    friendId: 9,
    username: 'Tupac',
    userId: 9,
    email: 'tupac@biggy.com',
    name: 'Tupac',
  },
];

const users = [
  {
    name: 'Admin',
    username: 'Admin',
    userId: 1,
    email: 'admin@admin.com',
  },
  {
    name: 'ngreen1632',
    username: 'ngreen1632',
    userId: 2,
    email: 'faux_lucks0v@icloud.com',
  },
  {
    name: 'G-Gang',
    username: 'G-Gang',
    userId: 3,
    email: 'g_gang@ggang.com',
  },
  {
    name: 'SlimShady',
    username: 'SlimShady',
    userId: 4,
    email: 'slim@slim_thug.com',
  },
  {
    name: 'SnoopDogg',
    username: 'SnoopDogg',
    userId: 5,
    email: 'snoop@snoop_dogg.com',
  },
  {
    name: 'DrDre',
    username: 'DrDre',
    userId: 6,
    email: 'dr_dre@dr_dre.com',
  },
  {
    name: 'Ace of Base',
    username: 'Ace of Base',
    userId: 7,
    email: 'ace_of_base@ace_of_base.com',
  },
  {
    name: 'The Notorious B.I.G.',
    username: 'The Notorious B.I.G.',
    userId: 8,
    email: 'biggy@tupac.com',
  },
  {
    name: 'Tupac',
    username: 'Tupac',
    userId: 9,
    email: 'tupac@biggy.com',
  },
];

const thoughts = [
  {
    thoughtText: 'I wonder when the lightbulb will turn on?',
    username: 'Admin',
    thoughtId: 1,
    name: 'Admin',
    reactions: []
  },
  {
    thoughtText: "I can't wait to marry my fiance on June 14th!!",
    username: 'ngreen1632',
    thoughtId: 2,
    name: 'ngreen1632',
    reactions: []
  },
  {
    thoughtText: "I can't wait to see the new Star Wars movie!",
    username: 'G-Gang',
    thoughtId: 3,
    name: 'G-Gang',
    reactions: []
  },
  {
    thoughtText: "I can't take it anymore!",
    username: 'SlimShady',
    thoughtId: 4,
    name: 'SlimShady',
    reactions: []
  },
  {
    thoughtText: "What's up my G's?",
    username: 'SnoopDogg',
    thoughtId: 5,
    name: 'SnoopDogg',
    reactions: []
  },
  {
    thoughtText: "Yo, SLIM! Calm yourself! You're gonna get yourself killed!",
    username: 'DrDre',
    thoughtId: 6,
    name: 'DrDre',
    reactions: []
  },
  {
    thoughtText: "All that she wants... what goes next?",
    username: 'Ace of Base',
    thoughtId: 7,
    name: 'Ace of Base',
    reactions: []
  },
  {
    thoughtText: "We be reppin'!",
    username: 'The Notorious B.I.G.',
    thoughtId: 8,
    name: 'The Notorious B.I.G.',
    reactions: []
  },
  {
    thoughtText: "You see what this joker wrote?",
    username: 'Tupac',
    thoughtId: 9,
    name: 'Tupac',
    reactions: []
  },
];

const reactions = [{
  reactionId: 1,
  reactionBody: 'I think it will turn on soon!',
  friend: 'SnoopDogg',
  name: 'SnoopDogg',
  createdAt: new Date(),
}, {
  reactionId: 2,
  reactionBody: 'You got this son! Be patient!',
  friend: 'DrDre',
  name: 'DrDre',
  createdAt: new Date(),
}, {
  reactionId: 3,
  reactionBody: 'Congrats! I hope you have a great time!',
  friend: 'Ace of Base',
  name: 'Ace of Base',
  createdAt: new Date(),
}, {
  reactionId: 4,
  reactionBody: 'BAM! Get it poppin!',
  friend: 'The Notorious B.I.G.',
  name: 'The Notorious B.I.G.',
  createdAt: new Date(),
}, {
  reactionId: 5,
  reactionBody: 'I can\'t wait either!',
  friend: 'Tupac',
  name: 'Tupac',
  createdAt: new Date(),
}, {
  reactionId: 6,
  reactionBody: 'I hope it\'s good!',
  friend: 'SlimShady',
  name: 'SlimShady',
  createdAt: new Date(),
}, {
  reactionId: 7,
  reactionBody: 'You got this son!',
  friend: 'SnoopDogg',
  name: 'SnoopDogg',
  createdAt: new Date(),
}, {
  reactionId: 8,
  reactionBody: 'Slim, you complain to much!',
  friend: 'DrDre',
  name: 'DrDre',
  createdAt: new Date(),
}, {
  reactionId: 9,
  reactionBody: 'Nothin\' much, just chillin\'',
  friend: 'Ace of Base',
  name: 'Ace of Base',
  createdAt: new Date(),
}, {
  reactionId: 10,
  reactionBody: 'Same here, just trying to make it',
  friend: 'The Notorious B.I.G.',
  name: 'The Notorious B.I.G.',
  createdAt: new Date(),
}, {
  reactionId: 11,
  reactionBody: 'Yeah, Slim! Fo rizzle!',
  friend: 'SnoopDogg',
  name: 'SnoopDogg',
  createdAt: new Date(),
}, {
  reactionId: 12,
  reactionBody: 'Slim, you need some antidepressants!',
  friend: 'Ace of Base',
  name: 'Ace of Base',
  createdAt: new Date(),
}, {
  reactionId: 13,
  reactionBody: 'Uhhhh! Is another baby!',
  friend: 'Tupac',
  name: 'Tupac',
  createdAt: new Date(),
}];

const seedFriends = async () => {
  try {
    await Friends.deleteMany({});
    const createdFriends = await Friends.insertMany(friends);
    console.log('Created friends...', createdFriends);
  } catch (err) {
    console.error('Error seeding friends...', err);
  }
};

const seedUsers = async () => {
  try {
    await User.deleteMany({});
    const createdUsers = await User.insertMany(users);
    console.log('Created users...', createdUsers);
  } catch (err) {
    console.error('Error seeding users...', err);
  }
};

const seedThoughts = async () => {
  try {
    await Thought.deleteMany({});
    const createdThoughts = await Thought.insertMany(thoughts);
    console.log('Created thoughts...', createdThoughts);
  } catch (err) {
    console.error('Error seeding thoughts...', err);
  }
};

const seedReactions = async () => {
  try {
    await Reactions.deleteMany({});
    const createdReactions = await Reactions.insertMany(reactions);
    console.log('Created reactions...', createdReactions);
  } catch (err) {
    console.error('Error seeding reactions...', err);
  }
};

const seedDatabase = async () => {
  try {
    await seedFriends();
    await seedUsers();
    await seedThoughts();
    await seedReactions();
  } catch (err) {
    console.error('Error seeding database...', err);
  }
};

db.once('open', async () => {
  await seedDatabase();
});

connectDB().catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});