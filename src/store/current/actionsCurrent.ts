import { createAction } from "@reduxjs/toolkit";
import { ITrack } from "../likedPlayList/reducerLiked";

export const selectPlayList = createAction('@@current/SELECT_PLAY_LIST', (playList: ITrack[]) => ({
    payload: {
        currentPlayList: playList,
    }
}))

export const selectCurrentTrack = createAction('@@current/SELECT_CURRENT_TRACK', (currentTrack: string) => ({
    payload: currentTrack
}))