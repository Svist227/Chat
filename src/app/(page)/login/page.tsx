'use client'
import { useRouter } from 'next/navigation'
import './login.scss'
import {app, firestore} from '@/firebase'
 import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { FormEventHandler, useEffect, useState } from 'react'


import { signIn } from "next-auth/react"
import Link from 'next/link'

export default function Login(){
    const router = useRouter()
	const [error, setErrror] = useState<string>('')
    const handleClickGoogle =  () => {
        console.log('нажал')
         signIn('google',{ callbackUrl: '/' });  

    }
      const handleClickCustom:FormEventHandler<HTMLFormElement> = async (event) => {
        console.log('нажал')
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
        <main className="main">
	<div className="container">
		<section className="wrapper">
			<div className="heading">
				<h1 className="text text-large">Вход</h1>
				<p className="text text-normal">Не зарегестрированы? <span><Link href="/register" className="text text-links">Создать аккаунт</Link></span>
				</p>
			</div>
			<form name="signin" className="form" onSubmit={handleClickCustom}>
				<div className="input-control">
					<label htmlFor="email" className="input-label" hidden>Email</label> 
					<input type="email" name="email" id="email" className="input-field" placeholder="Email Address" required/>
				</div>
				<div className="input-control">
					<label htmlFor="password" className="input-label" hidden>Password</label>
					<input type="password" name="password" id="password" className="input-field" placeholder="Password" required/>
				</div>
				<div className='error-log'>
					<p> {error }</p>
				</div>
				<div className="input-control">
					{/* <a href="#" className="text text-links">Forgot Password</a> */}
					<button type="submit" name="submit" className="input-submit" >
            Sign In
          </button>
				</div>
			</form>
			<div className="striped">
				<span className="striped-line"></span>
				<span className="striped-text">Or</span>
				<span className="striped-line"></span>
			</div>
			<div className="method">
				<div className="method-control">
					<a  className="method-action" onClick = {handleClickGoogle}>
						<img src="google.svg" alt="google" className='ion ion-logo-google ' />
						<span>Sign in with Google</span>
					</a>
				</div>
			</div>
		</section>
	</div>
</main>
    )
}