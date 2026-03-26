import classNames from 'classnames';
import ChatList from '../ChatList/ChatList'
import SearchBar from '../../section/SearchBar/SearchBar'
import {useChatsOpen} from '@/StateManagment';
import './Sidebar.scss'
interface ComponentProps {
    fun:boolean,
    children: React.ReactNode;
}
const Sidebar:any = ({children}:ComponentProps) => {
    const isMenuOpen = useChatsOpen(state => state.isChatsOpen)
    return (
        <>
            <div className={classNames('sidebar', {
                'is-close': isMenuOpen
            })}
            
            >
                {children}
                
            </div>
        </>
    )
}

export default Sidebar