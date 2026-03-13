import { useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react'
import Message from '@/app/components/Message/Message'
import './Messages.scss'
import { usesChatStore, useCurrentUser, useMessageIdStore, useMessageUi } from '@/app/StateManagment'
import { auth, firestore} from '@/firebase'
import { getChatId } from '@/app/utils/getChatId'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import MessagesDate from '@/app/components/MessagesDate/MessagesDate'
import getMessageDate from '@/lib/getMessageDate'
import { isNewDay } from '@/lib/date'
import { useSession } from 'next-auth/react'



interface Message {
id:string
text: string
senderId: string
createdAt: number
}

const Messages = () => {
    const selectedUser = usesChatStore(state => state.selectedUser)
    const selectedUserId = useMessageUi(state => state.selectedChatId)

    const session = useSession()
    const user = session.data?.user
    const BottomRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
            BottomRef.current?.scrollIntoView({ behavior: 'smooth' })

        }

    console.log('Выбранный user', selectedUser)
    
    const RefMessageId = useMessageIdStore(state => state.id) 
    const CurrentUser = session.data?.user
    
    const setCurrentUser  = useCurrentUser(state => state.setcurrentUser) // достаем экшен
    const messageRefs = useRef<Record<string, HTMLDivElement | null>>({})

    // соединение Ui и сообщений с бд. в единый поток.
  const messageUi = useMessageUi(state =>
  selectedUserId ? state.messages[selectedUserId] : undefined
) ?? []  
 const [messages, setMessages] = useState<any[]>([]) // массив сообщений с бд
   const dbMessages = messages
  .map(msg => {
    if (!msg.createdAt) return null

    const createdAt =
      msg.createdAt?.toDate
        ? msg.createdAt.toDate().getTime()
        : msg.createdAt

    if (!createdAt) return null

    return {
      ...msg,
      createdAt
    }
  })
  .filter(Boolean)
  const renderMessages = useMemo(() => {
  const messageMap = new Map<string, Message>()

  // сначала локальные (optimistic)
  messageUi.forEach((m) => messageMap.set(m.id, m))

  // потом серверные — они перезапишут локальные с тем же id
  dbMessages.forEach(m => messageMap.set(m.id, m))

  return Array.from(messageMap.values()).sort((a, b) => a.createdAt - b.createdAt)
}, [dbMessages, messageUi])

  // console.log('message c Zustand', messageUi)
  console.log('message c бд', renderMessages )


    // автопролистование до нижнего сообщения
useLayoutEffect(() => {
  scrollToBottom()
}, [renderMessages.length])


      // выносим в глоб state текущего пользователя
      /// ошибка по авторизации, исправить
useEffect(()=> {   
    if (user) {
      interface UserData {
        uid:string,
        displayName?:string | null,
        photoURL?: string | null,
        email:string ;

      }
      const userData:UserData = {
        uid: user.uid as string,
        displayName: user.name,
        photoURL:user.image,
        email: user.email as string
        
      }
      setCurrentUser(userData)

     
    }
  

 
      }, [setCurrentUser, user])



// Получние сообщений из firestore
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

  useEffect(() => {
  if (!RefMessageId) return

  const element = messageRefs.current[RefMessageId]

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })

    element?.classList.add('highlight')

  setTimeout(() => {
  element?.classList.remove('highlight')
}, 2000)
  }

}, [RefMessageId])


return (
        <>
        <div className="messages" >
            <div className="messages__list">
                 {renderMessages.map((msg, index) => {
  const isUser = msg.senderId === session.data?.user.uid
const currentTime = new Date(msg.createdAt) 
// здесь приводим к Date для рендера

const prevMsg = renderMessages[index - 1];

const prevTime = prevMsg ? new Date(prevMsg.createdAt) : null


const dataData = getMessageDate(currentTime, prevTime)
const showDateDivider = isNewDay(currentTime, prevTime)
// время сообщения для компонента - сообщение   
  const dataRU = currentTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })

  return (
    
   
   <div key={msg.id} className='message_container'  
   ref={(el) => {
    messageRefs.current[msg.id] = el
  }}
   >
   
   {showDateDivider && (    
    <div className = 'messages__list-dates'>
          <MessagesDate  date = {dataData} />
    </div>
   )}
    <div className="message_content">
    <Message
      data={{
        text: msg.text,
        isUser,
        dataRU,
      }}
    />
  </div>
    </div>
  
  )
})}
            <div ref={BottomRef} />
          </div>
      </div>
    </>
    )
}

export default Messages