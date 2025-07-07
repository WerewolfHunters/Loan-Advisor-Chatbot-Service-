import express from 'express';
import { handleChat } from '../controllers/chatController';
const router = express.Router();
router.post('/', handleChat);
export default router;

// === backend/controllers/chatController.ts ===
import { Request, Response } from 'express';
import { runPythonScript } from '../utils/spawnPython';

export const chatController = async (req: Request, res: Response) => {
  const userInput = req.body.input;
  const response = await runPythonScript(userInput);
  res.json({ reply: response });
};