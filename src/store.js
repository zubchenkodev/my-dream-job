import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './features/allJobs/allJobsSlice';
import jobReducer from './features/job/jobSlice';
import authReducer from './features/auth/authSlice';

export default configureStore({
  reducer: {
    jobs: jobsReducer,
    job: jobReducer,
    auth: authReducer,
  },
});