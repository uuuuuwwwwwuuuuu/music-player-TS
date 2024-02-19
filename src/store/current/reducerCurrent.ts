import { createReducer } from "@reduxjs/toolkit";
import { ITrack } from "../likedPlayList/reducerLiked";
import { selectCurrentTrack, selectPlayList, selectShuffledPlayList, showCurrentPlayListAction, deleteCurrentTrack } from "./actionsCurrent";

const initialState: {
    currentPlayList: ITrack[],
    trackId: string | null,
    shuffledArr: ITrack[],
    showCurrentPlayList: boolean
} = {
    currentPlayList: [],
    trackId: null,
    shuffledArr: [],
    showCurrentPlayList: false
}

const currentPlayListReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(selectPlayList, (state, {payload}) => {
            state.currentPlayList = payload.currentPlayList;
        })
        .addCase(selectCurrentTrack, (state, {payload}) => {
            state.trackId = payload
        })
        .addCase(selectShuffledPlayList, (state, {payload}) => {
            state.shuffledArr = payload
        })
        .addCase(showCurrentPlayListAction, (state, {payload}) => {
            state.showCurrentPlayList = payload
        })
        .addCase(deleteCurrentTrack, (state, {payload}) => {
            state.currentPlayList = state.currentPlayList.filter(item => item.id !== payload);
            if (state.shuffledArr.length !== 0) {
                state.shuffledArr = state.shuffledArr.filter(item => item.id !== payload);
            }
        })
})

export default currentPlayListReducer;