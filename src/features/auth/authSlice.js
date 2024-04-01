import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from '../../services/supabase';
import { supabaseUrl } from '../../services/supabase';
import toast from "react-hot-toast";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../services/localstorage";


let initialState = {
    user: getUserFromLocalStorage(),
    isLoading: false,
    error: null,
    isAuthenticated: false
}

export const registerNewUser = createAsyncThunk(
    'auth/registerNewUser',
    async(userData) => {
        try{
            let { data, error } = await supabase
            .auth
            .signUp({
                email: userData.email,
                password: userData.password,
                options: {
                    data: {
                        name: userData.name,
                        avatar: '',
                        profession: '',
                        skills: [],
                        bio: ''
                    }
                }
            })
            if (error) {
                throw error;
            }
            return data;
        }
        catch(error) {
            console.log(error.message);
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async(userData, { rejectWithValue }) =>{  
       try{
        const {data, error} = await supabase
        .auth
        .signInWithPassword({
            email: userData.email,
            password: userData.password
        })
        if(error) {
            throw error;    
        }
        return data;
        }
        catch(error) {
            return rejectWithValue(error); 
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async() => {
        try{
            await supabase.auth.signOut();
            return true;
        }
        catch(error) {
            console.log(error.message);
        }
    }
)

export const updateUserData = createAsyncThunk(
    'auth/updateUserData',
    async(userData) => {
        // upload avatar image to storage
        
        if(userData.avatar){
            const fileName = `avatar-${Math.random()}`;
            console.log(userData.avatar);

            const {error: storageError} = await supabase
                .storage
                .from('avatars')
                .upload(fileName, userData.avatar);

            if (storageError) throw new Error(storageError.message);

            userData.avatar = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;
        }
        


        const skillsArray = userData.skills ? userData.skills.split(',').map(skill => skill.trim()) : [];  
        
        try{
            let {data, error} = await supabase
            .auth
            .updateUser({
                data: { 
                    name: userData.name,
                    position: userData.position,
                    //avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
                    ...(userData.avatar && { avatar: userData.avatar }),
                    skills: skillsArray,
                    bio: userData.bio
                }
            })
            
            if(error) {
                throw error;
            }
            
            return data;
        }
        catch(error) {
            console.log(error.message);
        }
    }
)

export const updateUserCredentials = createAsyncThunk(
    'auth/updateUserCredentials',
    async ({password}, { rejectWithValue }) => {

        try{
            const {data, error} = await supabase.auth.updateUser({
                password: password
            });

            if(error) {
                throw error;
            }

            return data;
        }
        catch(error) {
            return rejectWithValue(error); 
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(registerNewUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(registerNewUser.fulfilled, (state, action)=>{
            const {user} = action.payload;
            console.log(user);
            state.isLoading = false;
            state.isAuthenticated = true;
            state.error = null;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Welcome to MyJobs, ${user.user_metadata.name}!`);
        })
        .addCase(registerNewUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            toast.error('Something went wrong');
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            const {user} = action.payload;
            state.isLoading = false;
            state.isAuthenticated = true;
            state.error = null;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Welcome back, ${user.user_metadata.name}!`);
            
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            if (action.payload && action.payload.message) {
                toast.error(action.payload.message); // Display the error message if available
            } else {
                toast.error('Something went wrong'); // Fallback error message
            }
        })
        .addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.error = null;
            state.user = null;
            removeUserFromLocalStorage();
            toast.success('You have been logged out');
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            toast.error('Something went wrong');
        })
        .addCase(updateUserData.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUserData.fulfilled, (state, action) => {
            const {user} = action.payload;
            state.isLoading = false;
            state.isAuthenticated = true;
            state.error = null;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Your data was successfully updated!`);
        })
        .addCase(updateUserData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            toast.error('Something went wrong');
        })
        .addCase(updateUserCredentials.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUserCredentials.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            toast.success(`Your data was successfully updated!`);
        })
        .addCase(updateUserCredentials.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload.message);
        })
        
    }
})



//export const {  } = authSlice.actions;

export default authSlice.reducer;

