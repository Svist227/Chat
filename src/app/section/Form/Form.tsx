import Link from 'next/link'
import './Form.scss'


const data = {
  register: {
    label: 'Регистрация',
    question: 'Есть аккаунт?',
    link: 'Авторизация',
    labelButton: 'Зарегестрироваться',
    href: '/login'
  },
   signin: {
    label: 'Вход',
    question: 'Не зарегестрированы?',
    link: 'Создать аккаунт',
    labelButton: 'Войти',

    href: '/register'
},
  setUsername: {
    label: 'Ввдите ваш username',
    question: '',
    link: '',
    labelButton: 'Сохранить',
    href: ''
  }
}

interface dataMode {
  mode: 'register' | 'signin' | 'setUsername',
  errorLog?: string
  onSubmitGoogle?: () => void
  onSubmit?: React.FormEventHandler<HTMLFormElement>
}


const Form = ({ mode, errorLog, onSubmitGoogle, onSubmit }:dataMode) => {
  const { label, question, link, labelButton ,href } = data[mode];

  return (
     <main className="main">
	<div className="container">
		<section className="wrapper">
			<div className="heading">
				<h1 className="text text-large">{label}</h1>
				<p className="text text-normal">{question} <span><Link href={href} className="text text-links">{link}</Link></span>
				</p>
			</div>
			<form name="signin" className="form" onSubmit={onSubmit} >
				{mode !== 'setUsername' && (
          <div className="input-control">
					<label htmlFor="email" className="input-label" hidden>Email</label> 
					<input type="email" name="email" id="email" className="input-field" placeholder="Email" required/>
				</div>
        )}
         {mode !== 'signin' && (
          <div className="input-control">
					<label htmlFor="username" className="input-label" hidden>Username</label> 
					<input type="text" name="username" id="username" className="input-field" placeholder="username" required/>
				</div>
         )}
				{mode !== 'setUsername' && (
          <div className="input-control">
					<label htmlFor="password" className="input-label" hidden>Password</label>
					<input type="password" name="password" id="password" className="input-field" placeholder="Password" required/>
				</div>
        )}
        {mode === 'register' && (
          <div className="input-control">
					<label htmlFor="password2" className="input-label" hidden>Password again</label>
					<input type="password" name="password2" id="password2" className="input-field" placeholder="Password again" required/>
				</div>
        )}
				<div className='error-log'>
					<p> {errorLog }</p>
				</div>
				<div className="input-control">
					{/* <a href="#" className="text text-links">Forgot Password</a> */}
					<button type="submit" name="submit" className="input-submit" >
            {labelButton}
          </button>
				</div>
			</form>
		    {mode === 'signin' && (
          <div className="method">
				<div className="method-control">
					<a  className="method-action" onClick = {onSubmitGoogle}>
						<img src="google.svg" alt="google" className='ion ion-logo-google ' />
						<span>Sign in with Google</span>
					</a>
				</div>
			</div>
        )}
		</section>
	</div>
</main>
    )
}

export default Form
