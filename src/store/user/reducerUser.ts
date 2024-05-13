import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

interface IUser {
    username: string,
    email: string,
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
            return await res.json();
        } catch {
            return rejectWithValue('Произошла ошибка при получении данных')
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
})

export default userReducer;