import { createContext, useState, useContext } from 'react';
import { SessionProvider } from 'next-auth/react'


type ChatContextType = {
  selectedChatId: number | null;
  setSelectedChatId: (id: number | null) => void;
};


// Создаём контекст
const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  return (
    <ChatContext.Provider value={{ selectedChatId, setSelectedChatId }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChatContext must be used within a ChatProvider');
  return context;
};


