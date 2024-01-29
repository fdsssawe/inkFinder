import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AuthService from '../services/AuthService';
import { API_URL } from '../http';


const initialState = {
  user: {},
  isAuth: false,
  isLoading: false,
  isOpen : false
};

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  try{
  const response = await AuthService.login(email, password);

  localStorage.setItem('token', response.data.accessToken);
  setAuth(true)
  setUser(response.data.user)
  window.location = 'https://inkfinder.vercel.app/' 
  return response.data.user;
  }
  catch(e){
    throw new Error(e.response?.data?.message);
  }
});

export const registration = createAsyncThunk('auth/registration', async ({ email, password }) => {
  try{
    const response = await AuthService.registration(email, password);

    localStorage.setItem('token', response.data.accessToken);
    setAuth(true)
    setUser(response.data.user)
    window.location = 'https://inkfinder.vercel.app/'
    return response.data.user;
  }
  catch(e){
    throw new Error(e.response?.data?.message);
  }
});

export const googleAuthHandle = createAsyncThunk('auth/googleAuthHandle', async ({ email, password }) => {
  try{
    const response = await AuthService.googleAuthHandle(email, password);

    if(response.job == "registration"){
      localStorage.setItem('token', response.response.data.accessToken);
      setAuth(true)
      setUser(response.response.data.user)
      window.location = 'https://inkfinder.vercel.app/'
      return response.response.data.user;
    }
    else{
        localStorage.setItem('token', response.response.data.accessToken);
        setAuth(true)
        setUser(response.response.data.user)
        window.location = 'https://inkfinder.vercel.app/' 
        return response.response.data.user;
    }
  }
  catch(e){
    throw new Error(e.response?.data?.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await AuthService.logout();
  localStorage.removeItem('token');
  setAuth(false)
  setUser({})
});

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  setLoading(true)
  const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
  localStorage.setItem('token', response.data.accessToken);
  setLoading(false)
  return response.data.user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsOpen(state , action) {
      state.isOpen = action.payload
    },
    setAuth(newAuth) {
      state.isAuth = newAuth
    },
    setLoading(newLoading) {
      state.isLoading = newLoading
    },
    setUser(user) {
      state.user = user
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    [registration.pending]: (state) => {
      state.isLoading = true;
    },
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [logout.pending]: (state) => {
      state.isLoading = true;
    },
    [registration.fulfilled]: (state , action) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    [logout.fulfilled]: (state) => {
      state.isAuth = false;
      state.user = {} ;
    },
    [checkAuth.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    [login.rejected]: (state) => {
      console.log('Error logging in');
    },
    [registration.rejected]: (state) => {
      console.log('Error registering');
    },
    [logout.rejected]: (state) => {
      console.log('Error logging out');
    },
    [checkAuth.rejected]: (state) => {
      console.log('Error checking authentication');
    },
  },
});

export const { setAuth, setUser, setLoading , setIsOpen} = authSlice.actions;
export default authSlice.reducer;
