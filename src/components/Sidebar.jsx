import { Link } from 'react-router-dom'
import NavLinks from './NavLinks'
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { logoutUser } from '../features/auth/authSlice';
import Avatar from './Avatar';



const Sidebar = () => {

    const dispatch = useDispatch();

    const {isLoading, user} = useSelector(state => state.auth);

    const {name, position, avatar} = user.user_metadata;

    console.log(user)

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logoutUser());
    }
  
    return (
        <aside className="hidden lg:flex py-4 flex-col justify-between bg-borderDark w-full" >
            <div className="flex flex-col gap-8">
              <div className="px-4">
                <Link to='/'>
                  <img src="./assets/icons/logo-icon.svg" alt="Logo" className="w-[260px]" />
                </Link>
              </div>
              {isLoading ? 
                (
                  <Loader />)
                :
                (
                  <div className="px-4">
                    <Link to='profile'>
                      <div className="flex items-start gap-4 flex-wrap">
                      <Avatar avatar={avatar} name={name} size='w-12' color='fontDark'/>
                      <div className="flex flex-col text-fontDark">
                        <p className="font-bold text-lg break-all alata-regular">{name}</p>
                        {position && <p className="text-sm font-light break-all">{position}</p>}
                      </div>
                      </div>
                    </Link>
                  </div>
                )
              }
              <NavLinks />
            </div>
            <div className="px-4">
              <button className='mdjButtonPrimary w-full' onClick={handleLogout} disabled={isLoading} >Log Out</button>
            </div>
        </aside>
    )
  
}

export default Sidebar