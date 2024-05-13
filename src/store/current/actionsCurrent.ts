import { createAction } from "@reduxjs/toolkit";
import { ITrack } from "../likedPlayList/reducerLiked";

export const selectPlayList = createAction('@@current/SELECT_PLAY_LIST', (playList: ITrack[]) => ({
    payload: {
        currentPlayList: playList,
    }
}))

export const selectCurrentTrack = createAction('@@current/SELECT_CURRENT_TRACK', (currentTrack: string) => ({
    payload: currentTrack
}));

export const selectShuffledPlayList = createAction('@@current/SELECT_SHUFFLED_PLAY_LIST', (shuffledArr: ITrack[]) => ({
    payload: shuffledArr
}));

export const showCurrentPlayListAction = createAction('@@current/SHOW_CURRENT_PLAY_LIST', (bool: boolean) => ({
    payload: bool
}));

export const deleteCurrentTrack = createAction('@@current/DELETE_CURRENT_TRACK', (id: string) => ({
    payload: id
}));

export const addToCurrentPlayList = createAction('@@current/ADD_TO_CURRENT_PLAY_LIST', (track: ITrack) => ({
    payload: track
}))