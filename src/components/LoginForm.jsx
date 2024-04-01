import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";


const LoginForm = () => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {isLoading, error} = useSelector(state => state.auth);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email  || !password) {
            return;
        }
        dispatch(loginUser({email, password}));
        if(!error){navigate('/')}
    }

    return (
        <form className='bg-bgWhite rounded-lg shadowMedium p-4 w-full' onSubmit={handleSubmit}>
            <div className='mdjFormControl'>
                <label htmlFor="email" className="mdjLabel">Email:</label>
                <input 
                    type="email" 
                    className="mdjInput" 
                    id="email"
                    name="email"
                    autoComplete="username"
                    value={email}
                    disabled={isLoading}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='mdjFormControl'>
                <label htmlFor="password" className="mdjLabel">Password:</label>
                <input 
                    type="password"
                    className="mdjInput"
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    disabled={isLoading}
                    onChange={(e) => setPassword(e.target.value)}
                />  
            </div>
            <div className="py-4 flex gap-4 w-full justify-end">
                <button disabled={isLoading} type='reset' className="mdjButtonSecondary">Cancel</button>
                <button disabled={isLoading} type='submit' onClick={handleSubmit} className="mdjButtonPrimary">Login</button>
            </div>
        </form>
    )
}

export default LoginForm