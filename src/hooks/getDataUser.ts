
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {firestore} from '@/lib/firebase'
import { collection, query, onSnapshot, orderBy, where }  from "firebase/firestore";
import { UserFilter } from '@/types/userFilter';
import { isUser } from '@/utils/isUser';
import { ChatMetaSchema } from '@/schemas/ChatMetaSchema';
import { ChatItem } from '@/schemas/ChatItemSchema';


// получение user-ов и чат-ов
export const useGetDataUser = () => {
    const [users, setUsers] = useState<UserFilter[]>([]);
    const [mychats, setChats] = useState<ChatItem[]>([]);
    const session = useSession()
    const CurrentUser = session.data?.user

    
 
     // Получение user-ов всех
        useEffect(() => {
            console.log("Получение всех user-ов")

            const usersCollectionRef = collection(firestore, 'users');
            const q = query(usersCollectionRef, orderBy('username')); // Опционально: сортируем по имени пользователя
    
            // Подписываемся на изменения в коллекции в реальном времени
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const usersData: UserFilter[]=[];
                

                snapshot.forEach((doc) => {
                    const user = { ...doc.data(), uid: doc.id }
                    if (isUser(user)){
                      usersData.push(user); // Получаем данные и ID документа
                    }
                    else {
                      console.error('Неверные данные пользователя', user)
                    }
                    
                });
                setUsers(usersData); // Обновляем состояние с новыми данными
            }, (error) => {
                console.error("Ошибка при получении пользователей: ", error);
            });
    
            // Отписываемся от слушателя при размонтировании компонента
            return () => unsubscribe(); // тяжело не понял
        }, []); // Пустой массив зависимостей означает, что эффект запустится один раз при монтировании


        useEffect(() =>{
                      
           if (session.status !== "authenticated") return
          // const uid = session.data.user?.uid 
          // if (!uid) return
          
          const user = session.data?.user
          
            // получение данных чатов для текущего user-а
        const chatRef = query(
          collection(firestore, 'chats'),
          where('members', 'array-contains', CurrentUser?.uid)
        )
    
        const unsubscribe = onSnapshot(chatRef, snapshot => {
    
        const chatItems: ChatItem[] = []
        snapshot.forEach((doc)=>{

            // проверка схемы
            try {
              const data  =   ChatMetaSchema.parse(doc.data())
                   // получние id собеседника довольно хитро
          let otherUserId: string | undefined = data.members.find(id => id !== user.uid)
            if (!otherUserId) {
                otherUserId = user.uid
    }
    
         const time =  data.updatedAt
          ? data.updatedAt.toDate()
          : data._localtime
            ? data._localtime
            : new Date
    
      const dataRU = time 
      ? time.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
      : null
    
        const dataChat = {
            chatId: doc.id,
            otherUser: {
                uid: otherUserId,
                username:data.membersInfo[otherUserId].username,
                photoURL:data.membersInfo[otherUserId].photoURL
            },
            lastMessage: data.lastMessage,
            time: dataRU
    
        }
        chatItems.push(dataChat)
            }

            catch (error){
              console.error(`Битый документ ${doc.id}`, error)
            }
       
        })
        
         setChats(chatItems)
        
      })
    
        return () => unsubscribe()  
    
    
       
        }, [session.status])


        return {users, mychats}

    }

    