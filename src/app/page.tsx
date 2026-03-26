'use client'
import { useState } from 'react'
import Chat from '@/widgets/Chat/Chat'
import '@/app/App.scss'
import Sidebar from '@/widgets/Sidebar/Sidebar'
import Content from '@/widgets/Content/Content'
import SearchBar from '@/section/SearchBar/SearchBar'
import TopBar from '@/section/TopBar/TopBar'
import Messages from '@/widgets/Messages/Messages'
import { ChatProvider } from '@/ChatContext';
import MessageInput from '@/section/MessageInput/MessageInput'
import ChatListContainer from '@/widgets/ChatListContainer/ChatListContainer'
import { useChatMode, usesChatStore } from '@/StateManagment'
import SliderTabs from '@/components/SliderTabs/SliderTabs'
function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   
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
          </Chat>
     </Content>
    </ChatProvider>
  )
 
}

export default Home