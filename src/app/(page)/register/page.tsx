'use client'
import { useRouter } from 'next/navigation'
import '../login/login.scss'
import Link from 'next/link'
import { FormEventHandler, useEffect, useState } from 'react'

import { signIn, signOut } from "next-auth/react"

export default function Register(){
    const router = useRouter()
		const [error, setErrror] = useState<string>('')
	
	const HandleSubmitForm:FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget) // передали теку-ий элемент ссылку
		const data = Object.fromEntries(formData.entries())
		let response = await fetch('/api/register',{
			method: 'POST',
			headers:{
			'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(data) // преобразование в JSON
		})	

		const result = await response.json() // получаем ответ

		if(result.message == 'ok'){
			console.log('Пользователь успешно зарегестрирован')
			// дальше авторизация
			const res = await signIn('credentials',{ 
          email: formData.get('email'),
          password: formData.get('password'),
          redirect: false,
         });  

		 if (res && !res.error){
          router.push('/')
          return
        } 
		}

		else if (result.message == 'no') {
			setErrror('Email уже зарегестрирован в системе')

		}
	}
    return (
        <div className="main register">
	<div className="container">
		<section className="wrapper">
			<div className="heading">
				<h1 className="text text-large">Регистрация</h1>
				        <p className="text text-normal">Есть аккаунт? <span><Link href="/login" className="text text-links">Авторизация</Link></span></p>
        
			</div>
			<form name="signin" className="form" onSubmit={HandleSubmitForm} >
				<div className="input-control">
					<label htmlFor="email" className="input-label" hidden>Email</label> 
					<input type="email" name="email" id="email" className="input-field" placeholder="Email Address" required/>
				</div>

        <div className="input-control">
					<label htmlFor="username" className="input-label" hidden>Username</label> 
					<input type="text" name="username" id="username" className="input-field" placeholder="username" required/>
				</div>

				<div className="input-control">
					<label htmlFor="password" className="input-label" hidden>Password</label>
					<input type="password" name="password" id="password" className="input-field" placeholder="Password" required/>
				</div>

        <div className="input-control">
					<label htmlFor="password2" className="input-label" hidden>Password again</label>
					<input type="password" name="password2" id="password2" className="input-field" placeholder="Password again" required/>
				</div>

				{error && (
  <div className="error-log" >
    {error}
  </div>
)}
				<div className="input-control">
					
					<button type="submit" name="submit" className="register" >
            Register
          </button>
          </div>
			</form>
			
		
		</section>
	</div>
</div>
    )

}

   