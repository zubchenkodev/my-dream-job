import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../services/supabase';

const initialFiltersState = {
    search: '',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
    type: 'all',
    typeOptions: ['full-time', 'part-time', 'internship'],
    status: 'all',
    statusOptions: ['applied', 'interview', 'offer', 'rejected'],
    isRemote: false,
    isFav: false
};

const initialState = {
    jobs: [],
    loading: false,
    error: null, 
    currentPage: 1,
    pageSize: 8, 
    jobsCount: 0,
    ...initialFiltersState
}

export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async(_, thunkAPI) => {
        const {sort, type, status, isFav, isRemote, search, currentPage, pageSize} = thunkAPI.getState().jobs;

        const sortBy = sort === 'latest' || sort === 'oldest' ? 'created_at' : 'company';

        const sortOrder = sort === 'oldest' || sort === 'a-z';

        let query = supabase.from('jobs').select('*', { count: 'exact' }).order(sortBy, { ascending: sortOrder });

        const user_id = thunkAPI.getState().auth.user.id;

        console.log(user_id);

        query = query.eq('user_id', user_id);

        if (type !== 'all') {
            query = query.eq('type', type);
        }

        if (status !== 'all') {
            query = query.eq('status', status);
        }

        if(isFav){
            query = query.eq('isFav', true);
        }

        if(isRemote){
            query = query.eq('isRemote', true);
        }

        if (search) {
            query = query.filter('company', 'ilike', `%${search}%`);
        }

        const offset = (currentPage - 1) * pageSize;

        query = query.range(offset, offset + pageSize - 1);

       
        
        try {
            const { data: jobs, count, error } = await query
            if (error) {
                throw error;
            }
            return { jobs, count };
        }
        catch(error) {
            console.log(error);
        }
    }
);

export const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setSort: (state, action) => {
            state.sort = action.payload;
        },
        setType: (state, action) => {
            state.type = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setIsFav: (state, action) => {
            state.isFav = !state.isFav;
        },
        setIsRemote: (state, action) => {
            state.isRemote = !state.isRemote;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        clearFilters: (state) => {
            return { ...state, ...initialFiltersState };
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchJobs.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchJobs.fulfilled, (state, action) => {
            state.loading = false;
            state.jobs = action.payload.jobs;
            state.jobsCount = action.payload.count;
        })
        .addCase(fetchJobs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})

export const {
    setSort,
    setType,
    setStatus,
    setIsFav,
    setIsRemote,
    setSearch,
    clearFilters,
    setCurrentPage
} = jobsSlice.actions;

export default jobsSlice.reducer;

