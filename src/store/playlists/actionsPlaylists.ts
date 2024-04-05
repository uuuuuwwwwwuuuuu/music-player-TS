import { createAction } from "@reduxjs/toolkit";

export const selectPlayList = createAction('@@playlists/SELECT_PLAYLIST', (playListId: string) => ({
    payload: playListId
}))