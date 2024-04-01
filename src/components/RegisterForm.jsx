import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerNewUser } from '../features/auth/authSlice';


const RegisterForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {isLoading, error} = useSelector(state => state.auth);

  const {register, handleSubmit, formState, getValues, reset} = useForm();
  const {errors} = formState;


  const onSubmit = async ({name, email, password}) => {
    dispatch(registerNewUser({name, email, password}))
    if(!error){
      navigate('/')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-bgWhite rounded-lg shadowMedium p-4 w-full">
    <div className='mdjFormControl'>
        <label htmlFor="name" className="mdjLabel">Name:</label>
        <input 
          type="text" 
          className="mdjInput" 
          id="name" 
          name="name"
          disabled={isLoading}
          {...register('name', {required: 'This field is required'})}
          />
          {errors.name && 
            <div className="label">
                <span className="label-text-alt text-error">{errors.name.message}</span>
            </div>
          }
    </div>
    <div className='mdjFormControl'>
      <label htmlFor="email" className="mdjLabel">Email:</label>
        <input 
          type="email" 
          className="mdjInput" 
          id="email" 
          name="email"
          disabled={isLoading}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please, provide a valid email address"
            }
          })}
        />
        {errors.email && 
          <div className="label">
              <span className="label-text-alt text-error">{errors.email.message}</span>
          </div>
        }
    </div>
    <div className='mdjFormControl'>
        <label htmlFor="password" className="mdjLabel">Password (min 8 characters):</label>
        <input 
          type="password" 
          className="mdjInput" 
          id="password" 
          name="password"
          disabled={isLoading}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long"
            }
          })}
        />
        {errors.password && 
          <div className="label">
              <span className="label-text-alt text-error">{errors.password.message}</span>
          </div>
        }
    </div>
    <div className='mdjFormControl'>
        <label htmlFor="passwordConfirm" className="mdjLabel">Confirm Password:</label>
        <input 
          disabled={isLoading}
          type="password" 
          className="mdjInput" 
          id="passwordConfirm" 
          name="passwordConfirm"
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) => value === getValues().password || "Passwords need to match"
          })}
        />
        {errors.passwordConfirm && 
          <div className="label">
              <span className="label-text-alt text-error">{errors.passwordConfirm.message}</span>
          </div>
        }
    </div>
    <div className="py-4 flex gap-4 w-full justify-end">
      <button disabled={isLoading} type='reset' className="mdjButtonSecondary" onClick={reset}>Cancel</button>
      <button disabled={isLoading} className="mdjButtonPrimary">Sign up</button>
    </div>
    

    </form>
  )
}

export default RegisterForm