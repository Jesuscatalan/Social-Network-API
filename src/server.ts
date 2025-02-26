import express, {Express} from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from "./routes/index.js";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use('/api', routes);

mongoose.connect(process.env.MONGO_URI ?? 'mongodb://localhost:27017/socialNetwork_db').then(() => console.log('Connected to MongoDB!'));

const PORT: string = process.env.PORT ?? '3000';
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
