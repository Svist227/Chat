import { useChatMode, usesChatStore, useValueSearch } from '@/app/StateManagment'
import './ZeroState.scss'

const ZeroState = () => {
    const mode = useChatMode(state => state.mode)
    const value = useValueSearch(state => state.currentValue)
   let rusMode = '' 

    if (mode === 'chats') {
        rusMode = 'чатов'
    } else if (mode === 'messages') {
        rusMode = 'сообщений'
    }
    return (
        <div className='ZeroState'>
            { 
                !value
                ?
                <p className='h4'>Режим поиска {rusMode}</p>
                : <p className='h4'> Ничего не найдено</p>
            }
              
        </div>
    )
}

export default ZeroState