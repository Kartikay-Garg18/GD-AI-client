import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const API = import.meta.env.VITE_API_URL;

const authorisedRequest = axios.create({
    baseURL: API,
});

authorisedRequest.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

export const createMeeting = createAsyncThunk(
    "room/createMeeting",
    async (roomData, {rejectWithValue}) => {
        try {
            const response = await authorisedRequest.post('/meetings', roomData);
            return response.data.room;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
)

export const addMeetings = createAsyncThunk(
    "room/addMeetings",
    async (__, {rejectWithValue}) => {
        try {
            const response = await authorisedRequest.get('/meetings');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
)

const roomSlice = createSlice({
    name: 'room',
    initialState: {
        meetings: [],
        createLoading: false,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(createMeeting.pending, (state) => {
            state.createLoading = true;
        })
        .addCase(createMeeting.fulfilled, (state) => {
            state.createLoading = false;
        })
        .addCase(createMeeting.rejected, (state) => {
            state.createLoading = false;
        })
        .addCase(addMeetings.pending, (state)=>{
            state.createLoading = true;
        })
        .addCase(addMeetings.fulfilled, (state, action)=>{
            state.meetings = action.payload;
            state.createLoading = false;
        })
        .addCase(addMeetings.rejected, (state)=>{
            state.createLoading = false;
        })
    }
})

export default roomSlice.reducer;