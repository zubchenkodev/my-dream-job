import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className='flex'>
        <div className='flex-1'>
            <Outlet/>
        </div>
        <div className='hidden md:block flex-1'>
            
        </div>
    </div>
  )
}

export default AuthLayout