import { useState } from 'react';
import { sendMessage } from '../api';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const ChatUI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const { reply, topLenders } = await sendMessage(input);

      const botMessage: Message = {
      sender: 'bot',
      text: `${reply}\n\nTop Lenders:\n${topLenders
        ?.map((l, idx) => `(${idx + 1}) ${l.name} - ${l.interestRate}%`)
        .join('\n') || ''}`,
    };

      setMessages([...newMessages, botMessage]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { sender: 'bot', text: 'Something went wrong while contacting the server.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Loan Advisor Chatbot</h2>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          height: '300px',
          overflowY: 'auto',
          marginBottom: '10px',
          backgroundColor: '#f9f9f9',
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.sender === 'bot' ? 'left' : 'right',
              margin: '5px 0',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                borderRadius: '12px',
                background: msg.sender === 'bot' ? '#e0e0e0' : '#4caf50',
                color: msg.sender === 'bot' ? '#000' : '#fff',
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: '8px', fontSize: '16px' }}
          placeholder="Type your message..."
        />
        <button onClick={handleSend} disabled={loading} style={{ marginLeft: '10px' }}>
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatUI;
