'use client'
import { useRouter } from 'next/navigation'
import './login.scss'
import { FormEventHandler,  useState } from 'react'


import { signIn } from "next-auth/react"
import Form from '@/components/block/Form/Form'

export default function Login(){
    const router = useRouter()
	const [error, setErrror] = useState<string>('')
    const handleClickGoogle =  () => {
         signIn('google',{ callbackUrl: '/' });  
    }
    const handleLogin:FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault() // остановка всплытия
        

        const formData = new FormData(event.currentTarget)

        const res = await signIn('credentials',{ 
          email: formData.get('email'),
          password: formData.get('password'),
          redirect: false,
         });  

        if (res && !res.error){
          router.push('/')
          return
        } 

		if(res?.error === 'USE_GOOGLE_LOGIN'){
			setErrror('пользователь зарегистрирован через Google')
		} else  setErrror('Неверный логин или пароль')
      

    }

   

    return (

<Form mode = 'signin' onSubmit={handleLogin} onSubmitGoogle={handleClickGoogle} errorLog = {error} />
    )
}