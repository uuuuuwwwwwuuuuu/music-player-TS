import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { logoutUser, setUserPhoto, toggleShowUserData } from "./actionsUser";

interface IUser {
    username: string,
    email: string,
    reg_date: string,
    user_img: string | null
}

interface IUserState {
    data: IUser,
    error: string | undefined,
    loading: boolean,
    showUserData: boolean
}

const initialState: IUserState = {
    data: {username: '', email: '', reg_date: '', user_img: null},
    error: undefined,
    loading: false,
    showUserData: false
}

const serverUrl = 'https://music-server-production-d261.up.railway.app';

export const loadUserData = createAsyncThunk<IUser, undefined, {rejectValue: string}>(
    '@@user/LOAD_USER',
    async (_, {rejectWithValue}) => {
        if (localStorage.getItem('Token')) {
            try {
                    const res = await fetch(serverUrl + `/api/users/getdata/${localStorage.getItem('Token')}/`);
                    const data = await res.json();
                    return data
                } catch {
                    return rejectWithValue('Произошла ошибка при получении данных');
                }
        }
    }
);

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(loadUserData.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        })
        .addCase(loadUserData.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload;
        })
        .addCase(loadUserData.fulfilled, (state, {payload}) => {
            state.data = payload;
            state.error = undefined;
            state.loading = false;
        })
        .addCase(toggleShowUserData, (state, {payload}) => {
            state.showUserData = payload
        })
        .addCase(logoutUser, (state) => {
            state = initialState
        })
        .addCase(setUserPhoto, (state, {payload}) => {
            state.data.user_img = payload
        })
})

export default userReducer;