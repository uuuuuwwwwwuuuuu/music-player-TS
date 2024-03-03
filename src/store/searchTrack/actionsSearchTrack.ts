import { createAction } from "@reduxjs/toolkit";

export const searchLikedTrack = createAction('@@liked/SEARCH_LIKED_TRACK', (inputValue: string) => ({
    payload: inputValue
}))

export const toggleIsFocus = createAction('@@liked/TOGGLE_IS_FOCUS', (isFocus: boolean) => ({
    payload: isFocus
}));