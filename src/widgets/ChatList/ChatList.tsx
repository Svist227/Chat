import ChatWindow from '@/components/ChatWindow/ChatWindow'
import './ChatList.scss'
import { useChatMode} from '@/StateManagment';
import { useSession } from 'next-auth/react';
import { useGetDataUser } from '@/hooks/getDataUser';

    const ChatList = () => {
        const session = useSession()
        const CurrentUser = session.data?.user
        const {users, mychats} = useGetDataUser()

        console.log('мои чаты', mychats)
        const chatUserIds = new Set(mychats.map(chat => chat.otherUser.uid)) // множ-ство uid с кем есть чатов
        const recommendedUsers = users.filter(user => {
          if (CurrentUser?.uid == user.uid) return // чат с сам собой
          return !chatUserIds.has(user.uid)
          })
        const mode = useChatMode(state => state.mode)
        const setMode = useChatMode(state => state.setMode)
    

        return (

    
            <div className="chat-list" >
                
                <p className='chat-list-name h4'> My Chats</p>
                {mychats.map((chat, index) => (
                        <ChatWindow key={index} UserParams = {{
                            id: chat.otherUser.uid,
                            photo: chat.otherUser.photoURL || "",
                            username:chat.otherUser.username || "Без имени",
                            message:chat.lastMessage,
                            data: chat.time,
                            // colMessage:chat.messages.length
                        }
                        }
                        />
                ))}

                {recommendedUsers.length > 0 && (
                            <p className='chat-list-name h4'>Recommended Chats</p>

                )}
                {recommendedUsers.map((user,index2) => (
                    <ChatWindow key={index2} UserParams={{
                        id: user.uid,
                        photo:user.photoURL || '',
                        username:user.username|| "Без имени",
                        message:"",
                        data:""

                    }}/>
                ))}
        <p className='chat-list-name h4'>AI Assistents</p>
        <h4 style={{textAlign:'center', paddingBlock:'30%'}}>Coming soon...</h4>

                </div>
      

        )
    }

    export default ChatList