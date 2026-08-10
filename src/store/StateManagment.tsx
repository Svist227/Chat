import { create } from 'zustand';
import { persist } from 'zustand/middleware'


interface ChatStates {
  selectedUser: User | null
  setSelectedUser: (user: User) => void
}

export const usesChatStore = create<ChatStates>()(
  persist<ChatStates>(
    (set) => ({
      selectedUser: null,
      setSelectedUser: (user) => set({ selectedUser: user }),
    }),
    {
      name: 'chat-storage',
    }
  )
)






 
interface  ValueSearch {
  currentValue: string, 
  setValue:(value:string) => void
}

export const useValueSearch = create<ValueSearch>((set) => ({
  currentValue: "",
  setValue:(value) => set({ currentValue:value })
}))







interface ChatState {
  selectedChatId: string | null;
  messages: {
    [chatId: string]: Message[];
  };
  selectChat: (id: string) => void;
  addMessage: (chatId: string, message: Message) => void;
}

export const useMessageUi = create<ChatState>((set) => ({
  selectedChatId: null,
  messages: {}, // Объект, ключи — chatId
  selectChat: (id: string) =>
    set({ selectedChatId: id }),
  addMessage: (chatId: string, message: Message) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: [...(state.messages[chatId] || []), message],
      },
    })),
}));


// Рефакторинг.  // type - messages, chats, default
// task 1 на union
type chatMode = 'messages' | 'chats' | 'default'

interface ChatListState{
  mode: chatMode,
  setMode: (param:chatMode) => void
}
export const useChatMode = create<ChatListState>((set) => ({
  mode: 'default',
  setMode: (param) => set({mode:param})
}))

//task 2 на базовый тип

interface ToggleBollean {
  isOpen: boolean,
  toggle: () => void
}

export const useChatsOpen = create<ToggleBollean>(set => ({
    isOpen:false,
    toggle: () => set(state => ({ isOpen: !state.isOpen
    }))
}))

export const useSettingsPanelStore = create<ToggleBollean>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))

export const useFocusStore = create<ToggleBollean>(set => ({
  isOpen: false,
  toggle: () => set((state) =>  ({isOpen: !state.isOpen})  )
}));

// Таск на написать фабрику сторов.

// ДЖЕНЕРИК. (CurrentStore не используется в проекте)
interface ValueStore<T>{
  value: T | null,
  setValue: (param:T) => void
}

// тут просто value объект User
export const useCurrentUser = create<ValueStore<User>>((set) => ({
  value: null,
  setValue: (user) => set({ value:user })

}))


// тут просто строка
export const useMessageIdStore = create<ValueStore<string>>(set => ({
  value: null,
  setValue: (idMessage) => set({value:idMessage})
}))



