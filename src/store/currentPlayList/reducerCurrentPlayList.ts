import { createReducer } from "@reduxjs/toolkit";
import { ITrack } from "../likedPlayList/reducerLiked";
import { selectPlayList } from "./actionsCurrentPlayList";

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
            state.trackId = payload.trackId;
        })
})

export default currentPlayListReducer;