import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { logoutUser } from "../features/auth/authSlice";
import { PiSignOutBold } from "react-icons/pi";
import Avatar from "./Avatar";

const Topbar = () => {

  const dispatch = useDispatch();

  const {isLoading, user} = useSelector(state => state.auth);

  const {name, avatar} = user.user_metadata;

  const handleLogout = (e) => {
      e.preventDefault();
      dispatch(logoutUser());
  }

  return (
    <section className="sticky top-0 z-50 lg:hidden w-screen bg-fontDark">
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="flex gap-3 items-center">
          <img src="./assets/icons/logo-no-background.svg" alt="Logo" className="w-[150px] sm:w-[250px]" />
        </Link>
        <div className="flex gap-4">
          <Link to="profile" className="">
            <Avatar avatar={avatar} name={name} size='w-8' color='borderDark' textSize='text-xs'/>
          </Link>
          <button onClick={handleLogout}><PiSignOutBold className="text-borderLight w-8 h-8" /></button>
        </div>
      </div>
    </section>
  )
}

export default Topbar