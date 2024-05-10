import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { ITrack } from "../likedPlayList/reducerLiked";

interface IArtist {
    name: string,
    artistImg: string,
    likes: number,
    tracks: ITrack[],
    id: number,
    big_img: string
}

interface IArtistsState {
    artists: IArtist[],
    loading: boolean,
    error: string | undefined
}

const initialState: IArtistsState = {
    artists: [],
    loading: false,
    error: undefined
}

export const loadArtists = createAsyncThunk<IArtist[], undefined, {rejectValue: string}>(
    '@@artists/LOAD_ARTISTS',
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/artists/');
            return await response.json()
        } catch (err) {
            if (err) {
                const error = err as Error;
                console.log(error.message);
                return rejectWithValue('При получении артистов произошла ошибка');
            }
        }
    }
)

const artistsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(loadArtists.fulfilled, (state, {payload}) => {
            state.error = undefined;
            state.loading = false;
            state.artists = payload
        })
        .addCase(loadArtists.pending, (state) => {
            state.error = undefined;
            state.loading = true
        })
        .addCase(loadArtists.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload
        })
})

export default artistsReducer;