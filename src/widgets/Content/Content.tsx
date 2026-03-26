import { useState, useEffect} from 'react';
import { stringify } from 'querystring'
import './Content.scss'
import { useSession } from 'next-auth/react';
import {app, firestore} from '@/app/firebase'
 import { getAuth } from "firebase/auth"
import { signInWithCustomToken } from 'firebase/auth'
import { auth } from '@/app/firebase'
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore"
import {useChatsOpen, usesChatStore, useCurrentUser} from '@/StateManagment';


interface ComponentProps {
    children: React.ReactNode;
}
const Content = ({children}: ComponentProps) => {
     const session = useSession()   
     console.log('Сессия', session)
      // в этом эффекте нужно как то узнать авторизовался ли я.   для этого нужно гетдок на uid user. а как узнать uid текущего пользователя? его нет в сессии. он
        useEffect(() => {
        if (session.status !== 'authenticated') return
        console.log(session)

        const run = async () => {
        const userRef = doc(firestore, "users", session.data.user.uid)
        console.log('Текущий id', session.data.user.uid)
        const chatSnap = await getDoc(userRef)
          
        if(!chatSnap.exists()){
        console.log('Создаем user')
        const res = await fetch('/api/debug-admin')
        const { token } = await res.json()
        await signInWithCustomToken(auth, token) 


        }


    }
        if (session) { // да, но выполняется множ-во раз.
        run()
  }
  else{
    console.log('Не создаем')
  }
}, [session])




    return (
        <>
        <div className="content">
            {children}
        </div>
        </>
    )
}

export default Content