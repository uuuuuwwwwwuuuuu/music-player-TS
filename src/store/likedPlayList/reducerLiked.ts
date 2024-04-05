import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { IPlayList } from "../playlists/reducerPlaylists";

export interface ITrack {
    title: string,
    artists: string,
    albumImg: string,
    music: string,
    id: string,
    liked: boolean
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
            const res = await fetch('http://localhost:3001/appDB');
            const data = await res.json();
            const likedPlayList = data.playlists[0].playlist;
            return await likedPlayList;
        } catch (err) {
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