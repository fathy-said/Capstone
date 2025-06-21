import { useEffect, useRef} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { create } from 'zustand';
import { Send, Bot, X } from 'lucide-react';

// Types
interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatStore {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  addMessage: (message: ChatMessage) => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
  setError: (error: string | null) => void;
}

const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isLoading: false,
  error: null,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setLoading: (loading) => set({ isLoading: loading }),
  clearMessages: () => set({ messages: [], error: null }),
  setError: (error) => set({ error }),
}));

const suggestedPrompts = [
  'How does AES encryption work?',
  'How do database indexes work?',
  'When should I use PostgreSQL instead of MongoDB?',
  'What is the difference between Authentication and Authorization?'
];

const ChatbotComponent = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, error, addMessage, setLoading, clearMessages, setError } = useChatStore();
  const { register, handleSubmit, reset, setValue } = useForm({ defaultValues: { message: '' } });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) {
      setError('Message cannot be empty');
      return;
    }

    const userMsg: ChatMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    addMessage(userMsg);
    reset();
    setError(null);
    setLoading(true);

    try {
      const { data } = await axios.post('https://pm-chatbot-production.up.railway.app/chat', {
        question: text
      });

      const botMsg: ChatMessage = {
        id: Date.now() + 1,
        text: data?.response || 'Received an empty response from the server.',
        sender: 'bot',
        timestamp: new Date(),
      };

      addMessage(botMsg);
    } catch (err) {
      const errMsg = axios.isAxiosError(err)
        ? err.response?.data?.detail?.[0]?.msg || err.message
        : 'An unknown error occurred';

      addMessage({
        id: Date.now() + 1,
        text: `Error: ${errMsg}. Please ensure the backend server is running and request format is correct.`,
        sender: 'bot',
        timestamp: new Date(),
      });

      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: { message: string }) => sendMessage(data.message);

  const handleSuggestedPrompt = (prompt: string) => {
    setValue('message', prompt);
    sendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <header className="bg-[#42A5f5] text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot size={24} />
          <h1 className="text-lg font-bold mx-auto">AI Assistant</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={clearMessages}
            className="p-2 rounded-full hover:bg-blue-500"
            title="Clear Chat"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 bg-blue-50/50">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="mb-4">
              <Bot size={48} className="text-[#42A5f5]" />
              <h2 className="text-2xl font-semibold text-gray-800">How can I help you?</h2>
              <p className="text-gray-600 text-sm">Choose a suggested prompt or ask your own question</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestedPrompt(prompt)}
                  className="bg-white border p-3 rounded-xl hover:bg-gray-100 text-left text-sm"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-xl shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-bl-xl'
                    : 'bg-gray-100 text-gray-800 border rounded-br-xl'
                }`}>
                  <div className="flex items-start gap-2">
                    {msg.sender === 'bot' && <Bot size={16} className="text-blue-600 mt-0.5" />}
                    <div>
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                      <p className="text-xs text-right mt-1 text-gray-500">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-3 py-2 rounded-xl border shadow-sm flex items-center gap-2">
                  <Bot size={16} className="text-blue-600" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      <form onSubmit={handleSubmit(onSubmit)} className="p-4 border-t bg-white">
        {error && <p className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded-lg">{error}</p>}
        <div className="flex items-center gap-3">
          <input
            {...register('message')}
            placeholder="What is your question?"
            className="flex-1 px-4 py-3 border rounded-full focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }
            }}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-12 h-12 bg-[#42A5f5] hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-full flex items-center justify-center"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatbotComponent;
