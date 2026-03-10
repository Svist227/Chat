import { useEffect } from 'react'
import './ChatSearchResults.scss'
import { getDoc,  } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { useGetDataUser } from '@/app/hooks/getDataUser'
import { usesChatStore, useValueSearch } from '@/app/StateManagment'
import ChatWindow from '@/app/components/ChatWindow/ChatWindow'
import { Timestamp }  from "firebase/firestore";
import ZeroState from '@/app/components/ZeroState/ZeroState'

interface UserFilter {
  uid: string,
  displayName:string | null
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
                    name:user.displayName || "Без имени",
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

