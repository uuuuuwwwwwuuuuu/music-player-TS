import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

interface IUser {
    username: string,
    email: string,
    liked_track_list: string[] | string | null,
    playlists_list: string[] | string | null
}

interface IUserState {
    data: IUser | null,
    error: string | undefined,
    loading: true | false
}

const initialState: IUserState = {
    data: null,
    error: undefined,
    loading: false
}

export const loadUserData = createAsyncThunk<IUser, undefined, {rejectValue: string}>(
    '@@user/LOAD_USER',
    async (_, {rejectWithValue}) => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/users/getdata/${localStorage.getItem('Token')}/`);
            const data: IUser = await res.json()
            const {liked_track_list, playlists_list} = data
            if (typeof liked_track_list === 'string' && typeof playlists_list === 'string') {
                data.liked_track_list = liked_track_list ? liked_track_list.split(',') : null;
                data.playlists_list = playlists_list ? playlists_list.split(',') : null;
            }

            return data;
        } catch {
            return rejectWithValue('Произошла ошибка при получении данных')
        }
    }
)

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
            state.loading = false
        })
})

export default userReducer;