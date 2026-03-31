import './ChatSearchResults.scss'
import ChatWindow from '@/components/block/ChatWindow/ChatWindow'
import { Timestamp }  from "firebase/firestore";
import ZeroState from '@/components/block/ZeroState/ZeroState'

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

