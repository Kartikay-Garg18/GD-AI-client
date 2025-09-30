import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})
const cookieOptions = {
    expires: 1,
    path: '/'
}

export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/signup', data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)


export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/login', data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        user : null,
        token: Cookies.get('token') || null,
        isAuthenticated : !!Cookies.get('token'),
        error : null,
        isLoading : false
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            Cookies.remove('token');
        },
        setCredentials: (state, action) => {
            const {user, token} = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            state.error = null;
            Cookies.set('token', token, cookieOptions);
        },
        clearError : (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(signupUser.pending, (state) => {
            state.isLoading = true;
            state.isAuthenticated = false;
            state.error = null;
        })
        .addCase(signupUser.fulfilled, (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.error = null;
        })
        .addCase(signupUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.isAuthenticated = false;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
            Cookies.set('token', action.payload.token, cookieOptions);
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
    }
})

export const {logout, setCredentials, clearError} = authSlice.actions;
export default authSlice.reducer;
