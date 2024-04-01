import { Link } from 'react-router-dom'
import { LoginForm, PageTitle } from '../../components'

const Login = () => {
  return (
    <section className='h-screen bg-bgLight px-4'>
        <div className="mx-auto flex flex-col gap-4 sm:w-[500px] h-full justify-center items-center">
            <img src="./assets/icons/logo-icon.svg" alt="Logo" className="w-[300px] mb-4" />
            <PageTitle title={"Login to your account"}/>
            <p className="text-fontDark small-medium md:base-regular">Please, enter your details</p>
            <LoginForm/>
            <div>
              <p className="text-fontDark">Don&apos;t have an account? <span className='mdjLink'><Link to="/registration">Sign Up!</Link></span></p>
            </div>
        </div>
    </section>
  )
}

export default Login