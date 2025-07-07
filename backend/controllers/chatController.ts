// import { Request, Response } from 'express';
// import { runPythonScript } from '../utils/spawnPython';

// export async function handleChat(req: Request, res: Response) {
//   try {
//     console.log('📨 Incoming input:', req.body.input);

//     // Step 1: ignore the raw user input for now and hardcode test values
//     const structuredInput = {
//       loanAmount: 30000,
//       income: 50000,
//       creditScore: 680
//     };

//     // Step 2: call Python script with proper structured input
//     const response = await runPythonScript(structuredInput);

//     console.log('✅ Response from Python:', response);

//     res.status(200).json({
//       reply: response.reply,
//       topLenders: response.topLenders
//     });
//   } catch (error) {
//     console.error('❌ Error in handleChat:', error);
//     res.status(500).json({ reply: 'Something went wrong while processing your request.' });
//   }
// }

// ----------------------------------------------------------------------------------------------
import { Request, Response } from 'express';
import { runPythonScript } from '../utils/spawnPython';

export async function handleChat(req: Request, res: Response) {
  try {
    const userInput = req.body.input;
    console.log('📨 Incoming input:', userInput);

    // 🔁 Pass raw input to Python where Groq+LangChain will handle parsing & reasoning
    const response = await runPythonScript({ message: userInput });

    console.log('✅ Response from Python:', response);

    res.status(200).json({
      reply: response.reply,
      topLenders: response.topLenders
    });
  } catch (error) {
    console.error('❌ Error in handleChat:', error);
    res.status(500).json({
      reply: 'Something went wrong while processing your request.'
    });
  }
}
