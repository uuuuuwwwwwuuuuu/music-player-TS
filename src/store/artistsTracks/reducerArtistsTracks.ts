import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { ITrack } from "../likedPlayList/reducerLiked";

const initialState: {
    loading: boolean,
    error: string | undefined,
    tracks: ITrack[]
} = {
   loading: false,
   error: undefined,
   tracks: [] 
}

const serverUrl = 'http://127.0.0.1:8000';

export const loadArtistTracks = createAsyncThunk<ITrack[], string[], {rejectValue: string}>(
    '@@artistTracks/LOAD_ARTIST_TRACKS',
    async (arrOfId, {rejectWithValue}) => {
        try {
            const response = await fetch(serverUrl + '/api/tracks/getartisttracks/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({'tracks': arrOfId})
            });
            const data = await response.json();
            const newData = data.data.map((item: ITrack) => {
                item.albumImg = serverUrl + item.albumImg;
                item.music = serverUrl + item.music;
                return item;
            });
            return newData
        } catch (err) {
            if (err) {
                const error = err as Error;
                console.log(error);
                rejectWithValue('Произошла неожиданная ошибка');
            }
        }
    }
)

const artistsTracksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(loadArtistTracks.fulfilled, (state, {payload}) => {
            state.tracks = payload;
            state.loading = false;
            state.error = undefined;
        })
        .addCase(loadArtistTracks.pending, (state) => {
            state.error = undefined;
            state.loading = true;
        })
        .addCase(loadArtistTracks.rejected, (state, {payload}) => {
            state.error = payload;
            state.loading = false;
        })
});

export default artistsTracksReducer;