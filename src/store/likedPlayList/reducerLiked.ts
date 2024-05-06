import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export interface ITrack {
    title: string,
    artists: string,
    albumImg: string,
    music: string,
    id: string,
}

interface ILikedState {
    likedTrackList: ITrack[],
    loading: boolean,
    error: string | undefined
}

const initialState: ILikedState = {
    likedTrackList: [],
    loading: false,
    error: undefined
};

export const loadLikedTrackList = createAsyncThunk<ITrack[], undefined, {rejectValue: string}>(
    '@@liked/LOAD_LIKED_TRACK_LIST', 
    async (_, {rejectWithValue}) => {
        try {
            const URL = 'http://127.0.0.1:8000/';
            const res = await fetch('http://127.0.0.1:8000/api/tracks/getliked/', {
                method: 'GET',
                headers: {
                    'Token': localStorage.getItem('Token')!
                }
            });
            const data = await res.json();
            return data.data.map(item => {
                item.albumImg = URL + item.albumImg;
                item.music = URL + item.music;
                return item
            })
        } catch (err) {
            console.error(err);
            return rejectWithValue('Ошибка при получении понравившихся треков')
        }
    })

const likedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(loadLikedTrackList.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        })
        .addCase(loadLikedTrackList.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        .addCase(loadLikedTrackList.fulfilled, (state, action) => {
            state.likedTrackList = action.payload
            state.loading = false;
        })
})

export default likedReducer;