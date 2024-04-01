import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../services/supabase';
import toast from 'react-hot-toast';
import { fetchJobs } from '../allJobs/allJobsSlice';

const initialState = {
    loading: false,
    error: null,
    user_id: '',
    position: '',
    company: '',
    location: '',
    typeOptions: ['full-time', 'part-time', 'internship'],
    type: 'full-time',
    statusOptions: ['applied', 'interview', 'offer', 'rejected'],
    status: 'applied',
    isRemote: false,
    isFav: false,
    isEditing: false,
    editJobId: '',
}

export const addJob = createAsyncThunk(
    'job/addJob',
    async (jobData, thunkAPI) => {
        try {
            const { data, error } = await supabase
            .from('jobs')
            .insert(jobData)
            .single()
    
            if (error) {
                throw error;
            }
          
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const deleteJob = createAsyncThunk(
    'job/deleteJob',
    async (jobId, thunkAPI) => {
        try {
            const { data, error } = await supabase
            .from('jobs')
            .delete()
            .eq('id', jobId)
            .single()

            if (error) {
                throw error
            }
            thunkAPI.dispatch(fetchJobs());
            return data;
        }
        catch (error) {
            return (error.message);
        }
    }
)

export const editJob = createAsyncThunk(
    'job/editJob',
    async (jobData, thunkAPI) => {
        try {
            const { data, error } = await supabase
            .from('jobs')
            .update({
                company: jobData.company,
                location: jobData.location,
                position: jobData.position,
                type: jobData.type,
                status: jobData.status,
                isRemote: jobData.isRemote,
                isFav: jobData.isFav
            })
            .eq('id', jobData.id)
            .single()

            if (error) {
                throw error
            }
            thunkAPI.dispatch(clearValues());
            
            return data;
        }
        catch (error) {
            return (error.message);
        }
    }
)

export const toggleFav = createAsyncThunk(
    'job/toggleFav',
    async (jobId, thunkAPI) => {
        try {
            const { data: currentJob, error: fetchError } = await supabase
                .from('jobs')
                .select('isFav')
                .eq('id', jobId)
                .single();

            if (fetchError) {
                throw fetchError;
            }

            const { data, error } = await supabase
                .from('jobs')
                .update({
                    isFav: !currentJob.isFav
                })
                .eq('id', jobId)
                .single();

            if (error) {
                throw error;
            }

            return data;
        }
        catch (error) {
            return (error.message);
        }
    }    
)





const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        clearValues: () => {
            return {initialState};
        },
        setEditJob: (state, action) => {
            return { ...state, isEditing: true, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(addJob.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(addJob.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
            toast.success("New job successfully added!");
          })
          .addCase(addJob.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error("New job could not be added!");
          })
          .addCase(deleteJob.fulfilled, (state, action) => {
            toast.success("Job successfully deleted!");
          })
          .addCase(deleteJob.rejected, (state, action) => {
            toast.error("Cannot delete job!");
          })
          .addCase(editJob.pending, (state) => {
            state.loading = true;
          })
          .addCase(editJob.fulfilled, (state) => {
            state.loading = false;
            toast.success('Job successfully edited!');
          })
          .addCase(editJob.rejected, (state, action) => {
            state.loading = false;
            toast.error('Cannot edit job!');
          })
          .addCase(toggleFav.fulfilled, (state, action) => {
            toast.success('Job successfully toggled!');
          })
          
          
    },
})

export default jobSlice.reducer;
export const { clearValues, setEditJob } = jobSlice.actions;