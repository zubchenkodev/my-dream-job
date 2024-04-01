import { Link } from 'react-router-dom'
import { PageTitle, RegisterForm } from '../../components'

const Registration = () => {
  return (
    <section className='h-screen bg-bgLight px-4'>
        <div className="mx-auto flex flex-col sm:w-[500px] h-full justify-center items-center gap-4">
            <img src="./assets/icons/logo-icon.svg" alt="Logo" className="w-[300px] mb-4" />
            <PageTitle title={"Create new account"}/>
            <p className="text-fontDark small-medium md:base-regular">Please, enter your details</p>
            <RegisterForm/>
            <div>
              <p className="text-fontDark">Already have an account? <span className='mdjLink'><Link to="/login">Log in!</Link></span></p>
            </div>
        </div>
    </section>
  )
}

export default Registration