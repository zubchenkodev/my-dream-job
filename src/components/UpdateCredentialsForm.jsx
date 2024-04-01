import PageSubtitle from "./PageSubtitle"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserCredentials } from "../features/auth/authSlice";
import toast from "react-hot-toast";


const UpdateCredentialsForm = () => {

  const dispatch = useDispatch();
  
  const {isLoading, error} = useSelector(state => state.auth);

  const {register, handleSubmit, formState, getValues, reset} = useForm();
  const {errors} = formState;

  const onSubmit = ({password}) => {
    dispatch(updateUserCredentials({ password }))
  }


  return (
    <div className="flex flex-col gap-4">
        <PageSubtitle title='Update Your Credentials'/>
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="bg-bgWhite rounded-lg shadowMedium p-4"
        >
        <div className="mdjFormControl">
          <label className="mdjLabel" htmlFor="password">New Password:</label>
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
            <div className="mdjLabelAlt pt-1">
                <span className="text-error">{errors.password.message}</span>
            </div>
          }
        </div>
        <div className="mdjFormControl">
          <label className="mdjLabel" htmlFor="passwordConfirm">Repeat New Password:</label>
          <input 
          type="password" 
          className="mdjInput" 
          id="passwordConfirm" 
          name="passwordConfirm"
          disabled={isLoading}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) => value === getValues().password || "Passwords need to match"
          })}
          />
          {errors.passwordConfirm && 
            <div className="mdjLabelAlt pt-1">
                <span className="text-error">{errors.passwordConfirm.message}</span>
            </div>
          }
        </div>
        <div className="flex items-end justify-end pt-4 gap-4">
          <button type='reset' disabled={isLoading} className="mdjButtonSecondary" onClick={() => reset()}>Cancel</button>
          <button disabled={isLoading} className="mdjButtonPrimary">Submit Update</button>
        </div>
        </form>
    </div>
  )
}

export default UpdateCredentialsForm