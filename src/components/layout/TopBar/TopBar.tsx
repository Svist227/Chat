
import './TopBar.scss'
import {useChatMode, useChatsOpen, useFocusStore, useSettingsPanelStore} from '@/store/StateManagment';
import { usesChatStore } from '@/store/StateManagment'
import formatRelativeDate from '@/utils/formatDate';
import { useUserStatus } from '@/hooks/useUserStatus';
import { useTypingStatus } from '@/hooks/useTypingStatus';
const   TopBar = () => {
   const MenuOpen = useChatsOpen(state => state.setIsChatsOpen)
    const selectedUser = usesChatStore(state => state.selectedUser)
   const {status, lastLogin} = useUserStatus()
   const {print} = useTypingStatus()
    const setOpenSettingsPanel = useSettingsPanelStore(state => state.toggle)
    const setMode = useChatMode(state => state.setMode)
    const {triggerFocus}  = useFocusStore();
    const isOpenMenu = useChatsOpen(state => state.setIsChatsOpen)
  
    

    const handleClickSearch = (e:any) => {
        setMode('messages')
        triggerFocus()
        isOpenMenu()

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
                    <div>{selectedUser?.username}</div> 
                    <p>{selectedUser.username !=='Избранное' && (statusText)}</p>
                </div>
            </div>
            <div className="topbar__icons">
                                <img src="/search.svg" alt="search-message" onClick={handleClickSearch}/>
                <img src="/more.svg" alt="more" onClick={setOpenSettingsPanel}/> 
                
                

            </div>
        </div>
        )}
        </>
    )
}

export default TopBar