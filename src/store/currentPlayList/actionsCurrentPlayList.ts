import { createAction } from "@reduxjs/toolkit";
import { ITrack } from "../likedPlayList/reducerLiked";

export const selectPlayList = createAction('@@current/SELECT_PLAY_LIST', (playList: ITrack[], id: string) => ({
    payload: {
        currentPlayList: playList,
        trackId: id
    }
}))