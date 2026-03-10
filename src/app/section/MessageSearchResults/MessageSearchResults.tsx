import './MessageSearchResults.scss'
import { Timestamp } from 'firebase/firestore'
import ChatWindow from '@/app/components/ChatWindow/ChatWindow'
import { useCurrentUser, usesChatStore } from '@/app/StateManagment'
import ZeroState from '@/app/components/ZeroState/ZeroState'

interface Message {
    createdAt:Timestamp
    id:string
    senderId:string
    text:string
    _localTime:Timestamp
}


interface MessageData {
    data:Message[]
}


const MessageSearchResults = ({data}:MessageData) => {
    const currentUser = useCurrentUser(state => state.currentUser)
    const selectedUser = usesChatStore(state => state.selectedUser)
  
    
    return (
        <>
        {data.length > 0 ? (
            data.map((message, index) => {
            if (!currentUser || !selectedUser) return null;
           
           const isMyMessage = currentUser?.uid === message.senderId;

  const userPhoto = isMyMessage
    ? currentUser?.photoURL
    : selectedUser?.photoURL;

  const userName = isMyMessage
    ? currentUser?.displayName
    : selectedUser?.displayName;

    const dataRU = message.createdAt.toDate().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })

            return (
                 <ChatWindow key={index}
                UserParams={{
                    id: message.id,
                    photo:  userPhoto || '',
                    name:userName || "Без имени",
                    message: message.text,
                    data: dataRU,

                }}
                mode = {'search'}
                />
            )
        })
        ) : (
            <ZeroState/>
        )}
        </>
    )
}

export default MessageSearchResults