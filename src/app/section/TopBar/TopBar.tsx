
import './TopBar.scss'
import {useChatMode, useChatsOpen, useCurrentUser, useFocusStore, useValueSearch} from '@/app/StateManagment';
import { getAuth,  } from "firebase/auth"
import { useRouter } from 'next/navigation'
import { usesChatStore } from '@/app/StateManagment'
import {app, auth, firestore} from '@/firebase'
import {set, onValue, ref, getDatabase} from 'firebase/database'
import realtime, {setTyping} from '@/lib/realtime_db';
import { useEffect, useState } from 'react';
import formatRelativeDate from '@/lib/formatDate';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { getChatId } from '@/app/utils/getChatId';
const   TopBar = () => {
   const MenuOpen = useChatsOpen(state => state.setIsChatsOpen)
    let selectedUser = usesChatStore(state => state.selectedUser)
    const [status, setStatus] = useState<string>()
    const [lastLogin, setLastLogin] = useState<number | null>(null)
    const [print, setPrint] = useState<number | null>(null)
    const session = useSession()
    const currentUser = session.data?.user
    const setMode = useChatMode(state => state.setMode)
    const value = useValueSearch(state => state.currentValue)
    const {triggerFocus}  = useFocusStore();

    // Realtime database запись текущего пользователя
    useEffect(() => {
        if (!currentUser) return
        realtime(currentUser.uid)
}, [currentUser])

    useEffect(()=>{
        if (!currentUser) return
        if (!selectedUser?.id) return
        const chatId = getChatId(currentUser.uid, String(selectedUser.id)) // общий id
        setTyping(chatId, currentUser.uid)


},[selectedUser,currentUser])
    
    // Realtime database чтение выбранного пользователя онлайн ли?
    useEffect(() => {
    const database = getDatabase();
    const statusref = ref(database, 'status/' + selectedUser?.id )

    // чтение данных
    const unsub = onValue(statusref, (snapshot) => {
        const data = snapshot.val()
        setStatus(data?.state ?? null)
        setLastLogin(data?.lastLogin ?? null)
    })

   

    
    return () => unsub()
    
}, [selectedUser])


    useEffect(()=>{
    if (!currentUser) return
    if (!selectedUser?.id) return
    const chatId = getChatId(currentUser.uid, String(selectedUser.id)) // общий id
    const database = getDatabase();
    const typingref = ref(database, `typing/${chatId}/${selectedUser.id}`)

     // чтение данных
    const unsub = onValue(typingref, (snapshot) => {
        const data = snapshot.val()
         setPrint(data?.prints ?? null)
    })

   

    
    return () => unsub()
}, [selectedUser])


    const handleClick = async () => {
        signOut({callbackUrl:"/login"})
        console.log('выход')
        
    }

    const handleClickSearch = (e:any) => {
        setMode('messages')
        triggerFocus()
    }


    const statusText = Boolean(print)
  ? 'печатает...'
  : status === 'online'
    ? 'online'
    : lastLogin
      ? formatRelativeDate(lastLogin)
      : 'offline';



    return (
        <>
        {/* допилить рендеринг от выбранного юзера зависит */}
        {/* selectedUser */} 
        {selectedUser && (
            <div className="topbar">
            <div className="topbar__info">
                 <img onClick={MenuOpen} className = 'topbar__info-burger'src='burger.svg' alt="button__burger" />
                {selectedUser && (
                    <img src={selectedUser?.photoURL 
                ?  selectedUser.photoURL
                : 'users/Avatar.svg'} 
                    
                //динамик
                className='topbar__info-photo' alt="photo" />
                )}
                <div className="topbar__info-description">
                    <h4>{selectedUser?.displayName}</h4> 
                    <p>{selectedUser.displayName !=='Избранное' && (statusText)}</p>
                </div>
            </div>
            <div className="topbar__icons">
                
                <img src='/exit.svg' alt='exit' onClick={handleClick} className='topbar__icons-exit'/>
                <img src="/search.svg" alt="search-message" onClick={handleClickSearch}/>
                {/* <img src="/more.svg" alt="more" /> позже вернусь */}
                 <img src="/Avatar.png" 
                className='topbar__info-photo' alt="photo" />
                
                

            </div>
        </div>
        )}
        </>
    )
}

export default TopBar