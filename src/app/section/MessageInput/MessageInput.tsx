import './MessageInput.scss'
import { useEffect, useState } from 'react';

import {app, auth, firestore} from '@/firebase'
import { getFirestore, collection, addDoc, serverTimestamp, doc,setDoc,getDoc,updateDoc, Timestamp } from "firebase/firestore"; // Добавлены collection, addDoc, serverTimestamp
import { useMessageUi, usesChatStore } from '@/app/StateManagment';
import { getChatId } from '@/app/utils/getChatId'
import { useSession } from 'next-auth/react';
import { getDatabase, ref, child, push, update } from "firebase/database";
import { SendMessages } from '@/lib/sendMessages';

const MessageInput = () => {
    const [value, setValue] = useState(""); // храниие соообщения из onChange
    const session = useSession()
    const database = getDatabase();
    const addMessageUi = useMessageUi(state => state.addMessage)
    // данные тек-его выбранного user-а с кем переписка
    let selectedUser = usesChatStore(state => state.selectedUser)
    const tempId = crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;

    const handleClick = async () => {
        if (!value.trim()) return
        setValue('')
        
        const currentUser = session.data?.user
        if (!currentUser || !selectedUser) return

        // UI 
        addMessageUi({
          id: tempId, 
          text:value,
          senderId:currentUser.uid,
          createdAt: Date.now()
        })

        

        // асинхронная отправка на сервер
        SendMessages({
          id: tempId, 
          value,
          currentUser,
          selectedUser
        })

        
       
  }

  const handleEnter = (e:React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleClick()
  }
  }
    

  const autoResize = (event:React.FormEvent<HTMLTextAreaElement>) => {
    const e = event.currentTarget
    e.style.height = 'auto';
    e.style.height = (e.scrollHeight-6) + 'px';

     const currentUser = session.data?.user
        if (!currentUser || !selectedUser) return

        const chatId = getChatId(currentUser.uid, String(selectedUser.id)) // общий id
    
    // статус печатает
    update(ref(database, `typing/${chatId}/${session.data?.user.uid}`) ,   {
      prints: 1
    })



    
  }



  const handleChangeInput = (event:React.FormEvent<HTMLTextAreaElement>) => {
    const e = event.currentTarget
    setValue(e.value) 

    // update данных при change и спустя секунду если не пишет, то меняем state

  }

// отмена статуса печатает
  useEffect(()=> {
  const timeId = setTimeout(()=>{
     const currentUser = session.data?.user
      if (!currentUser || !selectedUser) return

        const chatId = getChatId(currentUser.uid, String(selectedUser.id)) // общий id

    update(ref(database, `typing/${chatId}/${session.data?.user.uid}`) ,   {
      prints:0
    })
  }, 4000)
  

  return () => clearTimeout(timeId)


  }, [value])

    return (
        <div className="input">
            {selectedUser && (
                <div className="input">
            <textarea  className='input-inner' placeholder='Введите сообщение'   rows={1}
            value={value} onChange={handleChangeInput} onKeyDown={handleEnter} onInput={autoResize}/>
            <img height = {20} width = {20} src="Send.svg" alt="Sendddddddd" className='input-enter' onClick={handleClick} />
            </div>
            )}
            </div>
    )
}

export default MessageInput