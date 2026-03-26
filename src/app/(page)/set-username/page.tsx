'use client'
import { FormEventHandler } from "react"
import '../login/login.scss'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import Form from "@/widgets/Form/Form"
export default function SetUsername(){
	const router = useRouter()
	const { update } = useSession()

     const handleClickCustom:FormEventHandler<HTMLFormElement> = async (event) => {
            event.preventDefault() // остановка всплытия
            const formData = new FormData(event.currentTarget)

		    const data = Object.fromEntries(formData.entries())

            let response = await fetch('/api/set-username',{
			method: 'POST',
			headers:{
			'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(data) // преобразование в JSON
		})	

		const result = await response.json()
		console.log('result', result)
		if (result.success) {
			console.log('Username успешно обновлен')
			 await update() // обновляем сессию, чтобы получить новый username
 			 router.refresh()
			 router.push('/') // редирект на главную страницу
}
	}

    return (
<Form mode = 'setUsername' onSubmit={handleClickCustom}/>


        
    )
}