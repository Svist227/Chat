import { useEffect, useState } from "react"
import { getChatId } from "../utils/getChatId"
import { usesChatStore } from "../store/StateManagment"
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { firestore} from '@/lib/firebase'
import { useSession } from "next-auth/react"
import { RawMessage } from "@/types/message"
import { RawMessageSchema } from "@/schemas/MessageSchema"


// получение истории сообщений.
export const useGetMessagesUser = () => {
    const selectedUser = usesChatStore(state => state.selectedUser) 
    const session = useSession()
    const CurrentUser = session.data?.user
    const [messages, setMessages] = useState<RawMessage[]>([])
    


// можно настроить чтобы в зависимости от мода эффект возвращаал список всех сообщений или текущего user-а

useEffect(() => {
    if (!CurrentUser || !selectedUser) return


    const chatId = getChatId(CurrentUser.uid, String(selectedUser.uid))
    
    const q = query(
      collection(firestore, 'chats', chatId, 'messages'),
      orderBy('createdAt')
    )


    const unsub = onSnapshot(q, snapshot => {
        const resultMessage: RawMessage[] = [];

        snapshot.docs.forEach(doc => {
        try{
              const message = RawMessageSchema.parse({id: doc.id, ...doc.data() })
              resultMessage.push(message)
          }

        catch(e){
        console.warn('Сообщения пользвателя неккоректны', e)
      }
         
        })
         

      setMessages(resultMessage)
     
    })
  
    return () => unsub()
  }, [selectedUser, CurrentUser])


  return messages
}