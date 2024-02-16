import { createAction } from "@reduxjs/toolkit";

export const searchLikedTrack = createAction('@@liked/SEARCH_LIKED_TRACK', (inputValue: string) => ({
    payload: inputValue
}))