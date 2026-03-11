import { create } from 'zustand';
import { persist } from 'zustand/middleware'

interface Menu{
  isChatsOpen:boolean,
  setIsChatsOpen: () => void
}
export const useChatsOpen = create<Menu>(set => ({
    isChatsOpen:false,
    setIsChatsOpen: () => set(state => ({
      isChatsOpen: !state.isChatsOpen
    }))
}))



interface SelectedUser {
  id: string
  displayName: string
  photoURL?: string
}
interface CurrentUser {
  uid: string
  displayName?:string | null,
  photoURL?: string | null,
  email:string 
  
}

interface ChatStates {
  selectedUser: SelectedUser | null
  setSelectedUser: (user: SelectedUser) => void
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




// получение текущего пользователя
interface CurrentUserStore {
  currentUser: CurrentUser | null;
  setcurrentUser: (user:CurrentUser) => void
}

export const useCurrentUser = create<CurrentUserStore>((set) => ({
  currentUser: null,
  setcurrentUser: (user) => set({ currentUser:user })

}))



 
interface  ValueSearch {
  currentValue: string, 
  setValue:(value:string) => void
}

export const useValueSearch = create<ValueSearch>((set) => ({
  currentValue: "",
  setValue:(value) => set({ currentValue:value })
}))



interface ChatListState{
  mode: string 
  setMode: (param:string) => void
}

export const useChatMode = create<ChatListState>((set) => ({
  mode: 'defoult',
  setMode: (param) => set({mode:param})
}))

interface Focus{
  focusSearch:boolean
  triggerFocus: () => void
}
export const useFocusStore = create<Focus>(set => ({
  focusSearch: false,
  triggerFocus: () => set((state) =>  ({focusSearch: !state.focusSearch})  )
}));

interface MessageID{
  id:string | null,
  setMessageId: (idMessage:string) => void
}

export const useMessageIdStore = create<MessageID>(set => ({
  id: null,
  setMessageId: (idMessage) => set({id:idMessage})
}))


interface Message {
id:string
text: string
senderId: string
createdAt: number
}

interface DataMessage {
  messages:Message[]
  addMessage: (param:Message) => void
}

export const useMessageUi = create<DataMessage>((set) => ({
  messages: [],
  addMessage: (param) =>
     set((state) =>({
      messages:[...state.messages, param]
    }))
}))
