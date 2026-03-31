'use client'
import Chat from '../components/block/Chat/Chat'
import '@/app/App.scss'
import Sidebar from '../components/layout/Sidebar/Sidebar'
import Content from '../components/layout/Content/Content'
import SearchBar from '../components/layout/SearchBar/SearchBar'
import TopBar from '../components/layout/TopBar/TopBar'
import Messages from '../components/layout/Messages/Messages'
import { ChatProvider } from '../store/ChatContext';
import MessageInput from '../components/layout/MessageInput/MessageInput'
import ChatListContainer from '../components/block/ChatListContainer/ChatListContainer'
import { useChatMode, usesChatStore } from '../store/StateManagment'
import SliderTabs from '../components/block/SliderTabs/SliderTabs'
import SettingsPanel from '@/components/layout/SettingsPanel/SettingsPanel'

function Home() {   
  const mode = useChatMode(state => state.mode)
  const setMode = useChatMode(state => state.setMode)
  const selectedUser = usesChatStore(state => state.selectedUser)

  let renderSlider = 0
  if (mode !== 'defoult' && (mode !== 'defoult' && selectedUser)){
    renderSlider = 1
  }
  return (
    <ChatProvider>
     <Content>
          <Sidebar >
            <SearchBar/>
              {renderSlider > 0 && (
                <SliderTabs mode={mode} setMode={setMode} />
)}
            <ChatListContainer searchMode = {mode}/>
          </Sidebar>
          <Chat>
            <TopBar/>  
            {/* придумал бизнес идею еще Ai ассистент в чатах...  как ответить лучше, поиск сообщений, например паролей и т.д. */}
            <Messages/>
            <MessageInput />
            <SettingsPanel/>
          </Chat>
     </Content>
    </ChatProvider>
  )
 
}

export default Home