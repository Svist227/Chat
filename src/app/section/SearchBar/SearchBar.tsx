import { useEffect, useState } from 'react'
import './SearchBar.scss'
import { useGetDataUser } from '@/app/hooks/getDataUser'
import { useChatMode, useFocusStore, useValueSearch } from '@/app/StateManagment'
import { useRef } from 'react';

const SearchBar = () => {
    const {users, mychats} = useGetDataUser()
    console.log(users)


    if(!users){
        console.log('Нет данных')
        
    }



    const setMode = useChatMode(state => state.setMode)
    const mode = useChatMode(state => state.mode)
    console.log('мод:', mode)
    const value = useValueSearch(state => state.currentValue)
    const setValue = useValueSearch(state => state.setValue)
    const inputRef = useRef<HTMLInputElement>(null);
    const {focusSearch, triggerFocus} = useFocusStore()
    const handleChangeInput = (e:React.FormEvent<HTMLInputElement>) => {
    const event = e.currentTarget
    setValue(event.value)
    }

    // фильтрация по имени
    useEffect(() => {
   
    if(mode!= 'messages' && mode != 'defoult') return setMode('chats') // не работает что-то
    // если крик произошел на элементе searchbar__input-inner то chats иначе ь    
}, [value, mode])

    useEffect(() => {
        if (focusSearch){
            inputRef.current?.focus()
             triggerFocus()
        }
    }, [focusSearch])
    
    const handleCLickCross = () => {
        setValue('')
        setMode('defoult')
    }

    const handleBack = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !value) {
            setMode('defoult')
            e.currentTarget.blur()

  }

    }

    const handleClickValue = () => {
        setMode('chats')
    }   


    return (
        <>
        <div className="searchbar">
             <div className="searchbar__burger">
                  
            </div>
            <div className="searchbar__input" >
            
            <input className='searchbar__input-inner' 
            type="text" placeholder='Search' onChange={handleChangeInput} 
            value={value} onClick={handleClickValue} onKeyDown={handleBack} 
            ref={inputRef}
            />

            {mode != 'defoult' && (
                <img src="cross.svg" alt="nn" className='searchbar__input-img' onClick={handleCLickCross}/>

            )}
            </div>
            
        </div>
        </>
    )
}

export default SearchBar