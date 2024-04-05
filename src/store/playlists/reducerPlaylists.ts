import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { selectPlayList } from "./actionsPlaylists";
import { ITrack } from "../likedPlayList/reducerLiked";
import { error } from "console";

export interface IPlayList {
    title: string,
    id: string,
    img?: string,
    playlist: ITrack[]
}

interface IPlayListState {
    loading: boolean,
    error: string | undefined,
    playlists: IPlayList[]
}

export const loadPlayLists = createAsyncThunk<IPlayList[], undefined, {rejectValue: string}>(
    '@@playlists_LOAD_PLAYLISTS',
    async (_, {rejectWithValue}) => {
        try {
            const res = await fetch('http://localhost:3001/appDB');
            const data = await res.json();
            const playlists = data.playlists;
            return playlists;
        } catch (err) {
            return rejectWithValue('Ошибка при получении плейлистов');
        }
});

const initialState: IPlayListState = {
    loading: false,
    error: undefined,
    playlists: []
}

const playlistsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(loadPlayLists.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.playlists = payload;
            state.error = undefined
        })
        .addCase(loadPlayLists.rejected, (state, {payload}) => {
            state.error = payload;
            state.loading = false;
        })
        .addCase(loadPlayLists.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        })
});

export default playlistsReducer;