import axios from 'axios';

// Define input/output types
export interface ChatRequest {
  input: string;
}

export interface ChatResponse {
  reply: string;
  topLenders?: {
    id: number;
    name: string;
    interestRate: number;
    reason?: string;
  }[];
}

// POST the user's input to the backend
export const sendMessage = async (message: string): Promise<ChatResponse> => {
  const response = await axios.post<ChatResponse>('http://localhost:3001/api/chat', {
    input: message,
  });

  return response.data;
};
