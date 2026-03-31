import classNames from 'classnames';
import ChatList from '../../block/ChatList/ChatList'
import SearchBar from '../SearchBar/SearchBar'
import {useChatsOpen} from '@/store/StateManagment';
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