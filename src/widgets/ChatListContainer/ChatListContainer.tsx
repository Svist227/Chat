import './ChatListContainer.scss'
import ChatList from '../../widgets/ChatList/ChatList'
import ChatSearchResults from '@/widgets/ChatSearchResults/ChatSearchResults'
import MessageSearchResults from '@/section/MessageSearchResults/MessageSearchResults'
import { useChatsOpen } from '@/StateManagment'
import { useValueSearch } from '@/StateManagment'
import { useGetDataUser } from '@/hooks/getDataUser'
import { useGetMessagesUser } from '@/hooks/getMessagesUser'

type Item = {
    searchMode:string
}
const ChatListContainer = ({searchMode}:Item) => {
    const isMenuOpen = useChatsOpen(state => state.setIsChatsOpen)
    const {users, mychats} = useGetDataUser()
    const value = useValueSearch(state => state.currentValue)
    const messages = useGetMessagesUser()
   
   
    // фильтрация по имени 
        let userFilter = users.filter((user)=> {
            if(!value) return 
            return user.username?.toLowerCase().includes(value.toLowerCase())
        }
        )

        console.log('Отфильтрованные пользователи', userFilter)

    // фильтрация сообщений текущего user-а
         let userMessagegFilter = messages.filter((message) => {
            if(!value) return 
            return  message.text?.toLowerCase().includes(value.toLowerCase())
         })



         console.log('Отфильтрованные сообщения', userMessagegFilter)

        
       
    if (searchMode === 'chats'){ // такс 
        return (
            <div className="chat__container" onClick={isMenuOpen}>
            <ChatSearchResults data = {userFilter}   />
             </div>
        )
    }

    if (searchMode === 'messages'){ // такс 
        return (
            <div className="chat__container" onClick={isMenuOpen}>
            <MessageSearchResults data = {userMessagegFilter} />
            </div>
            
        )
    }

    
    return(
    <div className="chat__container" onClick={isMenuOpen}>
    <ChatList/>
    </div>
    )
}


export default ChatListContainer