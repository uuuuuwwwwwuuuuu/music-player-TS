import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import { ITrack } from "../likedPlayList/reducerLiked";

interface ITrackList {
    trackList: ITrack[],
    loading: boolean,
    error: string | undefined
}

const initialState: ITrackList = {
    trackList: [],
    loading: false,
    error: undefined
}

const serverUrl = 'https://music-server-production-d261.up.railway.app'

export const loadTrackList = createAsyncThunk<ITrack[], undefined, {rejectValue: string}> (
    '@@trackList/LOAD_TRACK_LIST',
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch(serverUrl + '/api/tracks/');
            const data = await response.json();
            const newData = data.map((item: ITrack) => {
                item.albumImg = item.albumImg.replace(/http/g, 'https');
                item.music = item.music.replace(/http/g, 'https');
                return item
            })
            console.log(newData);
            return newData
        } catch (err) {
            if (err) {
                const error = err as Error;
                console.log(error.message);
                return rejectWithValue('Произошла ошибка при получении треков');
            }
        }
    }
)

const trackListReducer = createReducer(initialState ,builder => {
    builder
        .addCase(loadTrackList.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.error = undefined;
            state.trackList = payload;
        })
        .addCase(loadTrackList.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        })
        .addCase(loadTrackList.rejected, (state, {payload}) => {
            state.error = payload;
            state.loading = false;
        })
})

export default trackListReducer