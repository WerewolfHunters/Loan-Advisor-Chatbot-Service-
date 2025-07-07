import { spawn } from 'child_process';

export const runPythonScript = (input: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const inputStr = JSON.stringify(input);

    // ✅ Spawn Python with env variables passed from Node.js
    const py = spawn('python', ['services/predictor.py', inputStr], {
      env: {
        ...process.env // ✅ Ensure GROQ_API_KEY and others are available to Python
      }
    });

    let output = '';
    let error = '';

    py.stdout.on('data', (data) => {
      output += data.toString();
    });

    py.stderr.on('data', (data) => {
      error += data.toString();
    });

    py.on('close', (code) => {
      if (code !== 0 || error) {
        console.error('❌ Python stderr:', error);
        return reject(error || 'Python process failed');
      }

      try {
        const parsed = JSON.parse(output);
        resolve(parsed);
      } catch (err) {
        console.error('❌ Failed to parse Python output:', output);
        reject(err);
      }
    });
  });
};
