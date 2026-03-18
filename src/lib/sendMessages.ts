import {firestore} from '@/firebase'
import {  serverTimestamp, doc,setDoc,getDoc,updateDoc } from "firebase/firestore"; // Добавлены collection, addDoc, serverTimestamp
import { getChatId } from '@/app/utils/getChatId'


interface CurrentUserCustom {
    uid:string,
    name?:string | null,
    email?:string | null,
    image?:string | null
}
interface SelectedUser {
  id: string
  username: string
  photoURL?: string
}
interface DataMessages{
    id: string, 
    value:string,
    currentUser: CurrentUserCustom,
    selectedUser:SelectedUser
}

export const SendMessages = async ({id,value,currentUser,selectedUser}:DataMessages) => {
    const chatId = getChatId(currentUser.uid, String(selectedUser.id)) // общий id


      try {
          const chatRef = doc(firestore, 'chats', chatId)
          const chatSnap = await getDoc(chatRef)

        // 1️⃣ создаём чат (если его нет)
      if (!chatSnap.exists()) {
      console.log('Создаю чат в бд')
      console.log('Создается чат для user-ов.')
      await setDoc(
        doc(firestore, 'chats', chatId),
        { 
          uid: currentUser.uid,
          members: [currentUser.uid, selectedUser.id],
          membersInfo: {
            [currentUser.uid]:{
              username: currentUser.name,
              photoURL: currentUser.image
            },
            [selectedUser.id]:{
              username: selectedUser.username,
              photoURL: selectedUser.photoURL
            }
          },
          updatedAt: serverTimestamp(),
          lastMessage: value, // передаем сообщение первое если нет чата
        },
        { merge: true }
      )
    }

    await updateDoc(chatRef, {
    lastMessage: value,
    updatedAt: serverTimestamp(),
})

const messageRef = doc(firestore, 'chats', chatId, 'messages', id)
      // 2️⃣ отправляем сообщение
      await setDoc(
        messageRef,
        {
          id:id,
          text: value,
          senderId: currentUser.uid, // id отправителя
          createdAt: serverTimestamp(),
        }
      )


    } catch (e) {
      console.error('Ошибка отправки сообщения', e)
    }
}