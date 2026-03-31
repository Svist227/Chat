import './Chat.scss'
import {useChatsOpen} from '@/store/StateManagment';
import classNames from 'classnames';
interface ComponentProps {
    children:React.ReactNode
}
const Chat = ({children}:ComponentProps) => {
    const isMenuOpen = useChatsOpen(state => state.isChatsOpen)

    return (
        <>
       <div className = {classNames('chat', {
           'is-close': !isMenuOpen
       })}>
       {children}
       </div>
        </>
    )
}

export default Chat