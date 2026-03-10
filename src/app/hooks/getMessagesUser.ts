import { useEffect, useState } from "react"
import { getChatId } from "../utils/getChatId"
import { usesChatStore } from "../StateManagment"
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { firestore} from '@/firebase'
import { useSession } from "next-auth/react"


// получение истории сообщений.
export const useGetMessagesUser = () => {
    const selectedUser = usesChatStore(state => state.selectedUser) 
    const session = useSession()
    const CurrentUser = session.data?.user
    const [messages, setMessages] = useState<any[]>([])
    


// можно настроить чтобы в зависимости от мода эффект возвращаал список всех сообщений или текущего user-а

useEffect(() => {
    if (!CurrentUser || !selectedUser) return


    const chatId = getChatId(CurrentUser.uid, String(selectedUser.id))
    
    const q = query(
      collection(firestore, 'chats', chatId, 'messages'),
      orderBy('createdAt')
    )

    const unsub = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
  
    return () => unsub()
  }, [selectedUser, CurrentUser])


  return messages
}