import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import chatRouter from './routes/chat';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/chat', chatRouter);
app.listen(3001, () => console.log('Server running on http://localhost:3001'));