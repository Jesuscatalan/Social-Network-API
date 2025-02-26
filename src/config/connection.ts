import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error('Error: MONGODB_URI is not set. Please verify your .env configuration.');
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch(err => console.error('MongoDB connection failed:', err));

const database = mongoose.connection;

database.on('error', err => console.error('Database connection error:', err));
database.once('open', () => console.log('Database connection established!'));
