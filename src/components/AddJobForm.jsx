import { useForm } from 'react-hook-form';
import { jobStatuses, jobTypes } from '../consts';
import { addJob, editJob } from '../features/job/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddJobForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user} = useSelector(state => state.auth);
    const {id: user_id} = user;

    
    // the job to edit
    const selectedJob = useSelector((store) => store.job);
    const { editJobId, isEditing: isEditing, ...editValues } = selectedJob;
    
    const { register, handleSubmit, formState } = useForm({
        defaultValues: isEditing ? editValues : {},
    });

    
    const { errors } = formState; 

    const onSubmit = (data) => {
        if (isEditing) {
            
            const editedJobData = {
                ...data,
                id: editJobId
            };

            dispatch(editJob(editedJobData));
            navigate('/all-jobs');
            return;
        }

        const jobData = {
            ...data,
            user_id
        }

        dispatch(addJob(jobData));
        navigate('/all-jobs');
    }

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="bg-bgWhite rounded-lg shadowMedium p-4">
            <div className=" grid grid-col-1 gap-1">
            <div className='mdjFormControl'>
                <label htmlFor="company" className="mdjLabel">Company Name:</label>
                <input 
                    className="mdjInput"
                    type="text" 
                    name="company" 
                    id='company' 
                    {...register('company', { required: 'Company name is required' })}
                />
                {errors.company && 
                    <div className="label">
                        <span className="label-text-alt text-error">{errors.company.message}</span>
                    </div>
                }
            </div>
            <div className='mdjFormControl'>
                <label htmlFor="position" className="mdjLabel">Position:</label>
                <input 
                    className="mdjInput"
                    type="text" 
                    name="position" 
                    id='position' 
                    {...register('position', { required: 'Position is required' })}
                />
                {errors.position && 
                    <div className="label">
                        <span className="label-text-alt text-error">{errors.position.message}</span>
                    </div>
                }
            </div>
            <div className='mdjFormControl'>
                <label htmlFor="location" className="mdjLabel">Location:</label>
                <input 
                    className="mdjInput"
                    type="text" 
                    name="location" 
                    id='location' 
                    {...register('location', { required: 'Location is required' })}
                />
                {errors.location && 
                    <div className="label">
                        <span className="label-text-alt text-error">{errors.location.message}</span>
                    </div>
                }
            </div>
            </div>
            <div className="grid gap-1 lg:grid-cols-2">
                <div className='mdjFormControl'>
                    <label htmlFor="type" className="mdjLabel">Type:</label>
                    <select 
                        className="mdjSelect"
                        name='type' 
                        id='type' 
                        {...register('type')}>
                        {jobTypes.map((jobType, index) => (
                            <option key={index} value={jobType}>{jobType}</option>
                        ))}
                    </select>
                </div>
                <div className='mdjFormControl'>
                    <label htmlFor="status" className="mdjLabel">Status:</label>
                    <select 
                        className="mdjSelect"
                        name='status' 
                        id='status' 
                        {...register('status')}>
                        {jobStatuses.map((jobStatus, index) => (
                            <option key={index} value={jobStatus}>{jobStatus}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex flex-col py-2 gap-2">
                <div className='mdjFormControlHorizontal'>
                    <input 
                        className='mdjCheckbox'
                        type="checkbox" 
                        name="isRemote" 
                        id="isRemote" 
                        {...register('isRemote')}
                    />
                    <label htmlFor="isRemote" className="mdjLabelAlt"><span>This job is remote</span></label>
                </div>
                <div className='mdjFormControlHorizontal'>
                    <input 
                        className='mdjCheckbox'
                        type="checkbox" 
                        name="isFav" 
                        id="isFav" 
                        {...register('isFav')}
                    />
                    <label htmlFor="isFav" className="mdjLabelAlt"><span>I really like this job</span></label>
                </div>
            </div>
            <div className="flex items-end justify-end pt-4 md:pt-0">
                <button className='mdjButtonPrimary'>{isEditing ? 'Update Job' : 'Add Job'}</button>
            </div>
        </form>
    )
}

export default AddJobForm;