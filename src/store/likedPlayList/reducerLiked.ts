import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export interface ITrack {
    title: string,
    artists: string,
    albumImg: string,
    music: string,
    id: string,
    auditions: number
}

interface ILikedState {
    likedTrackList: ITrack[],
    loading: boolean,
    error: string | undefined,
    errorMessage: string | undefined
}

const initialState: ILikedState = {
    likedTrackList: [],
    loading: false,
    error: undefined,
    errorMessage: undefined
};

export const loadLikedTrackList = createAsyncThunk<ITrack[], undefined, {rejectValue: string}>(
    '@@liked/LOAD_LIKED_TRACK_LIST', 
    async (_, {rejectWithValue}) => {
        try {
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

export const toggleLike = createAsyncThunk<ITrack[], string, {rejectValue: string}>(
    '@@liked/TOGGLE_LIKE',
    async (trackId, {rejectWithValue}) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/toggleliked/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Token': localStorage.getItem('Token')!
                },
                body: JSON.stringify({'liked_track_list': [trackId]})
            });
            const data = await response.json()
            return data.data;
        } catch (err) {
            console.error(err);
            return rejectWithValue('Не удалось добавить в избранное');
        }
    }
)

const likedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(loadLikedTrackList.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        })
        .addCase(loadLikedTrackList.rejected, (state, {payload}) => {
            state.error = payload;
            state.loading = false;
        })
        .addCase(loadLikedTrackList.fulfilled, (state, {payload}) => {
            state.likedTrackList = payload;
            state.loading = false;
        })
        .addCase(toggleLike.fulfilled, (state, {payload}) => {
            state.likedTrackList = payload;
            state.errorMessage = undefined
        })
        .addCase(toggleLike.rejected, (state, {payload}) => {
            state.errorMessage = payload;
        })
})

export default likedReducer;