import { createReducer } from "@reduxjs/toolkit";
import { ITrack } from "../likedPlayList/reducerLiked";
import { selectCurrentTrack, selectPlayList } from "./actionsCurrent";

const initialState: {
    currentPlayList: ITrack[],
    trackId: string | null
} = {
    currentPlayList: [],
    trackId: null
}

const currentPlayListReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(selectPlayList, (state, {payload}) => {
            state.currentPlayList = payload.currentPlayList;
        })
        .addCase(selectCurrentTrack, (state, {payload}) => {
            state.trackId = payload
        })
})

export default currentPlayListReducer;