import { useEffect } from 'react'
import './ChatSearchResults.scss'
import { getDoc,  } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useGetDataUser } from '@/hooks/getDataUser'
import { usesChatStore, useValueSearch } from '@/StateManagment'
import ChatWindow from '@/components/ChatWindow/ChatWindow'
import { Timestamp }  from "firebase/firestore";
import ZeroState from '@/components/ZeroState/ZeroState'

interface UserFilter {
  uid: string,
  username:string | null
  email:string | null
  photoURL: string | null
  createdAt: Timestamp
}
interface UserData {
    data: UserFilter[]
}

 
const ChatSearchResults = ({data}:UserData) => {
    return (
        <>
        {data.length > 0 ? (
            data.map((user, index)=> {
            return (
                <ChatWindow key={index}
                UserParams={{
                    id: user.uid,
                    photo: user.photoURL || "",
                    username:user.username || "Без имени",
                    message: '',
                    data: ''
                    

                }}
                />
            )
        })
        ): (
            <ZeroState />
        )}
        </>
    )
}

export default ChatSearchResults

