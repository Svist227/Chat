'use client'
import { FormEventHandler } from "react"
import '../login/login.scss'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
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
            <main className="main">
	<div className="container">
		<section className="wrapper">
			<div className="heading">
				<h1 className="text text-large">Введите ваш username</h1>
			</div>
			<form name="choose-username" className="form" onSubmit={handleClickCustom}>
				<div className="input-control">
					<label htmlFor="username" className="input-label" hidden>Password</label>
					<input type="text" name="username" id="username" className="input-field" placeholder="username" required/>
				</div>
				<div className='error-log'>
					{/* <p> {error }</p> */}
				</div>
				<div className="input-control">
					{/* <a href="#" className="text text-links">Forgot Password</a> */}
					<button type="submit" name="submit" className="input-submit" >
            Sign In
          </button>
				</div>
			</form>
			
			
		</section>
	</div>
</main>

        
    )
}